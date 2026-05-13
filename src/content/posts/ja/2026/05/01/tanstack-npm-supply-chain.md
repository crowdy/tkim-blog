---
title: "TanStackの6分間 — Trusted Publisherでも防げなかったnpm供給網侵害の解剖"
description: "2026年5月11日、TanStackの42パッケージがわずか6分の間に84の悪性バージョンへ差し替えられた。メインテナーのアカウントもnpmトークンも盗まれていない。なぜか。"
pubDate: 2026-05-01T00:00:00.000Z
lang: ja
pairSlug: tanstack-npm-supply-chain
draft: false
---

# TanStackの6分間 — Trusted Publisherでも防げなかったnpm供給網侵害の解剖

> Trusted PublisherとOIDC、メインテナーのMFAがいずれも正常に動作していたにもかかわらず、人気のnpmパッケージ42件が6分で悪性バージョンへ置き換わった。我々がこの一年「サプライチェーンセキュリティの正解」と呼んできたものは、何を防ぎ、何を防げなかったのか。

## 導入 — postmortemが届いた

2026年5月11日19時20分UTC。`@tanstack/router`、`@tanstack/history`、そしてその兄弟パッケージ40本がnpmレジストリで一斉に新バージョンへ更新された。6分後の19時26分、同じことがもう一度繰り返される。合計42パッケージ、84の悪性バージョン。いずれもTanStack組織の正規GitHub ActionsワークフローがOIDCトークンで正規認証してpublishしたものである。メインテナーのnpmトークンは盗まれていない。MFAも回避されていない。trusted publisherバインディングは設計通り作動した。

そして、それらすべてが正常に作動した結果として、悪性パッケージがnpmに上がった。

5月11日のインシデントについてのpostmortemは、その三日後の5月14日にTanStackチームから公開された。本稿が扱う時点はそれよりさらに数日後、事件がHacker News一面を占拠してスコア1,072点、コメント450件を超えた5月13日前後である。コメント欄はいつも通り二つに割れている。一方では「TanStackチームは何を間違えたのか」を詰め、もう一方では「ほぼ何も間違えていないのにこれが起きるという事実」を凝視している。

