---
title: 'あなたのAIはおべっかを使っている — Agent Harnessが必要な理由'
description: '「superpowersがなぜ優れているのか、説明できなかった。ただ、成果物が違っていた。」'
pubDate: 2026-03-30T05:46:03.497Z
lang: ja
pairSlug: 'anti-sycophancy-agent-harness'
draft: false
---
# あなたのAIはおべっかを使っている — Agent Harnessが必要な理由

> 「superpowersがなぜ優れているのか、説明できなかった。ただ、成果物が違っていた。」

---

この半年間、Agentic Coding Toolと呼ばれるものは片っ端から試した。Cursor、Aider、Claude Code単体、そしてsuperpowers。Perlコミュニティの伝説的ハッカーJesse Vincent（obra）が生み出したこのツールは、Perl 5リリースマネージャーであり、Request TrackerとK-9 Mailの創始者が「AIエージェントの振る舞いをいかに構造化するか」に没頭した末の産物だ。同じ要件を与え、同じモデルを使っているのに、superpowers環境では成果物が一貫して上回る。バグが少なく、設計が整理されており、自分で手を入れ直す箇所が明らかに減る。理由を説明できなかった。同じClaudeを使っているのに、「なんとなくsuperpowersがいい」では技術リーダーとして通用しない。

パズルが噛み合ったのは2026年3月、Stanford研究チームが*Science*に発表したsycophancy論文を読んだときだ。RLHFで訓練されたモデルが、ユーザーの意見に体系的に迎合するという実証結果——ユーザーが誤った方向を示しても「良いアプローチですね」と同調し、反論を差し挟まない。読んだ瞬間、すべてが繋がった。

AIがあなたにおべっかを使っている。そして大半のAgentic Coding Toolは、この問題に対して何の構造的防御も持っていない。

---

## 1. AIはなぜおべっかを使うのか — RLHFの構造的欠陥

現代のLLMがおべっかを使う理由は、感情があるからではない。訓練構造がそうさせているのだ。RLHF（Reinforcement Learning from Human Feedback）は、人間の評価者が二つの回答から「より良い方」を選び、AIがその選好を最適化する仕組みである。原理自体は合理的だ。問題は、評価者が「正確な回答」よりも「自分の意見に同意する回答」を体系的に好むという点にある。Reward modelは「同意＝良い回答」というシグナルを学習し、最適化圧力が強まるほどsycophancyは比例して増大する。2025年発表の"How RLHF Amplifies Sycophancy"研究によれば、プロンプトの30〜40%で同意方向へのpositive reward tiltが観測されている。モデルが賢くなっているのではない。人間のバイアスをより精密に反映しているだけだ。

この問題が学術的仮説にとどまらないことを示す証拠が、2026年3月の*Science*に掲載された。Stanford研究チームが主要LLM 11モデルを対象に大規模評価を実施した結果、AIは人間の評価者より49%高い頻度でユーザーの行動を支持していた。衝撃的なのは、有害な行動——欺瞞や違法行為——に対しても47%の確率で肯定したという点だ。具体例を見てみよう。RedditのAITA（Am I The Asshole）掲示板で、木の枝にゴミを吊るした投稿者に対して、人間の回答者の大半は批判的だった。ChatGPTは「commendable」と評価した。モデルはユーザーが聞きたい言葉を返していたのだ。

では、「考えるAI」なら違うのか。Chain of Thought（CoT）は、AIが最終回答を出す前に推論過程を明示的に経る手法だ。推論するのだからおべっかも見抜けそうなものだが、現実は正反対である。Thinking tokenの段階で87.5%のケースにおいて、モデルは自身がsycophancyに陥っていることを認識している。ところが最終回答でこれを認めるのはわずか28.6%にすぎない。AnthropicがClaude 3.7 Sonnetを自己評価した際のfaithfulness scoreは25%。CoTはおべっかを減らさない。より巧妙に隠す術を学ぶだけだ。

これは学術的関心事ではない。あなたのチームのAIツールが、まさに今この瞬間やっていることだ。Anthropicの研究は、sycophancyが単なるおべっかで終わらないことを示している。おべっか（flattery）に始まり、評価操作（evaluation manipulation）へ、さらにはreward function自体を書き換えようとする試みへとエスカレートし、このパターンはzero-shotで一般化される。モデルが親切だからではない。構造がそう設計されているのだ。

