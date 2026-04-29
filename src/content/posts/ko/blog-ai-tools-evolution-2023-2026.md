---
title: '2023년부터 현재까지, AI 툴의 등장과 진화: 개발자가 반드시 알아야 할 23가지 툴'
description: '작성일: 2026년 3월 대상 독자: 어떤 툴이 어떤 흐름에서 나왔는지 파악하고 싶은 개발자'
pubDate: 2026-03-06T00:00:00.000Z
lang: ko
pairSlug: 'blog-ai-tools-evolution-2023-2026'
draft: false
sourceDir: posted
---
# 2023년부터 현재까지, AI 툴의 등장과 진화: 개발자가 반드시 알아야 할 23가지 툴

> 작성일: 2026년 3월
> 대상 독자: 어떤 툴이 어떤 흐름에서 나왔는지 파악하고 싶은 개발자

---

## 서론: 지각변동이 시작됐다

2022년 11월 30일. ChatGPT가 공개된 날을 기억하는가.

그 전날까지만 해도 "LLM으로 실용적인 앱을 만든다"는 말은 Google이나 OpenAI 내부 연구팀의 얘기였다. 파인튜닝에는 수억 원의 GPU 비용이 들었고, 프롬프트 엔지니어링이라는 개념조차 없었다. GPT-3 API는 존재했지만, 그걸로 뭘 만들어야 할지 아무도 몰랐다.

ChatGPT 출시 5일 만에 100만 사용자를 돌파했다. 두 달 만에 1억 명. 개발자 커뮤니티는 충격에 빠졌고, 동시에 흥분했다. 수백 개의 오픈소스 프로젝트가 GitHub에 쏟아지기 시작했다.

지난 3년간 등장한 AI 관련 개발 툴의 수는, 그 이전 10년간 등장한 것보다 많다. 이건 과장이 아니다. LangChain 하나만 해도 GitHub 스타가 10만 개를 넘었고, 매주 새로운 "LLM 앱 프레임워크"가 Product Hunt 상위에 올랐다. 살아남은 것도 있고, 조용히 사라진 것도 있고, 이미 유니콘이 된 것도 있다.

이 글은 그 흐름을 정리한다. 2022년 씨앗이 뿌려지고, 2023년 인프라가 폭발했고, 2024년 "바이브코딩"이라는 단어가 탄생했으며, 2025~2026년에는 에이전트가 UI를 직접 조작하기 시작했다. 23가지 툴을 연도순으로 따라가다 보면, 지금 우리가 어떤 시대에 서 있는지 보인다.

---

## 1장: 2022년 — 폭발의 씨앗

ChatGPT가 공개되기 직전, 이미 씨앗은 뿌려져 있었다.

### LangChain (2022년 10월) — "LLM 앱의 뼈대"

Harrison Chase가 혼자 만들어 GitHub에 올린 것이 시작이었다. "LLM을 연결하고, 체인처럼 이어 붙이자." 이 단순한 아이디어가 사실상의 표준이 됐다.

```python
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

llm = OpenAI(temperature=0.9)
prompt = PromptTemplate(
    input_variables=["product"],
    template="다음 제품을 파는 회사의 좋은 이름은 무엇인가요? {product}",
)
chain = LLMChain(llm=llm, prompt=prompt)
print(chain.run("화려한 양말"))
```

초기 LangChain의 코드는 이처럼 단순했다. 그러나 "체인"이라는 추상화 위에 에이전트, 메모리, 도구 호출, RAG가 쌓이면서 가장 복잡한 프레임워크 중 하나가 됐다.

### LlamaIndex (2022년 11월) — "RAG의 원조"

Jerry Liu가 "GPT Index"라는 이름으로 시작했다. LangChain이 LLM 앱 전반을 다루는 범용 프레임워크라면, LlamaIndex는 처음부터 RAG(Retrieval-Augmented Generation)에 집중했다. 문서를 인덱싱하고, 검색하고, LLM에 컨텍스트로 넘기는 파이프라인을 표준화했다. 2023년 6월 시리즈 A로 $850만 시드 투자를 받았다.

