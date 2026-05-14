---
title: 'From 2023 to Today: The Rise and Evolution of AI Tools — 23 You Need to Know'
description: 'Written March 2026. Intended audience: developers who want a map of which tool emerged out of which current.'
pubDate: 2026-03-06T00:52:26.501Z
lang: 'en'
pairSlug: 'blog-ai-tools-evolution-2023-2026'
draft: false
---
# From 2023 to Today: The Rise and Evolution of AI Tools — 23 You Need to Know

> Written March 2026
> Intended audience: developers who want a map of which tool emerged out of which current.

---

## Introduction: the tectonic shift has begun

November 30, 2022. Do you remember the day ChatGPT was released?

The day before, "building practical apps with LLMs" was something only research teams inside Google or OpenAI talked about. Fine-tuning ran up hundreds of thousands of dollars in GPU costs, and the term "prompt engineering" did not yet exist. The GPT-3 API was already available, but nobody quite knew what to build with it.

Five days after its launch, ChatGPT had crossed one million users. Two months later, one hundred million. The developer community was both stunned and electrified. Hundreds of open-source projects began pouring onto GitHub.

The number of AI-related developer tools that have emerged in the past three years is greater than in the previous decade. That is not an exaggeration. LangChain alone has more than 100,000 GitHub stars, and every week a new "LLM app framework" climbed the top of Product Hunt. Some survived, some quietly disappeared, and some have already become unicorns.

This article traces that arc. Seeds were planted in 2022, infrastructure exploded in 2023, the word "vibe coding" was born in 2024, and in 2025–2026 agents began operating UIs themselves. Walking through these 23 tools in chronological order shows where exactly we are standing today.

---

## Chapter 1: 2022 — the seeds of the explosion

Just before ChatGPT was unveiled, the seeds had already been planted.

### LangChain (October 2022) — "the skeleton of LLM apps"

It started as a personal project Harrison Chase put on GitHub. "Let's connect LLMs and chain them together." That simple idea became the de facto standard.

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

Early LangChain code looked this simple. But once agents, memory, tool calls, and RAG were layered on top of the "chain" abstraction, it became one of the most complex frameworks in the ecosystem.

### LlamaIndex (November 2022) — "the original RAG"

Jerry Liu launched it under the name "GPT Index." If LangChain is a general framework that handles the whole of LLM application development, LlamaIndex was focused from the start on RAG (Retrieval-Augmented Generation). It standardized the pipeline of indexing documents, retrieving them, and handing them to an LLM as context. In June 2023 it raised an $8.5 million seed Series A.

### Pynecone → Reflex (December 2022) — "full stack in Python"

"You can build a web app without writing a single line of JavaScript." Reactions at the time were skeptical. But the project survived, and in June 2023 it rebranded as "Reflex," firming up its identity.

---

## Chapter 2: 2023 — the warring states of infrastructure

2023 was chaos. A new framework appeared every month, and developers had no idea what to learn. In hindsight, the tools that survived this period laid the foundation of today's ecosystem.

### Chainlit (January 2023) — "the Streamlit of LLM chatbot UIs"

**Keyword: chatbot UI framework**

If Streamlit democratized ML dashboards, Chainlit democratized LLM chatbot UIs. In just a few lines you could build a conversational interface, and it paired well with LangChain. Especially striking was its ability to visualize the step-by-step "Chain of Thought" reasoning process.

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

Integrated with LangChain's callback system, it could surface an agent's internal state in real time. At the time, it became the de facto standard UI for RAG demos and LLM prototypes.

### Cursor (March 2023) — "first-generation AI code editor"

**Keyword: AI-first IDE**

A code editor built as a fork of VS Code. Its strength lay in a simple UX: "Ctrl+K to generate code," "Ctrl+L to chat with the AI." GitHub Copilot dominated the era, but Cursor did something Copilot could not: it **brought entire files, even entire codebases, into the LLM as context for a conversation**.

Early on it used the GPT-4 API directly, and the features were much simpler than today's. But when it added agent mode in 2024, it was the first product to popularize the experience of "the AI directly modifies my codebase." In November 2025 it raised a $2.3 billion round at a $29.3 billion valuation.

### Dify (May 2023) — "build LLM apps without code"

**Keyword: no-code LLM orchestration**

If LangChain is "the standard for building LLM apps in code," Dify aimed to be "the standard for building LLM apps in a GUI." You connect nodes like a flowchart to assemble RAG pipelines, chatbots, and agents. It is available both self-hosted and as a cloud product.

