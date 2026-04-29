---
title: 'CLIの帰還 — Google Workspace CLI（gws）が示す「Agent First CLI」時代'
description: '2026年、GoogleがGmail・Drive・Sheets・Calendarをひとつのコマンドラインに統合した。しかし、このCLIの本当のユーザーは人間ではなくAIエージェントだ。公開からわずか3日でGitHubスター14,500個、Hacker News 1位 — CLIが帰ってきた。ただし、以前とはまったく違う理由で。'
pubDate: 2026-03-07T00:00:00.000Z
lang: ja
pairSlug: 'google-workspace-cli-agent-era'
draft: false
sourceDir: posted
---
# CLIの帰還 — Google Workspace CLI（gws）が示す「Agent First CLI」時代

> 2026年、GoogleがGmail・Drive・Sheets・Calendarをひとつのコマンドラインに統合した。しかし、このCLIの本当のユーザーは人間ではなくAIエージェントだ。公開からわずか3日でGitHubスター14,500個、Hacker News 1位 — CLIが帰ってきた。ただし、以前とはまったく違う理由で。

---

## 1. CLIが再び帰ってきた — だが今回は少し違う

CLI（Command Line Interface）は死んでいなかった。むしろ復活しつつある。

2020年代前半、ノーコード・ローコードプラットフォームの全盛期に、CLIは「開発者の古びたツール」扱いを受けていた。ZapierやMakeがドラッグ＆ドロップでワークフローを構築し、NotionやAirtableがGUIですべてを解決する世界で、ターミナルにコマンドを打つ行為は時代錯誤に見えた。

ところが、AIエージェント時代が幕を開けたことで状況は完全にひっくり返った。**AIエージェントにとってGUIは非効率の極みだ。** エージェントはボタンをクリックしたりドラッグ＆ドロップしたりする必要がない。構造化された入力を与え、構造化された出力を受け取ること — それがエージェントにとって最も自然なインターフェースだ。そしてそれこそがCLIである。

Vercel CEOのGuillermo Rauchは、gws公開直後にX（Twitter）でこう宣言した。

> **「2026 is the year of Skills & CLIs」**

CLIが人間のオペレーターとAIエージェントの双方にとって、クラウドサービスとの**基本インターフェース**になりつつあるという宣言だ。そしてGoogleがこの流れのど真ん中に飛び込んできた。

---

## 2. gwsとは何か — ひとつのCLIでGoogle Workspace全体を

2026年3月5日、Googleの`googleworkspace` GitHub Organization配下で**Google Workspace CLI（コマンド名：`gws`）**が公開された。Rustで書かれ、npmで配布され、Apache 2.0ライセンスのオープンソースだ。

```bash
npm install -g @googleworkspace/cli
```

この1行でインストールは完了する。そしてこのひとつのCLIでアクセスできるサービスの一覧が圧倒的だ。

| サービス | できること |
|----------|-----------|
| **Google Drive** | ファイル・フォルダのCRUD、権限管理、検索 |
| **Gmail** | メッセージの読み取り・送信、ラベル管理、スレッド検索 |
| **Google Calendar** | イベントの作成・編集、カレンダー管理 |
| **Google Sheets** | スプレッドシートの作成、セルの読み書き、範囲操作 |
| **Google Docs** | ドキュメントの作成・編集 |
| **Google Chat** | スペース管理、メッセージ送信 |
| **Admin Console** | ユーザー・グループ・デバイス管理 |
| **+ 20以上** | YouTube、Forms、Classroomなど |

ここで重要なのは、**これらのコマンドが静的にコーディングされたものではないという点**だ。gwsはGoogleのDiscovery Serviceをランタイムに読み取り、コマンド表面（command surface）を**動的に生成**する。Googleが新しいAPIを追加すれば、gwsはコード変更なしに24時間のキャッシュ更新後、自動的にそのAPIをサポートする。これは従来のCLIツールとは根本的に異なるアプローチだ。

