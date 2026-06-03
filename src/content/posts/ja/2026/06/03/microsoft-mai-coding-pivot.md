---
title: "MAI-Code-1-Flash と MAI-Thinking-1 — Microsoft が Claude Code を切った後に何を敷いたか"
description: "2026-06-03, Microsoft が MAI-Code-1-Flash と MAI-Thinking-1 の二つのモデルを同時発表した。5 月 22 日の「Microsoft が社内 Claude Code ライセンスを 6 月 30 日付で終了する」という The Verge 報道のちょうど 6 週間後だ。Code-1-Flash は GitHub Copilot のデフォルトモデルとして即時ロールアウトされ、SWE-Bench Pro で Claude Haiku 4.5 を 16 点差で上回ると主張する。Thinking-1 は 35B active / 1T total の MoE 推論モデルで、AIME 2026 で 94.5 %、Claude Sonnet 4.6 と SWE-Bench Pro で互角、blind 人間評価で優勢だと主張する。「Claude 依存」の次章なのか、マーケティングの第一歩なのか。"
pubDate: 2026-06-03T00:00:00.000Z
lang: ja
pairSlug: microsoft-mai-coding-pivot
draft: false
---

# MAI-Code-1-Flash と MAI-Thinking-1 — Microsoft が Claude Code を切った後に何を敷いたか

> 2026 年 6 月 3 日、Microsoft が MAI-Code-1-Flash と MAI-Thinking-1 の二つのモデルを同時発表した。両発表が HN にそれぞれ 375 点・176 コメント、171 点・72 コメントを集めた。5 月 22 日の The Verge 報道 — Microsoft が社内 Claude Code ライセンスを 6 月 30 日付で終了する、というもの — からちょうど 6 週間後だ。Code-1-Flash は GitHub Copilot のデフォルトモデルとして即時ロールアウトされ、SWE-Bench Pro で Claude Haiku 4.5 を 16 点差で上回ると主張する。Thinking-1 は 35B active / 1T total の MoE 推論モデルで、Claude Sonnet 4.6 と互角、Opus 4.6 と SWE-Bench Pro で対等と主張する。5/23 の社内単価危機への答えが 6 週間で到着したのか、それともマーケティングの第一歩なのか。

## 導入 — 6 週間で到着した答えの重み

まずタイムラインを整理する。2026 年 5 月 22 日、The Verge が Microsoft の社内 Claude Code ライセンス終了を報じた。その報道直後の HN の 227 コメントが指摘した二つの事実 — 「開発者が足で投票して自社 Copilot ではなく Claude Code を選んだ」と「Claude の使用強度が会社の 12 ヶ月 AI 予算を数ヶ月で使い切らせた」 — が 5/23 の本ブログの分析の出発点だった。その分析の結論はシンプルだった — Microsoft の決定は「自社ツールの優位の回復」ではなく「単位経済学の制御回復」であり、その制御のためには呼び出しの入口を自社ゲートウェイへ移す作業が必要だ。

6 月 3 日の二つの発表は、そのゲートウェイの裏に何が敷かれるかの最初の公開画像だ。二つのモデルは明らかに同じシリーズ (「MAI」) の二つのスロットだ — Code-1-Flash は「速いコーディングスロット」、Thinking-1 は「深い推論スロット」。二つのスロット以外に MAI-Image-2.5, MAI-Transcribe-1.5 が同じシリーズですでに発表されている。このスロット分離は Anthropic の Haiku / Sonnet / Opus または OpenAI の GPT-4o-mini / GPT-4o / o-series の標準パターンをそのまま踏襲する。

両発表が強調する一行が二つのモデルの共通設計哲学を要約する — "clean and appropriately licensed data" (清潔で適切にライセンスされたデータ) と "third-party distillation なしの直接学習"。一行目は OpenAI / Anthropic の学習データ出所論争 (著作権訴訟, NYT 事件) の上での Microsoft の差別化メッセージだ。二行目は「競合モデルからの出力学習」の痕跡がない、という主張で、MAI が独立モデルファミリーである点を強調する。二つのメッセージが合わさると Microsoft の位置が明らかになる — 「競合より清潔なデータの上で作られた独立モデルファミリー」だ。

