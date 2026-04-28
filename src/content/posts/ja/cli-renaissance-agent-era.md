---
title: 'CLIルネサンス — AIエージェント時代、ターミナルが再び世界の中心となった理由'
description: 'GUIの時代は終わっていない。だがAIエージェントにボタンをクリックさせるわけにはいかない。2026年、開発者たちが愛してきたCLIツールがAIエージェントの「手足」となり、ターミナルが再びソフトウェア開発の中心に帰ってきた。'
pubDate: 2026-03-09T12:34:55.073Z
lang: ja
pairSlug: 'cli-renaissance-agent-era'
draft: true
sourceDir: draft
---
# CLIルネサンス — AIエージェント時代、ターミナルが再び世界の中心となった理由

> GUIの時代は終わっていない。だがAIエージェントにボタンをクリックさせるわけにはいかない。2026年、開発者たちが愛してきたCLIツールがAIエージェントの「手足」となり、ターミナルが再びソフトウェア開発の中心に帰ってきた。

---

## 1. なぜ今、CLIなのか

CLI（Command Line Interface）はコンピューティングにおける最も古いインターフェースだ。1970年代のUnixシェルから始まり、半世紀を生き延びてきた。ところが2025年から奇妙な現象が起きている。**CLIが単に生き残っているのではなく、爆発的に成長している。**

The New Stackは2025年末の記事でこの現象を**「Agentic CLI Era（エージェンティックCLI時代）」**と名付けた。2025年のStack Overflow調査でVim/Neovimの使用率が合算38.3%と前年比で上昇したことも、開発者がターミナルベースのワークフローへ回帰しつつあることを示すシグナルだ。

理由はシンプルだ。**AIエージェントにとってCLIが最も自然なインターフェース**だからだ。

APIを直接呼び出すには認証ヘッダー、ページネーション、エラーハンドリング、SDKバージョン管理などのボイラープレートが必要だ。MCP（Model Context Protocol）サーバーを使えばツールスキーマだけで数万トークンが消費される。だがCLIは？ LLMはすでに数十億行のターミナルインタラクションデータで訓練されている。`git`、`docker`、`kubectl`、`gh` — **モデルの訓練データ自体がCLIのドキュメント**なのだ。

ある実務者の言葉がこの状況を的確に要約している。

> 「The model already knows how to use grep. It doesn't need a JSON schema to tell it.」

モデルはすでにgrepの使い方を知っている。JSONスキーマで説明してやる必要はない。

---

## 2. 開発者が愛するCLIツール — カテゴリ別整理

現在開発者が日常的に使っているCLIツールをカテゴリ別に見ていこう。これらのツールのひとつひとつがAIエージェントの「スキル」となっている。

### クラウドCLI — インフラをターミナルから

| ツール | 対象 | キラーフィーチャー |
|--------|------|-------------------|
| **aws** | AWS（200+サービス） | `--query` JMESPathで出力フィルタリング、最も広いサービスカバレッジ |
| **gcloud** | Google Cloud | 最も一貫したコマンド設計、`gcloud run deploy --source .` 1行デプロイ |
| **az** | Microsoft Azure | Azure AD/Entra ID統合、エンタープライズ環境に最適 |
| **vercel** | Vercel | `vercel` 一語でフレームワーク検出→ビルド→デプロイ完了 |
| **flyctl** | Fly.io | `fly launch --now`でDocker検出→グローバルエッジデプロイ |
| **railway** | Railway | `railway up`でDockerfile不要デプロイ、月1,000万デプロイ処理 |

この中で`gcloud`は3大クラウドCLIの中で最も設計が優れているとの評価を受けている。すべてのサービスが`gcloud [サービス] [リソース] [アクション]`という一貫したパターンに従う。AIエージェントが新しいサービスのコマンドを**推論**しやすい構造だ。

```bash
# gcloud：一貫したパターンの例
gcloud compute instances list
gcloud run services list
gcloud functions list
# パターンが同一 → エージェントが推論可能
```

### Gitプラットフォーム CLI — PRとイシューをターミナルから

**gh（GitHub CLI）** — 42,900スター、v2.87.3（2026年2月）

GitHubの公式CLIはClaude Codeが最も多く使う外部ツールのひとつだ。PRの作成、イシュー管理、Actionsの確認、コードレビューまでブラウザを開く必要がない。

