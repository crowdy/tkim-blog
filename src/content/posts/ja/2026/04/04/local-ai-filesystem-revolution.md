---
title: 'ローカルAIの静かな革命 — RAGを捨てたファイルシステムと、自分のノートPCで動くGemma 4'
description: '2026年4月の第1週、三つの出来事が同時に起きた。MintlifyがRAGを撤去して仮想ファイルシステムに置き換え、GoogleがGemma 4をApache 2.0でリリースし、OllamaがApple MLXを取り込んで推論速度を2倍に引き上げた。それぞれは独立したニュースだ。しかし三つを並べると一つの方向が見えてくる — AIがクラウドから降りてきている。'
pubDate: 2026-04-04T01:49:05.966Z
lang: ja
pairSlug: 'local-ai-filesystem-revolution'
draft: false
---
# ローカルAIの静かな革命 — RAGを捨てたファイルシステムと、自分のノートPCで動くGemma 4

> 2026年4月の第1週、三つの出来事が同時に起きた。MintlifyがRAGを撤去して仮想ファイルシステムに置き換え、GoogleがGemma 4をApache 2.0でリリースし、OllamaがApple MLXを取り込んで推論速度を2倍に引き上げた。それぞれは独立したニュースだ。しかし三つを並べると一つの方向が見えてくる — AIがクラウドから降りてきている。

---

## 1. RAGを撤去した会社 — Mintlifyの実験

Mintlifyは開発者向けドキュメントプラットフォームだ。数千社のAPIドキュメントをホスティングし、その上にAIアシスタントを載せてユーザーが自然言語でドキュメントに質問できるようにしている。1日3万件以上の会話が交わされる。この規模ならRAG（Retrieval-Augmented Generation）が当然の選択だった。実際、彼らはRAGから始めた。

問題は、RAGが「うまく動かなかった」のではなく、「うまく動いているふりをしていた」ことにあった。RAGはクエリと意味的に近いchunkをtop-Kで抽出してモデルに渡す。FAQ程度の質問にはよく効く。「OAuthの設定方法」を聞けば関連chunkが上がってくる。しかし開発者が実際にドキュメントを使う方法は異なる。正確なコード構文を探し、複数ページを横断してコンテキストを組み合わせ、ディレクトリ構造を辿って目的の情報にたどり着く。embedding cosine similarityではこのワークフローを捉えることができない。top-Kに正解が引っかからなければ、そこで終わりだ。

Mintlifyチームは根本的な問いを投げかけた。「エージェントにchunkを渡すのではなく、エージェント自身にドキュメントを探索させたらどうか？」開発者がコードベースを探索するときに使うツール — `ls`、`cat`、`grep`、`find` — をドキュメント探索にも使えるようにする。これがChromaFsの出発点だった。

---

## 2. ChromaFs — ファイルシステムに見えるベクトルDB

ChromaFsは「本物の」ファイルシステムではない。UNIXコマンドをインターセプトしてChromaベクトルDBに変換する仮想化レイヤーだ。エージェント側からは通常のファイルシステムに見えるが、裏ではベクトルDBクエリが走っている構造だ。

コアアイデアはシンプルだ。ドキュメントの各ページをファイルに、各セクションをディレクトリにマッピングする。エージェントが`ls /auth/`を実行すれば認証関連のドキュメント一覧が返り、`cat /auth/oauth.mdx`を実行すればそのドキュメントの全文が返される。`grep -r "rate limit" /api-reference/`と打てばAPIリファレンス全体からrate limit関連の記述を探し出してくれる。

