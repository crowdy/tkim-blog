---
title: '人間かAgentか分からない時代 — "API First"の次、"Agent First"の世界'
description: '私たちのウェブサイトの「顧客」が変わりつつある。2025年、ウェブトラフィック全体の過半数がボットとなった今、次の顧客はブラウザを手にした人間ではなく、APIを呼び出すAI Agentかもしれない。'
pubDate: 2026-03-07T07:00:46.000Z
lang: ja
pairSlug: 'agent-first-era'
draft: false
sourceDir: posted
---
# 人間かAgentか分からない時代 — "API First"の次、"Agent First"の世界

> 私たちのウェブサイトの「顧客」が変わりつつある。2025年、ウェブトラフィック全体の過半数がボットとなった今、次の顧客はブラウザを手にした人間ではなく、APIを呼び出すAI Agentかもしれない。

---

## 1. すでに変わった — トラフィックの過半数がボットの時代

まず数字を見てみよう。

- **ウェブトラフィック全体の51%がボット** — Imperva 2025 Bad Bot Reportによると、2024年時点で自動化されたボットトラフィックが人間のトラフィックを初めて上回った。
- **GPTBotトラフィック305%増加** — Cloudflare 2025 Year in Reviewは、AI学習用クローラーの爆発的な増加を報告した。
- **ユーザー代行AI Agentトラフィック15倍増加** — 単純なクローリングではなく、人間の代わりにウェブを*利用する*Agentが急増している。

わずか2〜3年前までは「ボットトラフィック」といえばスパムボットやスクレイパーを思い浮かべていた。しかし今のボットは違う。ChatGPTがユーザーの質問に答えるためにリアルタイムでウェブを検索し、OpenAI Operatorがユーザーの代わりに航空券を予約し、GoogleのProject Marinerがショッピング比較を代行する。**ウェブサイトの「顧客」が根本的に変わりつつあるのだ。**

---

## 2. AI Agentがウェブを使う3つの方法

AI Agentのウェブアクセスは3つのカテゴリに分かれる。

### (a) 学習/スクレイピング・クローラー
GPTBot、ClaudeBot、Google-Extendedなどが LLMの学習データを収集する。robots.txtで制御可能だが、これを無視するクローラーも増加傾向にある。Akamaiの2025年レポートによると、AIボットネットは既存のWAFを回避する新たなパターンを示している。

### (b) 検索/推論ボット
Perplexity、Google AI Overview、Bing Copilotなどが、ユーザーの質問に答えるためにリアルタイムでウェブコンテンツを読み取り要約する。これらが生成する回答が元のサイトのトラフィックを代替し、**Zero-click検索が約60%に達している**（SparkToro 2024）。

### (c) ユーザー代行Agent
OpenAI Operator、Google Project Mariner、Anthropic Computer Useがユーザーに代わってウェブ上で作業を実行する。ログインし、フォームを入力し、決済まで行う。

**カテゴリ(c)が最も急速に成長しており、ビジネスインパクトも最大だ。** これらのAgentは単に情報を読むのではなく、*取引*を実行する。SalesforceのCyber Week 2025データによると、AI Agentが全注文の約20%に影響を与え、約670億ドル規模の売上に相当する。

---

## 3. "API First"から"Agent First"へ — 世界の動き

この変化に対応する動きはすでに世界中で加速している。

### GMO Internet Group — "GMO API First"
日本のGMO Internet GroupはAPI First戦略を掲げ、全社的な転換を推進中だ。決済サービスfincode byGMOは**日本初のPSP（Payment Service Provider）としてMCP（Model Context Protocol）をサポート**（2025年6月）し、AI Agentが決済機能に直接アクセスできるようにした。MCPサーバーはGitHubでオープンソースとして公開されている。

### Shopify — Universal Commerce Protocol (UCP)
ShopifyはGoogleと共同でUCPを発表した。AI Agentが商品検索から決済まで全プロセスを自動化できる標準プロトコルだ。数百万のShopifyストアが一度にAgent-readyになるということだ。

### Stripe + OpenAI — Agentic Commerce Protocol (ACP)
StripeとOpenAIが共同開発したACPは、ChatGPT内での即時決済を可能にする。ユーザーが「この商品を購入して」と言えば、Agentが決済まで完了する世界だ。

### Cloudflare — 二重インターフェース戦略
Cloudflareは最も実用的なアプローチを取った。同じURLに対して**人間にはHTMLを、AgentにはMarkdownを返す**Content Negotiationをサポートする（`Accept: text/markdown`）。同時に、AIクローラーの無断スクレイピングには**デフォルトブロック**で対応し（2025年7月〜）、正当なアクセスにはHTTP 402 + Pay-Per-Crawlマーケットプレイスを通じて課金モデルを提示した。

