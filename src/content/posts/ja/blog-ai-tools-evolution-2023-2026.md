---
title: '2023年から現在まで、AIツールの登場と進化：開発者が必ず知っておくべき23のツール'
description: '作成日: 2026年3月 対象読者: どのツールがどのような流れから生まれたのかを把握したい開発者'
pubDate: 2026-03-06T00:00:00.000Z
lang: ja
pairSlug: 'blog-ai-tools-evolution-2023-2026'
draft: false
sourceDir: posted
---
# 2023年から現在まで、AIツールの登場と進化：開発者が必ず知っておくべき23のツール

> 作成日: 2026年3月
> 対象読者: どのツールがどのような流れから生まれたのかを把握したい開発者

---

## 序論：地殻変動が始まった

2022年11月30日。ChatGPTが公開された日を覚えているだろうか。

その前日まで「LLMで実用的なアプリを作る」という話は、GoogleやOpenAI内部の研究チームだけのものだった。ファインチューニングには数億円規模のGPUコストがかかり、プロンプトエンジニアリングという概念すら存在しなかった。GPT-3 APIは存在していたが、それで何を作るべきか誰もわからなかった。

ChatGPTはリリースからわずか5日で100万ユーザーを突破した。2ヶ月で1億人。開発者コミュニティは衝撃を受け、同時に興奮した。数百のオープンソースプロジェクトがGitHubに溢れ始めた。

この3年間に登場したAI関連開発ツールの数は、それ以前の10年間に登場したものより多い。これは誇張ではない。LangChain一つとってもGitHubスターが10万を超え、毎週新しい「LLMアプリフレームワーク」がProduct Huntの上位に入った。生き残ったものもあれば、静かに消えたものもあり、すでにユニコーンになったものもある。

この記事はその流れを整理する。2022年に種が蒔かれ、2023年にインフラが爆発し、2024年に「バイブコーディング」という言葉が誕生し、2025〜2026年にはエージェントがUIを直接操作し始めた。23のツールを年代順に追っていけば、今私たちがどのような時代に立っているのかが見えてくる。

---

## 第1章：2022年 — 爆発の種

ChatGPTが公開される直前、すでに種は蒔かれていた。

### LangChain（2022年10月） — 「LLMアプリの骨格」

Harrison Chaseが一人で作ってGitHubにアップしたのが始まりだった。「LLMを接続し、チェーンのようにつなぎ合わせよう。」この単純なアイデアが事実上の標準となった。

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

初期のLangChainのコードはこのようにシンプルだった。しかし「チェーン」という抽象化の上にエージェント、メモリ、ツール呼び出し、RAGが積み重なり、最も複雑なフレームワークの一つとなった。

### LlamaIndex（2022年11月） — 「RAGの元祖」

Jerry Liuが「GPT Index」という名前で始めた。LangChainがLLMアプリ全般を扱う汎用フレームワークであるのに対し、LlamaIndexは最初からRAG（Retrieval-Augmented Generation）に特化していた。ドキュメントをインデックス化し、検索し、LLMにコンテキストとして渡すパイプラインを標準化した。2023年6月にシリーズAで850万ドルのシード投資を受けた。

### Pynecone → Reflex（2022年12月） — 「Pythonでフルスタックを」

「JavaScriptを一行も書かずにWebアプリを作れる。」当時の反応は懐疑的だった。しかしこのプロジェクトは生き残り、2023年6月に「Reflex」にリブランディングしてアイデンティティを確立した。

---

## 第2章：2023年 — インフラ群雄割拠の時代

2023年は混沌の年だった。毎月新しいフレームワークが登場し、開発者たちは何を学ぶべきかわからなかった。しかし振り返ってみると、この時期に生き残ったツールが今のエコシステムの基盤を築いた。

### Chainlit（2023年1月） — 「LLMチャットボットUIのStreamlit」

**キーワード: チャットボットUIフレームワーク**

