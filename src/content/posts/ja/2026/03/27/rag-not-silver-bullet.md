---
title: 'RAGはSilver Bulletではなかった — 72%が失敗する理由'
description: 'Oncall対応手順書をRAGで自動化すれば、エンジニアの午前3時が変わると信じていた。モデルを変え、chunkingを変え、数ヶ月を投資した。正解率は70%に届かず、プロジェクトは破棄された。'
pubDate: 2026-03-27T08:26:57.244Z
lang: ja
pairSlug: 'rag-not-silver-bullet'
draft: false
---
# RAGはSilver Bulletではなかった — 72%が失敗する理由

> Oncall対応手順書をRAGで自動化すれば、エンジニアの午前3時が変わると信じていた。モデルを変え、chunkingを変え、数ヶ月を投資した。正解率は70%に届かず、プロジェクトは破棄された。

---

## 1. 私も失敗した

障害が発生したり、スクリプトが点検が必要だと判断すると、自動的にエンジニアを呼び出すシステムがあった。午前3時でも鳴る。アラートが来ると眠りから覚めてログを漁り、どの順番で対応すべきか頭の中で反芻しなければならない。繰り返される障害パターンなら尚更だ。「すでに答えがあるのに、なぜ毎回人が探さなきゃいけないんだ？」

そこで始めたのがRAGプロジェクトだった。社内に散らばった対応手順書をインデキシングし、oncallアラートが来たときに関連手順を一緒に送る、というアイデアだった。障害タイプが分類されればembeddingで最も類似した文書を見つけてSlackメッセージに貼り付ける。シンプルで、明快に見えた。

しかしhit ratioは上がらなかった。モデルをアップグレードした。chunking戦略を変えた。overlapを増やし、文書を再構造化した。それでも正解率は70%を超えなかった。間違った手順書が返ってきたり、「関連文書なし」と処理されるケースが頻発した。

数ヶ月経ってようやく根本的な問題が見えた。手順書そのものがまともに整備されていなかったのだ。ある障害タイプは文書が二つあり内容が異なっていた。あるタイプは文書がそもそも存在しなかった。作成された手順書も実際の環境と合わないまま放置されているものが多かった。RAGは良い文書を素早く見つけてくれるツールだが、見つけるべき文書自体がめちゃくちゃな状態だったのだ。

結論は明確だった。限られたリソースでoncall対応時間を短縮することに投資するよりも、oncallそのものを減らすことにリソースを使うべきだ。プロジェクトは畳んだ。

ところで、この経験は自分だけの特殊なケースだったのだろうか。業界のデータはそうではないと言っている。

---

## 2. 72%が失敗する — 数字が語る現実

Gartnerは2024年のレポートで、2025年末までにGenAIプロジェクトの30%以上がPoC（概念実証）後に破棄されると発表した。原因として挙げたのは四つ：データ品質の問題、リスク管理の欠如、予想を超えるコスト、そして不明確なビジネス価値。注目すべきは「モデル性能」が原因リストにないことだ。失敗は技術そのものよりも、その技術を支える基盤で起きている。

ある業界分析によると状況はさらに厳しい。元TikTok・Salesforce Principal EngineerでRAGアーキテクチャを扱うDavid Richards（ragaboutit.com）は、エンタープライズRAGプロジェクトの72%が初年度に失敗するか期待以下の成果に終わると推定している。もちろんこれはブログベースの業界推定であり、peer-reviewed研究ではない。しかし現場で積み重ねた経験から出た数字である以上、完全に無視するのも難しい。

数字よりも直感的なのは実際の構築事例だ。開発者ブログandros.devには、Hacker Newsで292ポイントを獲得した記事がある — 10年分の社内技術文書1TBをRAGでインデキシングする過程を記録したものだ。スタックはLlamaIndex + ChromaDB + Ollama（llama3.2:3b）。結果は738,470個のvectorと54GBのインデックスだった。しかしその前にまずやるべきことがあった。全ファイルの54%をフィルタリングすること — 動画、画像、実行ファイルなどテキストとして処理できないファイル群だった。カスタムフィルタリングパイプラインが必要で、チェックポイントとモニタリングインフラなしでは大規模インデキシング自体が不可能だという結論に至った。GPUレンタル費用だけで€184、期間は2〜3週間だった。

