---
title: 'How Far Can You Actually Customize Streamlit?'
description: '**Audience**: people who are building data apps in Python and want to move past "I gave Streamlit a try" into something one level deeper.'
pubDate: 2026-03-05T13:54:06.172Z
lang: 'en'
pairSlug: 'blog-streamlit-customization'
draft: false
---
# How Far Can You Actually Customize Streamlit?
## Possibilities from a Real Project, with Adoption Patterns in Korea, Japan, and the US

> **Audience**: people who are building data apps in Python and want to move past "I gave Streamlit a try" into something one level deeper.

---

## 1. Getting Started: What I Discovered Building a Real Project in Streamlit

For an internal project I built a **Korean → Japanese translation tool** in Streamlit.

Even without any frontend background I was able to ship features like these out of a single `app.py`:

- `st.cache_resource` — reuse the LLM client across the whole process
- `st.session_state` — keep translation results across interactions without a reload
- `st.data_editor` — edit dictionary CSVs inline in the browser
- `streamlit.components.v1` — drive the clipboard with native JS

Working with the last one — `components.v1` — I had a realization. "Wait, you can write HTML and JS directly inside Streamlit?"

That was the starting point. The deeper I dug, the wider the surface for customization turned out to be.

This piece organizes that surface into **four customization levels**, alongside **adoption trends in Korea, Japan, and the US.**

---

## 2. Customization Level 1 — Themes and Layout

### config.toml: Brand Color in 10 Minutes

Drop a `.streamlit/config.toml` in the project root. That's it.

```toml
[theme]
primaryColor = "#ff4b4b"              # accent color for buttons and sliders
backgroundColor = "#f0f2f6"           # main background
secondaryBackgroundColor = "#ffffff"  # sidebar / container background
textColor = "#31333f"
font = "sans serif"                   # "sans serif" / "serif" / "monospace"
```

You can also theme the sidebar separately (added in Streamlit 1.35+):

```toml
[theme.sidebar]
backgroundColor = "#1a1a2e"
textColor = "#eaeaea"
```

Temporary CLI overrides also work:

```bash
streamlit run app.py --theme.primaryColor "#00b4d8"
```

### Layout Basics

```python
st.set_page_config(
    page_title="Korean → Japanese Translator",
    layout="wide",       # "centered" | "wide"
    initial_sidebar_state="expanded",
)
```

Just flipping `layout="wide"` changes the entire feel of the app. In the translation tool I used it to place source and translated text side by side:

```python
col_a, col_b = st.columns([1, 1])
with col_a:
    do_translate = st.button("Translate", type="primary")
with col_b:
    do_clear = st.button("Clear Result")
```

---

## 3. Customization Level 2 — CSS Injection and HTML Embedding

### Injecting CSS via st.markdown

```python
st.markdown("""
<style>
/* round the button corners */
.stButton > button {
    border-radius: 8px;
    font-weight: 600;
}

/* hide the default hamburger menu */
#MainMenu { visibility: hidden; }

/* hide the footer */
footer { visibility: hidden; }

/* fix the sidebar width */
[data-testid="stSidebar"] {
    min-width: 220px;
    max-width: 220px;
}
</style>
""", unsafe_allow_html=True)
```

**Caveat**: selectors like `[data-testid="stSidebar"]` can shift between Streamlit versions.
Because they tend to break quietly on upgrade, the safer move is to keep production CSS to a minimum.

### components.v1.html: You Get Native JS

Here is the clipboard-copy button I actually shipped in the translation tool:

```python
import streamlit.components.v1 as components
import json

def _render_copy_button(*, text: str, label: str, key: str) -> None:
    """Write to the clipboard via the navigator.clipboard API."""
    js_text = json.dumps(text)    # XSS hardening: JSON-serialize to escape special chars
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

Call site:

```python
_render_copy_button(
    text=result,
    label="Copy to clipboard",
    key="copy_translation_button"
)
```

`navigator.clipboard` only works over HTTPS or on `localhost`.
Over plain HTTP you need to fall back to `document.execCommand('copy')` (not recommended).

### Bidirectional Python ↔ JS Communication

Inside `components.v1`, calling `Streamlit.setComponentValue()` lets you pass a value back from JS to Python:

```html
<script>
    // return the user's selected text to Python
    Streamlit.setComponentValue(selectedText);