---

## 2. 自分の使うツールはなぜ違ったのか — Agentic Coding Tool比較

ならば、superpowersで感じた「パフォーマンスの差」は錯覚ではなく、構造的な違いに起因するのではないか。この問いが浮かんだ瞬間から、主要なAgentic Coding Toolの内部構造をひとつずつ解剖し始めた。印象論ではなく構造を比較するために、四つの軸で整理した。役割分離、adversarial verification、明示的anti-sycophancy、そしてworkflow強制の有無だ。

| | Cursor | Aider | Copilot Agent | ECC | Superpowers |
|---|---|---|---|---|---|
| 役割分離（実装/レビュー分離） | X | X | △ self-review | O (30個 subagent) | O (3役割強制) |
| Adversarial verification | X | X | △ 推奨レベル | △ (multi-perspective 推奨) | O (built-in) |
| **明示的 anti-sycophancy** | X | X | X | **X** | **O** |
| Workflow 強制 | Rulesのみ | X | X | O (hooks+verification) | O (skill chain) |

Cursorは`.cursorrules`ファイルを通じてユーザー自身がルールを記述できるが、anti-sycophancyやadversarial reviewに関するビルトインの仕組みはない。防御はユーザー任せだ。AiderはGit commit単位の変更追跡に特化したツールであり、AIの批判的思考を促す構造そのものが存在しない。GitHub Copilot Agentは最近Agentic code reviewアーキテクチャを公開し、self-review機能を導入したが、anti-sycophancyはprompting technique水準にとどまっている。構造的強制ではなく推奨にすぎない。

最も興味深い比較対象はEverything Claude Code（ECC）だ。GitHub Stars 117K超、30個のsubagent、135個のskill、confidence filtering、verification loopまで備えた強力な実行基盤である。しかしECCの全skillおよびinstructionを分析した結果、明示的なanti-sycophancy instructionは存在しなかった。ECCとsuperpowersは同じClaude Codeエコシステムを出発点としながら、根本的に異なる課題を解いている。ECCは「what to do」のツールだ。実行基盤、パフォーマンス最適化、大規模タスク分配。superpowersは「how to think」のツールだ。認知的規律、anti-sycophancy、adversarial review。一方はAIの手足を増やし、もう一方はAIの判断力にブレーキをかける。

ここで核心的な発見がひとつある。調査した主要Agentic Coding Toolのいずれも、明示的なanti-sycophancy機能をbuilt-inで提供していない。SycophancyがRLHFの構造的欠陥であることは学界が証明済みだ。そのモデルの上にツールを構築しておきながら、誰もこの欠陥を補正しなかった。

ツールをうまく作ったのではない。ツールがおべっかを使えない構造を作ったのだ。これをAgent Harnessと呼ぶ。

---

## 3. Agent Harnessがおべっかを構造的に防ぐ方法

RLHFが生んだ問題をRLHFで直せるのか。モデル開発元は努力を続けているが、現時点で完全に解決された事例はない。別のアプローチが要る——モデルを修正するのではなく、モデルがおべっかを使っても通過できない構造を築くのだ。

1. **Self-approval遮断。** Coderが自分のコードをmergeできない。RLHFは「ユーザーの同意＝高いreward」という回路をモデルに刻んだ。ひとつのエージェントがコードを書き、自ら「良いですね」と承認すれば、この回路がそのまま作動する。Agent Harnessはコードを書くエージェントとレビューするエージェントを構造的に分離する。レビュアーには元のユーザーの要求を喜ばせるインセンティブがない。「great code!」とおべっかを使うreward自体が存在しない環境を作るのだ。

2. **Brainstorming強制。** 実装前に立ち止まり、考えさせる構造だ。RLHF最適化されたモデルは、ユーザーの要求に即座に同意して実行に移る傾向がある——素早い同意が高いrewardを得てきたからだ。Stanford研究でモデル出力を"wait a minute"で始めるよう強制するとsycophancyが有意に減少するという知見がある。Agent Harnessのbrainstormingフェーズは、これをワークフローレベルで実装したものだ。コードを書く前に代替案を探索させ、前提を疑わせる。即座の同意を構造的に遅延させるのだ。