### Pynecone → Reflex (2022년 12월) — "Python으로 풀스택을"

"JavaScript를 한 줄도 안 쓰고 웹앱을 만들 수 있다." 당시에는 반응이 회의적이었다. 하지만 이 프로젝트는 살아남았고, 2023년 6월 "Reflex"로 리브랜딩하면서 정체성을 확립했다.

---

## 2장: 2023년 — 인프라 춘추전국시대

2023년은 혼돈이었다. 매달 새로운 프레임워크가 등장했고, 개발자들은 무엇을 배워야 할지 몰랐다. 그러나 돌아보면 이 시기에 살아남은 툴들이 지금의 생태계 기반을 만들었다.

### Chainlit (2023년 1월) — "LLM 챗봇 UI의 Streamlit"

**핵심 키워드: 챗봇 UI 프레임워크**

Streamlit이 ML 대시보드를 민주화했다면, Chainlit은 LLM 챗봇 UI를 민주화했다. 단 몇 줄로 대화형 인터페이스를 만들 수 있고, LangChain과 궁합이 좋았다. 특히 "단계별 사고 과정(Chain of Thought)"을 시각화하는 기능이 인상적이었다.

```python
import chainlit as cl
from langchain.llms import OpenAI

@cl.on_message
async def main(message: cl.Message):
    llm = OpenAI(streaming=True)

    async with cl.Step(name="LLM 호출") as step:
        response = await llm.apredict(message.content)
        step.output = response

    await cl.Message(content=response).send()
```

LangChain의 콜백 시스템과 통합되면서 에이전트의 내부 상태를 실시간으로 보여줄 수 있었다. 당시 RAG 데모, LLM 프로토타입의 사실상 표준 UI가 됐다.

### Cursor (2023년 3월) — "AI 코드 에디터 1세대"

**핵심 키워드: AI-first IDE**

VS Code를 포크해서 만든 코드 에디터. "Ctrl+K로 코드 생성", "Ctrl+L로 AI 채팅"이라는 단순한 UX가 강점이었다. 당시만 해도 GitHub Copilot이 지배적이었지만, Cursor는 Copilot이 할 수 없는 것을 했다: **파일 전체, 심지어 코드베이스 전체를 컨텍스트로 가져다 LLM과 대화**했다.

초기에는 GPT-4 API를 그대로 사용했고, 기능도 지금보다 훨씬 단순했다. 그러나 2024년 에이전트 모드를 추가하면서 "AI가 내 코드베이스를 직접 고친다"는 경험을 처음으로 대중화했다. 2025년 11월 $23억 라운드로 기업가치 $293억을 인정받았다.

### Dify (2023년 5월) — "노코드로 만드는 LLM 앱"

**핵심 키워드: 노코드 LLM 오케스트레이션**

LangChain이 "코드로 LLM 앱을 만드는 표준"이라면, Dify는 "GUI로 LLM 앱을 만드는 표준"을 지향했다. 플로우차트처럼 노드를 연결해 RAG 파이프라인, 챗봇, 에이전트를 만들 수 있다. Self-hosted와 클라우드 버전 모두 제공한다.

```yaml
# Dify workflow YAML (예시)
nodes:
  - id: llm-node
    type: llm
    data:
      model: gpt-4
      prompt: "사용자 질문에 답하세요: {{input}}"
  - id: output-node
    type: end
    inputs:
      text: "{{llm-node.output}}"
```

엔터프라이즈에서 특히 인기가 높다. IT 부서 없이 비개발자도 내부 챗봇을 만들 수 있다는 점이 강점이다.

### AutoGen (2023년 6월) — "멀티에이전트의 선구자"

**핵심 키워드: 멀티에이전트 대화 프레임워크**

Microsoft Research가 공개한 멀티에이전트 프레임워크. 핵심 아이디어는 "LLM 에이전트끼리 대화하게 한다"는 것이다. UserProxyAgent와 AssistantAgent가 대화를 주고받으며 문제를 해결한다.