```bash
# PR作成から自動マージまで1行
gh pr create --fill && gh pr merge --auto --squash

# JSON出力で必要なフィールドだけ抽出
gh pr list --json number,title,state | jq '.[] | select(.state=="OPEN")'
```

`gh`の`--json`フラグはAIエージェント時代に特に輝く。人間が読みやすいテーブル出力の代わりに、機械がパースしやすいJSONを返す。フィールド選択も可能で、不要なトークン消費を最小化できる。

**glab（GitLab CLI）** — GitLab公式CLI

```bash
# MR作成 + CI状態のリアルタイムモニタリング
glab mr create --fill --yes && glab ci status --live
```

`glab ci view`はCI/CDパイプラインの状態をターミナルでリアルタイム表示する。GitLab UIを開かずとも、失敗したjobのログを即座に確認できる。

### コンテナ/インフラ CLI — インフラをコードで

| ツール | GitHubスター | キラーフィーチャー |
|--------|-------------|-------------------|
| **docker** | 71,500 | `docker compose up` — YAML一枚でマルチサービス環境構築 |
| **kubectl** | 110,000+ | `kubectl apply -f` — 宣言的状態管理のスタンダード |
| **terraform** | 47,900 | `terraform plan` — インフラ変更のdiffプレビュー |
| **pulumi** | 21,000 | 実際のプログラミング言語（TS/Python/Go）でIaCを記述 |

Terraformの`plan` → `apply`パターンはAIエージェントにとって特に重要だ。エージェントがインフラを変更する前に**何が変わるかをまず確認**できるからだ。gwsの`--dry-run`、`gh`の`--dry-run`など、多くのCLIツールがこのパターンを採用している。

### パッケージ/ランタイム CLI — 速く、もっと速く

| ツール | 特徴 | 速度 |
|--------|------|------|
| **npm** | 250万+パッケージ、Node.js標準搭載、`npx`でインストール不要実行 | ベースライン |
| **bun** | オールインワンランタイム+バンドラ+テスト+パッケージマネージャ | npm比20〜40倍速いinstall |
| **cargo** | Rustビルドシステム、テスト・ベンチマーク・ドキュメント統合 | 同クラス最強の統合体験 |
| **uv** | RustベースPythonパッケージマネージャ、pip代替 | pip比10〜100倍速いinstall |

**uv**は2024年のリリース以降、2025年に爆発的に採用された。GitHubスター75,000以上。pip、pip-tools、virtualenv、pyenv、poetryを**単一バイナリひとつで置き換える**。FastAPI、Pydanticなど主要Pythonプロジェクトがuvを採用した。

```bash
# uv：Pythonプロジェクトの初期化から実行まで
uv init myproject && uv add fastapi uvicorn && uv run fastapi dev
```

**Bun**は2025年12月にAnthropicに買収された — Anthropic史上初の買収だ。Claude CodeがBun実行ファイルとしてビルド・配布されているためだ。JavaScriptランタイムがAIエージェントインフラとなった象徴的な出来事である。

---

## 3. 2025〜2026年、新たに登場したCLIツール

2025年から2026年3月にかけて、CLIツール市場で前例のないリリースラッシュが起きた。特に**AIコーディングエージェントCLI**が新たなカテゴリーを形成した。

### AIコーディングエージェントCLI — ターミナル上のAI戦争

| ツール | リリース | GitHubスター | 核心的特徴 |
|--------|---------|-------------|-----------|
| **Claude Code**（Anthropic） | 2025.2プレビュー、2025.5 GA | 26,000+ | 最も薄いラッパー。Bashツールで既存CLI活用。$25億年間売上 |
| **Codex CLI**（OpenAI） | 2025.4 | オープンソース（Rust） | 3段階承認モード（read-only/auto/full）。ローカルエージェント |
| **Gemini CLI**（Google） | 2025.6 | 70,000+ | 最も寛大な無料ティア。100万トークンコンテキスト。拡張マーケット |
| **Copilot CLI**（GitHub） | 2025.9プレビュー、2026.2 GA | サブスクリプション制 | マルチモデル（Claude/GPT/Gemini）。Autopilotモード |
| **Goose**（Block/Square） | 2025.1 | 30,000+ | MCPネイティブ。Linux Foundationに寄贈 |
| **OpenCode** | 2025 | 95,000+ | Goベース、75+モデル対応（Ollama含む）。無料 |
| **Aider** | 2023〜、2025大幅アップデート | 41,600 | Git-first設計。AI変更＝自動コミット |

