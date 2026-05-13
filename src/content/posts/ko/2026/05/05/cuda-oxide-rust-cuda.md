---
title: "NVIDIA가 Rust를 입양한 날 — cuda-oxide와 GPU 권력의 재편"
description: "2026년 5월, NVIDIA Labs가 발표한 공식 Rust→CUDA 컴파일러 cuda-oxide는 단순한 신기술 실험이 아니다. 18년간 C++가 점령해 온 GPU 프로그래밍 권력 지형의 정중앙에서 누가 표준을 정의할 것인가에 관한 선언이다."
pubDate: 2026-05-05T00:00:00.000Z
lang: ko
pairSlug: cuda-oxide-rust-cuda
draft: false
---

# NVIDIA가 Rust를 입양한 날 — cuda-oxide와 GPU 권력의 재편

> NVIDIA가 직접 Rust→CUDA 컴파일러를 들고 나온 사건은 GPU 안전성의 진보인가, 아니면 lock-in을 한 단계 더 깊은 곳으로 옮기는 우회인가. 그리고 그 둘을 우리는 구별할 수 있는가.

## 도입 — 18년 만에 NVIDIA가 사용한 새 단어, "official"

2026년 5월 5일, NVIDIA Labs가 운영하는 nvlabs.github.io 도메인 아래에 cuda-oxide 라는 이름의 책 한 권이 조용히 공개되었다. 부제는 "A Rust-to-CUDA Compiler". 첫 문단의 한 문장이 이 프로젝트 전체를 요약한다. "cuda-oxide는 (SIMT) GPU 커널을 안전(에 가까운), 관용적인(idiomatic) Rust로 작성하게 해 주는 실험적 Rust→CUDA 컴파일러다. 표준 Rust 코드를 PTX로 직접 컴파일한다 — DSL도 없고, 외래 언어 바인딩도 없으며, 그저 Rust일 뿐이다(no DSLs, no foreign language bindings, just Rust)." 같은 날 Hacker News에는 "CUDA-oxide: Nvidia's official Rust to CUDA compiler" 라는 제목의 포스트가 올라왔고, 12시간 만에 점수 418점, 댓글 117건을 모았다.

여기에서 가장 무거운 단어는 "Rust"가 아니라 "official"이다. 지난 7년간 Rust로 GPU 커널을 짜려는 시도는 산발적이었지만 끊이지 않았다. Rust-CUDA 프로젝트는 2020년 즈음에 시작되었다가 메인테이너 부재로 멈추기를 반복했고, Embark Studios가 주도한 rust-gpu는 SPIR-V를 타겟으로 하면서 게임 그래픽스 진영에서 자리를 잡았으며, cust 와 cudarc 같은 크레이트는 NVCC가 컴파일한 PTX를 Rust 호스트 코드에서 호출하기 위한 FFI 어댑터로 살아왔다. 이 모든 노력에는 한 가지 공통점이 있었다. NVIDIA는 옆에서 지켜만 보았다는 것이다. NVIDIA의 GPU 프로그래밍 공식 채널은 변함없이 CUDA C++였고, Rust는 "관심 있는 외부 커뮤니티가 알아서 한다"는 카테고리에 머물러 있었다.

cuda-oxide는 이 거리감을 한 번에 좁혔다. 도메인이 nvlabs.github.io이고, 저장소가 github.com/NVlabs/cuda-oxide이며, 안내 문구의 어조는 "NVIDIA가 만들고 NVIDIA가 책임진다"에 가깝다. v0.1.0 이라는 버전 번호와 "early-stage alpha — expect bugs, incomplete features, and API breakage"라는 솔직한 단서를 함께 달았지만, 그 단서가 오히려 신뢰를 높인다. 마케팅 문구가 아니라 엔지니어링 문구이기 때문이다.

그렇다면 NVIDIA는 왜 지금 이 카드를 꺼냈는가. 그리고 GPU 컴파일 스택의 가장 깊은 자리에 Rust가 first-class 언어로 들어온다는 것은 누구에게 무엇을 의미하는가. 이번 발표는 "Rust로도 CUDA를 쓸 수 있다"는 기능의 추가가 아니다. "GPU 안전성의 표준은 누가 정의할 것인가"에 대한 NVIDIA의 답이다.