StreamlitがMLダッシュボードを民主化したなら、ChainlitはLLMチャットボットUIを民主化した。わずか数行で対話型インターフェースを作ることができ、LangChainとの相性が良かった。特に「段階的な思考過程（Chain of Thought）」を可視化する機能が印象的だった。

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

LangChainのコールバックシステムと統合されることで、エージェントの内部状態をリアルタイムに表示できた。当時、RAGデモやLLMプロトタイプの事実上の標準UIとなった。

### Cursor（2023年3月） — 「AIコードエディタ第1世代」

**キーワード: AI-first IDE**

VS Codeをフォークして作られたコードエディタ。「Ctrl+Kでコード生成」「Ctrl+LでAIチャット」というシンプルなUXが強みだった。当時はGitHub Copilotが支配的だったが、CursorはCopilotにできないことを実現した：**ファイル全体、さらにはコードベース全体をコンテキストとしてLLMと対話**した。

初期にはGPT-4 APIをそのまま使用し、機能も今よりはるかにシンプルだった。しかし2024年にエージェントモードを追加し、「AIが自分のコードベースを直接修正する」という体験を初めて大衆化した。2025年11月に23億ドルのラウンドで企業価値293億ドルと評価された。

### Dify（2023年5月） — 「ノーコードで作るLLMアプリ」

**キーワード: ノーコードLLMオーケストレーション**

LangChainが「コードでLLMアプリを作る標準」なら、Difyは「GUIでLLMアプリを作る標準」を目指した。フローチャートのようにノードを接続してRAGパイプライン、チャットボット、エージェントを構築できる。Self-hostedとクラウド版の両方を提供している。

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

エンタープライズで特に人気が高い。IT部門がなくても非開発者が社内チャットボットを作れるという点が強みだ。

### AutoGen（2023年6月） — 「マルチエージェントの先駆者」

**キーワード: マルチエージェント対話フレームワーク**

Microsoft Researchが公開したマルチエージェントフレームワーク。核心的なアイデアは「LLMエージェント同士に対話させる」というものだ。UserProxyAgentとAssistantAgentが会話をやり取りしながら問題を解決する。

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

AutoGenで最も衝撃的だったのは、エージェントがコードを書き、実行し、結果を見て修正するサイクルを**自動的に**繰り返すという点だった。その後、CrewAI、LangGraphなど数多くのマルチエージェントフレームワークの原型となった。

### Reflex（2023年6月リブランディング） — 「JSなしのフルスタック」

**キーワード: Pure Pythonフルスタック**

PyneconeからReflexへ。名前が変わっただけでなく、アーキテクチャも成熟した。クライアント-サーバー間の状態同期をPythonだけで処理する方式はユニークだった。WebSocketでフロントエンドの状態をバックエンドのPythonオブジェクトと同期する。

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

Pythonデータサイエンティストがモデルをウェブアプリとしてデプロイする際に特に強みがある。Reactベースのフロントエンドを自動生成するが、開発者はPythonだけを書く。

### Marimo（2023年末公開） — 「Jupyterを捨てろ」

**キーワード: リアクティブノートブック**

「Jupyter Notebookの最大の問題は、セルの実行順序に依存することだ。」Marimoの創業者たちはこの問題に真正面から取り組んだ。セル間の依存関係を分析してDAG（有向非巡回グラフ）を自動構成し、一つのセルが変更されると依存するすべてのセルが自動的に再実行される。

```python
import marimo as mo

slider = mo.ui.slider(1, 100, value=50)
slider
```

```python
# 위 슬라이더 값이 바뀌면 이 셀도 자동으로 재실행된다
mo.md(f"슬라이더 값: **{slider.value}**")
```

2024年11月に500万ドルのシード投資を受け、ステルスモードを脱した。ノートブックファイルが`.py`拡張子を使用するため、バージョン管理も自然に行える。

### Mesop（2023年12月初回リリース） — 「Googleが内部で使っていたもの」

**キーワード: Google内部Python UI**