技術的に興味深いのは実装のレイヤー構造だ。ChromaFsはVercel Labsの[just-bash](https://github.com/nicholasgasior/just-bash)の上に構築されている。just-bashはTypeScriptで再実装されたbashで、ファイルシステムインターフェース（`IFileSystem`）をプラグインとして差し替えられる。ChromaFsはこのインターフェースをインターセプトし、すべてのファイルシステム呼び出しをベクトルDBクエリに変換する。

ディレクトリ構造はgzip圧縮されたJSONとしてChromaコレクション内に保存される：

```json
{
  "auth/oauth": { "isPublic": true, "groups": [] },
  "api-reference/users": { "isPublic": true, "groups": [] },
  "internal/billing": { "isPublic": false, "groups": ["admin", "billing"] }
}
```

初期化時にこのツリーをメモリに展開し、`Set<string>`（ファイルパス）と`Map<string, string[]>`（ディレクトリ→子要素）として保持する。おかげで`ls`、`cd`、`find`のような構造探索コマンドはネットワーク呼び出しなしにローカルで即座に処理される。実際にDBクエリが必要なのは`cat`（ファイル読み取り）と`grep`（内容検索）だけだ。

`grep`の最適化も注目に値する。再帰的grepは2段階フィルタリングで処理される。第1段階でgrepフラグをパースしてChromaクエリに変換し（固定文字列は`$contains`、パターンは`$regex`）、候補ファイルを絞り込む。第2段階でマッチしたchunkをRedisに一括プリフェッチした後、grepコマンドを該当ファイルのみを対象に書き換えてin-memoryで実行する。数万件のドキュメントに対する再帰検索がミリ秒単位で完了する。

パフォーマンス差は劇的だ：

| 指標 | 従来のSandbox | ChromaFs |
|------|-------------|----------|
| P90セッション生成時間 | 〜46秒 | 〜100ms |
| 会話あたりの限界コスト | 〜$0.0137 | 〜$0（既存DB再利用） |
| 検索方式 | ディスク線形スキャン | DBメタデータクエリ |
| 年間コスト（85万会話基準） | $70,000+ | 既存インフラ費用に吸収 |

セッション生成が46秒から100ミリ秒へ — 460倍速くなった。限界コストは事実上ゼロになった。これは単なるパフォーマンス改善ではなく、アーキテクチャ転換の結果だ。

---

## 3. 「それでもRAGじゃないのか？」 — HNの反論

Hacker Newsでこの記事が217ポイントを獲得し、[活発な議論](https://news.ycombinator.com/item?id=47618223)が巻き起こった。最も鋭い批判はこれだった：「ChromaFsは依然としてChroma DBにクエリしている。RAGを『置き換えた』のではなく、RAGの上に抽象化レイヤーを被せただけではないか？」

正確な指摘だ。ChromaFsの裏では依然としてベクトルDBが動いている。変わったのはretrievalエンジンではなく、**エージェントとデータの間のインターフェース**だ。RAGは「意味的に近いchunkを自動的に取ってきてくれる」パターンだ。ChromaFsは「エージェントが自ら探索できる構造を提供する」パターンだ。同じDBを使っていても、エージェントの自律性のレベルが根本的に異なる。

あるHNコメントがこれをよくまとめていた：400以上のPythonファイルで構成されたコードベースで、embeddingベースのRAGをファイルシステム探索に置き換えたところ、「エージェントが30秒でモジュール構造を把握し、必要なファイルをパスで直接リクエストし始めた」というのだ。

なぜこんなことが可能なのか？ LLMはGitHubとUNIX環境で大量に学習されている。`grep`、`ls`、`cat`はモデルがすでに深く理解しているツールだ。ファイルシステムインターフェースを提供することは、モデルの既存の能力を最大限に活用する設計だと言える。一方、RAGのtop-K retrievalはモデルが「受動的に受け取る」構造だ。何が上がってくるかをモデルがコントロールできない。

もちろん反論も有効だ。このアプローチはドキュメントがすでに十分に構造化されている場合にのみ通用する。Mintlifyは開発者ドキュメントプラットフォームだ — ドキュメントがディレクトリとページで整然と整理されている。非構造化データ、会話ログ、PDFの山には通用しない。HNの懐疑論者が正確に指摘した：「構造が階層的でないか、パーティショニングが不可能なデータでこの方式を使おうとすると、非常に厳しい戦いになる。」

それでもこの実験が投げかける問いは重要だ。**エージェントに答えを渡すのか、それとも自分で探させるのか？** 2026年のLLMは自分で探せるほど十分に賢くなった。問題は、我々がそれに見合ったインターフェースを提供しているかどうかだ。

---

## 4. Gemma 4 — 知らない人のための5分間入門

RAGの未来をめぐる議論が繰り広げられたのと同じ週に、Google DeepMindが[Gemma 4を公開](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)した。GemmaはGoogleのオープンモデルブランドだ。GeminiがGoogleの商用AIなら、Gemmaはその技術をオープンソースとして降ろすチャネルだ。Gemma 4はGemini 3と同じ技術で作られている。

知らない人のために要点だけ整理する。

**4つのモデルラインナップ：**

| モデル | アクティブパラメータ | 全パラメータ | Context Window | 入力モダリティ |
|--------|---------------------|-------------|----------------|---------------|
| E2B | 2.3B | 5.1B | 128K | テキスト、画像、音声 |
| E4B | 4.5B | 8B | 128K | テキスト、画像、音声 |
| 26B-A4B (MoE) | 3.8B | 25.2B | 256K | テキスト、画像、動画 |
| 31B (Dense) | 30.7B | 30.7B | 256K | テキスト、画像、動画 |

「アクティブパラメータ」がカギだ。26B-A4Bは全パラメータが25.2Bだが、1回の推論で実際に使うのは3.8Bだけだ。Mixture-of-Experts（MoE）アーキテクチャのおかげだ。複数のエキスパートを配置し、入力に応じて必要なエキスパートだけを活性化する構造だ。31B Denseモデルの97%の品質を、はるかに少ない計算量で達成する。

小さなモデルも侮れない。E2Bはアクティブパラメータ2.3Bで、2-bit量子化ならRaspberry Pi 5で毎秒7.6トークンを生成する。スマートフォンでも動くレベルだ。

**アーキテクチャの革新：** Gemma 4はAlternating Attentionという構造を導入した。レイヤーごとにlocal sliding-window attention（512〜1024トークン）とglobal full-context attentionを交互に適用する。近いコンテキストは効率的に、遠いコンテキストは正確に処理するという設計だ。さらにDual RoPE — sliding-windowレイヤーには標準的なrotary position embeddingを、globalレイヤーにはproportional RoPEを適用することで、256K context windowでも品質劣化なく動作する。

**ベンチマーク：** 31B Dense基準で[AIME 2026](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/)にて89.2%、LiveCodeBench v6で80.0%、Codeforces ELO 2,150を記録した。オープンモデル中、世界第3位だ。数学的推論とコーディングでこのレベルの成績なら、ローカルで動かすコーディングアシスタントとして十分に実用的だ。

**そして最も重要なこと：Apache 2.0ライセンス。** 以前のGemmaバージョンはGoogleの独自ライセンスを使用しており、商用利用に制約があった。Gemma 4からApache 2.0に切り替えた。これは技術的な変更ではなく戦略的転換だ。Apache 2.0は事実上制約がない。月間アクティブユーザー制限なし。利用ポリシー（acceptable use policy）の強制なし。商用デプロイ完全自由。MetaのLlama 4が依然としてコミュニティライセンスで月間7億MAU以上の場合に別途協議を求めているのとは対照的だ。

[VentureBeatの分析](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks)が核心を突いた：「このライセンス変更はベンチマークよりも重要かもしれない。」オープンモデルの価値は性能だけで決まるものではない。どれだけ自由に使えるかが採用率を左右する。

---

## 5. ローカルAIエコシステムのビッグバン — Ollama MLX + mesh-llm

Gemma 4が公開されたのと同じ週に、このモデルを実際にローカルで動かせるインフラも同時に整備された。偶然にしてはタイミングが完璧すぎる。

### Ollama 0.19：Macでの推論速度が2倍に

[Ollama](https://ollama.com/blog/mlx)はローカルLLM実行ツールのデファクトスタンダードだ。`ollama run gemma4:26b`の一行でモデルをダウンロードして即座に会話を始められる。そのOllamaがバージョン0.19でAppleのMLX（Machine Learning eXtensions）フレームワークをネイティブサポートし始めた。

パフォーマンス向上は数値で確認できる：

| 指標 | Ollama 0.18 | Ollama 0.19 (MLX) | 向上率 |
|------|-------------|-------------------|--------|
| Prefill（トークン/秒） | 1,154 | 1,810 | 1.6x |
| Decode（トークン/秒） | 58 | 112 | 1.9x |

Decode速度が58から112へ — ほぼ2倍だ。Apple Siliconのunified memoryアーキテクチャをMLXが直接活用することで実現した数値だ。GPUとCPUが同じメモリプールを共有するApple Siliconの特性を、llama.cppのMetal backendよりもはるかに効率的に使っている。

M5、M5 Pro、M5 MaxチップではGPU Neural Acceleratorまで活用し、time to first token（TTFT）と毎秒生成トークンの両方がさらに加速される。ただしOllamaチームは「32GB以上のunified memoryを推奨する」と明記している — 26Bモデルを量子化なしで動かすために実質的に必要な最低スペックだ。

### mesh-llm：複数台のコンピュータを一つに

ノートPC一台では足りないなら？ [mesh-llm](https://github.com/michaelneale/mesh-llm)が答えだ。複数台のコンピュータに分散したGPUリソースを一つにまとめ、単一のOpenAI互換APIとして公開するツールだ。

インストールはシンプルだ：

```bash
curl -fsSL https://raw.githubusercontent.com/michaelneale/mesh-llm/main/install.sh | bash
mesh-llm --auto
```

`--auto`をつければハードウェアを自動検出し、モデルをダウンロードし、メッシュネットワークに参加し、Webコンソールを起動する。同じネットワーク上の別のマシンでも同じコマンドを実行すれば自動的にメッシュに合流する。

分散戦略が巧みだ：

- **モデルが1台に収まる場合** → ネットワークオーバーヘッドなしにローカル実行
- **Denseモデルが1台に収まらない場合** → pipeline parallelismでレイヤーを分割
- **MoEモデルが1台に収まらない場合** → expert sharding、ノード間推論トラフィックゼロ

Gemma 4の26B-A4B MoEモデルとmesh-llmの組み合わせが特に魅力的だ。MoEはエキスパート単位での分割が自然で、mesh-llmはMoEのexpert shardingをネイティブでサポートする。自宅にMac miniが2台あれば、それぞれ16GBメモリでも26Bモデルを品質劣化なく動かせるということだ。

すべてのノードは`http://localhost:9337/v1`という同一のエンドポイントを公開する。OpenAI SDK互換なので、既存の`openai.chat.completions.create()`を使っていたコードでbase_urlを変えるだけでいい：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:9337/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="gemma-4-26b-a4b",
    messages=[{"role": "user", "content": "このコードをレビューして"}]
)
```

クラウドAPIを使うのとコードが同じだ。インフラが変わっただけだ。

---

## 6. パズルのピースを合わせると — 2026年のローカルAIスタック

三つを並べると一つのスタックが完成する。

```
┌──────────────────────────────────────────────────┐
│              Application Layer                   │
│   （エージェント、コーディングアシスタント、文書探索）  │
├──────────────────────────────────────────────────┤
│              Interface Layer                     │
│   ChromaFs（ファイルシステムインターフェース）        │
│   → RAGの「レコメンド」からエージェントの「探索」へ    │
├──────────────────────────────────────────────────┤
│              Model Layer                         │
│   Gemma 4 (Apache 2.0, MoE, 256K context)       │
│   → オープン、高性能、商用自由                      │
├──────────────────────────────────────────────────┤
│              Runtime Layer                       │
│   Ollama 0.19 (MLX) + mesh-llm                  │
│   → ローカル実行、分散推論、API互換                  │
├──────────────────────────────────────────────────┤
│              Hardware Layer                      │
│   Apple Silicon / NVIDIA GPU / マルチノード         │
└──────────────────────────────────────────────────┘
```

各レイヤーが独立に進化しながらも互いを強化している。Gemma 4のMoEアーキテクチャはmesh-llmのexpert shardingと相性が良い。OllamaのMLXサポートはApple Siliconのunified memoryを最大限に活用する。ChromaFsのファイルシステムインターフェースはLLMが最も理解しやすい形でデータを提供する。

このスタックの意味を一文でまとめるとこうなる：**クラウドAPIなしでも、実務で使えるレベルのAIワークフローが自分のノートPCで実現可能になった。**

1年前、ローカルLLMは「面白い実験」だった。7Bモデルが主流で、品質はGPT-3.5に遠く及ばず、推論速度はもどかしかった。今は違う。31Bモデルがオープンモデル世界第3位であり、26B MoEが3.8Bの計算量でその97%を再現し、Macでの推論速度が2倍に跳ね上がり、複数台を束ねてより大きなモデルも動かせるようになった。

---

## 7. それで何が変わるのか

技術的な可能性だけでは意味がない。実際に何が変わるのか、三つの観点で整理する。

**第一に、コスト構造が変わる。** OpenAIのGPT-4.5 APIを基準に、入力$2/百万トークン、出力$8/百万トークンだ。1日1万件のクエリを処理するサービスなら月に数千ドルになる。Gemma 4 26Bをローカルで動かせば追加コストは電気代だけだ。Mac mini M4 Proの消費電力はフルロードでも40W前後 — 24時間稼働しても月の電気代は$5未満だ。もちろん初期ハードウェア投資はあるが、API費用が累積するサービスでは数ヶ月以内に逆転する。

**第二に、データがローカルに留まる。** 医療、法律、金融ドメインでAI導入が進まない最大の障壁は技術ではなく規制だ。機密データを外部APIに送れない環境がほとんどだ。ローカルAIスタックはこの障壁を迂回する。データがネットワークを離れないのでコンプライアンスの問題が根本的に発生しない。Apache 2.0ライセンスはモデル自体の商用利用まで自由に開放しているため、企業が自社サービスに組み込む際にも法的障壁がない。

**第三に、エージェントの自律性が高まる。** ChromaFsが示したのは、RAG→ファイルシステム転換そのものより大きなトレンドの一部だ。エージェントに「結果を渡す」のではなく、「ツールを与えて自ら探索させる」パターンが広がっている。Claude Codeがコードベースを直接探索すること、Devinがブラウザを直接操作すること、そしてChromaFsがドキュメントをファイルシステムとして提供すること — すべて同じ方向だ。Agenticなアプローチがpassiveなretrievalより効果的だというコンセンサスが形成されつつある。

---

## 8. 限界と境界線 — まだそうではないもの

楽観だけで記事を閉じるのは誠実ではない。このスタックには明確な限界がある。

**ローカルモデルの品質の天井。** Gemma 4 31Bがどれほど優れていても、Claude Opus 4.6やGPT-4.5のフル機能を代替するには至らない。複雑な多段階推論、長文ドキュメントの精密な分析、微妙なニュアンスの把握では依然としてフロンティアモデルとの差がある。ローカルモデルは「十分に良い（good enough）」ユースケースで輝き、「最高の品質が必要な」ユースケースではクラウドAPIが依然として正解だ。

**ChromaFsの適用範囲。** 前述のとおり、このアプローチはデータが十分に構造化されている場合にのみ通用する。非構造化データ — Slackの会話ログ、メールアーカイブ、スキャンされたPDF — にはファイルシステムメタファが合わない。こうしたデータに対しては依然としてRAGが、あるいはAgentic RAGがより適切な選択だ。

**mesh-llmの成熟度。** GitHubスター503個、活発に開発中だが、まだプロダクションレベルとは言い難い。ネットワーク遅延、ノード障害時のリカバリ、セキュリティなど分散システムの古典的な課題がまだ完全には解決されていない。

**メモリの壁。** Ollamaが32GB unified memoryを推奨しているのには理由がある。16GBのMacで26Bモデルを動かすには攻撃的な量子化が必要で、量子化は品質劣化を伴う。ハードウェア投資なしに「無料でAIが使える」というフレーミングは誇張だ。

---

## 9. AIが降りてきている

2026年4月の第1週に同時に起きたこの三つの出来事は、個別に見ればそれぞれのニュースに過ぎない。Mintlifyがアーキテクチャを変え、Googleがモデルを公開し、Ollamaがアップデートをした。しかし三つを並べると一つの流れが見えてくる。

AIの重心がクラウドからローカルへ移動している。モデルはより小さく効率的に進化し（MoE）、ライセンスはより自由になり（Apache 2.0）、実行環境はより高速になり（MLX）、複数台を束ねるインフラが登場し（mesh-llm）、エージェントがデータを扱う方式もローカル探索に最適化されつつある（ChromaFs）。

以前書いた[RAGの記事](rag-not-silver-bullet-ja.md)で「ツールではなく問題を見ろ」と書いた。同じ原則がここにも当てはまる。「クラウド vs ローカル」はツール選択の問題だ。本当の問いは「自分の問題の形にどのスタックが合うか」だ。機密データを扱う医療スタートアップにとってローカルAIスタックは選択ではなく必須だ。数百万ユーザーのリアルタイムリクエストを処理する大規模サービスには依然としてクラウドが合う。大多数のケースはその間のどこかにあるだろう — 機密データはローカルで、高品質な推論が必要な作業はクラウドで。

確かなことは一つだ。1年前、「ローカルでAIを動かす」という言葉は趣味プロジェクトを意味していた。今はプロダクションアーキテクチャの選択肢の一つになった。そしてこの動きは加速している。

---

## 参考資料

- [How we built a virtual filesystem for our Assistant](https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant) — Mintlifyブログ
- [Hacker News: ChromaFsディスカッション](https://news.ycombinator.com/item?id=47618223) — 217ポイント、96コメント
- [Gemma 4: Byte for byte, the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) — Google公式発表
- [What Is Google Gemma 4? Architecture, Benchmarks](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/) — WaveSpeedAI技術分析
- [Google releases Gemma 4 under Apache 2.0 — and that license change may matter more than benchmarks](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks) — VentureBeat
- [Ollama is now powered by MLX on Apple Silicon](https://ollama.com/blog/mlx) — Ollama公式ブログ
- [Ollama adopts MLX for faster AI performance on Apple Silicon](https://9to5mac.com/2026/03/31/ollama-adopts-mlx-for-faster-ai-performance-on-apple-silicon-macs/) — 9to5Mac
- [mesh-llm: Pool compute to run powerful open models](https://github.com/michaelneale/mesh-llm) — GitHub
- [Gemma 4 Model Card](https://ai.google.dev/gemma/docs/core/model_card_4) — Google AI for Developers