```yaml
# Dify workflow YAML (example)
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

It is particularly popular in enterprise settings. The strength is that non-developers can build internal chatbots without involving the IT department.

### AutoGen (June 2023) — "the pioneer of multi-agent"

**Keyword: multi-agent conversation framework**

A multi-agent framework released by Microsoft Research. The core idea: "let LLM agents talk to each other." UserProxyAgent and AssistantAgent exchange messages to solve problems.

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

What was most striking about AutoGen was that the agent **automatically** repeated the cycle of writing code, executing it, seeing the result, and revising. It became the archetype for countless multi-agent frameworks that followed — CrewAI, LangGraph, and others.

### Reflex (rebranded June 2023) — "full stack without JS"

**Keyword: pure-Python full stack**

From Pynecone to Reflex. The name was not the only thing that changed; the architecture matured. Its approach of handling client–server state synchronization in Python alone was distinctive. It synchronized frontend state with backend Python objects over WebSocket.

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

It is especially strong when Python data scientists need to deploy ML models as web apps. It auto-generates a React frontend, but the developer writes only Python.

### Marimo (released late 2023) — "ditch Jupyter"

**Keyword: reactive notebook**

"Jupyter Notebook's biggest problem is its dependence on cell execution order." Marimo's founders went at this head-on. It analyzes inter-cell dependencies, automatically builds a DAG (directed acyclic graph), and when one cell changes, every cell that depends on it is automatically re-executed.

```python
import marimo as mo

slider = mo.ui.slider(1, 100, value=50)
slider
```

```python
# 위 슬라이더 값이 바뀌면 이 셀도 자동으로 재실행된다
mo.md(f"슬라이더 값: **{slider.value}**")
```

It exited stealth in November 2024 with a $5 million seed. Because the notebook files use the `.py` extension, version control is natural too.

### Mesop (first release December 2023) — "what Google was using internally"

**Keyword: Google's internal Python UI**

A Python UI framework Google built internally for its own AI demos and tools. It was open-sourced in May 2024. It powers an Angular-based frontend from Python code.

```python
import mesop as me
import mesop.labs as mel

@me.page(path="/")
def app():
    mel.chat(transform, title="Mesop AI 챗봇", bot_user="AI")

def transform(input: str, history: list[mel.ChatMessage]):
    yield "안녕하세요! " + input