Hacker Newsのコメントスレッドでは、経験豊富な開発者たちの反応は一貫していた。「PDFをマークダウンに変換すれば終わりという考えは幻想だ。」Vector similarity searchだけでは時系列データ、PDF内の画像、複数ソースを同時参照する必要があるクエリを処理できないという指摘が繰り返された。最も多く引用されたコメントの一つはこれだった：「データ品質が80%だ。」興味深いことに、同じスレッドで「RAGは死んだ」という主張は経験者たちから一斉に反論された — 単純なvector searchが最初から本当の解法だったことはないという理由からだ。

結局、Gartnerの30%も、72%という推定も、andros.devの2〜3週間の死闘も同じ方向を指している。RAGは簡単ではない。それでは、成功した組織は何が違ったのだろうか？

---

## 3. 成功したところは何が違ったのか

まずコストの現実を直視する必要がある。Stratagem Systemsの分析によると、100,000件以上の文書を対象としたエンタープライズRAGの初期構築費用は$34,400から$58,000の範囲だ。月間運用費は$14,000から$27,000、専任エンジニアの人件費だけで年間$75,000から$150,000に達する。ここで最も過小評価されるのがデータ整備・前処理費用で、ほとんどのプロジェクトで全体コストの30〜50%を占める。実際に投入したコストを事後分析したチームの多くが、当初見積もりの2〜3倍を使ったと語っている。参入コスト自体がすでに高い。

それでも成功した事例はある。その違いを掘り下げると共通のパターンが見える。

英国の金融サービス企業NewDayは年間250万件の顧客対応電話を処理している。この会社がRAGを導入した方法は野心的ではなかった。対象文書は約200のknowledge articleに限定し、AWSサーバーレスアーキテクチャにClaude 3 Haikuを載せた。月間運用費は$400未満。結果は印象的だった — 90%以上の精度、オペレーターの検索時間は90秒から4秒に短縮された。

しかしその道のりは最初から平坦ではなかった。実際のオペレーター10名にシステムを開放したとき、精度は70%に急落した。原因は予想外だった。オペレーターたちが社内略語や省略表現を自然に使っていたのだが、システムがこれをまったく理解できなかったのだ。文書は正式名称で書かれており、人は現場の言葉で問い合わせていた。小さなギャップだったが致命的だった。

解決策はエレガントではなかった — 略語辞書をLLMプロンプトに静的に注入した。そして繰り返し最適化した。70%から80%へ、80%から90%へ。数値が回復するまでに何度ものフィードバックループが必要だった。NewDayが成功した理由は技術が優れていたからではない。文書範囲を200に絞ってドメインをコントロールし、ユーザーフィードバックをシステムに吸収し、覚悟を決めて取り組んだからだ。

LinkedInの事例はアプローチ自体が異なっていた。7名の研究者で構成されたチームがKnowledge Graph + RAGのハイブリッドアーキテクチャを設計した。Neo4j（グラフDB）とQDrant（ベクトルDB）、GPT-4、BERT/E5 embedding — 4つのシステムを組み合わせた。Jiraチケットからイシュー間の関係を抽出して二重レベルグラフ構造を構築し、ルールベース抽出とLLMパースを混合したハイブリッドパーシングパイプラインを運用した。結果はMRR 77.6%向上、イシュー解決時間28.6%短縮。これは単純なvector searchではなかった — グラフベースの推論だった。

再びandros.devに戻ると：GPUレンタル費用€184は「はした金」だった。Hacker Newsのコメントである開発者はこう整理した — 「インフラ費用ははした金だ。本当のコストは人件費だ。」3 man-weekのエンジニアリング労働が実際の投入コストの本体だった。

三つの事例を並べるとパターンが見える。成功したチームは「とりあえずインデキシングしてみよう」というアプローチを取らなかった。NewDayはドメイン範囲をコントロールし、ユーザーフィードバックをデータとして吸収するループを作った。LinkedInは単純なvector searchでは解けない問題だと認め、それに見合ったアーキテクチャを設計した。FAQ水準の構造化されたクエリと、複雑なドメイン判断が必要なクエリでは、求められるシステムが根本的に異なる。問題の形が成否を分ける。

> 「RAGデモは一日で作れる。プロダクションRAGは覚悟が違う。」

