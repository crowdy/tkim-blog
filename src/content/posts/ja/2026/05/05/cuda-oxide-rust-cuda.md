---
title: "NVIDIA が Rust を養子に迎えた日 — cuda-oxide と GPU 権力の再編"
description: "2026 年 5 月、NVIDIA Labs が公開した公式 Rust→CUDA コンパイラ cuda-oxide は単なる新技術の実験ではない。18 年間 C++ が占領してきた GPU プログラミングの権力地図のど真ん中で、誰が標準を定義するのかをめぐる宣言である。"
pubDate: 2026-05-05T00:00:00.000Z
lang: ja
pairSlug: cuda-oxide-rust-cuda
draft: false
---

# NVIDIA が Rust を養子に迎えた日 — cuda-oxide と GPU 権力の再編

> NVIDIA が自ら Rust→CUDA コンパイラを携えて表に出てきたこの出来事は、GPU 安全性の前進なのか、それとも lock-in をさらに深い場所へ移し替える迂回なのか。そしてその二つを我々は区別できるのか。

## 導入 — 18 年ぶりに NVIDIA が口にした新しい単語、"official"

2026 年 5 月 5 日、NVIDIA Labs が運用する nvlabs.github.io ドメイン配下に、cuda-oxide という名の一冊の book が静かに公開された。サブタイトルは "A Rust-to-CUDA Compiler"。冒頭の一文がプロジェクト全体を要約している。「cuda-oxide は (SIMT) GPU カーネルを安全(に近い)で慣用的な Rust で書くことを可能にする実験的な Rust→CUDA コンパイラである。標準的な Rust コードをそのまま PTX へとコンパイルする — DSL も外来言語のバインディングもなく、ただ Rust だけだ(no DSLs, no foreign language bindings, just Rust)」。同日の Hacker News には "CUDA-oxide: Nvidia's official Rust to CUDA compiler" というタイトルの投稿が上がり、12 時間でスコア 418、コメント 117 件を集めた。

この投稿で最も重い単語は "Rust" ではなく "official" である。過去 7 年間、Rust で GPU カーネルを書こうとする試みは散発的だったが途絶えなかった。Rust-CUDA プロジェクトは 2020 年頃に始まりメンテナ不在で何度も止まり、Embark Studios が主導した rust-gpu は SPIR-V をターゲットとしてゲームグラフィックス陣営で地位を築き、cust や cudarc といったクレートは NVCC がコンパイルした PTX を Rust ホストコードから呼び出すための FFI アダプタとして生き延びてきた。これらすべての試みには一つの共通点があった。NVIDIA は横で見ていただけだ、ということだ。NVIDIA の GPU プログラミングの公式チャネルは一貫して CUDA C++ であり、Rust は「興味のある外部コミュニティが勝手にやる」というカテゴリに留まり続けていた。

cuda-oxide はこの距離を一気に縮めた。ドメインは nvlabs.github.io、リポジトリは github.com/NVlabs/cuda-oxide、説明文の口ぶりは「NVIDIA が作り、NVIDIA が責任を持つ」に近い。v0.1.0 というバージョン番号と "early-stage alpha — expect bugs, incomplete features, and API breakage" という率直な但し書きを添えてはいるが、その但し書きこそが信頼を高める。マーケティング用語ではなくエンジニアリング用語だからだ。

では NVIDIA はなぜ今このカードを切ったのか。そして GPU コンパイルスタックの最も深い場所に Rust が first-class 言語として入ってくることは、誰にとって何を意味するのか。今回の発表は「Rust でも CUDA が書ける」という機能追加ではない。「GPU 安全性の標準を誰が定義するのか」に対する NVIDIA の回答である。

## 本論 1 — cuda-oxide の解剖:コンパイラとしてのアイデンティティ

まず何が発表されたのかを技術的に正確に押さえておこう。cuda-oxide はライブラリではなくコンパイラである。より正確に言えば、rustc のコード生成バックエンド(`rustc-codegen-cuda`)とそれを取り囲むホスト側ランタイムの束だ。中核のコンポーネントは四つ。

