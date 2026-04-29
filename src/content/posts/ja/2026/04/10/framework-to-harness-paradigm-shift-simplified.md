---
title: 'フレームワークからharnessへ — AIコーディングが「決定論」を再発見する'
description: '「同じ週にトレンド入りした五つのリポジトリが、自らを説明する言葉を変えていた。frameworkではなくharness、hooks、HUD。この言葉の移動が指し示す先はどこか。」'
pubDate: 2026-04-10T03:56:14.713Z
lang: ja
pairSlug: 'framework-to-harness-paradigm-shift-simplified'
draft: false
---
# フレームワークからharnessへ — AIコーディングが「決定論」を再発見する

> 「同じ週にトレンド入りした五つのリポジトリが、自らを説明する言葉を変えていた。frameworkではなくharness、hooks、HUD。この言葉の移動が指し示す先はどこか。」

---

2026年4月第2週、GitHub Trendingのデイリーおよびウィークリーチャートを眺めると、目に留まるものがある。AIコーディングツールのカテゴリで上位を占めるリポジトリが自らを説明する言葉だ。[Archon](https://github.com/coleam00/Archon)は14,411スターにデイリー+185を記録し、こう書いている——*"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* [hermes-agent](https://github.com/NousResearch/hermes-agent)はウィークリー+19,765でその週最大の上昇リポジトリであり、サブタイトルは*"The agent that grows with you"*だ。[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)はウィークリー+9,737で2位の上昇リポジトリであり、説明には*"Your codex is not alone. Add hooks, agent teams, HUDs"*とある。

三つのリポジトリの技術スタックは異なる。ArchonはTypeScript、hermes-agentはPython、oh-my-codexもTypeScriptだ。作者も違う。互いを参照した形跡もない。にもかかわらず、この三つのリポジトリが使用する言葉の軌跡は驚くほど一致している。Archonは自らを**harness builder**と呼ぶ。hermes-agentの*"grows with you"*は、エージェントがユーザーの外側から包み込みながら寄り添う関係を含意する。oh-my-codexの三つの言葉——**hooks**、**teams**、**HUDs**——はそれぞれ「既存のフローに差し込むもの」「水平的な協働単位」「コックピットで現在の状態を表示する計器盤」を意味する。この三語のいずれもframeworkの語彙ではない。Override、pipeline、orchestrator——これが2023〜2025年のAIエージェントフレームワークが使っていた言葉だった。hooks、teams、HUDsは別の世界から来た言葉である。既存のシステムを変えずに、その上に被せる世界。

本稿はこの言葉の移動を追跡する。「frameworkからharnessへ」という語彙的転換が、プロダクトマーケティングの流行ではなく、AIコーディングツールのエコシステムが2年間のフレームワーク時代から学んだ構造的教訓を反映しているというのが核心的論旨である。そしてこの転換の中心には一つの言葉がある——**決定論（determinism）**。

---

## 1. Archonの宣言とフレームワーク疲れの背景

[Archon](https://github.com/coleam00/Archon)のREADME冒頭が本稿の出発点である。*"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* 一文目はポジショニング、二文目はバリュープロポジションだ。

Archonが自らをharness builderと呼ぶのは意識的な選択である。2024年であれば、同じ機能を持つツールが「AI coding framework」や「agent orchestration platform」と名乗っていたはずだ。実際にLangChainは「framework for developing applications powered by large language models」と謳い、CrewAIは「framework for orchestrating role-playing, autonomous AI agents」と謳っていた。Frameworkという言葉は2023〜2025年のAIエージェントツールにおける事実上の標準的自己紹介であった。

Archonが"the first"を主張するのは、このカテゴリ自体が新しいという認識を前提としている。AI coding frameworkはすでに数十個存在する。AI coding harness builderは——Archonの自己認識によれば——まだ存在しなかった。カテゴリを新たに創出するという宣言である。14,411スターとデイリー+185という数字は、このメッセージにコミュニティが反応していることを示している。

二文目の*"Make AI coding deterministic and repeatable"*は、フレームワークの言語ではない。フレームワークのバリュープロポジションは通常「簡単に（easy）」「速く（fast）」「強力に（powerful）」といった言葉で表現される。決定論的で反復可能という表現は、ソフトウェアテスティングと品質保証の伝統に由来する。テストが決定論的であるべきだとは、同一の入力に同一の出力が得られなければならないという意味だ。テストが反復可能であるべきだとは、誰がどこで何度実行しても同一の結果が得られなければならないという意味だ。ArchonがAIコーディングにこの二つの属性を付与すると宣言するのは、LLMの確率的性格という本質的問題をツール層で制御するという意志の表明にほかならない。フレームワークが「より多くのことを可能にする」と約束したなら、harnessは「同じことを確実に行えるようにする」と約束する。拡張（expansion）対 収束（convergence）。これが言葉の違いの背後にある設計哲学の違いである。

この選択の背景には、2年間のフレームワーク疲れがある。2023年に[LangChain](https://github.com/langchain-ai/langchain)が登場した際、開発者コミュニティの反応は熱狂的だった。続いて[AutoGen](https://github.com/microsoft/autogen)、[CrewAI](https://github.com/crewAIInc/crewAI)、[LangGraph](https://github.com/langchain-ai/langgraph)などが追随した。共通パターンは、ユーザーの作業をフレームワークが定義した構造の中に収めること——"inversion of control"であった。

問題は、標準から外れた瞬間に始まった。エージェントが複雑化し、ツール呼び出しがネストし、プロダクション環境の要件（ロギング、モニタリング、コスト制御、タイムアウト）が加わり始めると、フレームワークの抽象化が障壁と化した。LangChainのChain内部で非同期エラーを捕捉するには、LangChainの内部実装を理解する必要があった。抽象化が助けるのではなく、阻むものに変わったのだ。「LangChain is not needed」「Why I stopped using LangChain」「The case against AI frameworks」といった記事が2024年を通じて投稿され続けた。批判の核心は一貫していた——**フレームワークが解決してくれる問題より、フレームワーク自体が生み出す問題の方が大きい**。抽象化のレイヤーが多すぎてデバッグが困難であり、フレームワークが隠蔽するもの（LLM API呼び出しの詳細、プロンプトの実際の内容、トークン使用量）を見たいのに見ることができない。

このフレームワーク疲れの頂点は、2025年半ばにAnthropicがClaude Agent SDKを発表した際に顕在化した。SDKのエージェント定義は意図的にミニマルであった——**model + tools + context management**。オーケストレーションも、ワークフローも、ステートマシンもなかった。「我々が提供するのは最小限のビルディングブロックだ。それをどう組み立てるかはあなたが決める。」フレームワークがすでに豊富な構造を提供すれば、外部の層が入り込む余地がない。一方、SDKが最小限のみ提供すれば、その上に決定論的実行、反復可能なワークフロー、品質ゲートといったものを載せる空間が開かれる。比喩で言えば、Claude Agent SDKは馬（モデル）と基本的な手綱（ツールアクセス）を提供し、馬具（harness）はコミュニティが作るよう委ねたのだ。Archonはまさにこの空間から生まれた。

---

## 2. Harness vs Framework — ソフトウェア工学史の文脈と馬具の比喩

Archonが選んだ"harness"という言葉は、AIコーディングにおいては新しいが、ソフトウェア工学においては数十年の歴史を持つ用語である。

ソフトウェアテスティングにおける"test harness"とは、テストを実行するためのインフラを指す。JUnitのrunner、pytestのfixture system、SeleniumのWebDriver。Test harnessが行うことは三つだ——環境準備（setup）、実行と結果収集（execution + collection）、後片付け（teardown）。Harnessはテストのロジックに介入しない。テストが正しい条件で実行されることを保証するだけだ。Frameworkはテストの構造を決定する。Harnessはテストの実行のみを管理する。Frameworkが「中に入って来い」なら、harnessは「外から包む」である。

Test harnessの最も重要な属性は**非侵入的（non-invasive）**であるということだ。Harnessを交換してもテストコードは変わらない。これをAIコーディングツールに当てはめると、意味が鮮明になる。LangChainのChain内部で書いたエージェントロジックは、LangChainの外ではそのまま使えない。CrewAIのCrew-Task構造で設計したワークフローは、CrewAIなしでは動作しない。Archonがharnessを標榜するのは、この結合を回避するという宣言である。

本ブログの前回のエッセイ[「モデルがすべてではなかった」](coding-agent-harness-anatomy.md)で、Sebastian RaschkaのAgent Harnessの概念を取り上げた。Raschkaの論考が学術的分析であったなら、Archonはその分析をプロダクトに転換したものだ。学術的概念がプロダクトカテゴリへ転換された瞬間であり、その転換がGitHub Trending上位に浮上したということは、コミュニティがこの転換を認めた証左にほかならない。

**歴史的類比：EJBからSpringへ**

この転換の最も示唆に富む先例は、1990年代後半の**EJBからSpringへの転換**である。Enterprise JavaBeans（EJB）の約束は野心的だった——分散トランザクション、リモート呼び出し、セキュリティ、並行性管理をフレームワークが引き受ける。その代償は侵入的な結合だった。簡単な計算ロジックひとつをEJBで実装するには、最低四つのファイルが必要であり、ビジネスロジック10行に対してボイラープレートが100行求められた。EJBはアプリケーションサーバー内でのみ実行されたため、ユニットテストは事実上不可能だった。2024年のLangChainの状況と正確にオーバーラップする。

2002年、Rod JohnsonがSpringを提示し、掲げた核心的哲学は**POJO（Plain Old Java Object）を尊重せよ**であった。Springは開発者のコードを変えなかった。Dependency Injectionでオブジェクト間の依存関係を外部から注入しつつ、オブジェクト自体は自分がSpringの中で動いているかどうかすら知る必要がなかった。非侵入的な包み込み。Harnessの定義そのものである。EJBは敗れ、harness（の精神）が勝った。

**馬具（horse harness）の原義**

harnessという英単語の最も古い意味は「馬具」だ。馬の体に装着し、馬の力を馬車や鋤に伝達する装置である。この比喩は驚くほど的確だ。馬具は馬の能力を変えない——LLMの推論能力を変えないが方向を制御するagent harnessと同じだ。馬がいなければただの革と金具にすぎない——モデルなしでは作動しないharnessと同じだ。交換可能である——同じモデルに異なるharness設定を適用すれば、異なる種類の作業を遂行する。そして最も重要なのは、**決定論を付与する**という点だ——馬具のない馬はどこへ跳ぶか分からないが、馬具があれば力は予測可能な方向に伝達される。

GPT-5、Claude Opus 4.6、Gemini 3.1といったフロンティアモデルがすでに強力な推論能力を備えた時代において、必要なのはより強い馬ではなく、より優れた馬具である。

---

## 3. hermes-agentとoh-my-codex — 同じパラダイム、異なる語彙

Archonがharnessという言葉を明示的に使った唯一のリポジトリだとすれば、hermes-agentとoh-my-codexは同じパラダイムを異なる語彙で表現している。

[hermes-agent](https://github.com/NousResearch/hermes-agent)のサブタイトル*"The agent that grows with you"*における核心は**"with you"**だ。フレームワークの関係性は「中に入って来い」である——ユーザーがフレームワークの構造に合わせる。"grows with you"は逆方向だ。ユーザーがいる場所にエージェントが来る。ユーザーのワークフローが変われば、エージェントもそれに合わせる。エージェントがユーザーを外側から包む関係——フレームワークではなくharnessの関係だ。44,309スター、ウィークリー+19,765という数字は、このメッセージがコミュニティに反響を呼んでいることを示している。

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)の三つの言葉はより具体的だ。**Hooks**——既存システムの実行フローにユーザー定義のコードを差し込むエントリポイントである。Git hooks、React hooksと同じパターンだ。Overrideは既存の振る舞いを置換するが、hookは既存の振る舞いを維持したまま追加の振る舞いを差し込む。非破壊的（non-destructive）な拡張だ。**Teams**——フレームワーク時代の"orchestration"が、中央の指揮者が各agentを統制するヒエラルキー型モデルだったのに対し、teamは各メンバーが自律性を持ちながら協働するフラット型モデルだ。**HUDs**——戦闘機パイロットのHeads-Up Displayのように、現実を遮ることなく情報をリアルタイムで重ねて表示する。フレームワークのdashboardが内部状態をフレームワークの用語で表示するのに対し、HUDはユーザーの視野の上に情報を載せる。

三つの言葉を総合すると、oh-my-codexの設計哲学が浮かび上がる。既存ツール（Codex CLI）を変えない。外側からエントリポイント（hooks）を設け、水平的な協働構造（teams）を載せ、リアルタイムの状態表示（HUDs）を被せる。これはharnessである。19,938スター、ウィークリー+9,737の上昇が、このアプローチに対するコミュニティの反応だ。

同じウィークリートレンドで、[obra/superpowers](https://github.com/obra/superpowers)（143,000スター）は"skills framework & software development methodology"として、[onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)（26,000スター、ウィークリー+5,556）は"works with every LLM"として自らを紹介している。いずれも、既存のツールやモデルを変えずに外側から包むという方向を共有している。

---

## 4. なぜ今、決定論が焦点となったのか — Agentic失敗の教訓

Archonの*"Make AI coding deterministic and repeatable"*が2024年ではなく2026年に現れた理由がある。2024年の関心事は「AIはどこまでできるのか」だった。2026年に決定論が焦点となったのは、その間の2年間にagenticな失敗経験が蓄積されたからである。

**非決定論的ワークフローのデバッグ不能性。** プロダクションに投入したチームが最初にぶつかった問題は、同一の入力に異なる結果が返ってくるということだった。モデルのtemperature、プロンプトの微細な変化、コンテキストウィンドウの内容物、ツール呼び出しの順序——これらすべてが確率的に変動するため、一度成功したワークフローが次回には失敗し得る。そしてなぜ失敗したのかが分からない。フレームワークが中間状態を抽象化してしまっていたからだ。従来のソフトウェアにおいてデバッグが可能な理由は決定論にある。同一の入力に同一の出力が保証されれば、入力を変えながら問題を絞り込むことができる。AIエージェントにおいてこの保証がなければ、デバッグは「もう一度動かしてみたら今度はうまくいった」というレベルに堕する。

**フレームワークが隠した制御フロー。** エージェントの制御フローを理解できないことが第二の問題だった。どの順序でツールを呼び出しているのか、エラー発生時にどのようにリカバリーするのか——フレームワークの抽象化の裏に隠されていた。前回のエッセイで取り上げたattributionバグ——Claude Codeが自らの発言をユーザーの発言として誤って帰属させた事例——は、この問題の極端な形態だ。

**「動作するが、なぜ動作するのか分からない。」** [「モデルがすべてではなかった」](coding-agent-harness-anatomy.md)で取り上げたMagantiのsyntaqliteの経験が典型である。500件以上のテストが通過したが、なぜ動作しているのかは理解できていなかった。偽りの安心感（false reassurance）にほかならない。

三つの失敗の共通分母は**制御の喪失**である。Harnessの約束は、この制御を取り戻すということだ。エージェントの内部——モデルの推論——は依然として確率的だが、エージェントの外部——harnessが管理する実行条件、入力構成、出力検証、ツール呼び出し順序——は決定論的に構築できる。内部は制御できないが、外部を制御すれば、内部の不確実性がシステム全体の不確実性へと伝播することを防ぐことができる。

Rubyエコシステムにおける Rails vs Sinatra、PythonにおけるDjango vs Flaskでも、同じ振り子が作動してきた。フレームワークが先に市場を席巻し、複雑さが臨界点を超えると軽量な代替手段が台頭する。AIエージェントのエコシステムは今まさに、この振り子がharness側へ振れている区間にある。ただし歴史の教訓は、SinatraがRailsを置き換えられなかったように、harnessがフレームワークを完全に代替することはないだろうということだ。標準的なRAGパイプラインや単純なチャットボットにおいては、LangChainやその後継が依然として効率的であろう。Harnessが真価を発揮するのは、プロダクション、カスタマイズ、そして決定論が求められる領域である。

ここまでの分析から実務者に導出される含意は明確だ。第一に、AIエージェントツールを評価する際、そのツールが自らをframeworkと呼んでいるのかharnessと呼んでいるのかに注意を払うべきである。言葉は設計哲学を反映する。第二に、自分のコードとツールの間の結合度（coupling）を計測すべきだ——そのツールを取り除いたとき、自分のコードがどれだけ生き残るか。第三に、AIエージェントがプロダクションに投入される際には、harness水準での決定論——同一のプロンプト構成、同一のツール呼び出し順序、同一の検証ロジック——を要求すべきである。これがあればデバッグは可能であり、なければ不可能だ。

---

## 5. 開かれた問い — 言葉の移動はどこまで進むのか

2026年4月10日のGitHub Trendingが示したのは、AIコーディングツールの語彙が移動しているという事実だ。Frameworkからharnessへ。Overrideからhooksへ。DashboardからHUDへ。「中に入って来い」から「外から包む」へ。

この移動が一過性の流行なのか、構造的転換なのかは、時間が答えを出すだろう。ただし本稿が追跡した証拠——Archonの明示的な"harness builder"宣言、hermes-agentの"grows with you"、oh-my-codexのhooks/teams/HUDs、2年間のフレームワーク疲れ、EJBからSpringへの歴史的先例、Claude Agent SDKのミニマリズムが切り拓いた空間——は、一過性の流行よりも構造的転換に重みを与える。

開かれた問いは複数ある。Harnessの標準化はどのように進行するのか——Archonが"first"を主張するのは、この標準を先取りしようとする試みと読むことができる。フレームワークはharnessを吸収するのか——Springが当初はEJBの代替だったが、最終的には巨大なフレームワークへと成長したように。モデル自体がharnessを内蔵するのか——モデルが自律的にtool validationやcontext bloat管理を行うようになれば、外部harnessの役割は縮小する。決定論のコストは何か——決定論を強制すればLLMの確率的探索が制約される可能性がある。

これらの問いに対する答えはまだない。重要なのは問いの方向だ。2023〜2025年の問いが「AIエージェントで何ができるのか」であったなら、2026年の問いは「AIエージェントをいかに制御するか」である。可能性から統制へ。拡張から収束へ。Frameworkからharnessへ。

Archonが自らを"the first open-source harness builder for AI coding"と紹介し、*"Make AI coding deterministic and repeatable"*と付け加えたその二文は、2026年AIコーディングツールエコシステムの転換を凝縮している。フレームワーク時代、我々はAIにより多くのことを可能にする自由を与えた。Harness時代、我々はAIが行ったことを理解し再現できる構造を要求する。

馬は馬具を装着してこそ畑を耕せる。馬具が馬の自由を奪ったのか。否。馬具が馬の力に目的を与えたのだ。2026年のAIコーディングが決定論を再発見したのも同じ理由である。モデルの力はすでに十分だ。今こそ、その力に方向を与える番である。

---

## 出典

- [Archon — GitHub Repository](https://github.com/coleam00/Archon) — "The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable." TypeScript, 14,411 stars.
- [hermes-agent — GitHub Repository](https://github.com/NousResearch/hermes-agent) — "The agent that grows with you." Python, 44,309 stars, ウィークリー+19,765.
- [oh-my-codex — GitHub Repository](https://github.com/Yeachan-Heo/oh-my-codex) — "OmX - Oh My codeX: Your codex is not alone. Add hooks, agent teams, HUDs." TypeScript, 19,938 stars, ウィークリー+9,737.
- [obra/superpowers — GitHub Repository](https://github.com/obra/superpowers) — "Skills framework & software development methodology." 143,000 stars.
- [onyx-dot-app/onyx — GitHub Repository](https://github.com/onyx-dot-app/onyx) — AI chat platform, "works with every LLM." 26,000 stars, ウィークリー+5,556.
- [モデルがすべてではなかった — Coding Agentを本当に動かしているもの](coding-agent-harness-anatomy.md) — 前回のエッセイ、Agent Harnessの六つの構成要素の解剖.
- [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — Sebastian Raschka (2026). Agent Harness概念の学術的分析.
- [エージェントランタイムの再発見](agent-runtime-rediscovery.md) — 前回のエッセイ、2026年4月第1週「同じ週に同時発表」パターンの分析.
- [Claude Code $100脱走劇とGLM-5.1の反撃](llm-lockin-cracks-48h.md) — 前回のエッセイ、LLM lock-in疲れとフレームワーク依存度の分析.
