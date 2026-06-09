---
title: "Apple、Siri の頭脳を Google Gemini に委ねる — Apple Intelligence の 1 年、自社モデル戦略の降伏か"
description: "WWDC 2026 で Apple は新しい Siri を Google と共同開発した Foundation Models の上に載せた。1 年前に 'Apple Intelligence' という名で自社モデルを約束した会社の、最大の戦略転換である。"
pubDate: 2026-06-09T00:00:00.000Z
lang: ja
pairSlug: apple-siri-gemini-pivot
draft: false
---

# Apple、Siri の頭脳を Google Gemini に委ねる — Apple Intelligence の 1 年、自社モデル戦略の降伏か

> Apple Silicon の会社が Google の Gemini の上に自社の音声アシスタントを載せ直した。これは自社モデル戦略の降伏か、それともモデルをコモディティとして扱うという新しい戦略の始まりか。

## 導入 — WWDC 2026 の発表が意味する 1 年

2026 年 6 月 8 日 (現地時間)、Apple は WWDC 2026 のキーノートで Siri と Apple Intelligence の新しいアーキテクチャを公開した。要点は一文に集約できる。Siri の頭脳は今後、Apple が Google と 「共同開発した (co-developed)」 Foundation Models の上で動き、そのモデル群には Google Gemini のクラウド派生が含まれる。Apple の発表文は慎重な言葉で埋められている。モデルは 「on-device と server の両方で動作」 し、サーバー処理は Private Cloud Compute インフラを経由し、ユーザーデータは Apple にも第三者にもアクセスできないと明記されている。だが核心の事実はその慎重な語彙の下にはっきりと書かれている。Apple の音声アシスタントが、登場から 39 年目にして外部企業のモデルの上で動くことになった、という事実だ。

この一文が生む波紋は単なる製品発表を超える。ちょうど 1 年前、Apple は WWDC 2025 で 「Apple Intelligence」 という名のもとに自社 LLM 戦略を野心的に公開した。on-device の小さなモデルと Private Cloud Compute の大きなモデル、二層をすべて Apple が自社開発するという絵だった。その絵から 1 年で最も重い一マス — フロンティア級のクラウドモデル — が Google の Gemini に置き換わった。これは降伏か、戦略転換か、あるいは両方か。Hacker News で 326 件のコメントがこの発表をめぐって論争したのは偶然ではない。

## 発表の構造 — 五つのモデルと一つのオーケストレータ

Apple が公開した新しいアーキテクチャは五つのモデルを五つの状況に分散する。Hacker News のユーザー bensyverson が詳しく整理したところによれば、その五つは (1) on-device の Apple Foundation Model Core、(2) on-device の Apple Foundation Model Core Advanced、(3) サーバーの Apple Foundation Model Server 派生 二つ、(4) フロンティア級作業のための Cloud Pro 派生である。最も重要な事実は、このうち Cloud Pro 派生が 「Gemini フロンティア級の wrapped モデル」 であるという点だ。つまり Apple が Google の Gemini Pro を Apple の Private Cloud Compute インフラの上で包んで動かす、という意味だ。残りの四つ — on-device 二つ、server 二つ — も Apple の表現では 「Google Gemini を用いて refined」 されたと明かされた。すなわち五つのモデルすべてが、Google の重みあるいは distillation の痕跡を抱えていることになる。

これらのモデルを束ねる新しい抽象が 「system orchestrator」 である。Apple の表現によれば、このオーケストレータは 「Apple Intelligence の中心に位置し、現在アクティブなアプリと利用者の作業を認識しつつ、機能を安全に調整する」 。どのアルゴリズムでモデルを選ぶかは公開されていない。だが発表の語彙から二つのパターンが読み取れる。第一に、軽いクエリは on-device モデルで処理され、重い推論は Private Cloud Compute へ流れ、フロンティア級の作業は Cloud Pro (Gemini) へルーティングされる。第二に、ルーティング判断自体は Apple Silicon の上で起き、ユーザーデータの一部のみが適切に切り出されてクラウドへ流れる、という絵だ。