本稿は後者の視点で事件を読み直す。4月末に[GitHub Actionsが最も弱い環(GitHub Actions is the weakest link)](https://crowdy.github.io/tkim-blog/ja/2026/04/29/github-cracking-week)というタイトルでまとめた一週間のセキュリティ事件群 — tj-actions/changed-files、nx/s1ngularity、elementary-data — の直系の続編である。あの時の診断はシンプルだった。「GitHub Actionsのセキュリティ問題は、ユーザーが間違って使ったことではなく、デフォルトが危険であることに本質がある」。TanStackの事件はその診断を一段押し進める。ユーザーが「推奨される解」であるtrusted publisherへ移行した後でも、同種の事故が起きること、それも6分で起きることを、定量的に示した最初の事例である。

## 本文1 — 6分のタイムライン:何が起きたのか

まずは事実関係を時系列で追う。すべての時刻はUTCで、TanStackチームのpostmortemとGitHub issue #7383のタイムラインを突き合わせて確認したものである。

**5月10日17時16分。** 攻撃者アカウント`zblgg`(GitHubユーザーID 127806521)がTanStack/routerリポジトリをforkする。fork名は直後に`configuration`へリネームされる。forkネットワーク内で自分を隠すための定番の回避テクニックである。このfork自体は数日のあいだ何の変哲もない見た目をしている。

**5月10日23時29分。** 同じ攻撃者がforkにコミットを一つ追加する。ハッシュ`65bf499d…`で始まるこのコミットには、約30,000行のバンドルファイル`vite_setup.mjs`が含まれている。表面上はビルドツールのボイラープレートに見えるよう加工されているが、実体はペイロードの第一段階に相当する依存関係インストールスクリプトである。

**5月11日10時49分。** PR #7378がオープンされる。タイトルは "WIP: simplify history build"。TanStack/routerほどの人気OSSには毎日数十のPRが立ち、その多くが外部コントリビューターから来る。このPRもそのうちの一つに見えた。

**5月11日11時11分。** PRがforce-pushされる。この時点でforkのHEADは事前に用意された悪性コミットへ差し替わる。すると`bundle-size.yml`ワークフローがトリガーされる。このワークフローのトリガーは — 馴染み深いことに — `pull_request_target`である。PRのHEADコードをチェックアウトしてビルドし、ビルド成果物のサイズをPRコメントに書き込むだけの平凡な自動化である。このワークフローが走った瞬間、forkから来た悪性コードがbaseリポジトリのsecretsと書き込み権限を持つコンテキストの中で実行される。

**5月11日11時29分。** `bundle-size.yml`が終了し、自身のpnpmキャッシュをGitHub Actionsキャッシュストアへ保存する。キー名は`Linux-pnpm-store-6f9233a50def742c09fde54f56553d6b449a535adf87d4083690539f49ae4da11`、約1.1 GB。このキャッシュには正規の依存関係に紛れて、悪性コードが仕込んだ後段ペイロードが同居している。キャッシュキーは`lockfile hash`で決まるため、同じlockfileを使う別のワークフロー — つまり`release.yml` — が同じキーを引いたとき、この汚染キャッシュがそのまま復元される。

**5月11日11時31分。** 攻撃者がPRを再度クリーンな状態にforce-pushしたうえでPRを削除する。forkも一緒に消される。表面上は何も起きなかったPRが短く現れて消えただけのように見える。だがキャッシュ汚染はそのまま残る。

**5月11日19時15分44秒。** 約8時間後、TanStackメインテナーが正規のリリースをトリガーする。`release.yml`のワークフローID `25613093674`。このワークフローは`actions/cache@v5`で依存関係キャッシュを復元する。復元されたキャッシュには汚染パッケージが含まれており、そのパッケージのpostinstallスクリプトがビルドマシン上で実行される。

**5月11日19時20分39秒。** 第一バッチのpublish。ペイロードはGitHub Actions Runner.Workerプロセスのメモリを`/proc/<pid>/mem`経由でダンプし、そのメモリからOIDCトークンを抽出する。そのトークンでnpmのpublish APIを直接叩く。正規のワークフローstepの外で、しかし正規のOIDC資格証明で。

**5月11日19時26分14秒。** 第二のワークフロー実行`25691781302`で同じことが反復される。合計42パッケージ、84バージョンが公開される。

**5月11日19時50分頃。** 外部のセキュリティ研究者`ashishkurmi`(StepSecurity)が新しく公開されたバージョン群のフィンガープリントから侵害を識別する。TanStackチームが気づいた時点ではなく、外部から先に見つかった時点である。postmortemが最も率直に認めているのはここだ。自前のpublishモニタリングが存在せず、検知は外部に依存していた。

**5月11日20時 ～ 21時30分。** チームメンバー全員のpush権限の剥奪、npmセキュリティチームへのtarballサーバー側削除依頼、84バージョン全件のdeprecate、SNSでの公表、キャッシュのpurge、そしてrepository_ownerガードとSHAピンを盛り込んだhardening PRのマージ。この一連の対応は二時間以内に片付いた。

ここまでをまとめると絵柄がはっきりする。攻撃者はメインテナーのアカウントには指一本触れていない。npmトークンも盗んでいない。trusted publisherのOIDCバインディング、メインテナーのMFA、ワークフロー認証はすべて正常である。攻撃者がやったことはただ一つ、「別のワークフローがキャッシュを復元するまで8時間待った」だけだ。

## 本文2 — なぜ起きたのか:三つの正規デフォルトが連結した事故

この事件が単一バグに還元できないのは、三つの異なるGitHub Actionsの挙動が — それぞれは意図された挙動のままで — 直列に繋がったときにはじめてRCEが成立するからだ。三つの正規デフォルトを順に見る。

**デフォルト1。`pull_request_target`はforkのコードをbaseコンテキストで実行できる。** 4月29日の記事で整理した、まさにそのトリガーである。トリガー自体が悪というわけではない。ラベル自動付与や歓迎コメントのように、PR本体のコードを実行しない自動化には正当な用途がある。だが`bundle-size.yml`のように、PR HEADをチェックアウトしてビルドするワークフローがこのトリガーを使った瞬間 — TanStackの場合、senderの権限チェックなしに`actions/checkout`がPR HEADのSHAを引いて素直にビルドした — 外部の人間のコードがbaseコンテキストの権限とキャッシュスコープの中で動いてしまう。

**デフォルト2。GitHub Actionsキャッシュはリポジトリ単位で共有され、`pull_request_target`の実行がmainブランチのpushと同じスコープを使う。** Hacker Newsのコメントで`Ciantic`が引用したpostmortemの一文が一番正確だ。

> 「キャッシュスコープはリポジトリ単位で、`pull_request_target`の実行(こちらはbaseリポジトリのキャッシュスコープを使う)とmainへのpushがこれを共有する。baseリポジトリのキャッシュスコープで走るPRが、後にmainのプロダクションワークフローが復元することになるエントリを汚染しうる(Cache scope is per-repo, shared across pull_request_target runs which use the base repo's cache scope, and pushes to main. A PR running in the base repo's cache scope can poison entries that production workflows on main will later restore)」

この一文が事件のメカニズムのすべてである。そしてこの一文が衝撃的なのは、どこにも「バグ」と呼べるものがないことだ。キャッシュは設計通り動いた。ただ、その設計がサプライチェーンのシナリオでどう見えるかを十分に深く検討した者がいなかった、というだけだ。`arianvanp`がコメントで放った一文がこの重さを最もよく捉えている。

> 「我々はビルドシステムをhermeticにしようとあれだけ努力していながら、最終的には呼び出し側がキーを決める可変なグローバルキャッシュをブランチ間で共有しているだけだ。なぜなのか。業界全体の失敗だ。本気で正気を疑う(Why do we do all these efforts making our build systems hermetic and we end up just using a global mutable cache across branches where the caller picks the key? Failure of industry as a whole. Actually insane)」

**デフォルト3。OIDCトークンはワークフローstepの環境変数ではなく、Runnerプロセスメモリの中に生きている。** trusted publisherが約束したセキュリティモデルは「長寿トークンをメインテナーのマシンに置かない」ことだ。その約束は守られた。だがpublishが起きるためには、結局のところshort-livedトークンがどこかに一度は存在しなければならない。GitHub Actionsの場合、そのトークンはRunner.Workerプロセスのメモリに置かれており、同じマシンで動くすべてのコードが — つまり`npm install`が走らせる任意のpostinstallスクリプトが — `/proc/<pid>/mem`を通じて読める。この正確なメモリダンプスクリプトは新しく発明されたものではない。postmortemはその点を冷静に指摘する。

> 「攻撃者は新しい技法を発明していない。彼らは既に公開されている研究を再構成しただけだ(The attacker did not invent novel tradecraft; they recombined published research)」

この「既に公開されている研究」の出所が、まさに2025年3月のtj-actions/changed-files侵害である。13か月前に公開されたメモリダンプスクリプトがほぼそのまま再利用された。

三つのデフォルトを足し合わせるとこうなる。forkのコード → baseコンテキストで実行 → キャッシュ汚染 → 8時間後にreleaseワークフローがキャッシュ復元 → postinstallがOIDCトークンをメモリから抽出 → npm publish。このチェーンのどれか一段でも切れていれば事故は起きなかった。だが切る責任の所在が曖昧であることが問題の本質だ。`bundle-size.yml`を書いたメインテナーなのか、`pull_request_target`のデフォルト挙動を決めたGitHubなのか、キャッシュスコープモデルを設計したGitHubなのか、postinstall実行をデフォルトに据えたnpm/pnpmなのか、OIDCトークンをRunnerメモリに置く方式そのものなのか。

Hacker Newsで真っ先に浮上したコメントは、この責任の分散を真正面から指摘する。`padjo`の整理が一番すっきりしている。

> 「まとめるとこうだ。(1) forkからのrandomersのPRに、書き込み可能なグローバル共有キャッシュが提供される。(2) そのキャッシュがdeployパイプラインで再利用される。(3) deployはCIサーバーに保管された単一の認証要素だけで成立する。(4) リポジトリは悪性deployを自前で点検せず、コードが世に出た後に第三者へ依存する。(5) パッケージマネージャはデフォルトでパッケージ更新時に任意コードを走らせる。我々は一体どんな世界に生きているのか(What a world we live in)」

別のコメントで`chrisweekly`はもっと刺激的な診断を出す。

> 「postinstallスクリプトは致命的だ。皆pnpmを使うべきだ。そして、forkにpushされた『orphan』コミットが(npmクライアント側で)こんなことを引き起こせるというのも狂気だ。私の意見ではGitHubの責任が大きい。悪性forkのコミットが、正規リポジトリと区別のつかないURIでGitHubの共有オブジェクトストレージから到達可能になっている。本気で頭がおかしい(A malicious fork's commits are reachable via GitHub's shared object storage at a URI indistinguishable from the legit repo. That is absolutely bonkers)」

ここで一点付け加えておきたい。今回の事件の発端となったforkのコミットは、fork自体が削除された後でもGitHubのオブジェクトストレージにそのまま生きている可能性がある。forkネットワーク内で一度pushされたオブジェクトは、同じネットワークのどのリポジトリからもSHAを知っていればアクセス可能だ。これはGitHubがディスク使用量を抑えるために採用した合理的な設計だが、攻撃者が消えた後も攻撃の痕跡と悪性コードがGitHubのインフラ内に永続するという副作用を生む。

そしてより根本的な視座もある。`jonchurch_`はtrusted publisherそのものに対して断定的な評価を下す。

> 「これは(私の意見では)Trusted Publishingがそれ単体ではCIから安全にpublishするには十分でないことの証拠だ。CIパイプライン内の攻撃者やリポジトリadminの資格情報を盗んだ者は、容易にpublishできる。新しい情報ではない。TPはこれを防ぐために作られたものではない。だが、ローカルpublish + 2FAモデルからTPへ移ることは、CI侵害を経由したこの種の攻撃を新たに導入する。(...) 私が欲しいのは、GitHubの信頼モデルの内側だけでpublishが完結しないことだ。誰かがnpm側で2FAを使ってartifactを『published』状態へpromoteしなければならない、段階化された(staged) publishモデルが要る(What I want is staged publishing, so someone must go and use 2fa to promote an artifact to published on the npm side)」

この最後の一文が、今回の事件の最も重要な政策的含意である。CIにおけるshort-lived OIDCがメインテナーのマシン上の長寿トークンより安全であることは事実だが、それは「長寿トークン露出」という一つの脅威を潰すだけで、「publishの第二の人間検証」を代替するものではない。我々はtrusted publisherへ移ることで、ちょうどその第二の人間検証を失った。

## 本文3 — 意味と展望:サプライチェーンセキュリティの第二段階へ

この一年のnpmサプライチェーン事件群を一行で整理するとこうなる。2025年3月のtj-actions/changed-filesはPAT(個人アクセストークン)露出 → secretsスクレイピングのパターンだった。2025年8月のnx/s1ngularityはnpmメインテナートークン窃取 → 直接publishのパターンだった。そして2026年5月のTanStackはtrusted publisher OIDCが正常作動する最中に、メモリダンプ + キャッシュ汚染でpublish権限が吸い出されたパターンだ。

この進化曲線が意味するのは、この一年に我々が提示してきたあらゆる「サプライチェーンセキュリティ推奨事項」が一段ずつ追い抜かれてきたということである。PATを減らせ → 減らしたらメインテナートークンが盗まれた。MFAを強制しろ → 強制したらトークン自体を回避するOIDCトラックに移った。trusted publisherへ移れ → 移ったらOIDCトークンがRunnerメモリから抜かれた。

この時点で、ユーザー側 — メインテナーでもnpmセキュリティチームでもGitHubでもなく、ただそのパッケージをinstallして使うだけの人 — に何ができるのか。postmortemとHNコメント欄で挙げられた候補を整理するとこうなる。

第一に、**postinstallを切ること**。`npm install --ignore-scripts`や`.npmrc`に`ignore-scripts=true`を書く、最も単純な防御である。この一行は今回事件のdetonationステップ — pnpmキャッシュに含まれていたパッケージのpostinstallがビルドマシン上で走るステップ — そのものを止めただろう。欠点は一部の正規パッケージ(例えばネイティブモジュールをビルドするパッケージ)が動かなくなること。しかし本番環境ではほとんどの場合事前ビルドのバイナリで足り、postinstallは実質dev環境の便宜にすぎない。

第二に、**lockfile auditとtimingベースの検証**。TanStack事件のすべての悪性バージョンは正規バージョンの直後6分以内に公開された。CIに「パッケージの新バージョンが公開されてからN時間経過しているか」を確認するステップ — `npm-locked-resolve`や`socket.dev`、`snyk`が提供する — を入れれば、事故発生からdeprecateまでの猶予を稼げる。完全な防御ではないが、6分の事故を6時間に遅らせる。

第三に、**バージョンピンとSHAピンの分離**。npmパッケージはバージョン文字列でしかピンできず、SHAでピンすることはできない。したがって同じバージョン番号の下でtarballが差し替わる事故は — 今回のような事故は — npm側でunpublishされない限りピンでは防げない。だが`package-lock.json`の`integrity`ハッシュは捕まえる。lockfileをコミットし、CIで`npm ci`を使い、lockfileハッシュ変更をreviewすることは、少なくとも「すでにinstall済みの環境」が自動アップグレードされることを防ぐ。

第四に、**JSRやDenoのような代替レジストリの検討**。`ezekg`が引いたnpmの公式ポリシー — 「dependentがあるとunpublishできないのでdeprecateを推奨する」 — が示す通り、npmは事故発生後のtakedownそのものが構造的に遅い。JSRはpublish時に自動コード解析とattestationを要求し、Denoはデフォルトで権限モデルを強制してpostinstallのような任意実行を遮断する。短期間にnpmエコシステム全体を移すことはできないが、新規プロジェクトやライブラリ単位では検討に値する選択肢である。

第五に — そして最も難しい — **publishの第二の人間検証**。`jonchurch_`が提案するstaged publishモデルだ。CIはartifactをnpm stagingに上げることまでしかできず、productionへpromoteするにはnpm側の別途2FAが必要、という構造。これはnpmレジストリ自体の変更を要する話で、GitHubとnpm双方の合意が要る。だが、trusted publisher OIDCが単一の認証要素であるという診断が受け入れられるなら、この方向は最終的に避けられない。

ここに一つ、ユーザー側では直接できないがメインテナー側ならできることを足しておく。`bundle-size.yml`がやっていたこと — fork PRコードをsecrets/キャッシュコンテキストで実行 — を、4月29日の記事で整理した`pull_request` + `workflow_run`パターンへ分離することだ。このパターンを適用していただけでも、キャッシュ汚染ステップは止まっていただろう。

## 結論 — TrustedではなくStagedへ

導入で投げかけた問いに戻ろう。我々がこの一年「サプライチェーンセキュリティの正解」と呼んできたもの — trusted publisher、OIDC、メインテナーMFA — は、何を防ぎ、何を防げなかったのか。

答えは明確だ。それらは「メインテナーのマシンに長寿のnpmトークンが露出して丸ごと盗まれる事故」を防いだ。それはnx/s1ngularityのような事件が再発する確率を下げた。だが、それらは「publish権限そのものがCIマシン上に移ったことで、そのマシンの任意コード実行がそのままpublish権限になる事故」は防がない。むしろそれを新しい正規の攻撃面に仕立て上げる。

この非対称は単なる道具の限界ではなく、信頼の置き場所を間違えて移したことの帰結である。メインテナーのマシンからCIマシンへ信頼を移す際、我々は「そのマシンで実行されるすべてのコードが一時資格証明を正当に使ってよい」ということに暗黙のうちに合意した。だが、npmパッケージのinstallという行為そのものが「任意コード実行」であるエコシステムにおいて、その合意はあまりにも緩い。

したがって次の段階はtrustedではなくstagedである。CIはpublishを開始することはできるが、完了することはできない。誰かがnpm側の別チャネル — 携帯のpushでもハードウェアキーでも — で「このバージョンを本当にpublished状態へpromoteしますか」にyesを押さなければならない。この段階が6分を6時間に遅らせるだけでも、外部のセキュリティ研究者がフィンガープリントを掴む時間が十分に生まれる。TanStack事件で発見までに要した時間がちょうど30分だったという事実は、この30分のゲートがどれほど大きな差を生むかを逆説的に示している。

最後に一つ。4月29日の記事で指摘した「GitHubの18年分の請求書が一週間で届いた」という診断は、今回の事件で更新を受ける。今回はGitHubだけの請求書ではない。npmの請求書でもあり、我々全員が「メインテナーのマシンを信頼するモデル」から「CIを信頼するモデル」へ移行する過程で先送りしてきたセキュリティ仮定の請求書でもある。TanStackメインテナーがわずか二時間で84バージョンをdeprecateし、キャッシュをクリアし、hardening PRをマージしたあの素早い対応は称賛に値する。だが、その素早い対応が必要だった理由そのものが、我々が選んだ信頼モデルが事故を6分で起こしうるモデルだという点は、忘れてはならない。

次の事件はもうどこかでcommitされている。ただforce-pushを待っているだけだ。

---

出典:

- TanStack, "Postmortem: TanStack NPM supply-chain compromise," 2026-05-14. https://tanstack.com/blog/npm-supply-chain-compromise-postmortem
- Hacker News discussion, item 48100706, 2026-05-13. https://news.ycombinator.com/item?id=48100706
- TanStack/router issue #7383 — インシデントトラッキング. https://github.com/TanStack/router/issues/7383
- 本ブログ「GitHub神話の6日間 — ガバナンス・稼働率・セキュリティ・コストが同時に崩れた一週間」2026-04-29. https://crowdy.github.io/tkim-blog/ja/2026/04/29/github-cracking-week