</script>
```

Python side:

```python
value = components.html(html_code, height=100)
# value will carry whatever JS passed back
```

---

## 4. Customization Level 3 — Building Custom Components

When CSS injection hits its ceiling, you can build your own components in React/TypeScript.

### V1 vs V2

| | V1 | V2 |
|---|---|---|
| Implementation | iframe sandboxed | no iframe |
| Performance | slightly slower | faster |
| Callbacks | single | multiple callbacks supported |
| Stability | stable (current default) | experimental (Streamlit 1.40+) |

### How to Start

```bash
pip install cookiecutter
cookiecutter https://github.com/streamlit/component-template
```

The template generates a React + TypeScript boilerplate.

### Popular Third-Party Components

| Package | Use |
|---|---|
| `streamlit-aggrid` | feature-rich data grid (filtering, sorting, row selection) |
| `streamlit-plotly-events` | surface click events on Plotly charts back to Python |
| `streamlit-lottie` | play Lottie animations |
| `streamlit-ace` | embed a code editor |
| `streamlit-folium` | bidirectional Folium map interaction |

---

## 5. Advanced Features: New Capabilities in 2024–2025

### @st.fragment — Partial Re-renders (Streamlit 1.37+)

Streamlit's biggest drawback used to be "anything changes and the whole script re-runs."
`@st.fragment` softens that:

```python
@st.fragment(run_every=10)   # auto-refresh every 10 seconds
def live_chart():
    data = fetch_latest_metrics()
    st.line_chart(data)

live_chart()   # the rest of the app doesn't re-run
```

Applied to the translation tool, the dictionary editor and the translation form can run independently.
Right now, saving the dictionary wipes the translation result — `@st.fragment` would fix that.

### st.chat_message + st.write_stream — UI for the LLM Era

```python
with st.chat_message("assistant"):
    response = st.write_stream(llm.stream(prompt))
```

`st.write_stream()` takes a generator and updates the screen as each token arrives.
If you want to stream translation output, this is the fastest path.

### Caching Strategy

In the translation tool I share the app logger via `@st.cache_resource`:

```python
@st.cache_resource(show_spinner=False)
def get_app_logger() -> Logger:
    """Share a single logger across the whole app."""
    logger = logging.getLogger("plantai_translate.app")
    # avoid registering the handler more than once
    has_rotating_handler = any(
        isinstance(h, RotatingFileHandler) for h in logger.handlers
    )
    if not has_rotating_handler:
        ...
    return logger
```

| Decorator | Use | Returns |
|---|---|---|
| `@st.cache_data` | DataFrames, images, serializable objects | a copy |
| `@st.cache_resource` | DB connections, ML models, file handles | the same reference |

### Multipage Apps (the New Way, 1.36+)

```python
pg = st.navigation([
    st.Page("pages/translate.py", title="Translate"),
    st.Page("pages/dictionary.py", title="Dictionary"),
    st.Page("pages/logs.py", title="Execution Logs"),
    st.Page("pages/admin.py", title="Admin") if is_admin else None,
])
pg.run()
```

In the translation tool I currently fake this with `st.sidebar.radio()`, but
`st.navigation()` changes the URL — meaning bookmarks actually work.

### Other New UI Components

```python
# pill buttons (1.40+)
genre = st.pills("Genre", ["Action", "Drama", "Sci-Fi"])

# segmented control (1.40+)
mode = st.segmented_control("Mode", ["Fast translation", "High quality"])

# toast notifications
st.toast("Translation complete!", icon="✅")

# dialog (modal)
@st.dialog("Confirm")
def confirm_delete():
    st.write("Reset the dictionary?")
    if st.button("Delete"):
        st.session_state.pop("dict_df", None)
        st.rerun()
```

---

## 6. Streamlit in Korea

### Position: "A Tool for Building an MVP Fast When You're in a Pinch"

In Korea, Streamlit has settled in as **an essential tool on education platforms.**

- A required skill at **Boostcamp AI Tech**, **Inflearn**, **Modulabs**, and others.
- **teddylee777/streamlit-tutorial** (GitHub): the EP01–11 series is popular.
- Korean-language material is abundant on Velog, Tistory, and WikiDocs.

### Patterns Distinctive to Korea

**Korean font handling:**

```python
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# manually register Nanum Gothic
fm.fontManager.addfont("/usr/share/fonts/nanumgothic.ttf")
plt.rcParams["font.family"] = "NanumGothic"
```

**Visualizing public data (data.go.kr)**: dashboards wired directly to government APIs are a common pattern.

**Korean AI demos**: used as the frontend for KoGPT-2, HyperCLOVA, and VARCO LLM.

**RAG**: regularly adopted as the search UI for LangChain + OpenSearch/Pinecone.

Large-enterprise official adoption remains limited; the locus is **startups and personal projects.** The dominant perception is "a tool to get something working fast."

---

## 7. Streamlit in Japan

### Position: An Enterprise Data-Democratization Tool

In Japan, adoption is brisk inside large companies as a tool for operational improvement.

### Concrete Adoption Cases

| Company | Scale and Outcome |
|---|---|
| **NTT Docomo** | Adopted on an internal platform that analyzes data on 99 million members. Over 1,000 users; 15,000 executions over five months; 3,800 hours of operational time saved. |
| **Japan Airlines (JAL)** | Adopted Snowflake + Streamlit. Realized 3-month rapid development cycles. |
| **CADDi** | An ML model evaluation platform. Integrated with GCS + BigQuery. |
| **M3 (medical information)** | Self-hosted on GKE. |

### Patterns Distinctive to Japan

**Japanese NLP:**

```python
import spacy
nlp = spacy.load("ja_ginza")   # GiNZA (a Japanese model on top of spaCy)