## 본문 1 — cuda-oxide의 해부: 컴파일러로서의 정체성

먼저 무엇이 발표되었는가를 기술적으로 정확히 짚어 보자. cuda-oxide는 라이브러리가 아니라 컴파일러다. 더 정확히 말하면, rustc의 코드 생성 백엔드(`rustc-codegen-cuda`)와 그것을 둘러싼 호스트 측 런타임의 묶음이다. 핵심 구성 요소는 네 가지다.

첫째, **rustc_public**. 안정화된 MIR(Mid-level IR) 인터페이스로, cuda-oxide가 Rust 컴파일러 내부에 깊숙이 손을 대지 않고도 MIR을 가져올 수 있게 해 준다. 이 선택의 의미는 작지 않다. 과거 Rust GPU 컴파일러들이 nightly rustc 의 비공개 API에 종속되어 깨지기 일쑤였던 이유가 바로 여기 있었다. cuda-oxide는 그 함정을 피하는 길을 골랐다.

둘째, **MIR Importer**. rustc의 MIR을 cuda-oxide 내부 IR로 가져온다. 셋째, **Pliron**. MLIR 스타일의 IR 인프라이지만 Rust로 작성되었다. 도큐먼트는 "MLIR의 구현은 C++에 약간의 TableGen, 그리고 LLVM 전체를 컴파일해야 하는 빌드 시스템과, 커리어 선택을 후회하게 만드는 디버깅 세션이 곁들여져 있다(MLIR's implementation, however, is C++ with a side of TableGen, a build system that requires you to compile all of LLVM, and debugging sessions that make you question your career choices)"라고 농담을 섞어 적었다. 이 한 줄에 NVIDIA Labs가 cuda-oxide를 통해 무엇을 피하고 싶었는지가 다 들어 있다. 마지막으로 **lowering pipeline**이 IR을 PTX(NVIDIA의 가상 ISA)까지 내린다. 그 PTX는 다시 ptxas 가 받아 SASS로 어셈블한다. 즉 컴파일 흐름은 Rust 소스 → MIR → cuda-oxide IR → PTX → SASS 이다.

지원 범위도 알파 단계 치고는 야심차다. 책의 목차에 등장하는 항목만 추리면 다음과 같다. 커널 런치와 디바이스 함수, 메모리 관리와 데이터 이동, 클로저와 제네릭 타입, 공유 메모리와 스레드 동기화, 워프 단위 프로그래밍, Tensor Memory Accelerator(TMA), 행렬 곱 가속기(matrix multiply accelerators), 클러스터 프로그래밍, 그리고 비동기 `DeviceOperation` 모델과 스트림 스케줄링. Hopper와 Blackwell 세대의 핵심 기능이 거의 모두 들어 있다. "장난감 컴파일러"가 아니다.

호스트 측 API의 결도 흥미롭다. cuda-oxide는 GPU 작업을 즉시 실행하지 않고, "lazy DeviceOperation graph"로 조립한 뒤 스트림에 스케줄링한다. 그리고 그 스트림 위에 Rust의 async/await 가 그대로 얹힌다. 즉 Rust 호스트 코드 입장에서 GPU 호출은 또 하나의 future가 되고, 기존 tokio 기반 서버 코드와 자연스럽게 합성된다. 이는 과거의 cust 나 cudarc 가 제공하지 못했던 결합점이다. 그 결과를 HN에서 한 사용자(`the__alchemist`)는 이렇게 짧게 표현했다. "Hell yea! 나는 Cudarc(커널)와 FFI(cuFFT)로 이걸 해 왔고, 바이트 배열과 Rust 데이터 구조체 사이를 수동으로 [역]직렬화해 왔다. 이 프로젝트로 마찰이 줄어들기를 바란다(I have been doing it with Cudarc and FFI, using manual [de]serialization between byte arrays and rust data structs. I hope this makes it lower friction)."