The New Stackの2026年ガイドによると、現在**15以上の本格的なAIコーディングCLIツール**が競合中だ。1年前にはこのカテゴリー自体が存在しなかった。

**Claude Codeの成長が特に注目に値する。** 2025年5月の正式リリースから6ヶ月で年間売上10億ドルを突破し、現在は約25億ドル水準だ。ChatGPTが同等の売上に達するのに約2年かかったことを考えると驚異的な速度だ。Netflix、Spotify（社員の2/3が採用）、KPMG、L'Oreal、Salesforceが利用している。

### 生産性/プラットフォーム CLI — 「Agent First」の波

| ツール | リリース | 核心 |
|--------|---------|------|
| **gws**（Google Workspace CLI） | 2026.3 | Drive・Gmail・Sheets・Calendar統合、MCPサーバー内蔵、100+エージェントスキル |
| **Jules Tools**（Google） | 2026.2 | Jules非同期エージェントのCLIコンパニオン。並列実行、diffビューア |
| **Warp 2.0** | 2025.6 | 「初のエージェンティック開発環境」。ターミナル自体にAIエージェント統合 |

**gws（Google Workspace CLI）**は公開からわずか3日でGitHubスター14,500を記録しHacker News 1位に輝いた。GoogleのDiscovery Serviceをランタイムに読み取ってコマンドを動的生成するアーキテクチャが核心だ。Vercel CEOのGuillermo Rauchはこれを見て**「2026 is the year of Skills & CLIs」**と宣言した。

---

## 4. CLI vs API vs MCP — トークン効率性の冷徹な数字

AIエージェントがCLIを好む最も現実的な理由は**トークンコスト**だ。ベンチマークデータがそれを明確に示している。

### MCPの隠れたコスト

MCPサーバーはエージェントのコンテキストウィンドウにツールスキーマをロードする。問題はこのスキーマが**作業開始前に**数万トークンを消費するという点だ。

| シナリオ | MCPトークン消費 | CLIトークン消費 | 差 |
|----------|---------------|---------------|-----|
| GitHub作業（93ツールスキーマ） | ~55,000 | ~0（訓練データ） | **275倍** |
| マルチサーバー（GitHub+DB+Jira） | ~150,000+ | ~2,000 | **75倍** |
| Intuneコンプライアンス作業 | 82,300 | ~6,700 | **12倍** |
| ファイル変換作業 | 基準 | -40% | **1.4倍** |

Jannik Reinhardのベンチマークが最もドラマチックだ。同一のIntuneコンプライアンス作業を遂行する場合：

- **MCPアプローチ**：システムプロンプト+スキーマに82,300トークン消費。128Kウィンドウ中、推論に使用可能なトークンは45,700。3〜4回のツール呼び出し後にコンテキスト枯渇で**エージェントの推論が崩壊**。
- **CLIアプローチ**：約6,700トークンのみ消費。121,300トークンが推論に使用可能。単一セッションでエッジケースまで**先制的に処理完了**。

結果は**35倍のトークン使用量の差**だ。トークン効率性スコア（Token Efficiency Score）でもCLI（202点）がMCP（152点）を**33%上回った。**

### なぜこれほどの差が生まれるのか

**1. ゼロスキーマオーバーヘッド。** CLIはツール定義をコンテキストにロードする必要がない。LLMがすでに訓練データで`git`、`docker`、`kubectl`、`aws`、`gh`などの使い方を学習しているからだ。コンテキストウィンドウの95%が実際の推論に使える。

**2. 選択的出力。** CLIはパイプライン（`cmd1 | cmd2 | jq '.field'`）でシェルレベルで出力をフィルタリングする。モデルに渡されるのは必要なデータだけだ。API/MCPは構造化されたレスポンス全体を返し、モデルが自ら解析しなければならない。

**3. 組み合わせ可能性。** CLIパイプラインは中間トークン消費なしに複数の作業をチェインする。MCPは各ツール呼び出しごとに個別のラウンドトリップが必要だ。