GoogleがAIデモやツールを作るために開発したPython UIフレームワーク。2024年5月にオープンソースとして公開された。AngularベースのフロントエンドをPythonコードで駆動する。

```python
import mesop as me
import mesop.labs as mel

@me.page(path="/")
def app():
    mel.chat(transform, title="Mesop AI 챗봇", bot_user="AI")

def transform(input: str, history: list[mel.ChatMessage]):
    yield "안녕하세요! " + input
```

「Googleが使っている方式」という信頼感がある。Gemini APIとの統合がスムーズだ。

---

## 第3章：2024年上半期 — エージェントの台頭

2023年が「LLMで何かを作れる」ことを証明した年なら、2024年は「エージェントが自ら行動する」ことを実現した年だ。

### CrewAI（2024年初頭） — 「ロールプレイするエージェントたち」

**キーワード: ロールベースのマルチエージェント**

AutoGenがエージェント間の対話を抽象化したのに対し、CrewAIはそこに「ロール（Role）」と「ゴール（Goal）」を付与した。リサーチャー、ライター、エディターのエージェントがそれぞれの役割を果たしながら協力する。

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

GitHubスターの増加速度はLangChain初期を彷彿とさせるほど速かった。企業環境で「AIチーム」を構成するパターンとして人気が高い。

### LangGraph（2024年） — 「エージェントをグラフで設計する」

**キーワード: 状態ベースのエージェントオーケストレーション**

LangChainチームがエージェントの限界を認め、新たに設計したのがLangGraphだ。従来のLangChainエージェントはリニア（Linear）だった。条件分岐、ループ、並列処理が困難だった。LangGraphはエージェントの実行フローを有向グラフで表現する。

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

LangChainの「Agent」がブラックボックスだったのに対し、LangGraphはエージェントの状態遷移を完全に可視化し制御する。プロダクションエージェントシステム構築の事実上の標準になりつつある。

### FastHTML（2024年） — 「Jeremy Howardの挑戦」

**キーワード: HTMXベースのPython Webアプリ**

fast.aiのJeremy Howardが作った。「モダンWeb開発は複雑になりすぎた」という問題意識から出発した。HTMXを活用し、JavaScriptなしでサーバーサイドレンダリングのみで動的なWebアプリを実現する。

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

React、Next.jsに代表されるSPAパラダイムに真正面から挑戦している。「Webの本来のモデルに戻ろう」というメッセージが、一部の開発者に強く響いた。

### NiceGUI（2024年急成長） — 「精緻なPython UI」

**キーワード: FastAPI + Vue.jsの組み合わせ**

Streamlitがデータダッシュボードに特化しているのに対し、NiceGUIは一般的なWebアプリに近い精緻なUIをPythonで作ることができる。内部的にFastAPIとVue.jsを使用しており、3Dグラフィックス、リアルタイム更新、複雑なレイアウトをサポートする。

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

ロボット工学や産業制御パネルといった分野で強みがある。GitHubスターは2024年の1年間で2倍以上に増えた。

### Mesopオープンソース公開（2024年5月） — 「Googleの公式宣言」

内部プロジェクトだったMesopをGoogleが公式にオープンソースとして公開した。「Google内部のAIチームがこれを使っている」という事実そのものが強いシグナルだった。Gemini API、Google Cloudとの統合がスムーズである点が、企業環境で魅力的だ。

---

## 第4章：2024年下半期 — 「バイブコーディング」という衝撃

「Vibe Coding」という言葉が初めて登場したのは2025年初頭のAndrej Karpathyのツイートだったが、その実態は2024年下半期にすでに形成されていた。「AIに欲しいものを言えば、AIがコードを書いてくれる。」それが本当に実現した。

### Gradio 5.0（2024年10月） — 「MLデモの進化」

**キーワード: SSR + ストリーミングメディア**