### Microsoft — "Open Agentic Web"宣言
MicrosoftはBuild 2025で「オープン・エージェンティック・ウェブ（Open Agentic Web）」を宣言し、Azure AI Foundry Agent Serviceを通じてエージェントインフラプラットフォームの提供を開始した。

### Google — A2A + WebMCP
GoogleはAgent間通信標準であるA2A（Agent-to-Agent）プロトコルを発表し、Linux Foundationに寄贈した。Chrome 146 CanaryにはWebMCPが搭載され、ブラウザ自体がAgentのツールとなる。

### Anthropic — MCPの事実上の標準化
Anthropicが開発したMCP（Model Context Protocol）は、Agentが外部ツールやデータに接続するための事実上の標準となった。2025年12月にLinux FoundationのAAIF（Agentic AI Foundation）に寄贈され、ベンダー中立的な標準として確立された。

### 日本デジタル庁 — Base RegistryのAPI化
日本のデジタル庁は2026年3月を目標に、Base Registry（法人番号、住所などの基礎データ）のAPI化を推進中だ。政府データもAgentがアクセスできる時代が開かれつつある。

---

## 4. 準備すべきこと — 技術編

### 4-1. プロトコルと標準への対応

現在Agent関連プロトコルは乱立状態だが、2026年に入り統合の趨勢が明確になっている。各プロトコルの役割と優先度を整理すると以下の通りだ。

| プロトコル | 役割 | 優先度 |
|----------|------|--------|
| **MCP** (Anthropic → AAIF) | Agent ↔ Tool/Data 接続 | ★★★ 必須 |
| **A2A** (Google → Linux Foundation) | Agent ↔ Agent 通信 | ★★☆ 注視 |
| **WebMCP** (W3C) | Agent ↔ Browser 統合 | ★☆☆ 様子見 |
| **llms.txt** | AI発見用サイトマップ | ★★☆ 導入容易 |
| **Schema.org / JSON-LD** | 構造化データ | ★★★ 必須 |

MCPはすでに事実上の標準となっており、Schema.org/JSON-LDは既存のSEOインフラの上に構築できるため即座に導入可能だ。llms.txtは実装が簡単でありながら、AIクローラーのコンテンツ理解度を大幅に向上させることができる。

### 4-2. インフラの変化

**Content Negotiation対応**
`Accept: text/markdown`ヘッダーを送信するAgentに対して構造化されたMarkdownを返す。Cloudflareを使用しているなら自動変換機能を有効化できる。同じURLで人間とAgentにそれぞれ最適化されたコンテンツを提供することが鍵だ。

**API Gateway → Agent Gateway**
既存のAPI GatewayにAgent専用ルーティング、レート制限、課金ロジックを追加する。人間のブラウザリクエストとAgentのAPIリクエストを区別し、それぞれに最適化されたレスポンスを提供する。

**認証体系の進化**
OAuth 2.1にAgent委任（delegation）拡張がIETFドラフトとして進行中だ。Agentがユーザーに代わって認証し、委任チェーンを追跡できる体系が必要となる。W3CではAI Agent Protocol Community Groupが設立され、標準化の議論が始まった。

**Headless Architecture**
UIレイヤーとデータ/ビジネスロジックを分離するHeadless Architectureが、Agent時代にはさらに重要になる。AgentにUIは不要だ。データに直接、構造化された形でアクセスできなければならない。

### 4-3. セキュリティ対応

**Prompt Injection防御**
OWASP LLM Top 10の第1位の脆弱性だ。ウェブコンテンツに埋め込まれた悪意あるプロンプトがAgentの行動を操作する可能性がある。出力データのサンドボックス化とAgent入力の検証が必須だ。

**Web Bot Auth — 信頼できるAgentの識別**
Cloudflareが提案したWeb Bot Authは、暗号学的署名でAgentの身元を検証する。「このリクエストはOpenAI Operatorが田中太郎ユーザーに代わって送信したもの」であることを証明できる仕組みだ。

**Zero Trust for Agents**
Agentにも Zero Trust原則を適用する。最小権限（Least Privilege）、短期トークン（Short-lived Token）、委任チェーン追跡（Delegation Chain Tracking）が核心だ。

---

## 5. 準備すべきこと — ビジネス編

### 5-1. SEOからGEO（Generative Engine Optimization）へ

> 「AIが100ms以内にデータ構造を理解できなければ、未来の検索であなたのブランドは存在しないことになる。」

従来のSEOは検索結果ページでの順位争いだった。しかしAIが回答を直接生成する時代には、**AIに引用（citation）されること**が新しいSEOだ。Zero-click検索が約60%に達し、ユーザーが元のサイトを訪問しなくてもAIが情報を伝える構造が定着しつつある。

GEOのための核心戦略：
- **構造化データ**: Schema.org、JSON-LDでAIがパースしやすい形でコンテンツを提供
- **llms.txt**: AIクローラー専用サイトマップで核心コンテンツの発見性を向上
- **権威ある引用**: 信頼できるソースからの引用がAI回答に含まれる確率を高める