안전 모델 쪽은 더 구체적이다. 같은 댓글 스레드의 `arpadav`가 정리한 네 가지 차이점이 가장 명료하다. 첫째, use-after-free와 drop semantics 가 수동 `cudaFree` 를 대체한다. 둘째, 커널 인자가 `cuda_launch!` 매크로로 강제된다. C++ 가 `void**` 배열로 인자를 넘기면서 개수만 검증하던 자리에, 타입까지 검증되는 채널이 들어선 것이다. 셋째, mutable alias가 차단된다. C++ 에서는 두 스레드가 같은 `out[i]` 에 동시 쓰기를 해도 컴파일이 통과되지만, cuda-oxide의 `DisjointSlice<T>` 는 공개 생성자가 없고 오직 `index_1d`, `index_2d` 같은 API 를 통해서만 얻을 수 있다. 넷째, 임의의 POD 타입을 `cudaMemcpy` 할 수 없다. 받는 쪽이 `DisjointSlice<T>`, 스칼라, 그리고 클로저로 한정된다. 그 결과 C++ 측에서 흔히 일어나던 "`std::string` 을 디바이스로 복사해 내부 포인터가 깨지는" 부류의 침묵하는 UB가 컴파일 단계에서 차단된다.

다만 같은 사용자는 솔직하게 한 줄을 덧붙였다. "물론 이게 모든 걸 잡는 건 아니다. raw .cu 파일에 비해 UB에 대한 가드레일이 훨씬 더 두꺼워 보이는 정도다(not like this catches everything, just looks to give much more guardrails against UB with raw .cu files)." 이 정직함은 중요한 의미가 있다. cuda-oxide는 GPU에 "absolute safety"를 약속하지 않는다. "GPU 커널 작성은 본질적으로 unsafe하다"는 또 다른 HN 댓글(`cyber_kinetist`)의 진단을 NVIDIA Labs도 공유한다. 단지 그 unsafe의 표면적을 줄이고, 줄어든 만큼을 타입 시스템으로 재포장한다.

## 본문 2 — NVIDIA의 의도: "왜 지금"이 모든 것을 말한다

기술 사양만 보면 cuda-oxide는 흥미로운 알파 컴파일러다. 그러나 같은 사양을 정치경제적 관점에서 다시 읽으면 풍경이 달라진다. NVIDIA는 왜 2026년 5월에 이 카드를 직접 꺼냈는가. 답은 세 겹으로 쌓여 있다.

첫 번째 겹은 **에이전트 코딩의 부상**이다. 지난 1년 동안 Claude Code, Codex, Cursor 같은 코딩 에이전트들이 GitHub에 30배의 부하를 안긴 것과 같은 흐름이, GPU 코드 영역에서도 일어나고 있다. 에이전트가 자동으로 CUDA 커널을 짜기 시작하면, 컴파일러가 사전에 잡아 줄 수 없는 메모리 오류는 production GPU 클러스터를 그대로 덮친다. C++의 표면적 unsafe는 인간 개발자가 쓰던 시대에는 "주의 깊게 쓰면 된다"는 답으로 미봉할 수 있었지만, 에이전트가 쓰는 시대에는 그 답이 통하지 않는다. NVIDIA는 자사 GPU 위에서 에이전트가 자동 생성한 코드가 돌아갈 표면을 미리 정돈해야 한다. 그 정돈의 도구로 가장 쓸 만한 후보가 Rust의 타입 시스템이다.