Hugging Faceが買収したGradioが5.0で大規模な改編を行った。サーバーサイドレンダリング（SSR）、ストリーミングメディア対応、改善されたAI Playgroundが核心だ。Hugging Face Spacesとの統合により、MLモデルデモの事実上の標準としての地位を確立した。

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

Gradio 5.0のストリーミング対応は、LLMの応答をリアルタイムに表示する体験を劇的に改善した。

### Bolt.new（2024年10月） — 「バイブコーディングの代表格」

**キーワード: ブラウザ内フルスタックバイブコーディング**

StackBlitzのBolt.newが2024年10月4日にリリースされた。「チャットでフルスタックWebアプリを作る。」ブラウザ内でNode.js環境が動作し、AIがコードを書いて即座にプレビューが表示される。デプロイもワンクリック。

リリースからわずか5ヶ月でARR（年間経常収益）4,000万ドルを達成した。SaaS史上最速の成長の一つとして記録された。

開発者の反応は両極端に分かれた：「これは本当のコーディングなのか」という懐疑論と「もうアイデアさえあればいい」という熱狂論。しかし現実には、Bolt.newの収益がその論争に終止符を打った。

### Windsurf（2024年11月） — 「エージェントIDEの登場」

**キーワード: 初のエージェントIDE**

Codeiumが作ったコードエディタ。「初のエージェントIDE」を標榜した。Cursorが「AIコードエディタ」なら、Windsurfはさらに一歩進んで、エージェントがコードベース全体を探索・修正する「Cascade」機能を前面に打ち出した。

エージェントがファイルを直接読み、修正し、ターミナルを実行し、結果を確認するループを自律的に回す。開発者が「このバグを直して」と言えば、Windsurfが関連ファイルを探して読み、修正計画を立て、コードを変更し、テストを実行する。2025年にGoogleが買収意向を示したことで注目を集めた。

### Lovable（2024年11月） — 「開発者が不要になる世界？」

**キーワード: AIフルスタックエンジニア**

GPT Engineerの後継。スウェーデンのチームが作ったLovableは「AIフルスタックエンジニア」を標榜する。「ソーシャルメディアアプリを作って」と言えば、Reactフロントエンド、Supabaseバックエンド、認証システムまで備えたアプリが生成される。

2025年4月にLovable 2.0がリリースされ、機能が大幅に拡張された。リアルタイムコラボレーション、GitHub連携、カスタムドメインデプロイなどが追加された。「開発者がいなくても大丈夫か」という問いへの答えはまだ「いいえ」に近いが、プロトタイピングコストがゼロに収束しつつあるという事実は否定できない。

---

## 第5章：2025〜2026年 — エージェントがUIを直接操作する時代

「エージェントがコードを書く」から「エージェントがユーザーのようにアプリを操作する」へ。パラダイムが再び移行した。

### CopilotKit（2024〜2025年） — 「アプリの中にAIを」

**キーワード: Reactベースのアプリ内コパイロット**

「AIが外部からアプリを作るのではなく、アプリの中でAIが動作する。」CopilotKitはReactアプリにAIコパイロット機能を追加するオープンソースフレームワークだ。アプリの状態をAIに公開し、AIがアプリのアクションを直接呼び出せるようにする。

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

AIがアプリの内部状態に直接アクセスし修正できるというのが核心だ。「アプリにチャットウィンドウを付けること」と「アプリ自体がAIを理解すること」の違いである。

### AG-UIプロトコル（2025年） — 「エージェント↔UI通信の標準」

**キーワード: エージェント-UI通信の標準規格**

AG-UI（Agent-User Interaction Protocol）は、エージェントとフロントエンドUIが通信する方式を標準化したプロトコルだ。HTTP、WebSocket、SSE（Server-Sent Events）など多様な転送方式をサポートし、エージェントの状態更新、ツール呼び出し、ストリーミング応答を標準イベントストリームとして定義する。

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

LangChain、CrewAI、AutoGenなど主要なエージェントフレームワークがAG-UIのサポートを開始した。「エージェントフレームワークがUIフレームワークを直接操作する標準」が生まれたということは示唆に富む。