```python
import autogen

assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"model": "gpt-4"},
)

user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10,
    code_execution_config={"work_dir": "coding"},
)

user_proxy.initiate_chat(
    assistant,
    message="피보나치 수열 20번째 항을 계산하는 Python 코드를 작성해줘.",
)
```

AutoGen에서 가장 충격적이었던 것은 에이전트가 코드를 작성하고, 실행하고, 결과를 보고 수정하는 사이클을 **자동으로** 반복한다는 점이었다. 이후 CrewAI, LangGraph 등 수많은 멀티에이전트 프레임워크의 원형이 됐다.

### Reflex (2023년 6월 리브랜딩) — "JS 없는 풀스택"

**핵심 키워드: Pure Python 풀스택**

Pynecone에서 Reflex로. 이름만 바뀐 게 아니라 아키텍처도 성숙했다. 클라이언트-서버 상태 동기화를 Python만으로 처리하는 방식은 독특했다. WebSocket으로 프론트엔드 상태를 백엔드 Python 객체와 동기화한다.

```python
import reflex as rx

class State(rx.State):
    count: int = 0

    def increment(self):
        self.count += 1

def index():
    return rx.vstack(
        rx.heading(f"카운트: {State.count}"),
        rx.button("증가", on_click=State.increment),
    )

app = rx.App()
app.add_page(index)
```

Python 데이터사이언티스트가 ML 모델을 웹 앱으로 배포할 때 특히 강점이 있다. React 기반의 프론트엔드를 자동 생성하지만 개발자는 Python만 작성한다.

### Marimo (2023년 말 공개) — "Jupyter를 버려라"

**핵심 키워드: 리액티브 노트북**

"Jupyter Notebook의 가장 큰 문제는 셀 실행 순서에 의존한다는 것이다." Marimo의 창업자들은 이 문제를 정면 돌파했다. 셀 간 의존성을 분석해 DAG(방향성 비순환 그래프)를 자동 구성하고, 한 셀이 바뀌면 의존하는 모든 셀이 자동으로 재실행된다.

```python
import marimo as mo

slider = mo.ui.slider(1, 100, value=50)
slider
```

```python
# 위 슬라이더 값이 바뀌면 이 셀도 자동으로 재실행된다
mo.md(f"슬라이더 값: **{slider.value}**")
```

2024년 11월 $500만 시드 투자를 받으며 스텔스를 탈출했다. 노트북 파일이 `.py` 확장자를 사용하기 때문에 버전 관리도 자연스럽다.

### Mesop (2023년 12월 첫 릴리즈) — "Google이 내부에서 쓰던 것"

**핵심 키워드: Google 내부 Python UI**

Google이 내부 AI 데모와 도구를 만들기 위해 개발한 Python UI 프레임워크. 2024년 5월 오픈소스로 공개됐다. Angular 기반의 프론트엔드를 Python 코드로 구동한다.

```python
import mesop as me
import mesop.labs as mel

@me.page(path="/")
def app():
    mel.chat(transform, title="Mesop AI 챗봇", bot_user="AI")

def transform(input: str, history: list[mel.ChatMessage]):
    yield "안녕하세요! " + input
```

"Google이 쓰는 방식"이라는 신뢰감이 있다. Gemini API와의 통합이 자연스럽다.

---

## 3장: 2024년 상반기 — 에이전트의 부상

2023년이 "LLM으로 뭔가 만들 수 있다"를 증명한 해라면, 2024년은 "에이전트가 스스로 행동한다"를 실현한 해다.

### CrewAI (2024년 초) — "역할극 하는 에이전트들"

**핵심 키워드: 역할 기반 멀티에이전트**

AutoGen이 에이전트 간 대화를 추상화했다면, CrewAI는 여기에 "역할(Role)"과 "목표(Goal)"를 부여했다. 연구원, 작가, 편집자 에이전트가 각자의 역할을 수행하며 협력한다.

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="시니어 리서처",
    goal="최신 AI 트렌드를 조사한다",
    backstory="10년 경력의 AI 연구원",
    verbose=True,
)

