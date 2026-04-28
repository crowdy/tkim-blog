---
title: 'Streamlitはどこまでカスタマイズできるのか？'
description: '**対象読者**: Pythonでデータアプリを作っている方、Streamlitを「とりあえず使ってみた」レベルからもう一歩先に進みたい方'
pubDate: 2026-03-07T07:01:02.000Z
lang: ja
pairSlug: 'blog-streamlit-customization'
draft: false
sourceDir: posted
---
# Streamlitはどこまでカスタマイズできるのか？
## 実際のプロジェクトコードと韓国・日本・米国の活用事例から見る可能性

> **対象読者**: Pythonでデータアプリを作っている方、Streamlitを「とりあえず使ってみた」レベルからもう一歩先に進みたい方

---

## 1. はじめに：実際のプロジェクトで発見したStreamlitの底力

社内プロジェクトで**朝鮮語 → 日本語の翻訳ツール**をStreamlitで作った。

フロントエンド開発の経験がなくても、`app.py`ファイル1つでこれだけの機能を実装できた：

- `st.cache_resource` — LLMクライアントをプロセス全体で再利用
- `st.session_state` — 翻訳結果をリロードなしで保持
- `st.data_editor` — 辞書CSVをブラウザ上でインライン編集
- `streamlit.components.v1` — ネイティブJSでクリップボード操作

最後の`components.v1`を使っていて、ふと気づいた。「あれ？Streamlitの中でHTML/JSを直接書けるの？」

それがきっかけだった。掘り下げるほどに、カスタマイズの幅は想像以上に広かった。

この記事では、**4段階のカスタマイズレベル**と、**韓国・日本・米国それぞれの活用トレンド**を整理する。

---

## 2. カスタマイズ Level 1 — テーマとレイアウト

### config.toml：10分でブランドカラーの適用が完了

プロジェクトルートに`.streamlit/config.toml`を置くだけで済む。

```toml
[theme]
primaryColor = "#ff4b4b"              # ボタン・スライダーのアクセントカラー
backgroundColor = "#f0f2f6"           # メイン背景
secondaryBackgroundColor = "#ffffff"  # サイドバー・コンテナの背景
textColor = "#31333f"
font = "sans serif"                   # "sans serif" / "serif" / "monospace"
```

サイドバーだけ別のテーマを設定することも可能だ（Streamlit 1.35+で追加）：

```toml
[theme.sidebar]
backgroundColor = "#1a1a2e"
textColor = "#eaeaea"
```

CLIで一時的に上書きすることもできる：

```bash
streamlit run app.py --theme.primaryColor "#00b4d8"
```

### レイアウトの基本

```python
st.set_page_config(
    page_title="Korean → Japanese Translator",
    layout="wide",       # "centered" | "wide"
    initial_sidebar_state="expanded",
)
```

`layout="wide"`を一つ変えるだけで全体の印象が変わる。翻訳ツールでは原文と訳文を左右に並べて配置する際に活用した：

```python
col_a, col_b = st.columns([1, 1])
with col_a:
    do_translate = st.button("Translate", type="primary")
with col_b:
    do_clear = st.button("Clear Result")
```

---

## 3. カスタマイズ Level 2 — CSSインジェクションとHTMLの埋め込み

### st.markdownでCSSを注入する

```python
st.markdown("""
<style>
/* ボタンの角を丸くする */
.stButton > button {
    border-radius: 8px;
    font-weight: 600;
}

/* デフォルトのハンバーガーメニューを非表示にする */
#MainMenu { visibility: hidden; }

/* フッターを非表示にする */
footer { visibility: hidden; }

/* サイドバーの幅を固定する */
[data-testid="stSidebar"] {
    min-width: 220px;
    max-width: 220px;
}
</style>
""", unsafe_allow_html=True)
```

**注意事項**: `[data-testid="stSidebar"]`のようなセレクタは、Streamlitのバージョンアップ時に変更される可能性がある。
アップグレード後に静かに壊れても気づきにくいため、プロダクションのCSSは最小限に留めるのが安全だ。

### components.v1.html：ネイティブJSが使える

翻訳ツールで実際に実装したクリップボードコピーボタンがこれだ：