この陳述がまさに 5/23 の診断と出会う地点がある。その診断で指摘した「入口制御」の終着点は「他モデルへの価格比較ルーティング」だった。しかしルーティングの行き先が自社モデルでなければ、ルーティングは売上の外部流出を意味するに過ぎない。Microsoft がルーティングの行き先を自社モデルに置くには、その自社モデルが Claude / GPT と競争できなければならない。MAI 二モデルはまさにその競争条件の最初の測定値だ。

## 本文 1 — Code-1-Flash のベンチマークと 'Haiku 比較' という単一カード

Code-1-Flash の発表が最も強調する数字を整理する。

```
ベンチマーク                   MAI-Code-1-Flash    Claude Haiku 4.5
SWE-Bench Pro                +16.0                (baseline)
SWE-Bench Verified           -60% tokens          (baseline)
IF Bench instruction         +28.9                (baseline)
Advanced IF                  +14.5                (baseline)
Robust IF                    higher               (baseline)
```

この表が指すメッセージは二つに分かれる。第一に、**SWE-Bench Pro で 16 点優位** と SWE-Bench Verified で 60 % 少ないトークン。コーディング作業の二つの核心測定 (正確度 + 効率) のいずれでも同価格帯モデルの Claude Haiku 4.5 を上回るという主張だ。第二に、**指示追従 (instruction following)** の三種類のベンチマーク (IF Bench, Advanced IF, Robust IF) すべてで優位だ。これは単純なコード生成能力ではなく「複雑な多段階指示を正確に実行する」能力の測定だ。

ここで最も重い設計判断 — そして最も微妙なマーケティング判断 — が登場する。発表が比較対象として Claude Haiku 4.5 だけを選び、GPT, Codex, または Claude のより大型モデル (Sonnet, Opus) との比較を意図的に除外した。この選択の意味を解くと二つだ。第一に、Code-1-Flash が価格 / 性能側で自身の位置を明示する — 「Haiku と同じ速い / 安いスロットで、そのスロット内で Haiku に勝つ」。第二に、Sonnet / Opus と比較したときに Code-1-Flash がどこに位置するかをマーケティングが意図的に空ける。Code-1-Flash が Sonnet に追いついたという主張はしない。同価格帯内での優位が単一カードだ。

このマーケティング選択が正確である理由は、5/23 の分析に戻ると見える。その分析の核心は「Claude Code の自然な使用強度が予算化前提を超える」だった。その自然な使用強度の大部分は「簡単な PR レビュー, 素早いバグ修正, 小さなリファクタリング」のような作業で、その作業のモデルスロットは Haiku または Code-1-Flash だ。つまり Microsoft のゲートウェイが日々の呼び出しの 80 ~ 90 % を Code-1-Flash にルーティングできれば、それだけで単位経済学の制御が回復する。深い推論が必要な 10 ~ 20 % の作業には依然として Claude Sonnet / Opus または Microsoft の MAI-Thinking-1 にルーティングする。スロット分離 + ルーティングパターンが 5/23 の単位経済学危機への正確な答えだ。

もう一つ微妙な決定が発表の一行にある — "trained and designed for GitHub Copilot harness" (GitHub Copilot ハーネスのために学習・設計された)。「harness」はモデル + ツール統合 + UI の結合を意味する。5/23 の分析で指摘した「Claude Code の使い心地はモデルだけでなくモデル + UI + ツール統合の結合」という点がここで再び現れる。Code-1-Flash が単にモデルの重みではなく「Copilot ハーネス内で学習された」モデルなら、モデル単体のベンチマーク点数よりハーネス内での実際の作業効率がより意味ある測定となる。次の四半期の実測データがマーケティングカードよりも重い検証になるだろう。

## 本文 2 — MAI-Thinking-1 の 'Sonnet 4.6 互角' 主張と二つの検証必要

Thinking-1 の数字は別の重みを持つ。発表が強調する核心の比較は三つに分かれる。

第一に — **Claude Sonnet 4.6 と SWE-Bench Pro で「互角 (toe-to-toe)」** + **1,276 タスクの blind 人間評価で優勢**。この主張が事実なら Thinking-1 は Microsoft の最も強い自社モデルで、5/23 の社内 Claude Code 使用者が「足で投票」したモデル (Claude Sonnet 4.6) の代替として即時作動可能だ。blind 人間評価の結果は自社発表の短所 — 評価データの cherry-picking 可能性 — があるが、1,276 タスクという規模は単純な cherry-pick より大きなサンプルだ。