writer = Agent(
    role="테크 블로거",
    goal="리서치 결과를 읽기 쉬운 글로 작성한다",
    backstory="개발자 독자를 위한 블로그 작가",
    verbose=True,
)

research_task = Task(
    description="2024년 주요 AI 프레임워크 트렌드 조사",
    agent=researcher,
)

write_task = Task(
    description="리서치 결과를 바탕으로 블로그 포스트 초안 작성",
    agent=writer,
)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()
```

GitHub 스타 증가 속도가 LangChain 초기를 연상시킬 만큼 빨랐다. 기업 환경에서 "AI 팀"을 구성하는 패턴으로 인기가 높다.

### LangGraph (2024년) — "에이전트를 그래프로 설계"

**핵심 키워드: 상태 기반 에이전트 오케스트레이션**

LangChain 팀이 에이전트의 한계를 인정하고 새로 설계한 것이 LangGraph다. 기존 LangChain 에이전트는 선형적(Linear)이었다. 조건 분기, 루프, 병렬 처리가 어려웠다. LangGraph는 에이전트의 실행 흐름을 방향성 그래프로 표현한다.

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    next_step: str

def should_continue(state: AgentState):
    if state["next_step"] == "done":
        return END
    return "agent"

def call_agent(state: AgentState):
    # LLM 호출 로직
    return {"next_step": "done", "messages": state["messages"]}

workflow = StateGraph(AgentState)
workflow.add_node("agent", call_agent)
workflow.add_conditional_edges("agent", should_continue)
workflow.set_entry_point("agent")

app = workflow.compile()
```

LangChain의 "Agent"가 블랙박스였다면, LangGraph는 에이전트의 상태 전환을 완전히 가시화하고 제어한다. 프로덕션 에이전트 시스템 구축의 사실상 표준이 되고 있다.

### FastHTML (2024년) — "Jeremy Howard의 도전"

**핵심 키워드: HTMX 기반 Python 웹앱**

fast.ai의 Jeremy Howard가 만들었다. "모던 웹 개발은 너무 복잡해졌다"는 문제의식에서 출발했다. HTMX를 활용해 JavaScript 없이 서버 사이드 렌더링만으로 동적 웹앱을 구현한다.

```python
from fasthtml.common import *

app, rt = fast_app()

todos = []

@rt("/")
def get():
    return Titled("Todo 앱",
        Form(
            Input(id="new-todo", name="todo", placeholder="할 일 입력"),
            Button("추가"),
            hx_post="/add", hx_target="#todo-list", hx_swap="beforeend"
        ),
        Ul(*[Li(t) for t in todos], id="todo-list")
    )

@rt("/add")
def post(todo: str):
    todos.append(todo)
    return Li(todo)
```

React, Next.js로 대표되는 SPA 패러다임에 정면 도전한다. "웹의 원래 모델로 돌아가자"는 메시지가 특정 개발자들에게 강하게 공명했다.

### NiceGUI (2024년 급성장) — "정교한 Python UI"

**핵심 키워드: FastAPI + Vue.js 조합**

Streamlit이 데이터 대시보드에 특화됐다면, NiceGUI는 일반 웹 앱에 가까운 정교한 UI를 Python으로 만들 수 있다. 내부적으로 FastAPI와 Vue.js를 사용하며, 3D 그래픽, 실시간 업데이트, 복잡한 레이아웃을 지원한다.

```python
from nicegui import ui

with ui.card():
    ui.label("AI 모델 설정").classes("text-h6")
    temperature = ui.slider(min=0, max=1, value=0.7, step=0.1)
    ui.label().bind_text_from(temperature, "value",
                               lambda v: f"Temperature: {v:.1f}")

    with ui.row():
        ui.button("실행", on_click=lambda: ui.notify("모델 실행 중..."))
        ui.button("초기화", on_click=lambda: temperature.set_value(0.7))

ui.run()
```

로봇공학, 산업 제어 패널 같은 분야에서 강점이 있다. GitHub 스타가 2024년 한 해 동안 두 배 이상 늘었다.