**すべての出力はJSONだ。** 人間に優しいテーブルフォーマットではなく、機械がパースしやすい構造化データがデフォルトである。gwsの設計者自身が明かした哲学がこれを端的に示している。

> 「Humans hate writing nested JSON in the terminal. Agents prefer it.」

人間はターミナルでネストされたJSONを書くのを嫌がる。エージェントはそれを好む。gwsはエージェントのために作られたCLIだ。

ただし、重要な注意点がある。gwsは**Google公式製品ではない。** GitHubリポジトリに「Not an officially supported Google product」と明記されており、GIGAZINEはこれを「特定の社員が運営する趣味的プロジェクト（hobby-oriented project run by certain employees）」と評している。現在のバージョンは0.4.4で、まだ初期段階だ。

---

## 3. 実際の使用例 — ターミナルからWorkspaceを操作する

gwsの実際の使い心地を見てみよう。まずは認証設定からだ。

```bash
# 初回のみ：Google Cloudプロジェクト作成 + API有効化（自動）
gws auth setup

# OAuthログイン
gws auth login
```

以降はWorkspace全体がターミナルの中に収まる。

### Drive — ファイル管理

```bash
# 最近のファイル10件を取得
gws drive files list --params '{"pageSize": 10}'

# ファイルアップロード
gws drive files create --json '{"name": "report.pdf"}' --upload ./report.pdf

# 全ファイルのストリーミング（自動ページネーション）
gws drive files list --params '{"pageSize": 100}' --page-all | jq -r '.files[].name'
```

### Sheets — スプレッドシート操作

```bash
# 新規スプレッドシート作成
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'

# セル範囲の読み取り
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:C10"}'

# データの追加
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Name", "Score"], ["Alice", 95]]}'
```

### Chat — メッセージ送信（dry-run対応）

```bash
# 送信前のプレビュー
gws chat spaces messages create \
  --params '{"parent": "spaces/xyz"}' \
  --json '{"text": "Deploy complete."}' \
  --dry-run
```

### APIスキーマの確認

```bash
# 特定APIメソッドのパラメータ構造を確認
gws schema drive.files.list
```

`--dry-run`で実際の実行前にリクエストを確認でき、`--page-all`でページネーションを自動処理し、`gws schema`でAPI構造を即座にイントロスペクションできる。特に`--dry-run`はAIエージェントが破壊的操作を実行する前の安全装置として活用でき、エージェント時代に特に有用な機能だ。

---

## 4. AIエージェントスキル — gwsの真の武器

gwsのCLI機能だけでも十分に印象的だが、**真の差別化ポイントは100以上のAIエージェントスキル**にある。Gmail、Drive、Sheets、Docs、Calendar、Chat、Adminをカバーするこれらのスキルは、AIエージェントがGoogle Workspaceを自然言語で操作できるようにする。

### スキルのインストール