第一に **rustc_public**。安定化された MIR(Mid-level IR)インターフェースで、cuda-oxide が Rust コンパイラ内部に深く手を入れずとも MIR を取得できるようにしている。この選択の意味は小さくない。過去の Rust GPU コンパイラが nightly rustc の非公開 API に依存して壊れがちだった原因はまさにここにあった。cuda-oxide はその罠を回避する道を選んだ。

第二に **MIR Importer**。rustc の MIR を cuda-oxide 内部 IR に持ち込む。第三に **Pliron**。MLIR スタイルの IR インフラだが Rust で書かれている。ドキュメントは「MLIR の実装は C++ に少々の TableGen を添え、LLVM 全体をコンパイルしなければならないビルドシステムと、キャリア選択を後悔させるデバッグセッションが付け合わせとして付いてくる(MLIR's implementation, however, is C++ with a side of TableGen, a build system that requires you to compile all of LLVM, and debugging sessions that make you question your career choices)」とジョークを交えて記している。この一行に、NVIDIA Labs が cuda-oxide を通じて何を避けたかったのかがすべて入っている。最後の **lowering pipeline** が IR を PTX(NVIDIA の仮想 ISA)まで降ろす。その PTX を ptxas が受け取り SASS にアセンブルする。つまりコンパイルのフローは Rust ソース → MIR → cuda-oxide IR → PTX → SASS だ。

サポート範囲も alpha としては野心的である。book の目次に並ぶ項目を抜粋すれば次のとおり。カーネル launch とデバイス関数、メモリ管理とデータ移動、クロージャとジェネリクス型、共有メモリとスレッド同期、warp 単位プログラミング、Tensor Memory Accelerator(TMA)、行列乗算アクセラレータ(matrix multiply accelerators)、cluster プログラミング、そして非同期 `DeviceOperation` モデルと stream スケジューリング。Hopper と Blackwell 世代の中核機能がほぼ網羅されている。「おもちゃのコンパイラ」ではない。

ホスト側 API の質感も興味深い。cuda-oxide は GPU 作業を即時実行せず、"lazy DeviceOperation graph" として組み立ててから stream にスケジュールする。そしてその stream の上に Rust の async/await がそのまま乗る。つまり Rust ホストコードから見れば GPU 呼び出しはもう一つの future となり、既存の tokio ベースのサーバコードと自然に合成される。これは過去の cust や cudarc が提供できなかった結合点だ。その結果を HN で `the__alchemist` というユーザは短くこう表現した。「Hell yea! 俺は Cudarc(カーネル)と FFI(cuFFT)でこれをやってきた。バイト配列と Rust データ構造の間を手作業で[逆]シリアライズしてだ。このプロジェクトで摩擦が減ることを願う(I have been doing it with Cudarc and FFI, using manual [de]serialization between byte arrays and rust data structs. I hope this makes it lower friction)」。

安全性モデルの方はさらに具体的だ。同じコメントスレッドの `arpadav` がまとめた四つの差分が最も明瞭である。第一に、use-after-free と drop semantics が手動の `cudaFree` を置き換える。第二に、カーネル引数が `cuda_launch!` マクロで強制される。C++ が `void**` 配列で引数を渡し個数だけを検証していた箇所に、型まで検証するチャネルが据えられた。第三に、mutable alias が遮断される。C++ では二つのスレッドが同じ `out[i]` に同時書き込みしてもコンパイルが通るが、cuda-oxide の `DisjointSlice<T>` には公開コンストラクタがなく、`index_1d`、`index_2d` といった API 経由でしか取得できない。第四に、任意の POD 型を `cudaMemcpy` できない。受け取り側が `DisjointSlice<T>`、スカラ、そしてクロージャに限定される。その結果、C++ 側でよく起きていた「`std::string` をデバイスへコピーして内部ポインタが壊れる」類のサイレントな UB がコンパイル段階で遮断される。

ただし同じユーザは正直に一行を付け加えている。「もちろんこれですべてを捕まえられるわけではない。raw .cu ファイルに比べて UB に対するガードレールがずっと厚く見える、というだけだ(not like this catches everything, just looks to give much more guardrails against UB with raw .cu files)」。この正直さには重要な意味がある。cuda-oxide は GPU に "absolute safety" を約束しない。「GPU カーネルを書くことは本質的に unsafe である」という別の HN コメント(`cyber_kinetist`)の診断を NVIDIA Labs も共有している。ただ、その unsafe の表面積を縮め、縮めた分を型システムで包み直す。

## 本論 2 — NVIDIA の意図:「なぜ今か」がすべてを語る

技術仕様だけ見れば cuda-oxide は興味深い alpha コンパイラだ。しかし同じ仕様を政治経済的な視点から読み直すと風景が変わる。NVIDIA はなぜ 2026 年 5 月にこのカードを自ら切ったのか。答えは三層に積み重なっている。

第一の層は **エージェントコーディングの台頭** である。この一年、Claude Code、Codex、Cursor といったコーディングエージェントが GitHub に 30 倍の負荷を背負わせたのと同じ流れが、GPU コードの領域でも起きている。エージェントが自動で CUDA カーネルを書き始めれば、コンパイラが事前に捕まえられないメモリエラーは production の GPU クラスタを直撃する。C++ の表面的な unsafe は人間の開発者が書いていた時代には「注意深く書けばよい」という答えで糊塗できたが、エージェントが書く時代にその答えは通用しない。NVIDIA は自社 GPU の上でエージェントが自動生成したコードが回る表面をあらかじめ整えなければならない。その整地のための道具として最も使えそうな候補が、Rust の型システムなのだ。

第二の層は **DSL 競争の圧力** である。この 2 年、GPU プログラミング言語の領域では新顔が次々と現れた。Modular の Mojo は Python 文法に GPU 加速を約束して登場し、OpenAI が始めた Triton は PyTorch 生態系の中で事実上の標準 GPU DSL の地位を占め、NVIDIA 自身が押し進める Tile IR と CuTile はより高い抽象化レベルでの GPU コード記述を支援している。HN のコメントで `alecco` はこう直截に指摘する。「なぜ PTX へ直接行くのか。最近の NVIDIA の MLIR はかなり良くて速い。あるいはもっと簡単で最近の tile IR をターゲットすることもできたはずだ(Weird. There's a recent NVIDIA MLIR that is quite good and fast. Or they could target the even easier and more recent/fashionable tile IR)」。この疑問は的を射ている。そしてその的の正確さこそが NVIDIA の意図を露わにする。cuda-oxide は Tile IR や MLIR とは競合しない。それらとは別の市場を狙っているのだ。

Tile と Triton と Mojo が狙う席は「AI アルゴリズムを書く ML エンジニア」の席である。そこでは numpy 文法と自動タイリングが最重要となる。一方 cuda-oxide が狙う席は「システムプログラマ」の席だ。メモリレイアウトを直接制御し、warp や cluster 単位で同期を組み、TMA を直に呼び出す人々である。C++ CUDA が占領してきたその席に、NVIDIA は初めて公式の Rust オプションを敷いた。この分離が重要なのは、AI アルゴリズムの上に何が乗ろうとも、その下のシステムコードは結局誰かが書かねばならないからだ。PyTorch が Triton を呼べば、その Triton のランタイムは結局システムレベルの CUDA の上で回る。そのシステムレベルを NVIDIA が自ら Rust で定義し始めた、ということが cuda-oxide 発表の真の意味である。

第三の層は **既存 Rust GPU 陣営に対する迂回** だ。Rust-CUDA クレートと rust-gpu、そして cust と cudarc が 7 年かけて積み上げてきたコード資産は小さくない。しかしそのすべてのプロジェクトは一つの限界を共有している。NVIDIA の後ろ盾がない、ということだ。NVCC の内部変更ひとつでビルドが壊れる可能性があり、新しい GPU 世代の機能は常に C++ ヘッダの方に先に届く。この非対称性が Rust ユーザの GPU 採用を事実上塞いできた。cuda-oxide はこの非対称性を一気に裏返す。同じ会社が PTX 仕様と Rust コンパイラを同時にいじる瞬間、誰が作る Rust GPU コンパイラも NVIDIA 標準の従属変数となる。

`raincole` が HN に残した一文がこの風景をよく要約している。「これが Slang にとって何を意味するのか気になる。人々がより現代的な言語で GPU プログラミングをしたい、というのが要点なら、これからは普通に Rust を使えばよいのではないか(I wonder what it means for Slang. Presumably the point is that people want to do GPU programming with a more modern language. But now you can just use Rust)」。これに対し `pjmlp` は市場の分離で答える。「彼らは異なる客層を相手にしている。Slang 陣営は AI アルゴリズムよりグラフィックスプログラミングに関心がある。そして NVIDIA はすでに Slang を production で使っており、その人たちがシェーダパイプラインを Rust に書き直すことはない(They serve different public, Slang folks are more interested in graphics programming not AI algorithms. Also NVIDIA already has Slang in production and those folks aren't going to rewrite shader pipelines into Rust)」。この応答は正しい。しかし同時に、cuda-oxide がグラフィックス陣営を狙ったのではなく、システム/AI インフラ陣営を狙ったカードであるという事実を逆説的に裏付ける。

NVIDIA が Rust をシステムコード領域で採用してきた事例は今回が初めてではない。セキュリティクリティカルなコードの一部に SPARK/Ada を使ってきた事例が AdaCore のケーススタディで公開されており、NVIDIA 内部のファームウェアやドライバ領域での Rust 採用が増えていることは既知の流れだ。cuda-oxide はその流れがついに GPU コードそのものにまで拡張された出来事である。C から始まり SPARK と Rust へと領域を広げてきた NVIDIA のシステム言語戦略において、GPU 領域だけが最後の未征服地だった。その未征服地が今回の 5 月に占領されたのである。

## 本論 3 — 移植性の罠:安全なコードは自由なコードか

ここまでが NVIDIA の視点である。ユーザの視点からは別の問いが浮かぶ。cuda-oxide で書いたコードはより安全か。然り。そのコードはより自由か。否。

この二つ目の答えこそが cuda-oxide の最大の罠である。Rust GPU 陣営が 7 年間分裂していた最大の理由は「どのバックエンドをターゲットするか」についての合意がなかったからだ。rust-gpu は SPIR-V をターゲットして Vulkan/WebGPU へ行ける道を開き、Rust-CUDA は PTX をターゲットし、cust は nvcc の出力を呼び出すに留まった。SPIR-V 経路を選べば AMD、Intel GPU、モバイル GPU まで同じコードで行ける代わりに、NVIDIA 専用機能 — TMA、warp shuffle の最新バリエーション、Tensor Core API — の一部を失う。PTX 経路を選べば NVIDIA のすべての機能を使える代わりに、そのコードは NVIDIA GPU の上でしか回らない。

cuda-oxide はこの分岐で迷うことなく PTX を選んだ。book の冒頭の一文が明示している通りだ。「compiles standard Rust code directly to PTX」。結果として cuda-oxide で書いたカーネルは Rust で書かれていても、その PTX は ptxas を経て NVIDIA の SASS となり、その SASS は AMD MI300 の上で一行も動かない。より正確に言えば、AMD 側が独自に PTX → ROCm トランスレータを作ったとしても(すでに ZLUDA のようなプロジェクトがある)、cuda-oxide のホスト API — `DeviceOperation`、stream、TMA 呼び出し — は NVIDIA ランタイム API と強く結合している。つまりコードは Rust で書かれているが、その Rust が指し示す語彙は CUDA なのである。

この点がなぜ重要か。答えは市場構造にある。AMD は ROCm で、Intel は oneAPI/Level Zero で、Apple は Metal Performance Shaders で GPU コンピュート市場に入ってきている。学習用にはいまだ NVIDIA H100/B200 のシェアが圧倒的だが、推論(inference)市場ではすでに AMD MI300X が意味のある比率を取り、Meta と Microsoft が自社 ASIC で一部ワークロードを移す流れも進行中だ。この市場分化の時期に NVIDIA が「Rust で書け、ただし PTX へだけコンパイルしろ」と宣言することは、GPU コードの移植性に関する決定をユーザが気づかぬうちに檻に入れる行為になる。C++ CUDA の lock-in が Rust CUDA の lock-in に移し替わるだけで、その深さはそのままである。むしろ Rust の型システムが約束する「安全でモダンなコード」というイメージのために、lock-in の不可視性が増す。

代替がないわけではない。WebGPU は段階的にコンピュートシェーダ領域を吸収しつつあり、SPIR-V は依然として最もマルチベンダ親和的な GPU IR であり、AMD HIP は CUDA コードをほぼ機械的に ROCm へ移すアダプタを提供している。HN で `rogermeier` はもっと根本的な候補を挙げる。「TileLang や Tile Kernels のようなものがいつか CUDA を obsolete にする(TileLang and stuff like Tile Kernels will make CUDA obsolete one day)」。この見解の含意は単純だ。十分に高い抽象化レベルの GPU DSL が安定すれば、その下の IR が PTX であれ SPIR-V であれ ROCm IR であれ自動変換の対象となり、ユーザは特定ベンダに縛られない、ということだ。

cuda-oxide はこの期待とは逆方向に進む。抽象化のはしごを上に伸ばす代わりに、システムプログラミングのはしごをより堅牢に固める。その堅牢さは NVIDIA GPU の上では明確な利得である。そして NVIDIA GPU でない場所では無用の利得である。ユーザはその二つの間で選択しなければならない。ただしこの選択は、コードを最初に書く時点ではなく、1 年後にそのコードを別ベンダの GPU へ移さねばならなくなった時にようやく姿を現す。

## 結論 — 安全と自由は同じではない

最初の問いに戻ろう。NVIDIA が自ら Rust→CUDA コンパイラを携えて出てきたこの出来事は、GPU 安全性の前進なのか、それとも lock-in をさらに深い場所に移す迂回なのか。答えはどちらでもある。そしてその二つを我々は、十分な時間が経った後にしか区別できない。

cuda-oxide が約束するものは明確だ。C++ CUDA が 30 年かけて積み上げてきたメモリ安全問題の表面積が縮む。エージェントが自動生成する GPU コードのリスクがコンパイル時点で捕まる。Rust ホストコードと GPU カーネルが同じ型システムの中で自然に合成される。この三つは実質的な前進であり、システムプログラミングの次の 10 年に向けた意味ある土台となる。否定する理由はない。

cuda-oxide が約束しないものもまた明確だ。このコンパイラで書かれたコードは NVIDIA GPU の上でのみ安全である。その安全さはすなわち、その GPU 会社の将来の価格、将来の供給量、将来の政治的決定への従属を意味する。Rust の安全性が即ちインフラの安全性を意味するわけではない。コンパイラ層の安全性とサプライチェーン層の自由は別の問題である。我々がこの二つを区別しなければ、より安全なコードを書きながら同時により従属した未来を建てる、ということを同時に行うことになる。

エンジニア個人の次元で今できることは単純だ。cuda-oxide を試してみる。ただし alpha 段階の安定性と NVIDIA 依存の深さの両方を意識すること。移植性が重要なコードであれば SPIR-V 経路、あるいはより高い抽象化レベルの DSL を併せて検討すること。そして何より、ある会社が "official" という単語を冠して持ち出してきた道具はほぼ常にその会社の競争力を強化する道具である、という事実を忘れないこと。cuda-oxide は NVIDIA が Rust を好きで作ったものではない。NVIDIA が GPU システムコードの次の標準を自分で定義するために作ったものである。その差を見ることが、この発表を正確に読む最初の一歩になる。