```python
import streamlit.components.v1 as components
import json

def _render_copy_button(*, text: str, label: str, key: str) -> None:
    """navigator.clipboard APIでクリップボードに書き込み"""
    js_text = json.dumps(text)    # XSS対策：JSONシリアライズで特殊文字をエスケープ
    safe_label = json.dumps(label)
    html = f"""
        <button id="{key}" style="margin: 0.25rem 0; padding: 0.4rem 0.8rem;">
            {label}
        </button>
        <script>
        (function() {{
            const btn = document.getElementById({json.dumps(key)});
            if (!btn) return;
            btn.addEventListener('click', async () => {{
                try {{
                    await navigator.clipboard.writeText({js_text});
                    btn.textContent = 'Copied!';
                }} catch (e) {{
                    btn.textContent = 'Copy failed';
                }} finally {{
                    setTimeout(() => btn.textContent = {safe_label}, 1000);
                }}
            }});
        }})();
        </script>
    """
    components.html(html, height=50)
```

呼び出し側：

```python
_render_copy_button(
    text=result,
    label="Copy to clipboard",
    key="copy_translation_button"
)
```

`navigator.clipboard`はHTTPSまたは`localhost`環境でのみ動作する。
HTTP環境では`document.execCommand('copy')`（非推奨）によるフォールバック処理が必要だ。

### Python ↔ JS 双方向通信

`components.v1`では`Streamlit.setComponentValue()`を使うと、JS側からPythonに値を渡すことができる：

```html
<script>
    // ユーザーが選択したテキストをPythonに返す
    Streamlit.setComponentValue(selectedText);
</script>
```

Python側：

```python
value = components.html(html_code, height=100)
# valueにJSから渡された値が入る
```

---

## 4. カスタマイズ Level 3 — カスタムコンポーネント開発

CSSインジェクションで限界にぶつかったときは、React/TypeScriptで独自のコンポーネントを作ることができる。

### V1 vs V2 比較

| | V1 | V2 |
|---|---|---|
| 実装方式 | iframeサンドボックス | iframeなし |
| パフォーマンス | やや遅い | より高速 |
| コールバック | 単一 | 複数コールバック対応 |
| 安定性 | 安定（現在のデフォルト） | 実験的（Streamlit 1.40+） |

### 始め方

```bash
pip install cookiecutter
cookiecutter https://github.com/streamlit/component-template
```

テンプレートが生成されると、React + TypeScriptベースのボイラープレートが作られる。

### 人気のサードパーティコンポーネント

| パッケージ | 用途 |
|---|---|
| `streamlit-aggrid` | 高機能データグリッド（フィルタ、ソート、行選択） |
| `streamlit-plotly-events` | PlotlyグラフのクリックイベントをPythonに渡す |
| `streamlit-lottie` | Lottieアニメーション再生 |
| `streamlit-ace` | コードエディタの埋め込み |
| `streamlit-folium` | Folium地図の双方向操作 |

---

## 5. 高度な機能：2024〜2025年の新機能

### @st.fragment — 部分リレンダリング（Streamlit 1.37+）

Streamlitの最大の弱点は「何か変わると画面全体が再実行される」ことだった。
`@st.fragment`がその問題を緩和してくれる：

```python
@st.fragment(run_every=10)   # 10秒ごとに自動更新
def live_chart():
    data = fetch_latest_metrics()
    st.line_chart(data)

live_chart()   # 他の部分はリランしない
```

翻訳ツールに適用すれば、辞書エディタと翻訳フォームを独立して動作させることができる。
現状では辞書を保存すると翻訳結果が消えてしまう問題があるが、`@st.fragment`で解決可能だ。

### st.chat_message + st.write_stream — LLM時代のUI

```python
with st.chat_message("assistant"):
    response = st.write_stream(llm.stream(prompt))
```

`st.write_stream()`はジェネレータを受け取り、トークンが届くたびに画面を更新する。
翻訳結果をストリーミングで表示したいなら、これが最も手っ取り早い方法だ。

### キャッシュ戦略

翻訳ツールでは`@st.cache_resource`でアプリのロガーを共有している：

```python
@st.cache_resource(show_spinner=False)
def get_app_logger() -> Logger:
    """アプリ全体で一つのロガーを共有"""
    logger = logging.getLogger("plantai_translate.app")
    # ハンドラの重複登録を防止
    has_rotating_handler = any(
        isinstance(h, RotatingFileHandler) for h in logger.handlers
    )
    if not has_rotating_handler:
        ...
    return logger
```