두 번째 겹은 **DSL 경쟁의 압박**이다. 지난 2년간 GPU 프로그래밍 언어 영역에서는 새로운 후보들이 줄을 이었다. Modular의 Mojo는 Python 문법에 GPU 가속을 약속하면서 등장했고, OpenAI가 시작한 Triton은 PyTorch 생태계 안에서 사실상 표준 GPU DSL의 자리를 차지했으며, NVIDIA 자체가 미는 Tile IR과 CuTile은 더 높은 추상화 레벨에서의 GPU 코드 작성을 지원한다. HN 댓글에서 `alecco`는 이를 직접 지적한다. "왜 PTX로 직접 가는가. 최근 NVIDIA의 MLIR이 꽤 좋고 빠르다. 아니면 더 쉽고 더 최근의 tile IR을 타겟할 수도 있었다(Weird. There's a recent NVIDIA MLIR that is quite good and fast. Or they could target the even easier and more recent/fashionable tile IR)." 이 의문은 정확하다. 그리고 그 정확함이 NVIDIA의 의도를 드러낸다. cuda-oxide는 Tile IR이나 MLIR과 경쟁하지 않는다. 그것들과 다른 시장을 노린다.

Tile과 Triton과 Mojo가 노리는 자리는 "AI 알고리즘을 짜는 ML 엔지니어"의 자리다. 거기에서는 numpy 문법과 자동 타일링이 가장 중요하다. 반면 cuda-oxide가 노리는 자리는 "시스템 프로그래머"의 자리다. 메모리 레이아웃을 직접 통제하고, 워프와 클러스터 단위로 동기화를 짜고, TMA를 직접 호출하는 사람들이다. C++ CUDA가 점령해 온 그 자리에, NVIDIA는 처음으로 공식 Rust 옵션을 깔았다. 이 분리가 중요한 이유는, AI 알고리즘 위에 무엇이 올라가든 그 아래의 시스템 코드는 결국 누군가 짜야 하기 때문이다. PyTorch가 Triton을 부르면, 그 Triton의 런타임은 결국 시스템 레벨 CUDA 위에서 돈다. 그 시스템 레벨을 NVIDIA가 직접 Rust로 정의하기 시작했다는 것이 cuda-oxide 발표의 진짜 의미다.

세 번째 겹은 **기존 Rust GPU 진영에 대한 우회**다. Rust-CUDA 크레이트와 rust-gpu 그리고 cust 와 cudarc 가 7년 동안 쌓아 온 코드 자산은 적지 않다. 그러나 그 모든 프로젝트는 한 가지 한계를 공유한다. NVIDIA의 후원이 없다는 것. NVCC의 내부 변경 한 번으로 빌드가 깨질 수 있고, 새 GPU 세대의 기능은 항상 C++ 헤더 먼저 도착한다. 이 비대칭이 Rust 사용자들의 GPU 채택을 사실상 막아 왔다. cuda-oxide는 이 비대칭을 단숨에 뒤집는다. 같은 회사가 PTX 사양과 Rust 컴파일러를 동시에 손보는 순간, 다른 누가 만든 Rust GPU 컴파일러도 NVIDIA 표준의 종속 변수가 된다.

`raincole`이 HN에 남긴 한 줄이 이 풍경을 잘 요약한다. "이게 Slang에 무엇을 의미하는지 궁금하다. 사람들이 더 현대적인 언어로 GPU 프로그래밍을 하고 싶어 한다는 것이 핵심인데, 이제 그냥 Rust를 쓰면 되는 것 아닌가(I wonder what it means for Slang. Presumably the point is that people want to do GPU programming with a more modern language. But now you can just use Rust)." 이에 대해 `pjmlp`는 시장 분리로 답한다. "그들은 다른 대중을 상대한다. Slang 진영은 AI 알고리즘이 아니라 그래픽 프로그래밍에 더 관심이 있다. 그리고 NVIDIA는 이미 Slang을 production에서 쓰고 있어, 그 사람들이 셰이더 파이프라인을 Rust로 다시 쓸 일은 없다(They serve different public, Slang folks are more interested in graphics programming not AI algorithms. Also NVIDIA already has Slang in production and those folks aren't going to rewrite shader pipelines into Rust)." 이 응답은 맞는 말이지만, 동시에 cuda-oxide가 그래픽스 진영을 노린 것이 아니라 시스템·AI 인프라 진영을 노린 카드라는 사실을 반증한다.