成功した組織はKnowledge Graph、ハイブリッド検索、フィードバックループ、専任エンジニア — つまり、RAG単体ではなく「RAGを含むシステム」を構築した。そしてこの事実は、RAGがなぜ構造的にsilver bulletになれないのかへと繋がる。

---

## 4. RAGの構造的限界 — なぜSilver Bulletになれないのか

RAGがなぜこれほど頻繁に期待を裏切るのかを理解するには、動作原理の根底まで降りていく必要がある。

RAGの核心メカニズムはvector embeddingだ。一つの段落をまるごと数値配列一つに圧縮する。OpenAIの基本モデルを基準に1536個の数値で構成された座標一つ — いわゆるbi-encoder方式だ。文書を一度エンコードしてベクトルとして保存し、クエリも同じ方式でエンコードした後、二つのベクトル間の角度（cosine similarity）が近いほど意味が似ていると判断する構造だ。高速でスケーラビリティが良い。しかしこの設計は根本的に損失を甘受している。複雑な多段階推論を含む段落も、単純な定義の一行も、結局同じ次元の点一つになる。文章の文脈と構造はその過程でいくらか失われる。「cosine similarityが近い＝意味的に関連がある」という前提が常に成立するわけではないのに、この前提の上にすべてが積み上がっている。

理論上のcontext windowと実際に使えるcontext windowの間にもギャップがある。Hacker Newsである開発者が共有した経験がこれをよく示している — 2000行のReactコンポーネントをRAGにまるごと投入したとき結果は使い物にならないレベルだったが、200行に切ったときはきちんと動作した。モデルが「処理できる」長さと、実際に意味をうまく抽出できる長さは違う。トークン数が上限以下だからといって問題がないわけではない。

データ型による根本的な脆弱性もある。特定日付の四半期業績 — 「2024年第3四半期の営業利益が前期比何パーセント変化したか」のような時系列クエリは、vector similarity検索の言語に翻訳されない。PDFに画像として埋め込まれた表やグラフはテキストインデキシング自体ができない。複数の文書を同時に参照してはじめて答えが出るcross-documentクエリは、一つの類似文書を返す構造とそもそも噛み合わない。これらのクエリはvector similarityが根本的にうまく処理できない領域だ。

ところが実際の現場でRAG失敗の最大の原因はretrievalでもgenerationでもないことが判明している。Analytics Vidhyaの2025年7月の分析によると、RAG失敗の80%はchunking段階に遡る。どのモデルを使うか、どう検索するかよりも、文書をどう分割したかがはるかに大きく結果を決めるということだ。意味単位を無視して機械的に分割されたchunkは、どんなに良いembeddingモデルでも救えない。勝負は入力段階ですでについている。

自分が経験したoncall自動化プロジェクトに一瞬だけ戻ると — 手順書がめちゃくちゃだったのは事実だ。しかしより根本的な問題があった。「今この障害にはどの手順書を適用すべきか」は類似度計算ではなく状況判断の問題だった。同じアラートでも先行条件によって手順が変わった。これはRAG実装の失敗ではなくRAGパターン自体のミスマッチだった — 問題の形がRAGの得意とするものと違っていたのだ。

これらの限界を認識すれば、次の問いは自然だ — では何を使うべきなのか？

---

## 5. では何を使うべきか — 2026年の選択肢

RAGの限界を確認したからといって代替案が一つだけなわけではない。2026年現在、選択肢は四つの方向に分かれる。

**Long context.** vector search一回のコストは約$0.00008水準だ。一方、long contextで長い文書全体を推論に投入するとクエリあたり$0.1前後になる。ここでよくある誤解だが — RAGもretrieval後にLLM生成が続くため、単純比較は成立しない。重要なのは用途の違いだ。契約書、レポート、文書比較のように「境界が定まった文書全体を横断する推論」が必要なとき、long contextは威力を発揮する — 文書をまるごと投入してモデルに文脈を繋がせればいい。ただし、関連情報が文書の中間に位置する場合、精度が10〜20%低下する点は承知しておく必要がある。モデルは前と後をより良く記憶する — primacy biasとrecency biasだ。