第二に — **Claude Opus 4.6 と SWE-Bench Pro で「対等 (matches)」**。Opus は Claude の最大モデルで、Sonnet の 2 ~ 3 倍の価格を持つ。Thinking-1 が Opus と同じ作業で対等なら、価格 / 性能の側面で単純な対等以上の意味だ。しかし発表が「対等」の正確な定義 (正答率の正確な差, 統計的有意性) を明示しない点が第一の検証必要だ。

第三に — **AIME 2025 で 97.0 %, AIME 2026 で 94.5 %**。数学的推論の最も標準化されたベンチマークで非常に高い点数だ。比較コンテキストとして、GPT-o3 の AIME 2024 点数が 92 ~ 95 %, Claude の Sonnet 4.5 が AIME 2025 で約 88 %。Thinking-1 の点数はカテゴリの最高水準だ。しかし AIME のような閉鎖型試験点数は学習データ漏洩のリスクが大きく、発表が「データ浄化 (decontamination)」の程度を明示しない点が第二の検証必要だ。

モデルの技術設計は次の通り。35B active parameters / ~1T total parameters の sparse Mixture-of-Experts。この構造は DeepSeek-V3, Mistral 8x22B と同じファミリーで、OpenAI の GPT-4 も類似パターンだという推測がある。Sparse MoE の利点は推論時のメモリ / コンピュートが active パラメータに比例する点 — つまり推論は 35B モデルの速度だが、表現力は 1T モデルの幅だ。このパターンが「medium-weight」という自己分類の根拠だ。

発表の興味深い一行がもう一つある — "Hill-Climbing Machine ... capabilities improve continually and reliably over time" (能力が時間の経過とともに継続的かつ信頼性高く向上する hill-climbing マシン)。この表現が指すのは単一モデルではなく、学習 / 評価 / 改善のパイプラインだ。MAI シリーズが単一モデル発表ではなく 6 ~ 12 ヶ月単位の継続的改善の最初の測定値であるというメッセージだ。これは Anthropic の Claude 3 → 3.5 → 4 → 4.6 → 4.8 の 6 ヶ月サイクル, OpenAI の GPT-4 → 4o → o1 → o3 の 8 ~ 10 ヶ月サイクルのパターンを直接意識したメッセージだ。Microsoft が同じサイクルを始めたという宣言だ。

HN のコメントで最も共感を集めた情緒がこのサイクルメッセージの信頼性への懐疑だ — 情緒の要約 — 「Microsoft が独自モデルシリーズを始めたと発表したことはすでに何度もある。Phi シリーズ, Orca, ... そして毎回一二度の発表の後に消えた。MAI が違うかどうかは 6 ヶ月後に見よう」。懐疑の根拠は明白だ。Microsoft が独自モデルを何度か試み、その多くが単発の発表で終わった。今回の発表の違いは「ゲートウェイ統合 (Copilot のデフォルトモデルとして即時ロールアウト)」と「Hill-Climbing サイクルの約束」の二枚カードだ。二枚の本当の検証は 9 ~ 12 月に到着する次のバージョン — MAI-Code-2 または MAI-Thinking-2 — の実際のリリースと、そのモデルの性能変化だ。

## 本文 3 — 'ゲートウェイ + 自社モデル' パターンの産業的含意

この事件が単一企業のモデルファミリー発表を越えてカテゴリ全体に投げかける含意を三つに整理する。

第一は **「フロンティアモデル会社 vs ゲートウェイ会社」 の分岐** だ。過去 3 年間 AI モデル市場は事実上二つのカテゴリの会社が運営してきた — モデルを作る会社 (Anthropic, OpenAI, DeepMind 等) とそれをホスティング / ゲートウェイ / 統合で持っていく会社 (AWS, GCP, Microsoft Azure)。Microsoft の MAI シリーズはこの二つのカテゴリの境界が崩れるシグナルだ。ゲートウェイ会社が自社モデルを持てば、外部モデルは「デフォルトオプション」ではなく「選択的ルーティング対象」へと格下げされる。外部モデル会社 (Anthropic, OpenAI) の単価交渉力が落ちる。

この分岐の最初のシグナルは価格交渉だ。2026 年下半期に Anthropic と Microsoft の Azure 上 Claude ホスティング契約の更新があれば、Microsoft の交渉カードが「Claude がなければ Sonnet の席に MAI-Thinking-1 を直接使う」になる。同じカードが OpenAI との交渉 (すでに Microsoft の OpenAI 持分関係で複雑だが) でも作動する。モデル会社の価格交渉力がゲートウェイ会社の自社モデル登場で直接圧力を受ける。