text = st.text_area("Enter text")
if text:
    doc = nlp(text)
    tokens = [(t.text, t.pos_) for t in doc]
    st.dataframe(tokens)
```

Morphological-analysis tools combined with MeCab or SudachiPy are also a standard pattern.

**Suppressing browser translation pop-ups via the HTML lang attribute:**

```python
st.markdown('<html lang="ja">', unsafe_allow_html=True)
```

**Community maturity:**
- Dozens of new articles per month under the Streamlit tag on Qiita.
- A published technical book, *Tsukutte Wakaru [Nyumon] Streamlit* (2025, Gijutsu Hyoron Sha).
- Active enterprise adoption of **Streamlit in Snowflake (SiS).**

---

## 8. Streamlit in the US / Globally

### Position: The Frontend Standard of the LLM Era

**2022: Snowflake acquired Streamlit for approximately $800 million.**

That acquisition was the inflection point. From "individual developer's toy" to "enterprise-ready platform."

### Adoption at Scale

- **Adopted at 90%+ of Fortune 50 companies.**
- 20,000+ stars on GitHub.
- Selected as an official SDK on Hugging Face Spaces.
- DeepLearning.AI opened an official course, "**Fast Prototyping of GenAI Apps**."

### Main Use Cases

| Domain | Use |
|---|---|
| LLM apps | the fastest path to a ChatGPT-style UI prototype |
| Finance | real-time portfolio analysis |
| Healthcare | a 25% improvement in demand-forecasting accuracy in one reported case |
| Data science | evaluation and debugging UIs for ML models |

### Snowflake Native Apps

```python
# A Streamlit app running directly on top of Snowflake
import snowflake.snowpark as snowpark

def main(session: snowpark.Session):
    df = session.table("SALES_DATA").to_pandas()
    st.dataframe(df)
```

**Snowflake Marketplace** is starting to function as a distribution channel for B2B SaaS.

---

## 9. Korea / Japan / US Comparison

| Item | Korea | Japan | US |
|---|---|---|---|
| **Primary user base** | startups, education | large enterprises, the enterprise segment | enterprises + LLM startups |
| **Primary use case** | MVPs, AI chatbot UIs | internal dashboards, data democratization | LLM apps, enterprise |
| **Community maturity** | growing | mature (with published books) | most mature |
| **Specialized techniques** | Korean NLP, public data | Japanese NLP, Snowflake SiS | Snowflake Native Apps |
| **Enterprise adoption** | limited | NTT Docomo, JAL, etc. | 90%+ of Fortune 50 |
| **Typical stack** | LangChain + Pinecone | GKE + BigQuery | Snowflake + Vertex AI |

---

## 10. Conclusion: Streamlit's Limits and the Next Move

### Current Limits

| Limit | Detail |
|---|---|
| **Full re-render** | a change re-runs the whole script (softened by `@st.fragment`) |
| **State management complexity** | tracking gets hard as `session_state` grows |
| **Production UI** | pixel-perfect design is difficult |
| **SEO** | the SPA-like structure is disadvantageous for SEO |

### What I'd Apply Next to the Translation Tool

Improvements I'd add to the current `koreamedia-translate`:

1. **Separate the translation widget and dictionary editor with `@st.fragment`.**
   → Saving the dictionary will stop wiping the translation output.

2. **Stream translation output via `st.write_stream()`.**
   → For long translations, the "waiting" sensation gets better.

3. **URL-based page switching via `st.navigation()`.**
   → Log and dictionary pages become bookmarkable.

4. **A `st.pills` UI to switch translation styles.**
   → Presets like "literal," "free," "diplomatic register."

---

### Wrapping Up

Streamlit customization fits into a **four-layer structure:**

```
Level 1  Theming (config.toml)               ← 10 minutes
Level 2  CSS injection / HTML embedding      ← a few hours
Level 3  Custom components (React)           ← a few days
Level 4  Snowflake Native Apps               ← real production
```

What I took away from building the translation tool: the low barrier of "writing UI in pure Python" gives data engineers and backend engineers an overwhelming productivity advantage.

You only need to evaluate Next.js when production-grade design becomes a hard requirement.
Until then, Streamlit is enough — and that usage pattern is accelerating worldwide.

---

## Reference Links

- [Streamlit Official Documentation](https://docs.streamlit.io) — based on Streamlit 1.40+
- [NTT Docomo Adoption Case](https://cloud.watch.impress.co.jp/docs/case/1576426.html)
- [Snowflake's Acquisition of Streamlit (TechCrunch)](https://techcrunch.com/2022/03/02/snowflake-acquires-streamlit-for-800m-to-help-customers-build-data-based-apps/)
- [DeepLearning.AI Streamlit Course](https://learn.deeplearning.ai)
- [CADDi Engineering Blog](https://caddi.tech/archives/3327)
- [teddylee777/streamlit-tutorial](https://github.com/teddylee777/streamlit-tutorial)
- [streamlit-aggrid](https://github.com/PablocFonseca/streamlit-aggrid)