**Hybrid（retrieval → reasoning）.** vector searchで候補を絞り、選び出されたchunkをlong contextで一緒に推論する方式だ。コストと精度のバランスを実質的に取れる構造で、2025〜2026年の現場で最もよく通用する公式だ。LinkedInとNewDayが成功した方法を振り返ると、このパターンに近い設計をしていた — 当時「hybrid」という名前を付けていなかったとしても。

**Agentic RAG.** 検索そのものをモデルが自ら制御する方向だ。Self-RAG（Asai et al., ICLR 2024）はLLMが直接検索クエリを生成し、reflection tokenで検索結果の品質を評価した上で不十分と判断すれば再検索する構造だ。Corrective RAG（CRAG）も類似の自己修正メカニズムを持つ。これは単純な類似度マッチングを超えて — モデルが検索の質そのものを能動的に判断する。まだ成熟段階ではないが、「embed and search」とは根本的に異なるアプローチだ。

**RAGを使わないことも答えだ。** ツールを変えることが常に正解とは限らない。ときには問題の形を再定義することがより良い選択だ。oncall自動化プロジェクトを畳んだとき、チームが下した結論は「もっと良いretrievalシステムを作ろう」ではなかった。oncall頻度そのものを減らす方向にエネルギーを移し、それが正しい判断だった。ツールを問題に合わせるのであって、問題をツールに押し込むのではない。

四つの選択肢を一行でまとめるとこうだ：文書単位の推論ならlong context、コストと品質のバランスが必要ならhybrid、検索品質そのものが変数ならAgentic RAGを検討せよ。そしてどれも問題の形と合わないなら、問題を見直すのが最も賢明な手だ。

---

## 6. ツールではなく問題を見よ

RAGは死んでいない。依然としてFAQチャットボット、ナレッジ検索、文書Q&Aのような領域では最も現実的な選択だ。しかし万能ではない。

技術を選択する前にまず問うべきは「どう実装するか」ではなく、「この問題の形がRAGに合っているか」だ。FAQ性質ならRAGが合う。文書全体を横断する推論ならlong contextが勝る。検索結果そのものの質が問題ならAgentic RAGを検討できる。そしてどのツールもぴったり合わないなら、問題そのものを減らすことが正解かもしれない。

私たちのチームが下した結論は結局それだった — 対応時間を短縮するよりも、oncallそのものを減らそう。

---

## 参考資料

- [Lack of AI-Ready Data Puts AI Projects at Risk](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk) — Gartner, 2025
- [Why 72% of Enterprise RAG Implementations Fail in the First Year](https://ragaboutit.com/why-72-of-enterprise-rag-implementations-fail-in-the-first-year-and-how-to-avoid-the-same-fate/) — David Richards, ragaboutit.com
- [From zero to a RAG system: successes and failures](https://en.andros.dev/blog/aa31d744/from-zero-to-a-rag-system-successes-and-failures/) — Andros Fenollosa
- [Hacker News discussion](https://news.ycombinator.com/item?id=47499356) — andros.devの記事に対するコメントスレッド
- [RAG System Cost: 2026 Pricing, Build & Ops Guide](https://www.alphacorp.ai/blog/how-much-does-a-rag-system-cost-infrastructure-development-and-ongoing-expenses) — AlphaCorp
- [RAG Implementation Cost ROI Analysis](https://www.stratagem-systems.com/blog/rag-implementation-cost-roi-analysis) — Stratagem Systems（89のプロダクションデプロイ分析）
- [NewDay builds a Generative AI based Customer Service Agent Assist with over 90% accuracy](https://aws.amazon.com/blogs/machine-learning/newday-builds-a-generative-ai-based-customer-service-agent-assist-with-over-90-accuracy/) — AWS Machine Learning Blog
- [Retrieval-Augmented Generation with Knowledge Graphs for Customer Service Question Answering](https://arxiv.org/html/2404.17723v1) — LinkedIn研究チーム、arXiv 2024
- [Enterprise RAG Failures: The 5-Part Framework](https://www.analyticsvidhya.com/blog/2025/07/silent-killers-of-production-rag/) — Analytics Vidhya, 2025
- [Is RAG Still Relevant in 2026?](https://konstantinos.top/blog/37/) — RAG vs Long Context比較
- [RAG vs Large Context Window: Real Trade-offs for AI Apps](https://redis.io/blog/rag-vs-large-context-window-ai-apps/) — Redis
- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511) — Asai et al., ICLR 2024