### Writer Framework（2025年） — 「AI企業が作ったフレームワーク」

**キーワード: ノーコードUI + Pythonバックエンド**

AIライティングツールとして知られるWriterが、開発者向けのフレームワークを公開した。ノーコードUIビルダーとPythonバックエンドを組み合わせた形態で、WriterのLLM APIとの統合が自然だ。「AIネイティブアプリを作るフレームワーク」を標榜している。

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

### Microsoft Agent Framework（2025年10月） — 「統合の時代」

**キーワード: AutoGen + Semantic Kernelの統合**

Microsoftが2023年に公開したAutoGenとSemantic Kernelを統合したのがMicrosoft Agent Frameworkだ。企業環境でAIエージェントを構築するための統合プラットフォームを提供する。Azure OpenAI Service、Microsoft 365、Teamsとの統合が核心だ。

AutoGen v0.4から大規模なアーキテクチャ改編が行われ、分散エージェントシステムをサポートする。エンタープライズにおいて「エージェントが社内システムと連携する」というシナリオの事実上の標準スタックとなった。

### Cursor $2.3Bラウンド（2025年11月） — 「コードエディタがプラットフォームになった」

**キーワード: 企業価値293億ドル**

2025年11月、Cursorが23億ドルの投資を獲得した。企業価値は293億ドル。VS Codeプラグインとして始まったGitHub CopilotがMicrosoftエコシステムの一部であるのに対し、Cursorは独立したAI開発プラットフォームとしての地位を確立するという意思を表明したのだ。

CNBCの報道によると、CursorのARRは2025年初頭に1億ドルを突破した。「AIコードエディタは一時的な流行にすぎない」という予測が完全に外れたことを証明する数字だ。今やコードエディタは、それ自体がAIプラットフォーム競争の戦場となった。

---

## 第6章：カテゴリ別全体マップ

23のツールをカテゴリ別に整理すると以下のようになる。

### カテゴリ分類表

| カテゴリ | ツール | 特徴 |
|---------|-----|------|
| **データ/MLアプリUI** | Chainlit, Gradio 5.0, Marimo, Mesop, NiceGUI, Writer Framework | Python → Web UI 高速プロトタイピング |
| **Pythonフルスタックwebアプリ** | Reflex, FastHTML | JSなしでフルスタック |
| **エージェント/LLMインフラ** | LangChain, LlamaIndex, Dify, AutoGen, CrewAI, LangGraph, CopilotKit, AG-UI, Microsoft Agent Framework | LLMアプリオーケストレーション |
| **AIコードエディタ/バイブコーディング** | Cursor, Windsurf, Bolt.new, Lovable | AIがコードを直接記述 |

### 年代別登場タイムライン

| 年 | ツール | カテゴリ | キーワード |
|------|-----|---------|--------|
| 2022.10 | LangChain | LLMインフラ | LLMチェイニング標準 |
| 2022.11 | LlamaIndex | LLMインフラ | RAG特化 |
| 2022.12 | Pynecone(→Reflex) | Python Webアプリ | Pure Pythonフルスタック |
| 2023.01 | Chainlit | MLアプリUI | LLMチャットボットUI |
| 2023.03 | Cursor | AIエディタ | AI-first IDE |
| 2023.05 | Dify | LLMインフラ | ノーコードLLMアプリ |
| 2023.06 | AutoGen | エージェント | マルチエージェント対話 |
| 2023.06 | Reflex（リブランディング） | Python Webアプリ | JSなしフルスタック |
| 2023.末 | Marimo | MLアプリUI | リアクティブノートブック |
| 2023.12 | Mesop（内部リリース） | MLアプリUI | Google内部Python UI |
| 2024.初 | CrewAI | エージェント | ロールベースマルチエージェント |
| 2024 | LangGraph | エージェント | 状態ベースオーケストレーション |
| 2024 | FastHTML | Python Webアプリ | HTMXベースWebアプリ |
| 2024 | NiceGUI | MLアプリUI | FastAPI + Vue.js |
| 2024.05 | Mesop（オープンソース公開） | MLアプリUI | Google公式公開 |
| 2024.10 | Gradio 5.0 | MLアプリUI | SSR + ストリーミング |
| 2024.10 | Bolt.new | バイブコーディング | ARR 4,000万ドル（5ヶ月） |
| 2024.11 | Windsurf | AIエディタ | エージェントIDE |
| 2024.11 | Lovable | バイブコーディング | AIフルスタックエンジニア |
| 2024~2025 | CopilotKit | エージェント/UI | アプリ内AIコパイロット |
| 2025 | AG-UIプロトコル | エージェント/UI | エージェント↔UI通信標準 |
| 2025 | Writer Framework | MLアプリUI | ノーコードUI + Pythonバックエンド |
| 2025.10 | Microsoft Agent Framework | エージェント | AutoGen + Semantic Kernel統合 |
| 2025.11 | Cursor $2.3Bラウンド | AIエディタ | 企業価値293億ドル |