Private Cloud Compute の信頼チェーンに関する分析は、HN ユーザー nl のコメントが最も正確だ。「Apple の PCC は Apple が署名した root key を使う。だから Apple と該当する司法管轄の両方を信頼する必要がある。Gemini Cloud Pro 派生は Google のクラウドで Nvidia GPU の上で動く。結局、信頼チェーンに複数の当事者が絡むことになる」 。この多層の信頼チェーンは、Apple の既存 PCC モデル (Apple のみを信頼すれば足りる) から一歩後退している。利用者が Apple に委ねた信頼が、Google と Nvidia という二つの追加当事者へ分散したからだ。

WWDC と同じ日に Apple は Apple Core AI Framework という新しい開発者 API も公開した。これは Apple Foundation Models の一部を開発者に開放し、サードパーティアプリが同じモデルの上に自身の機能を組めるようにするものだ。開発者の歓迎は明確だが、五つのモデルのうちどこまでがこの API の表面に露出するのか、Cloud Pro の Gemini 呼び出しが開発者のコスト負担にどう転嫁されるのかといった問いは、まだ答えがない。

## 自社モデル戦略はなぜ 1 年で曲がったか

Apple の自社フロンティアモデルの試みが結局外注へ向かった理由について、最も鋭い分析は HN ユーザー bensyverson の一行に込められている。「Apple はモデルをコモディティとして扱うことを選んだ」 。この一行が含意するのは単なる降伏ではない。Apple の歴史を思い出せば、同じパターンが繰り返されたことがある。iPhone のディスプレイは長く Samsung が作っていた。iPhone のメモリは Hynix と Micron が作っていた。Apple は時間をかけてそれらを段階的に内製化していった。HN ユーザー Danox の整理がこのパターンを呼び起こす。「Apple は通常、外部依存を時間をかけて置き換えていく。Samsung の画面のように。Gemini も Apple Silicon GPU が自社フロンティアモデル相当の性能を安定して出せるようになるまでの一時的な手段である可能性がある」 。

ただし、この見方をそのまま受け入れるのは難しい。ディスプレイと LLM の間には本質的な違いがある。ディスプレイは一度内製化すれば、その後はより大きなパネル、より高い PPI を自分のペースで改善していけばよい。LLM は違う。フロンティアモデルは 18 か月ごとに一世代ずつ入れ替わり、その変化の速度は 1.7 trillion パラメータのモデルを学習する GPU クラスタの規模に直結する。Apple が自社 GPU クラスタで OpenAI · Anthropic · Google の学習インフラに追いつくまでの時間は、ディスプレイの事例よりもはるかに長いか、あるいは永遠に追いつけない可能性もある。その可能性を真剣に見た会社がコモディティ戦略を選んだのだ。Samsung Galaxy シリーズが Gemini を採用したあと、Apple が同じ Google のモデルの上で自分のアシスタントを動かすに至ったことは、市場の片端までコモディティ化が進んだという信号である。

自社モデルを諦めた第二の理由はコストだ。OpenAI がフロンティアモデルの学習に四半期 50 億ドルを使っているという報告が 2025 年末に伝わった。Anthropic の Claude 4 の学習費用は非公開だが、同等の規模と推測される。Apple の R&D 予算は巨大だが、フロンティアモデルだけのために四半期 50 億ドルを支出することは、他の R&D 優先順位 (Apple Silicon 次世代、AR ヘッドセット、自動車の残存プロジェクト) との資源競争を生む。Tim Cook の立場から見れば、Gemini のライセンス費用は自社学習の四半期 50 億ドルよりも小さい可能性が高い。コストの非対称がコモディティ戦略を正当化する。

第三の理由は時間である。Apple Intelligence の発表後 1 年間、Siri の新機能の大半は遅延した。Bloomberg が 2025 年秋に報じた Apple 社内の葛藤 — Apple Foundation Model チームが外部の OpenAI · Anthropic モデルを使ったデモを作って役員に見せたところ、結果の差があまりに大きかったという報告 — は、今回の戦略転換の直接的な背景に近い。Apple は自社モデルを動かし続けて利用者体験で四半期ごとに後れを取り続けるか、外部モデルの上に乗って即座に追いつくか、という二択しか残されていなかった。1 年で後者を選んだことが、この発表の要約である。

最後に、EU の Digital Markets Act との関係も無視できない。HN ユーザー sterlind のコメントがこの筋を指摘している。「Apple は DMA がサードパーティアプリにも Siri と同じ iOS 権限を与えるよう求めると見ている。これが本当にセキュリティ懸念を生むと主張する」 。DMA が強制する開放性は、Apple が Siri の権限モデルを最初から設計し直す圧力を生み、設計し直すならいっそ Google のフロンティアモデルの上に載せた方が時間コスト面で合理的、という計算が働いた可能性がある。