**4. 出力フォーマットの効率。** 同じデータでもフォーマットによってトークン消費は大きく変わる。Prettyテーブルは同等のJSONと比較して**10倍多くのトークン**を消費する。`gh pr list --json number,title,state`のようにフィールドを指定すればトークン消費を劇的に削減できる。

### Anthropicの解決策 — Tool Search

AnthropicもMCPのトークン問題を認識し、**Tool Search Tool**を開発した。すべてのツールを事前ロードする代わりに、必要なツールだけを検索してロードする方式だ。

- 全ロード：~77,000トークン消費
- Tool Search（遅延ロード）：~8,700トークン消費
- **結果：コンテキストウィンドウの95%を保持**

精度も劇的に改善した。Claude Opus 4のMCP評価精度が49%から74%に跳ね上がった。これはトークンコストだけでなく、**コンテキスト汚染自体がモデル性能を低下させる**という証拠だ。

Claude Codeはツール記述がコンテキストウィンドウの10%を超えると、自動的に事前ロードから検索ベースのロードに切り替える。

---

## 5. Claude CodeはどのようにCLIを活用しているか

Claude Codeのアーキテクチャは、Anthropicが**「do the simple thing first（シンプルなことからやれ）」**と呼ぶ原則の上に成り立っている。精巧なカスタムツールを作る代わりに、**最も薄いラッパーでClaudeのネイティブ能力を活かす。**

核心的なツールは事実上シェルアクセスだ。Claude Codeはモデルにbashツール、ファイル読み書きツールを提供し、環境にインストールされたすべてのCLIツールを自由に使わせる。

```
ユーザー：「このPRのCI失敗原因を見つけて直して」

Claude Codeの実行フロー：
1. gh pr view 123 --json statusCheckRollup    ← GitHub CLI
2. gh run view 456789 --log-failed            ← 失敗ログ確認
3. Read src/api/handler.ts                     ← ファイル読み取り
4. Edit src/api/handler.ts                     ← バグ修正
5. npm test                                    ← テスト実行
6. git add -p && git commit                    ← コミット
7. gh pr comment 123 --body "Fixed..."         ← PRにコメント
```

このフロー全体でClaude CodeがGitHub APIを直接呼び出す瞬間は**一度もない**。`gh` CLIがすでに認証済みで、ページネーション、エラーハンドリング、出力フォーマットをすべて処理してくれるからだ。APIを直接呼び出せば必要になる認証ヘッダー、URL構成、JSONパースコードがすべて不要になる。

これこそが**「すべてのCLIは暗黙のMCPサーバーである」**という哲学だ。CLIツールのひとつひとつが、すでに認証、入力検証、出力フォーマット、エラーハンドリングを備えた完成されたインターフェースだ。MCPサーバーを別途構築する必要はない — CLIがすでにその役割を果たしている。

Alexis Gallagherは2026年1月のエッセイ「Why Claude Code Won (for now)」でこう分析した。

> 「Claude Code won *not despite but because of* the command line. The CLI is a uniquely flexible environment from another era of computing — the only preinstalled integration environment where two independently authored programs can easily combine and interact.」

CLIというインターフェースこそが**勝利の原因**だという。2つの独立したプログラムが容易に結合し相互作用できる、プリインストールされた唯一の統合環境 — それがコマンドラインだ。

---

## 6. MCP vs CLI — 二者択一ではなく共存

MCPを捨ててCLIだけ使えという話ではない。**それぞれが輝く領域が異なる。**

### CLIが有利な場合
- エージェントが**すでに知っている**ツールを使うとき（git、docker、aws、gh...）
- トークン効率が重要な長いタスクで
- Unixパイプラインによる**組み合わせ**が必要な場合
- ローカル開発環境で

### MCPが有利な場合
- CLIが**存在しない**サービス（Figma、Notion、カスタムビジネスAPI）
- きめ細かいRBACとOAuthが必要な**エンタープライズ**環境
- 状態保持が必要な**マルチステップ**ワークフロー
- シェルアクセスがない環境（モバイル、チャットインターフェース）
- エージェントのハルシネーションされたフラグを**防止**すべきとき

Sentry共同創業者David Cramerの整理が現実的だ。

> 「If skills teach you to cook, MCP provides the instruments that let you do it.」

彼の実際のセットアップはMCPサーバー2つ + Skills 12個の**ハイブリッド**構成だ。ツールへの盲信は禁物で、状況に合った最適な組み合わせを見つけるのが正解だ。