| デコレータ | 用途 | 戻り値 |
|---|---|---|
| `@st.cache_data` | DataFrame、画像、シリアライズ可能なオブジェクト | コピー |
| `@st.cache_resource` | DB接続、MLモデル、ファイルハンドル | 同一参照 |

### マルチページアプリ（新方式、1.36+）

```python
pg = st.navigation([
    st.Page("pages/translate.py", title="Translate"),
    st.Page("pages/dictionary.py", title="Dictionary"),
    st.Page("pages/logs.py", title="Execution Logs"),
    st.Page("pages/admin.py", title="Admin") if is_admin else None,
])
pg.run()
```

翻訳ツールでは現在`st.sidebar.radio()`で代替しているが、
`st.navigation()`はURLが変わるため、ブックマークが可能になるという利点がある。

### その他の新しいUIコンポーネント

```python
# ピルボタン（1.40+）
genre = st.pills("ジャンル", ["アクション", "ドラマ", "SF"])

# セグメンテッドコントロール（1.40+）
mode = st.segmented_control("モード", ["高速翻訳", "高品質"])

# トースト通知
st.toast("翻訳完了！", icon="✅")

# ダイアログ（モーダル）
@st.dialog("確認")
def confirm_delete():
    st.write("辞書を初期化しますか？")
    if st.button("削除"):
        st.session_state.pop("dict_df", None)
        st.rerun()
```

---

## 6. 韓国でのStreamlit

### ポジション：「急ぎのときに素早く作るMVPツール」

韓国ではStreamlitは**教育プラットフォームの必須ツール**として定着している。

- **BoostCamp AI Tech**、**Inflearn**、**モドゥの研究所**などで必須スキル
- **teddylee777/streamlit-tutorial**（GitHub）：EP01〜11の連続チュートリアルが人気
- Velog、Tistory、WikiDocsに韓国語の資料が豊富

### 韓国特有のパターン

**ハングルフォント処理**：

```python
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# ナヌムゴシックを手動登録
fm.fontManager.addfont("/usr/share/fonts/nanumgothic.ttf")
plt.rcParams["font.family"] = "NanumGothic"
```

**公共データ（data.go.kr）の可視化**：政府APIに直接接続してダッシュボードを作る事例が多い。

**韓国語AIデモ**：KoGPT-2、HyperCLOVA、VARCO LLMのフロントエンドとして活用。

**RAG**：LangChain + OpenSearch/Pineconeの検索UIとしてよく採用されている。

大企業の公式導入事例は限定的で、**スタートアップ・個人プロジェクト中心**だ。
「とにかく動くもの」を素早く作るツールという認識が強い。

---

## 7. 日本でのStreamlit

### ポジション：エンタープライズのデータ民主化ツール

日本では大企業の業務改善ツールとしての導入が活発だ。

### 具体的な導入事例

| 企業 | 規模・成果 |
|---|---|
| **NTTドコモ** | 9,900万会員のデータを分析する社内プラットフォームに採用。1,000人以上が利用し、5か月間で15,000回実行。業務3,800時間を削減 |
| **日本航空（JAL）** | Snowflake + Streamlitを採用。3か月サイクルの高速開発を実現 |
| **CADDi** | MLモデル評価プラットフォーム。GCS + BigQuery統合 |
| **M3（医療情報）** | GKE上でセルフホスティング |

### 日本特有のパターン

**日本語NLP**：

```python
import spacy
nlp = spacy.load("ja_ginza")   # GiNZA（spaCyベースの日本語モデル）

text = st.text_area("テキスト入力")
if text:
    doc = nlp(text)
    tokens = [(t.text, t.pos_) for t in doc]
    st.dataframe(tokens)
```

MeCab、SudachiPyと組み合わせた形態素解析ツールも定番パターン。

**HTML lang属性でブラウザ翻訳ポップアップを抑制**：

```python
st.markdown('<html lang="ja">', unsafe_allow_html=True)
```

**コミュニティの成熟度**：
- QiitaのStreamlitタグに毎月数十件の新規記事
- 技術書籍「作って分かる[入門]Streamlit」（2025、技術評論社）が出版
- **Snowflake in Streamlit（SiS）**のエンタープライズ採用が活発

---

## 8. 米国/グローバルでのStreamlit

### ポジション：LLM時代のフロントエンド標準

**2022年：Snowflakeが約8億ドルで買収。**

この買収が転換点だった。「個人開発者のおもちゃ」から「エンタープライズ対応プラットフォーム」へ。

### 採用規模

