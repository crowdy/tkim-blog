---
title: 'Streamlit은 어디까지 커스터마이징할 수 있을까?'
description: '**대상 독자**: Python으로 데이터 앱을 만들고 있는 분, Streamlit을 "일단 써봤다" 수준에서 한 단계 더 나아가고 싶은 분'
pubDate: 2026-03-05T13:54:06.000Z
lang: ko
pairSlug: 'blog-streamlit-customization'
draft: false
sourceDir: posted
---
# Streamlit은 어디까지 커스터마이징할 수 있을까?
## 실제 프로젝트 코드와 한국·일본·미국 활용 사례로 보는 가능성

> **대상 독자**: Python으로 데이터 앱을 만들고 있는 분, Streamlit을 "일단 써봤다" 수준에서 한 단계 더 나아가고 싶은 분

---

## 1. 시작하며: 실제 프로젝트에서 발견한 Streamlit의 저력

사내 프로젝트로 **조선어 → 일본어 번역 도구**를 Streamlit으로 만들었다.

프론트엔드 개발 경험이 없어도 `app.py` 파일 하나로 이런 기능들을 구현할 수 있었다:

- `st.cache_resource` — LLM 클라이언트를 프로세스 전체에서 재사용
- `st.session_state` — 번역 결과를 리로드 없이 유지
- `st.data_editor` — 사전 CSV를 브라우저에서 인라인 편집
- `streamlit.components.v1` — 네이티브 JS로 클립보드 조작

마지막 `components.v1`을 사용하다가 문득 깨달았다. "어? Streamlit에서 HTML/JS를 직접 쓸 수 있었어?"

그게 시작이었다. 파고들수록 커스터마이징의 폭이 생각보다 훨씬 넓었다.

이 글에서는 **4단계 커스터마이징 레벨**과, **한국·일본·미국 각지의 활용 트렌드**를 정리한다.

---

## 2. 커스터마이징 Level 1 — 테마와 레이아웃

### config.toml: 10분이면 브랜드 색상 적용 완료

프로젝트 루트에 `.streamlit/config.toml`을 두면 끝이다.

```toml
[theme]
primaryColor = "#ff4b4b"              # 버튼·슬라이더의 액센트 색상
backgroundColor = "#f0f2f6"           # 메인 배경
secondaryBackgroundColor = "#ffffff"  # 사이드바·컨테이너 배경
textColor = "#31333f"
font = "sans serif"                   # "sans serif" / "serif" / "monospace"
```

사이드바만 별도 테마를 설정할 수도 있다(Streamlit 1.35+에서 추가):

```toml
[theme.sidebar]
backgroundColor = "#1a1a2e"
textColor = "#eaeaea"
```

CLI에서 임시로 덮어쓰는 것도 가능:

```bash
streamlit run app.py --theme.primaryColor "#00b4d8"
```

### 레이아웃 기본기

```python
st.set_page_config(
    page_title="Korean → Japanese Translator",
    layout="wide",       # "centered" | "wide"
    initial_sidebar_state="expanded",
)
```

`layout="wide"` 하나만 바꿔도 전체 느낌이 달라진다. 번역 도구에서는 원문과 번역문을 좌우로 나란히 배치할 때 활용했다:

```python
col_a, col_b = st.columns([1, 1])
with col_a:
    do_translate = st.button("Translate", type="primary")
with col_b:
    do_clear = st.button("Clear Result")
```

---

## 3. 커스터마이징 Level 2 — CSS 주입과 HTML 임베딩

### st.markdown으로 CSS 주입하기

```python
st.markdown("""
<style>
/* 버튼 모서리 둥글게 */
.stButton > button {
    border-radius: 8px;
    font-weight: 600;
}

/* 기본 햄버거 메뉴 숨기기 */
#MainMenu { visibility: hidden; }

/* 푸터 숨기기 */
footer { visibility: hidden; }

/* 사이드바 너비 고정 */
[data-testid="stSidebar"] {
    min-width: 220px;
    max-width: 220px;
}
</style>
""", unsafe_allow_html=True)
```

**주의사항**: `[data-testid="stSidebar"]` 같은 셀렉터는 Streamlit 버전업 시 바뀔 수 있다.
업그레이드 후 조용히 깨져도 알아채기 어려우므로, 프로덕션 CSS는 최소한으로 유지하는 게 안전하다.

### components.v1.html: 네이티브 JS를 쓸 수 있다

번역 도구에서 실제로 구현한 클립보드 복사 버튼이다:

```python
import streamlit.components.v1 as components
import json

def _render_copy_button(*, text: str, label: str, key: str) -> None:
    """navigator.clipboard API로 클립보드에 쓰기"""
    js_text = json.dumps(text)    # XSS 대책: JSON 직렬화로 특수문자 이스케이프
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

호출 측:

```python
_render_copy_button(
    text=result,
    label="Copy to clipboard",
    key="copy_translation_button"
)
```

`navigator.clipboard`는 HTTPS 또는 `localhost` 환경에서만 작동한다.
HTTP 환경에서는 `document.execCommand('copy')`(비권장)로 폴백 처리가 필요하다.

### Python ↔ JS 양방향 통신

`components.v1`에서는 `Streamlit.setComponentValue()`를 사용하면 JS 측에서 Python으로 값을 전달할 수 있다:

```html
<script>
    // 사용자가 선택한 텍스트를 Python으로 반환
    Streamlit.setComponentValue(selectedText);
</script>
```

Python 측:

```python
value = components.html(html_code, height=100)
# value에 JS에서 전달한 값이 담긴다
```

---

## 4. 커스터마이징 Level 3 — 커스텀 컴포넌트 개발

CSS 주입으로 한계에 부딪혔을 때는 React/TypeScript로 독자적인 컴포넌트를 만들 수 있다.

### V1 vs V2 비교

| | V1 | V2 |
|---|---|---|
| 구현 방식 | iframe 샌드박싱 | iframe 없음 |
| 성능 | 약간 느림 | 더 빠름 |
| 콜백 | 단일 | 다중 콜백 지원 |
| 안정성 | 안정(현재 기본값) | 실험적(Streamlit 1.40+) |

### 시작하는 방법

```bash
pip install cookiecutter
cookiecutter https://github.com/streamlit/component-template
```

템플릿이 생성되면 React + TypeScript 기반의 보일러플레이트가 만들어진다.

### 인기 서드파티 컴포넌트

| 패키지 | 용도 |
|---|---|
| `streamlit-aggrid` | 고기능 데이터 그리드(필터, 정렬, 행 선택) |
| `streamlit-plotly-events` | Plotly 그래프의 클릭 이벤트를 Python으로 전달 |
| `streamlit-lottie` | Lottie 애니메이션 재생 |
| `streamlit-ace` | 코드 에디터 임베딩 |
| `streamlit-folium` | Folium 지도 양방향 조작 |

---

## 5. 고급 기능: 2024~2025 신기능

### @st.fragment — 부분 리렌더링(Streamlit 1.37+)

Streamlit의 가장 큰 단점은 "뭔가 바뀌면 화면 전체가 다시 실행된다"는 것이었다.
`@st.fragment`가 그 문제를 완화해준다:

```python
@st.fragment(run_every=10)   # 10초마다 자동 갱신
def live_chart():
    data = fetch_latest_metrics()
    st.line_chart(data)

live_chart()   # 다른 부분은 리런하지 않음
```

번역 도구에 적용하면 사전 에디터와 번역 폼을 독립적으로 동작시킬 수 있다.
지금은 사전을 저장하면 번역 결과가 사라지는 문제가 있는데, `@st.fragment`로 해결 가능하다.

### st.chat_message + st.write_stream — LLM 시대의 UI

```python
with st.chat_message("assistant"):
    response = st.write_stream(llm.stream(prompt))
```

`st.write_stream()`은 제너레이터를 받아서 토큰이 올 때마다 화면을 갱신한다.
번역 결과를 스트리밍으로 표시하고 싶다면 이게 가장 빠른 길이다.

### 캐싱 전략

번역 도구에서는 `@st.cache_resource`로 앱 로거를 공유하고 있다:

```python
@st.cache_resource(show_spinner=False)
def get_app_logger() -> Logger:
    """앱 전체에서 하나의 로거를 공유"""
    logger = logging.getLogger("plantai_translate.app")
    # 핸들러 중복 등록 방지
    has_rotating_handler = any(
        isinstance(h, RotatingFileHandler) for h in logger.handlers
    )
    if not has_rotating_handler:
        ...
    return logger
```

| 데코레이터 | 용도 | 반환값 |
|---|---|---|
| `@st.cache_data` | DataFrame, 이미지, 직렬화 가능한 객체 | 복사본 |
| `@st.cache_resource` | DB 연결, ML 모델, 파일 핸들 | 동일 참조 |

### 멀티페이지 앱(신방식, 1.36+)

```python
pg = st.navigation([
    st.Page("pages/translate.py", title="Translate"),
    st.Page("pages/dictionary.py", title="Dictionary"),
    st.Page("pages/logs.py", title="Execution Logs"),
    st.Page("pages/admin.py", title="Admin") if is_admin else None,
])
pg.run()
```

번역 도구에서는 현재 `st.sidebar.radio()`로 대체하고 있는데,
`st.navigation()`은 URL이 바뀌기 때문에 북마크가 가능하다는 장점이 있다.

### 그 외 새로운 UI 컴포넌트

```python
# 필 버튼(1.40+)
genre = st.pills("장르", ["액션", "드라마", "SF"])