```

The "Google uses this internally" trust signal is real. Integration with the Gemini API is natural.

---

## Chapter 3: first half of 2024 — the rise of agents

If 2023 was the year that proved "you can build something with an LLM," 2024 was the year that made "the agent acts on its own" real.

### CrewAI (early 2024) — "agents playing roles"

**Keyword: role-based multi-agent**

If AutoGen abstracted away inter-agent dialogue, CrewAI added "roles" and "goals" on top. Researcher, writer, and editor agents each play their part and collaborate.

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

The pace at which its GitHub stars climbed was reminiscent of early LangChain. It is especially popular as a pattern for assembling an "AI team" in enterprise environments.

### LangGraph (2024) — "design agents as graphs"

**Keyword: state-based agent orchestration**

LangGraph is what the LangChain team built after admitting the limits of its agent abstraction. The earlier LangChain agent was linear. Conditional branching, loops, and parallelism were hard. LangGraph represents an agent's execution flow as a directed graph.

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

If LangChain's "Agent" was a black box, LangGraph makes the agent's state transitions fully visible and controllable. It is becoming the de facto standard for building production agent systems.

### FastHTML (2024) — "Jeremy Howard's challenge"

**Keyword: HTMX-based Python web apps**

Built by Jeremy Howard of fast.ai. It started from the conviction that "modern web development has become too complex." It uses HTMX to deliver dynamic web apps from server-side rendering alone, without JavaScript.

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

It is a direct challenge to the SPA paradigm represented by React and Next.js. The message — "let's go back to the original model of the web" — resonates strongly with a certain segment of developers.

### NiceGUI (rapid growth in 2024) — "polished Python UI"

**Keyword: FastAPI + Vue.js combination**

If Streamlit specializes in data dashboards, NiceGUI lets you build polished general-purpose web UIs in Python. Internally it uses FastAPI and Vue.js and supports 3D graphics, real-time updates, and complex layouts.

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

It is particularly strong in domains like robotics and industrial control panels. Its GitHub stars more than doubled over 2024.

### Mesop open-sourced (May 2024) — "Google's official declaration"

Google officially open-sourced Mesop, the internal project. The very fact that "Google's internal AI teams use this" was a strong signal. Smooth integration with the Gemini API and Google Cloud makes it attractive in enterprise environments.

---

## Chapter 4: second half of 2024 — the shock of "vibe coding"

The phrase "Vibe Coding" first showed up in an Andrej Karpathy tweet in early 2025, but the reality had already taken shape in the second half of 2024. "Tell the AI what you want and the AI writes the code." And it actually worked.

### Gradio 5.0 (October 2024) — "the evolution of ML demos"

**Keyword: SSR + streaming media**

Hugging Face's Gradio, now under its ownership, executed a major overhaul in version 5.0. Server-side rendering (SSR), streaming media support, and an improved AI Playground were the core changes. Combined with Hugging Face Spaces, it became the de facto standard for ML model demos.

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

Gradio 5.0's streaming support dramatically improved the experience of watching LLM responses arrive in real time.

### Bolt.new (October 2024) — "the face of vibe coding"

**Keyword: in-browser full-stack vibe coding**

StackBlitz launched Bolt.new on October 4, 2024. "Build a full-stack web app by chatting." A Node.js environment runs inside the browser, the AI writes the code, and a live preview appears instantly. Deployment is one click.

Five months after launch it had reached $40 million in ARR (annual recurring revenue). It is recorded as one of the fastest growth trajectories in SaaS history.

Developer reactions split sharply: the skepticism of "is this really coding?" versus the enthusiasm of "now all you need is an idea." Bolt.new's revenue closed the debate in practice.

### Windsurf (November 2024) — "the arrival of the agent IDE"

**Keyword: the first agent IDE**

A code editor built by Codeium, branded "the first agent IDE." If Cursor was an "AI code editor," Windsurf took a step further and put "Cascade" at the center — an agent that explores and modifies the entire codebase.

The agent autonomously runs a loop: read files directly, edit them, run the terminal, observe the result. The developer says "fix this bug," and Windsurf finds the relevant files, formulates a plan, changes the code, and runs the tests. It drew major attention in 2025 when Google reportedly expressed acquisition interest.

### Lovable (November 2024) — "a world where developers become unnecessary?"

**Keyword: the AI full-stack engineer**

The successor to GPT Engineer. Built by a Swedish team, Lovable positions itself as an "AI full-stack engineer." Say "make me a social media app" and an app emerges complete with a React frontend, Supabase backend, and authentication system.

Lovable 2.0, released in April 2025, expanded its capabilities significantly. Real-time collaboration, GitHub integration, and custom domain deployment were added. The answer to "do we still need developers?" is still closer to "yes, we do," but the fact that the cost of prototyping is approaching zero is undeniable.

---

## Chapter 5: 2025–2026 — the era of agents operating UIs directly

From "agents write code" to "agents operate apps like a user." The paradigm shifted again.

### CopilotKit (2024–2025) — "AI inside the app"

**Keyword: React-based in-app copilot**

"It's not that the AI builds the app from outside — the AI works inside the app." CopilotKit is an open-source framework for adding AI copilot capabilities to React apps. It exposes app state to the AI and lets the AI call app actions directly.

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

The key is that the AI can directly access and modify the app's internal state. It is the difference between "stapling a chat box onto an app" and "the app itself understanding AI."

### AG-UI Protocol (2025) — "the agent↔UI communication standard"

**Keyword: a standard spec for agent-UI communication**

AG-UI (Agent-User Interaction Protocol) standardizes how agents and frontend UIs talk to each other. It supports various transports including HTTP, WebSocket, and SSE (Server-Sent Events), and defines agent state updates, tool calls, and streaming responses as a standard event stream.

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

Major agent frameworks — LangChain, CrewAI, AutoGen — have started supporting AG-UI. The fact that "agent frameworks now have a standard for directly operating UI frameworks" is significant.

### Writer Framework (2025) — "the framework an AI company built"

**Keyword: no-code UI + Python backend**

Writer, the company known for its AI writing tools, released a framework for developers. It combines a no-code UI builder with a Python backend, and integration with Writer's LLM API is natural. It bills itself as "the framework for building AI-native apps."

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

### Microsoft Agent Framework (October 2025) — "the age of integration"

**Keyword: AutoGen + Semantic Kernel integration**

Microsoft Agent Framework integrates AutoGen, which Microsoft released in 2023, with Semantic Kernel. It provides a unified platform for building AI agents in enterprise environments. Integration with Azure OpenAI Service, Microsoft 365, and Teams is the core value.

From AutoGen v0.4 onward, a major architectural overhaul was completed, with support for distributed agent systems. It has become the de facto standard stack in enterprise scenarios where "agents integrate with internal systems."

### Cursor's $2.3B round (November 2025) — "the code editor became a platform"

**Keyword: $29.3B valuation**

In November 2025, Cursor raised $2.3 billion in funding. Its valuation: $29.3 billion. If GitHub Copilot, which began as a VS Code plugin, is part of the Microsoft ecosystem, Cursor is staking its claim as an independent AI development platform.

According to CNBC, Cursor crossed $100 million in ARR in early 2025. That number proves how wrong the prediction "AI code editors are a passing fad" turned out to be. The code editor is now its own theater in the AI platform competition.

---

## Chapter 6: the complete map by category

The 23 tools, organized by category.

### Category classification

| Category | Tool | Characteristic |
|---------|-----|------|
| **Data/ML app UI** | Chainlit, Gradio 5.0, Marimo, Mesop, NiceGUI, Writer Framework | Fast prototyping of Python → web UIs |
| **Python full-stack web apps** | Reflex, FastHTML | Full stack without JS |
| **Agent/LLM infrastructure** | LangChain, LlamaIndex, Dify, AutoGen, CrewAI, LangGraph, CopilotKit, AG-UI, Microsoft Agent Framework | LLM app orchestration |
| **AI code editors / vibe coding** | Cursor, Windsurf, Bolt.new, Lovable | The AI writes the code directly |

### Year-by-year timeline

| Year | Tool | Category | Keyword |
|------|-----|---------|--------|
| 2022.10 | LangChain | LLM infrastructure | The LLM chaining standard |
| 2022.11 | LlamaIndex | LLM infrastructure | RAG specialization |
| 2022.12 | Pynecone (→Reflex) | Python web apps | Pure-Python full stack |
| 2023.01 | Chainlit | ML app UI | LLM chatbot UI |
| 2023.03 | Cursor | AI editor | AI-first IDE |
| 2023.05 | Dify | LLM infrastructure | No-code LLM apps |
| 2023.06 | AutoGen | Agent | Multi-agent dialogue |
| 2023.06 | Reflex (rebranded) | Python web apps | Full stack without JS |
| 2023.late | Marimo | ML app UI | Reactive notebook |
| 2023.12 | Mesop (internal release) | ML app UI | Google's internal Python UI |
| 2024.early | CrewAI | Agent | Role-based multi-agent |
| 2024 | LangGraph | Agent | State-based orchestration |
| 2024 | FastHTML | Python web apps | HTMX-based web apps |
| 2024 | NiceGUI | ML app UI | FastAPI + Vue.js |
| 2024.05 | Mesop (open-sourced) | ML app UI | Official Google release |
| 2024.10 | Gradio 5.0 | ML app UI | SSR + streaming |
| 2024.10 | Bolt.new | Vibe coding | $40M ARR in 5 months |
| 2024.11 | Windsurf | AI editor | Agent IDE |
| 2024.11 | Lovable | Vibe coding | AI full-stack engineer |
| 2024–2025 | CopilotKit | Agent/UI | In-app AI copilot |
| 2025 | AG-UI Protocol | Agent/UI | Agent↔UI communication standard |
| 2025 | Writer Framework | ML app UI | No-code UI + Python backend |
| 2025.10 | Microsoft Agent Framework | Agent | AutoGen + Semantic Kernel integration |
| 2025.11 | Cursor $2.3B round | AI editor | $29.3B valuation |

---

## Conclusion: platform or tool?

Looking back at the histories of these 23 tools, one pattern emerges.

**Stage 1:** a researcher or hacker starts it as a personal project. (LangChain, LlamaIndex, Chainlit)
**Stage 2:** the developer community embraces it explosively. 10K, 50K, 100K GitHub stars.
**Stage 3:** venture capital arrives. A team forms.
**Stage 4:** the corporatization race begins. From "tool" to "platform."

Cursor's $29.3 billion valuation is not a bet on a "code editor." It is a bet on having captured the new platform for developer-AI collaboration.

What AG-UI Protocol symbolizes is more radical. It is the future in which "the agent operates the app on behalf of the user." Instead of the user clicking and typing, the agent calls APIs and changes state. The UI is now not just for humans but also an interface that agents consume.

So which of these tools should you learn now?

- **If you need to build a prototype right this minute:** Gradio, Chainlit, Streamlit
- **If you need a production app in Python:** Reflex, FastHTML, NiceGUI
- **If you need to build a RAG system:** LlamaIndex + LangGraph
- **If you need a multi-agent system:** CrewAI or AutoGen / Microsoft Agent Framework
- **If you want to be more productive at coding:** Cursor (currently the most mature)
- **If you need to build a prototype fast to show someone:** Bolt.new, Lovable

But the most important thing is the meta-skill that runs through all of these tools: **understanding how agents think, in what flow they operate, and where they fail.** Tools change. That understanding remains.

It has been a little over three years since November 2022. What about the next three? One thing is certain: this article will need to be updated again.

---

*Key numbers cited in this article:*
- Cursor valuation $29.3B: CNBC, 2025-11-13
- Bolt.new ARR $40M (in five months): growthunhinged.com
- LangChain first commit: October 2022 (Harrison Chase)
- LlamaIndex $8.5M seed: June 2023 (Jerry Liu)
- Marimo $5M seed & stealth exit: November 2024
- Mesop open-sourced: May 2024 (Google)
- Gradio 5.0 release: October 2024
- Windsurf release: November 2024 (Codeium)
- Lovable release: November 21, 2024
- Microsoft Agent Framework: October 2025
- Cursor Series C: November 2025 ($2.3B @ $29.3B)