```bash
# 全スキルのインストール
npx skills add https://github.com/googleworkspace/cli

# 特定サービスのスキルのみインストール
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

### 内蔵MCPサーバー

gwsには**MCP（Model Context Protocol）サーバーが内蔵**されている。Claude Desktop、VS Code、Gemini CLIなどMCP対応アプリケーションと直接接続が可能だ。これが意味するところは大きい — Claude Codeで「今月の営業レポートをDriveから探して要約して」と言えば、ClaudeがgwsのMCPサーバーを通じてDriveを検索し、ファイルを読み、要約を生成できるということだ。

### 主要AIエージェントとの連携

| エージェントプラットフォーム | 連携方式 |
|--------------------------|---------|
| **Claude Desktop / Claude Code** | MCPサーバー直接接続 |
| **Gemini CLI** | `gemini extensions install` |
| **OpenClaw** | スキルのシンボリックリンク |
| **VS Code (Copilot)** | MCPプロトコル |

Gemini CLIとの連携は特に興味深い。

```bash
gws auth setup
gemini extensions install https://github.com/googleworkspace/cli
```

この2行でGeminiがGoogle Workspace全体にアクセスできるようになる。Google側からすれば、自社AIと自社生産性ツールをCLIひとつで接続する戦略的な布石でもある。

Hacker Newsのあるコメントは、このアプローチの効率性をこう評価した。

> 「MCPs are bloated, insecure token hogs. CLIs are easy to write.」

MCPサーバーを別途構築するよりも、CLIベースのアプローチがトークン効率的で保守しやすいという主張だ。gwsはMCPサーバーを内蔵しつつも、CLI自体がエージェントのツールとして機能する二重構造を採っている。

---

## 5. gcloudとの違い — 設計思想の根本的な差異

「すでにgcloudがあるのになぜまたCLIを作ったのか？」 — 最もよく出る質問だ。答えはシンプルだ。**対象そのものが違う。**

| 項目 | gws | gcloud |
|------|-----|--------|
| **対象サービス** | Google Workspace（Drive、Gmail、Sheetsなど） | Google Cloud Platform（Compute、Storage、BigQueryなど） |
| **APIカバレッジ** | Discovery Serviceから動的生成 → 自動更新 | 静的コマンドセット → 手動更新 |
| **設計思想** | **Agent First** — JSON入出力がデフォルト | **Human First** — フラグベース、読みやすい出力 |
| **エージェントスキル** | 100+内蔵 | なし |
| **MCP対応** | 内蔵 | なし |
| **認証** | 独自OAuth + gcloud連携可 | Google Cloud SDK認証 |
| **言語** | Rust | Python |
| **配布** | npm | 独立インストーラ |

gcloudは人間のDevOpsエンジニアがクラウドインフラを管理するためのツールだ。`gcloud compute instances list`を叩けば人が読みやすいテーブルが出力される。一方gwsは最初からAIエージェントがGoogle Workspaceのデータを操作するためのツールとして設計された。すべての入力は`--json`と`--params`で構造化されており、すべての出力はパース可能なJSONだ。

**動的API生成というアーキテクチャの選択も核心的だ。** gcloudは新しいGCPサービスが追加されるたびにCLIチームがコマンドを手動で実装する必要がある。gwsはGoogleのDiscovery Serviceをランタイムに読み取るため、Google Workspaceに新しいAPIが追加されれば自動的に反映される。この違いはエージェントエコシステムにおいて決定的だ — エージェントは常に最新のAPIにアクセスできる。

ひと言でまとめると：**gcloudは人間のためのCloud CLIであり、gwsはエージェントのためのWorkspace CLIだ。** 競合ではなく補完関係にある。

---

## 6. Zapier/Makeキラーなのか？ — 競争構図とコスト方程式

gws公開後、すぐに持ち上がった疑問がある。「これはZapier/Makeの代替なのか？」

結論から言えば、**直接的な代替ではないが、特定のユースケースでは確実に脅威となる。**

| 項目 | gws CLI | Zapier | Make |
|------|---------|--------|------|
| **コスト** | 無料（オープンソース） | 月額$49〜（Pro） | 月額$16〜（Core） |
| **統合方式** | CLI + JSON、直接API呼び出し | GUIワークフロービルダー | ビジュアルシナリオビルダー |
| **対象ユーザー** | 開発者、AIエージェント | 非技術〜技術ユーザーすべて | 非技術〜技術ユーザーすべて |
| **連携範囲** | Google Workspaceのみ | 7,000+アプリ | 2,000+アプリ |
| **AIエージェント連携** | MCPサーバー内蔵、100+スキル | 別途AIプラグイン | AIモジュール提供 |
| **自動化方式** | 自然言語プロンプト → CLIコマンド | トリガー・アクションチェーン | ビジュアルシナリオ |

**gwsが有利なシナリオ：**
- Google Workspace内で完結する自動化（Gmail → Sheets → Calendar）
- AIエージェント主導のワークフロー
- コストに敏感なスタートアップや個人開発者
- プロンプト1行で複雑な作業を実行したい場合

**Zapier/Makeが依然として強いシナリオ：**
- Salesforce、Slack、HubSpotなどGoogle外部アプリとの連携
- 非開発者が自動化を構築する必要がある場合
- エンタープライズレベルのエラーハンドリングとモニタリングが必要な場合

ワークフロー自動化SaaS市場は2023年の約138億ドルから2028年には265億ドルへと成長する見通しだ。gwsがこの市場を直接侵食するというよりは、**AIエージェントによる自動化という新たなカテゴリーを切り拓きつつ**、既存プレイヤーの戦略修正を余儀なくさせる役割を果たすだろう。

特に注目すべきはコスト構造の違いだ。Zapier Proが月額49ドル、Make Coreが月額16ドルなのに対し、gwsは完全無料だ。Google Workspaceを主に使うチームであれば、AIエージェント + gwsの組み合わせで月に数十〜数百ドルの自動化コストを削減できる。「単一のシステムプロンプトでエンドツーエンドのワークフローオーケストレーション」が可能になり、サードパーティのルーターを経由する必要がなくなるシナリオが現実のものとなりつつある。

---

## 7. コミュニティの反応と限界 — 熱狂と現実のあいだ

### 爆発的な反応

gwsに対するコミュニティの反応は異例だった。

- **Hacker News 1位** — 936ポイント、289件のコメント
- **GitHubスター** — 公開からわずか3日で**14,500個**突破
- **Vercel CEOのGuillermo Rauch**がX上で直接推薦
- **VentureBeat、Ars Technica、PCWorld、MarkTechPost**など主要テックメディアが一斉に報道

Hacker Newsのあるコメントはgwsをこう例えた。

> 「This is like terraform, but for Google Drive files.」

インフラをコードで管理するように、Google WorkspaceのデータをCLIで管理する時代が来たということだ。

### 冷静な現実 — OAuth設定の壁

しかし、熱狂の裏には冷静な現実がある。**最も多く議論されたのはOAuth認証設定の複雑さ**だ。

gwsを使うにはまずGoogle Cloud Consoleでプロジェクトを作成し、OAuth同意画面を設定し、クライアントIDを作成する必要がある。`gws auth setup`がこのプロセスを自動化しようとするが、現実はそう甘くない。

**主な課題：**

1. **Google Cloudプロジェクトの作成が必要** — 非技術者にとっては越えがたい最初のハードルだ。Hacker Newsのあるユーザーはこう嘆いた。*「All of that went away when I realized you need to create an app in GCP.」*

2. **スコープ過多問題** — デフォルトの推奨スコープが85個の権限を要求する。未検証アプリは約25スコープに制限され、認証失敗が頻発する。解決策は`gws auth login --scopes drive,gmail,sheets`で必要なサービスのみ指定することだ。

3. **Advanced Protectionユーザーのブロック** — Googleの高度な保護プログラムを使用するアカウントは`policy_enforced`エラーで完全にブロックされる。

4. **設定にかかる時間** — あるユーザーが公式ドキュメントに沿って基本設定に**45分を要した**と報告している。

5. **OAuthクライアントタイプの注意点** — 必ず「Desktop app」タイプで作成する必要があり、そうしないと`redirect_uri_mismatch`エラーが発生する。

### 構造的リスク — 公式製品ではないという限界

gwsの最大の構造的リスクは**Google公式製品ではないという点**だ。Google社内のDevRelチーム所属の開発者たちによるプロジェクトであり、正式なプロダクトチームの所有ではない。これは2つの懸念を生む。

- **長期的な保守の不確実性** — Googleの「プロジェクト墓場（Google Graveyard）」は有名だ。公式製品でさえ頻繁に終了するGoogleで、非公式プロジェクトの寿命をどう保証できるのか。
- **プロダクション依存のリスク** — コア業務の自動化をこのツールに依存した結果、ある日突然メンテナンスが停止される可能性がある。

現在のバージョン0.4.4という数字がこの状態をよく物語っている。ポテンシャルは圧倒的だが、プロダクションへの依存はまだ時期尚早だ。

---

## 8. 示唆するもの — 「Agent First CLI」トレンドが意味すること

gwsは単独のプロダクトとしての意味を超え、**より大きなトレンドの狼煙**だ。

### トレンド1：CLIはエージェントの言語である

2025年後半から明確になったパターンがある。**主要SaaSが競うようにCLIまたはCLI的インターフェースをリリース**しているのだ。その理由は同じ — AIエージェントにサービスを公開する最も効率的な方法がCLIだからだ。

GUIは人間の視覚・運動能力に最適化されている。APIは開発者がコードを書く必要がある。CLIはその中間 — **自然言語に近いコマンド体系でありながら、同時に完全に構造化されたインターフェース**だ。AIエージェントが最も自然に扱える形態である。

### トレンド2：Discovery-based Architecture

gwsの動的API生成方式は、今後多くのCLIツールが追随するパターンだ。APIが変わるたびにCLIをアップデートするのではなく、**APIスキーマをランタイムに読み取ってCLIを自動生成**する。これはエージェントエコシステムにおいて特に重要だ — エージェントは常に最新の状態のツールにアクセスする必要があるからだ。

### トレンド3：コスト構造の転覆

Zapier月額49ドル vs gws無料。このコスト差が示唆するところは大きい。**プラットフォーム企業が自社エコシステムのエージェントアクセシビリティを高めるために統合ツールを無料提供**し始めると、サードパーティ自動化プラットフォームのビジネスモデルが根本から揺さぶられることになる。

Googleだけの話ではない。MicrosoftがGraph APIのエージェントアクセシビリティを高め、SalesforceがAIエージェント用CLIをリリースするのは時間の問題だ。Gartnerは2028年までに企業の75%がAIエージェントを運用化すると予測している。このエージェントたちが使うツールの提供者が誰なのかをめぐって、プラットフォーム戦争が繰り広げられている。

### 開発者にとっての意味

gwsの公開が開発者に投げかけるメッセージは明確だ。

1. **CLI能力を再評価せよ。** エージェント時代においてCLIは「オールドスクール」な技術ではなく、コアとなるインターフェースパラダイムだ。シェルスクリプティング、JSON処理、パイプライン構成のスキルが再び重要性を増している。

2. **MCPを理解せよ。** gwsのMCPサーバー内蔵は偶然ではない。MCPはAIエージェントと外部ツールを接続する事実上の標準となった。自分が作るサービスにもMCPインターフェースの提供を検討すべきだ。

3. **「Agent First」設計を始めよ。** APIを設計する際、人間の開発者だけでなくAIエージェントを第一級市民（first-class citizen）として考慮せよ。JSON入出力、スキーマイントロスペクション、dry-runモード — gwsが示した設計パターンが基準となるだろう。

4. **認証UXを解決せよ。** gwsが最も批判された点がOAuth設定の複雑さだった。どんなに優れたツールでも設定に45分かかれば普及は遅れる。エージェント時代の認証UXはまだ未解決の課題だ。

---

## まとめ — CLIは死んでいなかった、進化していた

Google Workspace CLIの公開は、ひとつのツールのリリース以上の意味を持つ。これは**ソフトウェアインターフェースのパラダイムが転換しつつあるというシグナル**だ。

GUI → API → CLI。この循環が再び巡ってきたのではない。**GUI（人間用）+ CLI（エージェント用）の二重インターフェース**が新たな標準になりつつある。人間は相変わらず美しい画面でクリックし、エージェントはその裏でCLIを通じて実際の作業を遂行する。

gwsは現在バージョン0.4.4の実験的プロジェクトだ。OAuth設定は複雑で、公式製品でもない。しかし14,500個のGitHubスターとHacker News 1位という反応は、開発者コミュニティがこの方向性に賛同していることを示している。

**2026年、CLIが帰ってきた。今度はAIエージェントを乗せて。**

Google Workspaceの30億アカウントがひとつのターミナルコマンドで開く世界。その鍵はまだ少し硬いが、扉は確実に開いた。