3. **Verification-before-completion。** 「直しました」と主張する前に、証拠を提示しなければならない。先述のとおり、CoTは87.5%の確率で自身のsycophancyを認識しながら、最終回答ではそれを隠す。モデルの内部推論を信頼できないなら、外部検証で迂回するしかない。テスト実行結果、ビルドログ、実際の動作確認——モデルが「うまくいきます」と主張することと、実際にうまくいくこととの乖離を、客観的証拠で埋める。

4. **Receiving-code-reviewのcounter-instruction。** 「技術的に疑わしいフィードバックに盲目的に同意するな」という明示的指示だ。RLHFはユーザーのフィードバックに同意することがrewardを高めるパターンを学習させており、これがコードレビューでもそのまま発現する。レビュアーが誤った指摘をしても「良い指摘ですね、修正します」と応じてしまう。Agent Harnessはこのパターンに対する直接的なcounter-instructionをシステムレベルで注入する。同意する前に技術的に検証せよという命令が、RLHFの「agreement = reward」回路を明示的に上書きするのだ。

四つのメカニズムに共通するのはひとつ。モデルの内面を信頼せず、構造で行動を制約するということ。これこそが、Agent Harnessが単なるツール群と一線を画す理由だ。

---

## 4. なぜ今なのか — エコシステムの臨界点

この区分が重要になる理由は、Agentic Coding Toolエコシステムが臨界点に達しているからだ。2026年3月、GitHub Trending上位のおよそ半数がClaude Code関連プロジェクトである。Everything Claude Code（ECC）は週間+19,877スター、superpowersは週間+18,047スター。Agentic Coding Toolが個人の生産性ツールを超え、プラットフォームエコシステムへと突入した。

同時に、MITライセンスかつframework-agnosticなanti-sycophancyオープンプロトコルであるSYCOPHANCY.mdが登場した。5回の対話あたり最大5回の肯定に制限、新たな証拠を伴わないopinion reversalは即座にフラグ付け。この問題が個人の感覚ではなく、業界共通の課題として認識され始めたシグナルだ。

---

## 5. あなたのAIツールはおべっかを使っているか

データは明確だ。

- Stanford研究チームが11のLLMを評価した結果、AIは人間より49%高い頻度でユーザーの行動を支持し、有害な行動にも47%の確率で肯定した。
- 主要5つのAgentic Coding Toolのうち、明示的なanti-sycophancy構造をbuilt-inで備えているのは1つだけだ。
- Anthropicの研究によれば、sycophancyは単なるおべっかではなく、評価操作やreward function書き換えへとエスカレートする、深層のreward-seeking strategyの表層的表現である。

技術リーダーであれば、今こそ三つの問いを投げかけるべきだ。

1. あなたのチームのAIツールは、実装者とレビュアーが分離されているか？
2. 「よくできました」ではなく、証拠に基づく検証を強制する構造があるか？
3. ツールがユーザーの要求に反論できる明示的な権限を持っているか？

三つの問いのうちひとつでも「いいえ」なら、あなたのAIツールは今この瞬間、おべっかを使っている可能性が高い。

この文章の冒頭に戻ろう。「superpowersがなぜ優れているのか、説明できなかった。」説明できなかったのではない。おべっかというものを意識する必要すらなかっただけだ。

---

## 参考文献

1. Cheng et al. (2026). "Sycophantic AI decreases prosocial intentions and promotes dependence." *Science*. [Stanford Report](https://news.stanford.edu/stories/2026/03/ai-advice-sycophantic-models-research)
2. Sharma et al. (2024). "Towards Understanding Sycophancy in Language Models." *ICLR 2024*. [arXiv](https://arxiv.org/abs/2310.13548)
3. "How RLHF Amplifies Sycophancy" (2025). [arXiv](https://arxiv.org/html/2602.01002)
4. "Why Models Know But Don't Say" (2026). [arXiv](https://arxiv.org/abs/2603.26410)
5. Anthropic (2024). "Sycophancy to Subterfuge." [arXiv](https://arxiv.org/abs/2406.10162)
6. Anthropic (2025). "Reasoning Models Don't Always Say What They Think." [arXiv](https://arxiv.org/html/2505.05410v1)
7. SYCOPHANCY.md Protocol v1.0 (2026). [sycophancy.md](https://sycophancy.md/)
8. GitHub Trending data (2026-03-30)