第二は **「モデル会社の売上チャネルの分岐」** だ。モデル会社が直接ユーザーにライセンスを売るチャネル (Anthropic の Claude.ai, Claude API) とゲートウェイ会社を介する間接チャネル (Bedrock, Azure AI) の二系統だ。5/23 の分析で指摘したように、ゲートウェイチャネルの売上が外部モデル会社の最大チャネルだ。そのチャネルがゲートウェイ会社の自社モデルで部分代替されると、モデル会社の売上構造が直接チャネル依存へ移る。しかし直接チャネルのユーザー層は限定的で (開発者 / 消費者中心)、企業売上の大部分は依然としてゲートウェイを通る。モデル会社が企業売上を回復するには直接の企業営業チャネルを整えねばならない。Anthropic の企業営業チームの拡大 (2026 年 Q1 発表) がこのシグナルの最初の測定値だ。

第三は **「多極モデル市場」 の形成** だ。2025 年までの AI モデルの真のフロンティアは事実上 3 ~ 4 社 (OpenAI, Anthropic, Google DeepMind, xAI) の競争だった。Microsoft の MAI シリーズが 5 社目として合流し、Meta の Llama 4, DeepSeek の V4, Mistral の Large 3 が同時期に発表されれば、市場は 7 ~ 8 社の多極競争へと変わる。多極競争の結果はモデル価格のさらなる圧力 (good) と共に各モデルの特化 (specialization) だ。一つのモデルがすべての作業を上手くこなすよりも、スロット別 (コーディング / 推論 / ビジョン / 音声) に別のモデルが優位を持つパターンが強まる。Microsoft の MAI シリーズがスロット別に分離された発表 (Code, Thinking, Image, Transcribe) であることがこのパターンの直接的表現だ。

三つが合わさると、次の 12 ヶ月の AI 産業の最大の単一変数は「外部モデル会社の売上チャネルがどこへ移るか」だ。そしてその変数の答えがモデル会社の次の資金調達ラウンド, 人材採用, モデル開発サイクルの単価に直接影響する。

## 結論 — '6 週間で到着した答え' の本当の重み

6 月 3 日の二つの発表が HN の合計 546 点を集めた本当の理由は、それが 5 月 22 日の事件への「6 週間での答え」という事実そのものだ。Microsoft は社内 Claude Code 単位経済学の危機をゲートウェイ制御で解き、そのゲートウェイの裏に自社モデル二つを即座に敷いた。危機の診断 → ゲートウェイ決定 → 自社モデル投入の三段階が 6 週間で終わったのは — もし本当に検証を通過するなら — 産業サイクルの最も速い応答の一つだ。

この診断が実務者に投げかけるメッセージは二つに分かれる。第一に、AI コーディングツールの採択判断を 6 ヶ月以上の時間単位で計画しないこと。ツールのデフォルトモデルが 6 週間で自社モデルに置き換えられ得るし、その置換は単純なバックエンド変更ではなく使用強度 / 単価 / 品質の分布全体に影響を与える。ツール評価は四半期単位で再実施されるのが正常だ。

第二に、外部モデル会社に深い依存度を持つ製品 / ビジネスを運用中なら、ゲートウェイ会社の自社モデル投入パターンを直接モニターする。AWS Bedrock 上の自社モデル (Amazon Nova), Google Cloud 上の自社モデル (Gemini), Azure 上の MAI シリーズ — 三つのゲートウェイがすべて自社モデルスロットを敷いている。外部モデルのデフォルト位置が 6 ~ 12 ヶ月以内に再交渉される可能性が非常に高い。

最後に一つの問いを投げかけて閉じる。我々が外部モデル (Claude, GPT) の上に作った製品が、その外部モデル会社の優位がゲートウェイ会社の自社モデルに部分代替されるシナリオでどう作動するか。そのシナリオを事前にシミュレートしていない状態でゲートウェイ会社のデフォルト変更が起きれば、我々の製品単価 / 品質 / 使用パターンが一週間で変わる。6 月 3 日の発表はそのシナリオの最初の大きな測定値だ。

---
出典:
- https://microsoft.ai/news/introducingmai-code-1-flash/
- https://microsoft.ai/news/introducing-mai-thinking-1/
- HN discussion: https://news.ycombinator.com/item?id=48374466
- HN discussion: https://news.ycombinator.com/item?id=48374362