---

## 結論：プラットフォームになるのか、ツールにとどまるのか

この23のツールの歴史を振り返ると、一つのパターンが見えてくる。

**第1段階**: 研究者やハッカーが個人プロジェクトとして始める。（LangChain、LlamaIndex、Chainlit）
**第2段階**: 開発者コミュニティで爆発的な関心を集める。GitHubスター1万、5万、10万。
**第3段階**: ベンチャー投資が入る。チームが組まれる。
**第4段階**: 企業化競争が始まる。「ツール」から「プラットフォーム」へ。

Cursorが293億ドルの企業価値を得たのは、「コードエディタ」としてではない。開発者がAIと協業する新しいプラットフォームを先取りしたことへの賭けだ。

AG-UIプロトコルが象徴するものはさらにラディカルだ。「エージェントがユーザーの代わりにアプリを操作する」という未来だ。ユーザーがクリックして入力する代わりに、エージェントがAPIを呼び出し状態を変更する。UIはもはや人間だけのためのものではなく、エージェントも消費するインターフェースとなった。

では今、どのツールを学ぶべきか？

- **今すぐプロトタイプを作る必要があるなら**: Gradio、Chainlit、Streamlit
- **Pythonでプロダクションアプリを作る必要があるなら**: Reflex、FastHTML、NiceGUI
- **RAGシステムを構築する必要があるなら**: LlamaIndex + LangGraph
- **マルチエージェントシステムが必要なら**: CrewAIまたはAutoGen/Microsoft Agent Framework
- **コーディングの生産性を上げたいなら**: Cursor（現時点で最も成熟）
- **プロトタイプを素早く作って見せる必要があるなら**: Bolt.new、Lovable

しかし最も重要なのは、これらすべてのツールを貫くメタスキルだ：**エージェントがどのように考え、どのようなフローで動作し、どこで失敗するのかを理解すること。** ツールは変わるが、その理解は残る。

2022年11月から今日まで3年余りが過ぎた。これからの3年はどうなるだろうか。一つだけ確かなことがある：またこの記事を更新しなければならないだろう。

---

*本記事で言及した主要数値の出典:*
- Cursor企業価値293億ドル: CNBC, 2025-11-13
- Bolt.new ARR 4,000万ドル（5ヶ月で）: growthunhinged.com
- LangChain初回コミット: 2022年10月（Harrison Chase）
- LlamaIndex 850万ドルシード: 2023年6月（Jerry Liu）
- Marimo 500万ドルシード & ステルス脱出: 2024年11月
- Mesopオープンソース公開: 2024年5月（Google）
- Gradio 5.0リリース: 2024年10月
- Windsurfリリース: 2024年11月（Codeium）
- Lovableリリース: 2024年11月21日
- Microsoft Agent Framework: 2025年10月
- Cursor シリーズC: 2025年11月（$2.3B @ $29.3B）