### 5-2. 収益モデルの再設計

AI Agentは広告を見ない。既存の広告ベースの収益モデルが根本的に揺らいでいる。

**新しい収益モデル**:
- **Crawl Licensing**: コンテンツへのアクセス権をライセンスとして販売（CloudflareのPay-Per-Crawlが代表的）
- **Agent Accessの課金**: API形式でデータを提供し、呼び出し量に応じて課金
- **プロトコルベースのコマース**: Shopify UCP、Stripe ACPのようにAgentが直接取引を実行する新たなコマースチャネル

AI検索広告市場は2025年の約11億ドルから2029年には260億ドルへと急成長が予測されている。新しい広告形態が登場するだろうが、その前にコンテンツ事業者は代替的な収益源を確保しなければならない。

### 5-3. 「エージェンティック・コマース」への備え

数字が物語っている：
- **Salesforce**: AI Agentが2025年Cyber Week注文の約20%に影響、670億ドルの売上規模
- **Bain & Company**: 2030年までに米国Eコマース売上の15〜25%をエージェンティックAIが担う見通し（3,000〜5,000億ドル規模）
- **Gartner**: 2028年までにAI Agentが人間の営業担当者数の10倍に達すると予測

エージェンティック・コマースで勝つために：
1. **Agent-friendlyな商品データ**: 構造化されたカタログ、明確な価格/在庫API
2. **プロトコル対応**: MCP、UCP、ACPなどを通じたAgent直接取引のサポート
3. **Agent専用UX**: 人間用UIとは別に、Agentが効率的に探索・比較・購入できるインターフェース

---

## 6. 結論：「Agent-Responsive Design」の時代

2010年代、モバイル革命は**Mobile-Responsive Design**を必須にした。ウェブサイトは小さな画面にも最適化される必要があった。

2020年代半ば、AI Agent革命は**Agent-Responsive Design**を求めている。ウェブサイトはもはや「人間が読むマガジン」ではなく、**「Agentが参照するデータノード」**でもあるのだ。同じコンテンツを人間には美しいUIで、Agentには構造化データで提供する二重インターフェースが当たり前になる。

GMO Internet GroupのAPI First戦略は、この時代の正確な方向性を捉えている。APIがあってこそAgentがアクセスでき、Agentがアクセスできてこそ未来の顧客と出会うことができる。

### 今すぐできる3つのこと

| 順序 | アクション | 難易度 | 効果 |
|------|------|--------|------|
| 1 | **llms.txt配布 + Schema.org構造化データの強化** | 低 | AI検索露出が即座に向上 |
| 2 | **コアサービスのMCP Server提供を検討** | 中 | Agentエコシステムへの参入 |
| 3 | **Content Negotiation対応**（Markdown for Agents） | 中 | 人間/Agent二重対応 |

「Mobile-First」に乗り遅れた企業がモバイル時代に取り残されたように、「Agent-First」に乗り遅れればAI Agent時代に見えない存在になる。**今こそ準備する時だ。**

---

## 参考資料

- [Imperva, *2025 Bad Bot Report*](https://www.imperva.com/blog/2025-imperva-bad-bot-report-how-ai-is-supercharging-the-bot-threat/)
- [Cloudflare, *"From Googlebot to GPTBot: Who's Crawling Your Site in 2025"*](https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/)
- [Cloudflare, *Radar 2025 Year in Review*](https://blog.cloudflare.com/radar-2025-year-in-review/)
- [Cloudflare, *"Content Independence Day"*](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/)
- [Salesforce, *Cyber Week 2025 Press Release*](https://www.salesforce.com/news/press-releases/2025/12/05/cyber-week-ai-agents-sales/)
- [McKinsey, *"The Agentic Commerce Opportunity"*](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants)
- [Bain & Company, *"2030 Forecast: How Agentic AI Will Reshape US Retail"*](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/)
- [Gartner, *AI Agents Will Outnumber Sellers by 10x by 2028*](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-predicts-by-2028-ai-agents-will-outnumber-sellers-by-10x)
- [eMarketer, *GenAI Search Advertising Trends 2025*](https://www.emarketer.com/content/genai-search-advertising-trends-2025)
- [SparkToro, *2024 Zero-Click Search Study*](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/)
- [Shopify Engineering, *"Building the Universal Commerce Protocol"*](https://shopify.engineering/ucp)
- [Stripe, *"Developing an Open Standard for Agentic Commerce"*](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Microsoft, *"Build 2025: The Age of AI Agents and Building the Open Agentic Web"*](https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/)
- [Linux Foundation, *Agentic AI Foundation設立*](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [W3C, *AI Agent Protocol Community Group*](https://www.w3.org/community/agentprotocol/)
- [GMO-PG, *fincode byGMO MCPサポート*](https://www.gmo-pg.com/en/news/press/gmo-paymentgateway/2025/0619.html)