- **フォーチュン50大企業の90%以上**が採用
- GitHubスター20,000+
- Hugging Face Spacesの公式SDKとして採用
- DeepLearning.AIが公式コース「**Fast Prototyping of GenAI Apps**」を開設

### 主な活用分野

| 分野 | 事例 |
|---|---|
| LLMアプリ | ChatGPTスタイルUIの最速プロトタイプ |
| 金融 | リアルタイムポートフォリオ分析 |
| ヘルスケア | 需要予測の精度25%向上事例 |
| データサイエンス | MLモデルの評価・デバッグUI |

### Snowflake Native Apps

```python
# Snowflake上で直接動作するStreamlitアプリ
import snowflake.snowpark as snowpark

def main(session: snowpark.Session):
    df = session.table("SALES_DATA").to_pandas()
    st.dataframe(df)
```

B2B SaaSの配布チャネルとして**Snowflake Marketplace**が機能し始めている。

---

## 9. 韓国・日本・米国の比較表

| 項目 | 韓国 | 日本 | 米国 |
|---|---|---|---|
| **主なユーザー層** | スタートアップ、教育 | 大企業、エンタープライズ | 企業 + LLMスタートアップ |
| **主な活用シーン** | MVP、AIチャットボットUI | 社内ダッシュボード、データ民主化 | LLMアプリ、エンタープライズ |
| **コミュニティ成熟度** | 成長中 | 成熟（書籍出版） | 最も成熟 |
| **特化技術** | 韓国語NLP、公共データ | 日本語NLP、Snowflake SiS | Snowflake Native Apps |
| **企業導入** | 限定的 | NTTドコモ、JALなど | Fortune 50の90%+ |
| **典型的なスタック** | LangChain + Pinecone | GKE + BigQuery | Snowflake + Vertex AI |

---

## 10. 結論：Streamlitの限界と次の一手

### 現在の限界

| 限界 | 内容 |
|---|---|
| **全体リレンダリング** | 何か変わると全コードが再実行される（`@st.fragment`で緩和） |
| **状態管理の複雑さ** | `session_state`が増えると追跡が難しくなる |
| **プロダクションUI** | ピクセルパーフェクトなデザインは困難 |
| **SEO** | SPA的な構造のためSEOに不利 |

### 翻訳ツールに次に適用できること

現在の`koreamedia-translate`に追加できる改善：

1. **`@st.fragment`で翻訳ウィジェットと辞書エディタを分離**
   → 辞書保存時に翻訳結果が消えなくなる

2. **`st.write_stream()`で翻訳結果をストリーミング表示**
   → 長文翻訳での「待たされている感」が改善される

3. **`st.navigation()`でURLベースのページ切り替え**
   → ログページや辞書ページをブックマーク可能に

4. **`st.pills`で翻訳スタイルを切り替えるUI**
   → 「直訳」「意訳」「外交文書体」のようなプリセット

---

### まとめ

Streamlitのカスタマイズは**4層構造**で考えることができる：

```
Level 1  テーマ (config.toml)                 ← 10分で可能
Level 2  CSSインジェクション・HTML埋め込み    ← 数時間で可能
Level 3  カスタムコンポーネント (React)        ← 数日かかる
Level 4  Snowflake Native Apps                ← 本格的なプロダクション
```

翻訳ツールを作りながら感じたのは、「PythonだけでUIが書ける」という低い参入障壁が、
データエンジニアやバックエンドエンジニアに圧倒的な生産性の優位をもたらすということだ。

プロダクション品質のデザインが必要になったとき、初めてNext.jsを検討すればいい。
それまではStreamlitで十分だ——そういう使い方が世界中で加速している。

---

## 参考リンク

- [Streamlit公式ドキュメント](https://docs.streamlit.io) — Streamlit 1.40+基準
- [NTTドコモ導入事例](https://cloud.watch.impress.co.jp/docs/case/1576426.html)
- [SnowflakeによるStreamlit買収（TechCrunch）](https://techcrunch.com/2022/03/02/snowflake-acquires-streamlit-for-800m-to-help-customers-build-data-based-apps/)
- [DeepLearning.AI Streamlitコース](https://learn.deeplearning.ai)
- [CADDi技術ブログ](https://caddi.tech/archives/3327)
- [teddylee777/streamlit-tutorial](https://github.com/teddylee777/streamlit-tutorial)
- [streamlit-aggrid](https://github.com/PablocFonseca/streamlit-aggrid)