NVIDIA가 Rust를 시스템 코드 영역에서 채택해 온 사례는 이번이 처음이 아니다. 보안 임계 코드 일부에 SPARK/Ada 를 써 온 사례가 AdaCore의 케이스 스터디로 공개되어 있고, NVIDIA 내부의 펌웨어와 드라이버 영역에서 Rust 채택이 점증하고 있다는 것은 이미 알려진 흐름이다. cuda-oxide는 그 흐름이 마침내 GPU 코드 자체로까지 확장된 사건이다. C에서 시작해 SPARK와 Rust로 영역을 넓혀 온 NVIDIA의 시스템 언어 전략에서, GPU 영역만이 마지막 미정복지였다. 그 미정복지가 이번 5월에 점령되었다.

## 본문 3 — 이식성의 함정: 안전한 코드는 자유로운 코드인가

여기까지가 NVIDIA의 시점이다. 사용자의 시점에서는 다른 질문이 떠오른다. cuda-oxide로 짠 코드는 더 안전한가. 그렇다. 그 코드는 더 자유로운가. 그렇지 않다.

이 두 번째 답이 cuda-oxide의 가장 큰 함정이다. Rust GPU 진영이 7년 동안 분열되어 있었던 가장 큰 이유는 "어떤 백엔드를 타겟할 것인가"에 대한 합의가 없었기 때문이다. rust-gpu 는 SPIR-V 를 타겟해서 Vulkan/WebGPU 로 갈 수 있는 길을 열었고, Rust-CUDA 는 PTX 를 타겟했으며, cust 는 nvcc 결과물을 호출하는 데 그쳤다. SPIR-V 경로를 택하면 AMD, Intel GPU, 모바일 GPU까지 동일한 코드로 갈 수 있는 대신 NVIDIA 전용 기능 — TMA, 워프 셔플의 최신 변종, Tensor Core API — 의 일부를 잃는다. PTX 경로를 택하면 NVIDIA의 모든 기능을 쓸 수 있는 대신 그 코드는 NVIDIA GPU 위에서만 돈다.

cuda-oxide는 이 분기에서 망설임 없이 PTX 를 골랐다. 책의 첫 문장이 명시하는 그대로다. "compiles standard Rust code directly to PTX." 결과적으로 cuda-oxide로 짠 커널은 Rust로 작성되었지만, 그 PTX 는 ptxas 를 거쳐 NVIDIA 의 SASS 가 되며, 그 SASS 는 AMD MI300 위에서 한 줄도 돌지 않는다. 더 정확히 말하면, AMD 측이 별도로 PTX → ROCm 트랜슬레이터를 만든다 해도(이미 ZLUDA 같은 프로젝트가 있다), cuda-oxide의 호스트 API — `DeviceOperation`, 스트림, TMA 호출 — 는 NVIDIA 런타임 API 와 강하게 결합되어 있다. 즉 코드는 Rust 로 짜였지만, 그 Rust 가 가리키는 어휘는 CUDA 다.

이 점이 왜 중요한가. 답은 시장 구조에 있다. AMD는 ROCm으로, Intel은 oneAPI/Level Zero로, Apple은 Metal Performance Shaders로 GPU 컴퓨트 시장에 들어와 있다. 학습용으로는 여전히 NVIDIA H100/B200 점유율이 압도적이지만, 추론(inference) 시장은 이미 AMD MI300X 가 의미 있는 비중을 가져갔고, 메타와 마이크로소프트가 자체 ASIC로 일부 워크로드를 옮기는 흐름도 진행 중이다. 이 시장 분화의 시기에 NVIDIA가 "Rust로 짜라, 그러나 PTX 로만 컴파일하라"고 선언하는 것은 GPU 코드의 이식성 결정을 사용자가 깨닫지 못하는 사이에 가두는 일이 된다. C++ CUDA 의 lock-in 이 Rust CUDA 의 lock-in 으로 옮겨갈 뿐, 그 깊이는 그대로다. 오히려 Rust의 타입 시스템이 약속하는 "안전하고 modern한 코드"의 이미지 때문에, lock-in 의 비가시성이 더 커진다.