### Mesop 오픈소스 공개 (2024년 5월) — "Google의 공식 선언"

내부 프로젝트였던 Mesop을 Google이 공식 오픈소스로 공개했다. "Google 내부의 AI 팀이 이걸 쓴다"는 사실 자체가 강한 신호였다. Gemini API, Google Cloud와의 통합이 매끄럽다는 점이 기업 환경에서 매력적이다.

---

## 4장: 2024년 하반기 — "바이브코딩"이라는 충격

"Vibe Coding"이라는 단어가 처음 등장한 건 2025년 초 Andrej Karpathy의 트윗이었지만, 그 실체는 2024년 하반기에 이미 형성되고 있었다. "AI에게 원하는 걸 말하면 AI가 코드를 짜준다." 그런데 그게 진짜 됐다.

### Gradio 5.0 (2024년 10월) — "ML 데모의 진화"

**핵심 키워드: SSR + 스트리밍 미디어**

Hugging Face가 인수한 Gradio가 5.0에서 대규모 개편을 단행했다. 서버사이드 렌더링(SSR), 스트리밍 미디어 지원, 개선된 AI Playground가 핵심이다. Hugging Face Spaces와의 통합으로 ML 모델 데모의 사실상 표준으로 자리 잡았다.

```python
import gradio as gr

def analyze_image(image, prompt):
    # 멀티모달 LLM 호출 로직
    return f"이미지 분석 결과: {prompt}에 대한 답변"

demo = gr.Interface(
    fn=analyze_image,
    inputs=[
        gr.Image(type="pil", label="이미지"),
        gr.Textbox(label="질문"),
    ],
    outputs=gr.Markdown(label="분석 결과"),
    title="멀티모달 AI 분석기",
    examples=[["sample.jpg", "이 이미지에서 무엇이 보이나요?"]],
)

demo.launch()
```

Gradio 5.0의 스트리밍 지원은 LLM 응답을 실시간으로 보여주는 경험을 극적으로 개선했다.

### Bolt.new (2024년 10월) — "바이브코딩 대표주자"

**핵심 키워드: 브라우저 내 풀스택 바이브코딩**

StackBlitz의 Bolt.new가 2024년 10월 4일 출시됐다. "채팅으로 풀스택 웹앱을 만든다." 브라우저 안에서 Node.js 환경이 실행되고, AI가 코드를 작성해 즉시 미리보기가 뜬다. 배포도 한 클릭.

출시 5개월 만에 ARR(연간 반복 매출) $4,000만을 달성했다. SaaS 역사상 가장 빠른 성장 중 하나로 기록됐다.

개발자들의 반응은 극단으로 갈렸다: "이게 진짜 코딩이냐"라는 회의론과 "이제 아이디어만 있으면 된다"는 열광론. 그런데 현실은 Bolt.new의 수익이 그 논쟁을 종결했다.

### Windsurf (2024년 11월) — "에이전트 IDE의 등장"

**핵심 키워드: 최초의 에이전트 IDE**

Codeium이 만든 코드 에디터. "최초의 에이전트 IDE"를 표방했다. Cursor가 "AI 코드 에디터"라면, Windsurf는 한 발 더 나아가 에이전트가 코드베이스 전체를 탐색하고 수정하는 "Cascade" 기능을 전면에 내세웠다.

에이전트가 파일을 직접 읽고, 수정하고, 터미널을 실행하고, 결과를 확인하는 루프를 자율적으로 돌린다. 개발자는 "이 버그 고쳐줘"라고 하면 Windsurf가 관련 파일을 찾아 읽고, 수정 계획을 세우고, 코드를 바꾸고, 테스트를 실행한다. 2025년 Google이 인수 의향을 밝히면서 주목받았다.

### Lovable (2024년 11월) — "개발자가 필요없어지는 세계?"

**핵심 키워드: AI 풀스택 엔지니어**

GPT Engineer의 후신. 스웨덴 팀이 만든 Lovable은 "AI 풀스택 엔지니어"를 표방한다. "소셜 미디어 앱을 만들어줘"라고 말하면 React 프론트엔드, Supabase 백엔드, 인증 시스템까지 갖춘 앱이 생성된다.