**Google Workspace CLI（gws）**はこの共存の模範例だ。同時に3つの役割を果たす：
1. **人間用CLI** — ターミナルから直接コマンド実行
2. **MCPサーバー** — `gws mcp -s drive,gmail,calendar`でMCP対応アプリに接続
3. **Skills提供者** — 100+エージェントスキルで自然言語操作をサポート

ひとつのツールがCLI、MCP、Skillsの3パラダイムすべてをサポートする — これが2026年のツール設計の方向性だ。

---

## 7. 戦略的な動き — ビッグテックのCLIベッティング

CLIルネサンスが単なる流行ではないことを示す戦略的な動きがある。

**AnthropicのBun買収（2025.12）** — Anthropic史上初の買収がJavaScriptランタイムだった。Claude CodeがBunでビルドされているためだ。AI企業がCLIインフラに投資する時代。

**Googleの二重CLI戦略** — Gemini CLI（2025.6）でAIコーディングエージェントを、gws（2026.3）でWorkspaceエージェントをそれぞれリリース。ターミナルをGoogleエコシステムの統合接点にしている。

**GitHub Copilot CLI GA（2026.2）** — Microsoft/GitHubもターミナルネイティブエージェントに本格参入。Claude Opus 4.6、GPT-5.3-Codex、Gemini 3 Proを同時サポートするマルチモデル戦略。

**MCPのLinux Foundation寄贈（2025.12）** — Anthropicが開発したMCPがOpenAI、Google、Microsoft、AWS、Block（Goose）の参加のもと、ベンダー中立標準となった。CLIとMCPの共存が産業標準として定着するプロセス。

**Warp 2.0（2025.6）** — 「初のエージェンティック開発環境」。ターミナル自体にAIエージェント（Oz）を統合。2025年の1年間で32億行のコードがWarp上で編集された。

---

## 8. 開発者へ — 今やるべきこと

CLIルネサンスは開発者に具体的なアクションを求めている。

### すでに使っているCLIツールを深く知れ

`gh`、`git`、`docker`、`kubectl`、`aws` — すでにインストールされているツールの**高度な機能**を習得すべきだ。`gh pr list --json`のフィールド選択、`aws --query`のJMESPathフィルタ、`kubectl`のJSONPath — これらがAIエージェントの効率性を決定する。

### 新しいCLIツールを試せ

- **uv** — Python環境管理をしているなら今すぐ乗り換える価値がある
- **bun** — npm比20〜40倍速いパッケージインストール
- **gws** — Google Workspaceをターミナルから管理（まだ実験的だが方向性は確実）

### AIコーディングCLIをひとつ以上採用せよ

Claude Code、Gemini CLI、Codex CLI、Aider、OpenCode — 少なくともひとつは日常のワークフローに統合すべきだ。2026年時点で、AIコーディングCLIなしで開発するのはIDE無しでコーディングするのと同じハンデだ。

### CLIを作る側なら — エージェントを考慮せよ

サービスCLIを開発・保守しているなら：
- `--json`出力オプションはもはや選択ではなく必須だ
- `--dry-run`で破壊的操作のプレビューを提供せよ
- スキーマイントロスペクション（`schema`サブコマンド）を検討せよ
- **エージェントが使うことを前提に設計せよ**

---

## まとめ — 最も古いインターフェースが最も新しいインターフェースになる

CLIの歴史は半世紀だ。その半世紀の間、CLIは一度も死ななかった。GUIが登場しても、Webが登場しても、モバイルが登場しても、ノーコードが登場しても — ターミナルは常にそこにあった。

しかし2025〜2026年に起きていることは単なる生存ではない。**CLIがソフトウェアインターフェースの最前線に再配置されている。** AIエージェントという新しいユーザーが登場し、このユーザーにとって最も効率的なインターフェースがまさにCLIだからだ。

Claude Codeの年間売上25億ドル。Gemini CLIの70,000スター。gwsの公開3日で14,500スター。OpenCodeの95,000スター。数字がトレンドを証明している。

**2026年、ターミナルはもはや「パワーユーザーのツール」ではない。AIエージェントと人間が共存するソフトウェア開発の中心舞台だ。** 最も古いインターフェースが、最も新しい時代のデフォルトインターフェースとなった。