# 세그먼트 컨트롤(1.40+)
mode = st.segmented_control("모드", ["빠른 번역", "고품질"])

# 토스트 알림
st.toast("번역 완료!", icon="✅")

# 다이얼로그(모달)
@st.dialog("확인")
def confirm_delete():
    st.write("사전을 초기화할까요?")
    if st.button("삭제"):
        st.session_state.pop("dict_df", None)
        st.rerun()
```

---

## 6. 한국에서의 Streamlit

### 포지션: "급할 때 빠르게 만드는 MVP 도구"

한국에서 Streamlit은 **교육 플랫폼의 필수 도구**로 자리잡고 있다.

- **부스트캠프 AI Tech**, **인프런**, **모두의연구소** 등에서 필수 스킬
- **teddylee777/streamlit-tutorial** (GitHub): EP01~11 연속 튜토리얼이 인기
- 벨로그, 티스토리, WikiDocs에 한국어 자료가 풍부

### 한국 특유의 패턴

**한글 폰트 처리**:

```python
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 나눔고딕 수동 등록
fm.fontManager.addfont("/usr/share/fonts/nanumgothic.ttf")
plt.rcParams["font.family"] = "NanumGothic"
```

**공공데이터(data.go.kr) 시각화**: 정부 API를 직접 연결해 대시보드를 만드는 사례가 많다.

**한국어 AI 데모**: KoGPT-2, HyperCLOVA, VARCO LLM의 프론트엔드로 활용.

**RAG**: LangChain + OpenSearch/Pinecone의 검색 UI로 자주 채택.

대기업의 공식 도입 사례는 제한적이고, **스타트업·개인 프로젝트 중심**이다.
"일단 돌아가는 것"을 빠르게 만드는 도구라는 인식이 강하다.

---

## 7. 일본에서의 Streamlit

### 포지션: 엔터프라이즈의 데이터 민주화 도구

일본에서는 대기업의 업무 개선 도구로 도입이 활발하다.

### 구체적인 도입 사례

| 기업 | 규모·성과 |
|---|---|
| **NTT도코모** | 9,900만 회원 데이터를 분석하는 사내 플랫폼에 채택. 1,000명 이상이 사용하며, 5개월간 15,000회 실행. 업무 3,800시간 절감 |
| **일본항공(JAL)** | Snowflake + Streamlit 채택. 3개월 사이클 고속 개발 실현 |
| **CADDi** | ML 모델 평가 플랫폼. GCS + BigQuery 통합 |
| **M3(의료정보)** | GKE 위에서 자체 호스팅 |

### 일본 특유의 패턴

**일본어 NLP**:

```python
import spacy
nlp = spacy.load("ja_ginza")   # GiNZA(spaCy 기반 일본어 모델)

text = st.text_area("텍스트 입력")
if text:
    doc = nlp(text)
    tokens = [(t.text, t.pos_) for t in doc]
    st.dataframe(tokens)
```

MeCab, SudachiPy와 조합한 형태소 분석 도구도 정석 패턴.

**HTML lang 속성으로 브라우저 번역 팝업 억제**:

```python
st.markdown('<html lang="ja">', unsafe_allow_html=True)
```

**커뮤니티 성숙도**:
- Qiita의 Streamlit 태그에 매달 수십 건의 신규 기사
- 기술서적 "작って分かる[入門]Streamlit" (2025, 技術評論社) 출판
- **Snowflake in Streamlit(SiS)**의 엔터프라이즈 채택이 활발

---

## 8. 미국/글로벌에서의 Streamlit

### 포지션: LLM 시대 프론트엔드 표준

**2022년: Snowflake가 약 8억 달러에 인수.**

이 인수가 전환점이었다. "개인 개발자의 장난감"에서 "엔터프라이즈 대응 플랫폼"으로.

### 채택 규모

- **포춘 50대 기업의 90% 이상**이 채택
- GitHub 스타 20,000+
- Hugging Face Spaces의 공식 SDK로 채택
- DeepLearning.AI가 공식 코스 "**Fast Prototyping of GenAI Apps**" 개설

### 주요 활용 분야

| 분야 | 사례 |
|---|---|
| LLM 앱 | ChatGPT 스타일 UI의 최속 프로토타입 |
| 금융 | 실시간 포트폴리오 분석 |
| 헬스케어 | 수요 예측 정확도 25% 향상 사례 |
| 데이터 사이언스 | ML 모델의 평가·디버깅 UI |

### Snowflake Native Apps

```python
# Snowflake 위에서 직접 동작하는 Streamlit 앱
import snowflake.snowpark as snowpark