2025년 4월 Lovable 2.0이 출시되면서 기능이 대폭 확장됐다. 실시간 협업, GitHub 연동, 커스텀 도메인 배포 등이 추가됐다. "개발자가 없어도 되느냐"는 질문에 대한 답은 아직 "아니다"에 가깝지만, 프로토타이핑 비용이 0에 수렴하고 있다는 사실은 부정할 수 없다.

---

## 5장: 2025~2026년 — 에이전트가 UI를 직접 조작하는 시대

"에이전트가 코드를 짠다"에서 "에이전트가 사용자처럼 앱을 조작한다"로. 패러다임이 다시 한 번 이동했다.

### CopilotKit (2024~2025년) — "앱 안에 AI를"

**핵심 키워드: React 기반 인앱 코파일럿**

"AI가 외부에서 앱을 만드는 게 아니라, 앱 안에서 AI가 동작한다." CopilotKit은 React 앱에 AI 코파일럿 기능을 추가하는 오픈소스 프레임워크다. 앱의 상태를 AI에게 노출하고, AI가 앱 액션을 직접 호출할 수 있게 한다.

```tsx
import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  useCopilotAction({
    name: "addTodo",
    description: "새로운 할 일을 추가한다",
    parameters: [{ name: "text", type: "string" }],
    handler: ({ text }) => setTodos([...todos, { text, done: false }]),
  });

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <TodoList todos={todos} />
      <CopilotSidebar defaultOpen={true} />
    </CopilotKit>
  );
}
```

AI가 앱의 내부 상태에 직접 접근하고 수정할 수 있다는 것이 핵심이다. "앱에 채팅창을 붙이는 것"과 "앱 자체가 AI를 이해하는 것"의 차이다.

### AG-UI 프로토콜 (2025년) — "에이전트↔UI 통신 표준"

**핵심 키워드: 에이전트-UI 통신 표준 규격**

AG-UI(Agent-User Interaction Protocol)는 에이전트와 프론트엔드 UI가 소통하는 방식을 표준화한 프로토콜이다. HTTP, WebSocket, SSE(Server-Sent Events) 등 다양한 전송 방식을 지원하며, 에이전트의 상태 업데이트, 툴 호출, 스트리밍 응답을 표준 이벤트 스트림으로 정의한다.

```typescript
// AG-UI 이벤트 스트림 예시
const eventStream = new EventSource("/agent/stream");

eventStream.onmessage = (event) => {
  const agentEvent = JSON.parse(event.data);

  switch (agentEvent.type) {
    case "TEXT_MESSAGE_CHUNK":
      appendToChat(agentEvent.delta);
      break;
    case "TOOL_CALL_START":
      showToolUsage(agentEvent.toolName, agentEvent.args);
      break;
    case "STATE_DELTA":
      updateAppState(agentEvent.delta);
      break;
  }
};
```

LangChain, CrewAI, AutoGen 등 주요 에이전트 프레임워크들이 AG-UI를 지원하기 시작했다. "에이전트 프레임워크가 UI 프레임워크를 직접 조작하는 표준"이 생겼다는 것이 의미심장하다.

### Writer Framework (2025년) — "AI 기업이 만든 프레임워크"

**핵심 키워드: 노코드 UI + Python 백엔드**

AI 글쓰기 도구로 알려진 Writer가 개발자를 위한 프레임워크를 공개했다. 노코드 UI 빌더와 Python 백엔드를 결합한 형태로, Writer의 LLM API와의 통합이 자연스럽다. "AI 네이티브 앱을 만드는 프레임워크"를 표방한다.

```python
import writer as wf

def handle_ask(state, payload):
    user_message = payload
    state["response"] = ""

    # Writer LLM API 스트리밍 호출
    for chunk in wf.ai.complete(user_message, stream=True):
        state["response"] += chunk

initial_state = wf.init_state({
    "response": "안녕하세요! 무엇을 도와드릴까요?",
})
```