## 産業含意 — Apple-Google 時代の三つの変曲点

この発表が始動させた新時代には三つの変曲点が続く。

**第一に、モデルコモディティ化の加速。** Apple の判断は、フロンティアモデル自体がもはやコモディティであるという命題を、最も強く証明した出来事である。Samsung Galaxy シリーズが Gemini を載せた時点で事実上始まっていた流れだが、Apple の合流はその流れが臨界点を越えたという信号だ。今やフロンティアモデルそれ自体では差別化が困難だ。差別化は (a) モデルをどうルーティングするか (Apple の system orchestrator)、(b) どの信頼チェーンの上に載せるか (Apple の PCC)、(c) どのハードウェアと結合するか (Apple Silicon) の三層で起きる。モデルはコモディティ、その上の統合は差別化 — これが新しいパラダイムだ。

**第二に、Google の B2B 価格交渉力の強化。** Apple が Gemini Pro を採用したという事実は、Google が LLM の B2B 市場の価格交渉で OpenAI と Anthropic より一段上に立てるようにする。Samsung に続いて Apple、つまりモバイル市場の二大プレーヤーが揃って Gemini を載せた。これは Google の Gemini 価格を事実上の業界標準のアンカーにする。OpenAI は Microsoft のクラウドに紐づき、Anthropic は AWS Bedrock に紐づく。Google だけが自社クラウド、自社モデル、自社モバイル OS (Android)、そして今や Apple iOS のフロンティア推論まで一手に握る。

**第三に、自社モデル企業の戦略再編。** Apple のコモディティ戦略は、他の自社モデル企業 — Meta の Llama、Mistral、Cohere — に二つの信号を送る。一つは、フロンティアモデルで直接競争せず、open weights のツール化 (すなわち Hugging Face · Together AI のようなインフラ企業のポジション) へ向きを変えるべきという信号だ。もう一つは、フロンティアモデルを非公開で運用するにしても、それを利用者に直接露出する製品 (Llama-powered Meta AI) として包んで、モデル自体よりも利用者体験で差別化すべきという信号だ。xAI が同じ日に発表したデータセンター REIT 戦略 (外部分析 martinalderson.com の表現で 「xAI はフロンティアラボというよりデータセンター REIT に見える」) も、同じ産業の流れの一部だ。

## 結論 — 降伏か、新しい戦略か

WWDC 2026 の発表は、Apple Intelligence という名の自社モデル戦略の降伏なのか、それともコモディティ戦略の始まりなのか。両方の答えが部分的に正しい。Apple の 1 年前の約束 — 「Apple のフロンティアモデルの上で Siri が動く」 — は 1 年で破られた。その意味で降伏だ。だが Apple はそのモデルを単純に OpenAI · Anthropic · Google のうちの一つで置き換えなかった。五つのモデル、一つの system orchestrator、二段の信頼チェーン (Apple + Google) という精緻なアーキテクチャを作り、その中で Gemini を一マスとして扱った。その意味では新しい戦略の始まりだ。

本当の問いはその次だ。Apple の次の発表 — 2027 年 6 月、あるいは 2028 年 6 月の WWDC — で、Cloud Pro 派生はなお Gemini であるのか、それとも Apple の自社フロンティアモデルに差し替えられているのか。Danox の整理どおり Apple の外部依存が一時的だったなら、次の発表で Apple Foundation Model Pro の新しい派生が Gemini を置き換える。bensyverson の整理どおり Apple がモデルをコモディティとして扱うと本当に腹を決めたなら、その日の発表は Gemini Pro が Anthropic の Claude あるいは OpenAI の GPT-5 に差し替えられている姿だろう。いずれにせよ、Siri の脳が誰のモデルかは利用者の側からは次第に見えなくなる。それがコモディティ化の本当の意味である。

---
出典:
- https://www.macrumors.com/2026/06/08/apple-reveals-new-ai-architecture/
- https://news.ycombinator.com/item?id=48450142
- https://news.ycombinator.com/item?id=48449084
- https://martinalderson.com/posts/xais-new-rental-business/