def main(session: snowpark.Session):
    df = session.table("SALES_DATA").to_pandas()
    st.dataframe(df)
```

B2B SaaS의 배포 채널로 **Snowflake Marketplace**가 기능하기 시작했다.

---

## 9. 한국·일본·미국 비교표

| 항목 | 한국 | 일본 | 미국 |
|---|---|---|---|
| **주 사용자층** | 스타트업, 교육 | 대기업, 엔터프라이즈 | 기업 + LLM 스타트업 |
| **주 활용 씬** | MVP, AI 챗봇 UI | 사내 대시보드, 데이터 민주화 | LLM 앱, 엔터프라이즈 |
| **커뮤니티 성숙도** | 성장 중 | 성숙(서적 출판) | 가장 성숙 |
| **특화 기술** | 한국어 NLP, 공공데이터 | 일본어 NLP, Snowflake SiS | Snowflake Native Apps |
| **기업 도입** | 제한적 | NTT도코모, JAL 등 | Fortune 50의 90%+ |
| **전형적인 스택** | LangChain + Pinecone | GKE + BigQuery | Snowflake + Vertex AI |

---

## 10. 결론: Streamlit의 한계와 다음 한 수

### 현재의 한계

| 한계 | 내용 |
|---|---|
| **전체 리렌더링** | 뭔가 바뀌면 전체 코드가 재실행됨(`@st.fragment`로 완화) |
| **상태 관리의 복잡성** | `session_state`가 늘어나면 추적이 어려워짐 |
| **프로덕션 UI** | 픽셀 퍼펙트한 디자인은 어려움 |
| **SEO** | SPA적 구조라 SEO에 불리 |

### 번역 도구에 다음으로 적용할 수 있는 것들

지금의 `koreamedia-translate`에 추가할 수 있는 개선:

1. **`@st.fragment`로 번역 위젯과 사전 에디터를 분리**
   → 사전 저장 시 번역 결과가 사라지지 않게 된다

2. **`st.write_stream()`으로 번역 결과를 스트리밍 표시**
   → 장문 번역에서 "기다리는 느낌"이 개선된다

3. **`st.navigation()`으로 URL 기반 페이지 전환**
   → 로그 페이지나 사전 페이지를 북마크 가능하게

4. **`st.pills`로 번역 스타일을 전환하는 UI**
   → "직역", "의역", "외교 문서체" 같은 프리셋

---

### 마무리

Streamlit의 커스터마이징은 **4층 구조**로 생각할 수 있다:

```
Level 1  테마 (config.toml)                 ← 10분이면 가능
Level 2  CSS 주입 · HTML 임베딩             ← 수 시간이면 가능
Level 3  커스텀 컴포넌트 (React)            ← 며칠 걸림
Level 4  Snowflake Native Apps              ← 본격적인 프로덕션
```

번역 도구를 만들면서 느낀 것은, "Python만으로 UI를 쓸 수 있다"는 낮은 진입장벽이
데이터 엔지니어나 백엔드 엔지니어에게 압도적인 생산성 우위를 준다는 것이다.

프로덕션 품질의 디자인이 필요해졌을 때 처음으로 Next.js를 검토하면 된다.
그때까지는 Streamlit으로 충분하다——그런 사용 방식이 전 세계에서 가속되고 있다.

---

## 참고 링크

- [Streamlit 공식 문서](https://docs.streamlit.io) — Streamlit 1.40+ 기준
- [NTT도코모 도입 사례](https://cloud.watch.impress.co.jp/docs/case/1576426.html)
- [Snowflake의 Streamlit 인수 (TechCrunch)](https://techcrunch.com/2022/03/02/snowflake-acquires-streamlit-for-800m-to-help-customers-build-data-based-apps/)
- [DeepLearning.AI Streamlit 코스](https://learn.deeplearning.ai)
- [CADDi 기술 블로그](https://caddi.tech/archives/3327)
- [teddylee777/streamlit-tutorial](https://github.com/teddylee777/streamlit-tutorial)
- [streamlit-aggrid](https://github.com/PablocFonseca/streamlit-aggrid)