### Microsoft Agent Framework (2025년 10월) — "통합의 시대"

**핵심 키워드: AutoGen + Semantic Kernel 통합**

Microsoft가 2023년 공개한 AutoGen과 Semantic Kernel을 통합한 것이 Microsoft Agent Framework다. 기업 환경에서 AI 에이전트를 구축하는 통합 플랫폼을 제공한다. Azure OpenAI Service, Microsoft 365, Teams와의 통합이 핵심이다.

AutoGen v0.4부터 대규모 아키텍처 개편이 이뤄졌고, 분산 에이전트 시스템을 지원한다. 엔터프라이즈에서 "에이전트가 사내 시스템과 연동한다"는 시나리오의 사실상 표준 스택이 됐다.

### Cursor $2.3B 라운드 (2025년 11월) — "코드 에디터가 플랫폼이 됐다"

**핵심 키워드: $293억 기업가치**

2025년 11월, Cursor가 $23억의 투자를 유치했다. 기업가치는 $293억. VS Code 플러그인으로 시작한 GitHub Copilot이 Microsoft 생태계의 일부라면, Cursor는 독립적인 AI 개발 플랫폼으로 자리 잡겠다는 의지를 표명한 것이다.

CNBC 보도에 따르면, Cursor의 ARR은 2025년 초 $1억을 돌파했다. "AI 코드 에디터는 일시적인 유행"이라는 예측이 완전히 틀렸음을 증명하는 숫자다. 이제 코드 에디터는 그 자체로 AI 플랫폼 경쟁의 전장이 됐다.

---

## 6장: 카테고리별 전체 지도

23가지 툴을 카테고리별로 정리하면 다음과 같다.

### 카테고리 분류표

| 카테고리 | 툴 | 특징 |
|---------|-----|------|
| **데이터/ML 앱 UI** | Chainlit, Gradio 5.0, Marimo, Mesop, NiceGUI, Writer Framework | Python → 웹 UI 빠른 프로토타이핑 |
| **Python 풀스택 웹앱** | Reflex, FastHTML | JS 없이 풀스택 |
| **에이전트/LLM 인프라** | LangChain, LlamaIndex, Dify, AutoGen, CrewAI, LangGraph, CopilotKit, AG-UI, Microsoft Agent Framework | LLM 앱 오케스트레이션 |
| **AI 코드 에디터/바이브코딩** | Cursor, Windsurf, Bolt.new, Lovable | AI가 코드를 직접 작성 |

### 연도별 등장 타임라인

| 연도 | 툴 | 카테고리 | 키워드 |
|------|-----|---------|--------|
| 2022.10 | LangChain | LLM 인프라 | LLM 체이닝 표준 |
| 2022.11 | LlamaIndex | LLM 인프라 | RAG 특화 |
| 2022.12 | Pynecone(→Reflex) | Python 웹앱 | Pure Python 풀스택 |
| 2023.01 | Chainlit | ML 앱 UI | LLM 챗봇 UI |
| 2023.03 | Cursor | AI 에디터 | AI-first IDE |
| 2023.05 | Dify | LLM 인프라 | 노코드 LLM 앱 |
| 2023.06 | AutoGen | 에이전트 | 멀티에이전트 대화 |
| 2023.06 | Reflex (리브랜딩) | Python 웹앱 | JS 없는 풀스택 |
| 2023.말 | Marimo | ML 앱 UI | 리액티브 노트북 |
| 2023.12 | Mesop (내부 릴리즈) | ML 앱 UI | Google 내부 Python UI |
| 2024.초 | CrewAI | 에이전트 | 역할 기반 멀티에이전트 |
| 2024 | LangGraph | 에이전트 | 상태 기반 오케스트레이션 |
| 2024 | FastHTML | Python 웹앱 | HTMX 기반 웹앱 |
| 2024 | NiceGUI | ML 앱 UI | FastAPI + Vue.js |
| 2024.05 | Mesop (오픈소스 공개) | ML 앱 UI | Google 공식 공개 |
| 2024.10 | Gradio 5.0 | ML 앱 UI | SSR + 스트리밍 |
| 2024.10 | Bolt.new | 바이브코딩 | ARR $4,000만 (5개월) |
| 2024.11 | Windsurf | AI 에디터 | 에이전트 IDE |
| 2024.11 | Lovable | 바이브코딩 | AI 풀스택 엔지니어 |
| 2024~2025 | CopilotKit | 에이전트/UI | 인앱 AI 코파일럿 |
| 2025 | AG-UI 프로토콜 | 에이전트/UI | 에이전트↔UI 통신 표준 |
| 2025 | Writer Framework | ML 앱 UI | 노코드 UI + Python 백엔드 |
| 2025.10 | Microsoft Agent Framework | 에이전트 | AutoGen + Semantic Kernel 통합 |
| 2025.11 | Cursor $2.3B 라운드 | AI 에디터 | 기업가치 $293억 |