대안이 없는 것은 아니다. WebGPU 는 점진적으로 컴퓨트 셰이더 영역을 흡수하고 있고, SPIR-V 는 여전히 가장 다중 벤더 친화적인 GPU IR이며, AMD HIP 는 CUDA 코드를 거의 기계적으로 ROCm 으로 옮길 수 있는 어댑터를 제공한다. HN에서 `rogermeier`는 더 근본적인 후보를 제시한다. "TileLang 과 Tile Kernels 같은 것들이 언젠가 CUDA 를 쓸모없게 만들 것이다(TileLang and stuff like Tile Kernels will make CUDA obsolete one day)." 이 견해의 의미는 단순하다. 충분히 높은 추상화 레벨의 GPU DSL이 안정화되면, 그 아래 IR이 PTX 든 SPIR-V 든 ROCm IR 이든 자동 변환의 대상이 되고, 사용자는 어느 한 벤더에 묶이지 않는다는 것이다.

cuda-oxide는 이 기대와 정반대 방향으로 간다. 추상화의 사다리를 위로 올리는 대신, 시스템 프로그래밍의 사다리를 더 단단하게 다진다. 그 단단함은 NVIDIA GPU 위에서는 분명한 이득이다. 그리고 NVIDIA GPU 가 아닌 곳에서는 무용한 이득이다. 사용자는 둘 사이에서 선택해야 한다. 단, 이 선택은 코드를 처음 짜는 시점이 아니라, 1년 뒤 그 코드를 다른 벤더 GPU 로 옮겨야 할 때에야 비로소 모습을 드러낸다.

## 결론 — 안전과 자유는 같지 않다

다시 처음의 질문으로 돌아가자. NVIDIA가 직접 Rust→CUDA 컴파일러를 들고 나온 사건은 GPU 안전성의 진보인가, 아니면 lock-in 을 한 단계 더 깊은 곳으로 옮기는 우회인가. 답은 둘 다이다. 그리고 둘 사이를 우리는 오직 시간이 충분히 흐른 뒤에야 구별할 수 있다.

cuda-oxide가 약속하는 것은 분명하다. C++ CUDA 가 30년간 누적해 온 메모리 안전 문제의 표면적이 줄어든다. 에이전트가 자동 생성하는 GPU 코드의 위험이 컴파일 시점에 잡힌다. Rust 호스트 코드와 GPU 커널이 같은 타입 시스템 안에서 자연스럽게 합성된다. 이 세 가지는 실질적인 진보이고, 시스템 프로그래밍의 다음 10년을 위한 의미 있는 토대가 된다. 부정할 이유가 없다.

cuda-oxide가 약속하지 않는 것 또한 분명하다. 이 컴파일러로 짠 코드는 NVIDIA GPU 위에서만 안전하다. 그 안전함은 곧 그 GPU 회사의 미래 가격, 미래 공급량, 미래 정치적 결정에 대한 종속을 의미한다. Rust 의 안전성이 곧 인프라의 안전성을 의미하지는 않는다. 컴파일러 단의 안전성과 공급망 단의 자유는 별개의 문제다. 우리가 이 두 가지를 구별하지 않으면, 우리는 더 안전한 코드를 짜면서도 더 종속된 미래를 짓는 일을 동시에 하게 된다.

엔지니어 개인의 차원에서 지금 할 수 있는 일은 단순하다. cuda-oxide 를 시도해 보되, 알파 단계의 안정성과 NVIDIA 종속의 깊이를 모두 의식할 것. 이식성이 중요한 코드라면 SPIR-V 경로 또는 더 높은 추상화 레벨의 DSL을 함께 검토할 것. 그리고 무엇보다, 한 회사가 "official"이라는 단어를 붙여 들고 나온 도구는 거의 항상 그 회사의 경쟁력을 강화하는 도구라는 사실을 잊지 말 것. cuda-oxide는 NVIDIA가 Rust 를 좋아해서 만든 것이 아니다. NVIDIA가 GPU 시스템 코드의 다음 표준을 자신이 정의하기 위해 만든 것이다. 그 차이를 보는 것이, 이 발표를 정확히 읽는 첫 걸음이다.