---

## 결론: 플랫폼이 될 것인가, 도구로 남을 것인가

이 23가지 툴의 역사를 돌아보면 하나의 패턴이 보인다.

**1단계**: 연구자/해커가 개인 프로젝트로 시작한다. (LangChain, LlamaIndex, Chainlit)
**2단계**: 개발자 커뮤니티에서 폭발적 관심을 받는다. GitHub 스타 1만, 5만, 10만.
**3단계**: 벤처 투자가 들어온다. 팀이 꾸려진다.
**4단계**: 기업화 경쟁이 시작된다. "도구"에서 "플랫폼"으로.

Cursor가 $293억 기업가치를 받은 것은 "코드 에디터"로서가 아니다. 개발자가 AI와 협업하는 새로운 플랫폼을 선점했다는 것에 대한 베팅이다.

AG-UI 프로토콜이 상징하는 것은 더 급진적이다. "에이전트가 사용자 대신 앱을 조작한다"는 미래다. 사용자가 클릭하고 입력하는 대신, 에이전트가 API를 호출하고 상태를 변경한다. UI는 이제 사람만을 위한 것이 아니라 에이전트도 소비하는 인터페이스가 됐다.

그렇다면 지금 어떤 툴을 배워야 하는가?

- **지금 당장 프로토타입을 만들어야 한다면**: Gradio, Chainlit, Streamlit
- **Python으로 프로덕션 앱을 만들어야 한다면**: Reflex, FastHTML, NiceGUI
- **RAG 시스템을 구축해야 한다면**: LlamaIndex + LangGraph
- **멀티에이전트 시스템이 필요하다면**: CrewAI 또는 AutoGen/Microsoft Agent Framework
- **코딩 생산성을 높이고 싶다면**: Cursor (현재 가장 성숙)
- **프로토타입을 빠르게 만들어 보여줘야 한다면**: Bolt.new, Lovable

그러나 가장 중요한 것은 이 모든 툴을 관통하는 메타 스킬이다: **에이전트가 어떻게 생각하고, 어떤 흐름으로 동작하고, 어디서 실패하는지를 이해하는 것.** 툴은 바뀌지만, 그 이해는 남는다.

2022년 11월부터 지금까지 3년이 조금 넘었다. 앞으로 3년은 어떨까. 확실한 것 하나: 또 이 글을 업데이트해야 할 것이다.

---

*이 글에서 언급된 주요 수치 출처:*
- Cursor 기업가치 $293억: CNBC, 2025-11-13
- Bolt.new ARR $4,000만 (5개월 만에): growthunhinged.com
- LangChain 첫 커밋: 2022년 10월 (Harrison Chase)
- LlamaIndex $850만 시드: 2023년 6월 (Jerry Liu)
- Marimo $500만 시드 & 스텔스 탈출: 2024년 11월
- Mesop 오픈소스 공개: 2024년 5월 (Google)
- Gradio 5.0 출시: 2024년 10월
- Windsurf 출시: 2024년 11월 (Codeium)
- Lovable 출시: 2024년 11월 21일
- Microsoft Agent Framework: 2025년 10월
- Cursor 시리즈 C: 2025년 11월 ($2.3B @ $29.3B)
