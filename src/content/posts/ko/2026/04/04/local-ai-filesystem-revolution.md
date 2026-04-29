---
title: '로컬 AI의 조용한 혁명 — RAG를 버린 파일시스템과, 내 노트북에서 돌아가는 Gemma 4'
description: '2026년 4월 첫째 주, 세 가지 사건이 동시에 터졌다. Mintlify가 RAG를 걷어내고 가상 파일시스템으로 교체했고, Google이 Gemma 4를 Apache 2.0으로 풀었고, Ollama가 Apple MLX를 품어서 추론 속도를 두 배로 끌어올렸다. 각각은 독립적인 뉴스다. 하지만 셋을 나란히 놓으면 하나의 방향이 보인다 — AI가 클라우드에서…'
pubDate: 2026-04-04T01:41:42.186Z
lang: ko
pairSlug: 'local-ai-filesystem-revolution'
draft: false
---
# 로컬 AI의 조용한 혁명 — RAG를 버린 파일시스템과, 내 노트북에서 돌아가는 Gemma 4

> 2026년 4월 첫째 주, 세 가지 사건이 동시에 터졌다. Mintlify가 RAG를 걷어내고 가상 파일시스템으로 교체했고, Google이 Gemma 4를 Apache 2.0으로 풀었고, Ollama가 Apple MLX를 품어서 추론 속도를 두 배로 끌어올렸다. 각각은 독립적인 뉴스다. 하지만 셋을 나란히 놓으면 하나의 방향이 보인다 — AI가 클라우드에서 내려오고 있다.

---

## 1. RAG를 걷어낸 회사 — Mintlify의 실험

Mintlify는 개발자 문서 플랫폼이다. 수천 개 기업의 API 문서를 호스팅하고, 그 위에 AI 어시스턴트를 올려 사용자가 문서를 자연어로 질문할 수 있게 만든다. 하루 3만 건 이상의 대화가 오간다. 이 정도 규모면 RAG(Retrieval-Augmented Generation)가 당연한 선택이었다. 실제로 그들은 RAG로 시작했다.

문제는 RAG가 "잘 작동하지 않았다"가 아니라, "잘 작동하는 척했다"는 데 있었다. RAG는 질의와 의미적으로 가까운 chunk를 top-K로 뽑아 모델에 전달한다. FAQ 수준의 질문에는 잘 통한다. "OAuth 설정 방법"을 물으면 관련 chunk가 올라온다. 하지만 개발자가 실제로 문서를 쓰는 방식은 다르다. 정확한 코드 구문을 찾고, 여러 페이지를 넘나들며 맥락을 조합하고, 디렉토리 구조를 따라가며 원하는 정보에 도달한다. embedding cosine similarity로는 이 작업 흐름을 포착할 수 없다. top-K에 정답이 안 걸리면 끝이다.

Mintlify 팀은 근본적인 질문을 던졌다. "에이전트에게 chunk를 넘겨줄 게 아니라, 에이전트가 직접 문서를 탐색하게 만들면 어떨까?" 개발자가 코드베이스를 탐색할 때 쓰는 도구 — `ls`, `cat`, `grep`, `find` — 를 문서 탐색에도 쓸 수 있게 만드는 것이다. 이것이 ChromaFs의 출발점이었다.

---

## 2. ChromaFs — 파일시스템처럼 생긴 벡터 DB

ChromaFs는 "진짜" 파일시스템이 아니다. UNIX 명령어를 가로채서 Chroma 벡터 DB로 변환하는 가상화 레이어다. 에이전트 입장에서는 일반적인 파일시스템처럼 보이지만, 뒤에서는 벡터 DB 쿼리가 돌아가는 구조다.

핵심 아이디어는 단순하다. 문서의 각 페이지를 파일로, 각 섹션을 디렉토리로 매핑한다. 에이전트가 `ls /auth/`를 실행하면 인증 관련 문서 목록이 나오고, `cat /auth/oauth.mdx`를 실행하면 해당 문서의 전체 내용이 반환된다. `grep -r "rate limit" /api-reference/`를 치면 API 레퍼런스 전체에서 rate limit 관련 구문을 찾아준다.

기술적으로 흥미로운 부분은 구현의 계층 구조다. ChromaFs는 Vercel Labs의 [just-bash](https://github.com/nicholasgasior/just-bash) 위에 구축되었다. just-bash는 TypeScript로 재구현된 bash인데, 파일시스템 인터페이스(`IFileSystem`)를 플러그인으로 교체할 수 있다. ChromaFs는 이 인터페이스를 가로채서 모든 파일 시스템 호출을 벡터 DB 쿼리로 변환한다.

디렉토리 구조는 gzip 압축된 JSON으로 Chroma 컬렉션 안에 저장된다:

```json
{
  "auth/oauth": { "isPublic": true, "groups": [] },
  "api-reference/users": { "isPublic": true, "groups": [] },
  "internal/billing": { "isPublic": false, "groups": ["admin", "billing"] }
}
```

초기화 시 이 트리를 메모리로 풀어서 `Set<string>`(파일 경로)과 `Map<string, string[]>`(디렉토리 → 자식)로 유지한다. 덕분에 `ls`, `cd`, `find` 같은 구조 탐색 명령은 네트워크 호출 없이 로컬에서 즉시 처리된다. 실제 DB 쿼리가 필요한 것은 `cat`(파일 읽기)과 `grep`(내용 검색)뿐이다.

`grep`의 최적화도 주목할 만하다. 재귀적 grep은 2단계 필터링으로 처리된다. 1단계에서 grep 플래그를 파싱해 Chroma 쿼리로 변환하고(고정 문자열은 `$contains`, 패턴은 `$regex`), 후보 파일을 좁힌다. 2단계에서 매칭된 chunk를 Redis로 일괄 프리페치한 뒤, grep 명령을 해당 파일만 대상으로 재작성해 in-memory에서 실행한다. 수만 건의 문서에 대한 재귀 검색이 밀리초 단위로 끝난다.

성능 차이는 극적이다:

| 지표 | 기존 Sandbox | ChromaFs |
|------|-------------|----------|
| P90 세션 생성 시간 | ~46초 | ~100ms |
| 대화당 한계 비용 | ~$0.0137 | ~$0 (기존 DB 재사용) |
| 검색 방식 | 디스크 선형 스캔 | DB 메타데이터 쿼리 |
| 연간 비용 (85만 대화 기준) | $70,000+ | 기존 인프라 비용에 흡수 |

세션 생성이 46초에서 100밀리초로 — 460배 빨라졌다. 한계 비용은 사실상 0이 되었다. 이것은 단순한 성능 개선이 아니라 아키텍처 전환의 결과다.

---

## 3. "그건 여전히 RAG 아닌가?" — HN의 반론

Hacker News에서 이 글이 217포인트를 받으면서 [활발한 논쟁](https://news.ycombinator.com/item?id=47618223)이 벌어졌다. 가장 날카로운 비판은 이것이었다: "ChromaFs는 여전히 Chroma DB를 쿼리한다. RAG를 '대체'한 게 아니라, RAG 위에 추상화 레이어를 씌운 것 아닌가?"

정확한 지적이다. ChromaFs 뒤에서는 여전히 벡터 DB가 동작한다. 바뀐 것은 retrieval 엔진이 아니라 **에이전트와 데이터 사이의 인터페이스**다. RAG는 "의미적으로 가까운 chunk를 자동으로 가져다주는" 패턴이다. ChromaFs는 "에이전트가 직접 탐색할 수 있는 구조를 제공하는" 패턴이다. 같은 DB를 쓰더라도 에이전트의 자율성 수준이 근본적으로 다르다.

한 HN 댓글이 이를 잘 정리했다: 400개 이상의 Python 파일로 구성된 코드베이스에서, embedding 기반 RAG를 파일시스템 탐색으로 교체했더니 "에이전트가 30초 만에 모듈 구조를 파악하고, 필요한 파일을 경로로 직접 요청하기 시작했다"는 것이다.

왜 이런 일이 가능할까? LLM은 GitHub와 UNIX 환경에서 대량으로 학습되었다. `grep`, `ls`, `cat`은 이미 모델이 깊이 이해하고 있는 도구다. 파일시스템 인터페이스를 제공하는 것은 모델의 기존 역량을 최대한 활용하는 설계인 셈이다. 반면 RAG의 top-K retrieval은 모델이 "수동적으로 받아먹는" 구조다. 뭐가 올라올지 모델이 통제할 수 없다.

물론 반론도 유효하다. 이 접근법은 문서가 이미 잘 구조화된 경우에만 통한다. Mintlify는 개발자 문서 플랫폼이다 — 문서가 디렉토리와 페이지로 정연하게 정리되어 있다. 비정형 데이터, 대화 로그, PDF 더미에는 이 방식이 적용되지 않는다. HN의 한 회의론자가 정확히 지적했다: "구조가 계층적이지 않거나 파티셔닝이 불가능한 데이터에서 이 방식을 쓰려면 매우 힘든 싸움이 된다."

그럼에도 이 실험이 던지는 질문은 중요하다. **에이전트에게 답을 건네줄 것인가, 아니면 스스로 찾게 할 것인가?** 2026년의 LLM은 스스로 찾을 수 있을 만큼 충분히 똑똑해졌다. 문제는 우리가 그에 맞는 인터페이스를 제공하고 있느냐다.

---

## 4. Gemma 4 — 모르는 사람을 위한 5분 소개

RAG의 미래에 대한 논쟁이 벌어지는 같은 주에, Google DeepMind가 [Gemma 4를 공개](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)했다. Gemma는 Google의 오픈 모델 브랜드다. Gemini가 Google의 상용 AI라면, Gemma는 그 기술을 오픈소스로 내려보내는 채널이다. Gemma 4는 Gemini 3과 동일한 기술로 만들어졌다.

모르는 사람을 위해 핵심만 정리한다.

**네 가지 모델 라인업:**

| 모델 | 활성 파라미터 | 전체 파라미터 | Context Window | 입력 모달리티 |
|------|-------------|-------------|----------------|-------------|
| E2B | 2.3B | 5.1B | 128K | 텍스트, 이미지, 오디오 |
| E4B | 4.5B | 8B | 128K | 텍스트, 이미지, 오디오 |
| 26B-A4B (MoE) | 3.8B | 25.2B | 256K | 텍스트, 이미지, 동영상 |
| 31B (Dense) | 30.7B | 30.7B | 256K | 텍스트, 이미지, 동영상 |

"활성 파라미터"가 핵심이다. 26B-A4B는 전체 파라미터가 25.2B이지만, 한 번의 추론에 실제로 사용하는 것은 3.8B뿐이다. Mixture-of-Experts(MoE) 아키텍처 덕분이다. 전문가 여럿을 두고, 입력에 따라 필요한 전문가만 활성화하는 구조다. 31B Dense 모델의 97% 수준 품질을 훨씬 적은 연산으로 달성한다.

작은 모델도 무시할 수 없다. E2B는 활성 파라미터 2.3B로, 2-bit 양자화 시 Raspberry Pi 5에서 초당 7.6 토큰을 뽑아낸다. 스마트폰에서도 돌아가는 수준이다.

**아키텍처의 혁신:** Gemma 4는 Alternating Attention이라는 구조를 도입했다. 레이어마다 local sliding-window attention(512~1024 토큰)과 global full-context attention을 번갈아 적용한다. 가까운 맥락은 효율적으로, 먼 맥락은 정확하게 처리하겠다는 설계다. 여기에 Dual RoPE — sliding-window 레이어에는 표준 rotary position embedding을, global 레이어에는 proportional RoPE를 적용해서 256K context window에서도 품질 저하 없이 작동한다.

**벤치마크:** 31B Dense 기준으로 [AIME 2026](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/)에서 89.2%, LiveCodeBench v6에서 80.0%, Codeforces ELO 2,150을 기록했다. 오픈 모델 중 전 세계 3위다. 수학 추론과 코딩에서 이 정도 성적이면, 로컬에서 돌리는 코딩 어시스턴트로 충분히 실용적이다.

**그리고 가장 중요한 것: Apache 2.0 라이선스.** 이전 Gemma 버전은 Google의 자체 라이선스를 사용했고, 상용 사용에 제약이 있었다. Gemma 4부터 Apache 2.0으로 전환했다. 이것은 기술적 변화가 아니라 전략적 전환이다. Apache 2.0은 사실상 제약이 없다. 월간 활성 사용자 제한 없음. 사용 정책(acceptable use policy) 강제 없음. 상용 배포 완전 자유. Meta의 Llama 4가 여전히 커뮤니티 라이선스로 월 7억 MAU 이상일 때 별도 협의를 요구하는 것과 대조적이다.

[VentureBeat의 분석](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks)이 정곡을 찔렀다: "이 라이선스 변경이 벤치마크보다 더 중요할 수 있다." 오픈 모델의 가치는 성능만으로 결정되지 않는다. 얼마나 자유롭게 쓸 수 있느냐가 채택률을 좌우한다.

---

## 5. 로컬 AI 생태계의 빅뱅 — Ollama MLX + mesh-llm

Gemma 4가 공개된 같은 주에, 이 모델을 실제로 로컬에서 돌릴 수 있는 인프라도 함께 정비되었다. 우연이라고 보기엔 타이밍이 너무 완벽하다.

### Ollama 0.19: Mac에서의 추론 속도가 두 배

[Ollama](https://ollama.com/blog/mlx)는 로컬 LLM 실행 도구의 사실상 표준이다. `ollama run gemma4:26b`한 줄이면 모델을 받아서 바로 대화를 시작할 수 있다. 그 Ollama가 0.19 버전에서 Apple의 MLX(Machine Learning eXtensions) 프레임워크를 네이티브로 지원하기 시작했다.

성능 향상은 수치로 확인된다:

| 지표 | Ollama 0.18 | Ollama 0.19 (MLX) | 향상 |
|------|-------------|-------------------|------|
| Prefill (토큰/초) | 1,154 | 1,810 | 1.6x |
| Decode (토큰/초) | 58 | 112 | 1.9x |

Decode 속도가 58에서 112로 — 거의 두 배다. Apple Silicon의 unified memory 아키텍처를 MLX가 직접 활용하면서 가능해진 수치다. GPU와 CPU가 같은 메모리 풀을 공유하는 Apple Silicon의 특성을 llama.cpp의 Metal 백엔드보다 훨씬 효율적으로 쓰는 것이다.

M5, M5 Pro, M5 Max 칩에서는 GPU Neural Accelerator까지 활용해 time to first token(TTFT)과 초당 생성 토큰 모두 추가 가속된다. 다만 Ollama 팀은 "32GB 이상의 unified memory를 권장한다"고 명시했다 — 26B 모델을 양자화 없이 돌리려면 실질적으로 필요한 최소 사양이다.

### mesh-llm: 여러 대의 컴퓨터를 하나로

노트북 한 대로는 부족하다면? [mesh-llm](https://github.com/michaelneale/mesh-llm)이 답이다. 여러 대의 컴퓨터에 분산된 GPU 자원을 하나로 묶어서, 단일 OpenAI 호환 API로 노출해주는 도구다.

설치는 간단하다:

```bash
curl -fsSL https://raw.githubusercontent.com/michaelneale/mesh-llm/main/install.sh | bash
mesh-llm --auto
```

`--auto`를 붙이면 하드웨어를 자동 감지하고, 모델을 다운로드하고, 메시 네트워크에 참여하고, 웹 콘솔을 띄운다. 같은 네트워크에 있는 다른 머신에서도 같은 명령을 실행하면 자동으로 메시에 합류한다.

분산 전략이 영리하다:

- **모델이 한 대에 들어가면** → 네트워크 오버헤드 없이 로컬 실행
- **Dense 모델이 한 대에 안 들어가면** → pipeline parallelism으로 레이어를 분할
- **MoE 모델이 한 대에 안 들어가면** → expert sharding, 교차 노드 추론 트래픽 제로

Gemma 4의 26B-A4B MoE 모델과 mesh-llm의 조합이 특히 매력적이다. MoE는 전문가 단위로 분할이 자연스럽고, mesh-llm은 MoE의 expert sharding을 네이티브로 지원한다. 집에 Mac mini 두 대가 있다면, 각각 16GB 메모리로도 26B 모델을 품질 저하 없이 돌릴 수 있다는 뜻이다.

모든 노드는 `http://localhost:9337/v1`이라는 동일한 엔드포인트를 노출한다. OpenAI SDK 호환이므로, 기존에 `openai.chat.completions.create()`를 쓰던 코드에서 base_url만 바꾸면 된다:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:9337/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="gemma-4-26b-a4b",
    messages=[{"role": "user", "content": "이 코드를 리뷰해줘"}]
)
```

클라우드 API를 쓰는 것과 코드가 동일하다. 인프라가 바뀌었을 뿐이다.

---

## 6. 퍼즐 조각을 맞추면 — 2026년 로컬 AI 스택

세 가지를 나란히 놓으면 하나의 스택이 완성된다.

```
┌─────────────────────────────────────────────┐
│            Application Layer                │
│   (에이전트, 코딩 어시스턴트, 문서 탐색)       │
├─────────────────────────────────────────────┤
│            Interface Layer                  │
│   ChromaFs (파일시스템 인터페이스)             │
│   → RAG의 "추천" 대신 에이전트의 "탐색"       │
├─────────────────────────────────────────────┤
│            Model Layer                      │
│   Gemma 4 (Apache 2.0, MoE, 256K context)  │
│   → 오픈, 고성능, 상용 자유                   │
├─────────────────────────────────────────────┤
│            Runtime Layer                    │
│   Ollama 0.19 (MLX) + mesh-llm             │
│   → 로컬 실행, 분산 추론, API 호환            │
├─────────────────────────────────────────────┤
│            Hardware Layer                   │
│   Apple Silicon / NVIDIA GPU / 멀티 노드     │
└─────────────────────────────────────────────┘
```

각 레이어가 독립적으로 진화하면서도 서로를 강화한다. Gemma 4의 MoE 아키텍처는 mesh-llm의 expert sharding과 찰떡이다. Ollama의 MLX 지원은 Apple Silicon의 unified memory를 최대한 활용한다. ChromaFs의 파일시스템 인터페이스는 LLM이 가장 잘 이해하는 형태로 데이터를 제공한다.

이 스택의 의미를 한 문장으로 정리하면: **클라우드 API 없이도, 실무에서 쓸 수 있는 수준의 AI 워크플로우가 내 노트북에서 가능해졌다.**

1년 전에는 로컬 LLM이 "재미있는 실험"이었다. 7B 모델이 주류였고, 품질은 GPT-3.5에 한참 못 미쳤고, 추론 속도는 답답했다. 지금은 다르다. 31B 모델이 오픈 모델 세계 3위이고, 26B MoE가 3.8B 연산만으로 그 97%를 재현하고, Mac에서의 추론 속도가 두 배로 뛰었고, 여러 대를 묶어서 더 큰 모델도 돌릴 수 있다.

---

## 7. 그래서 뭐가 달라지는가

기술적 가능성만으로는 의미가 없다. 실제로 무엇이 달라지는지 세 가지 관점에서 정리한다.

**첫째, 비용 구조가 바뀐다.** OpenAI의 GPT-4.5 API를 기준으로, 입력 $2/백만 토큰, 출력 $8/백만 토큰이다. 하루 만 건의 질의를 처리하는 서비스라면 월 수천 달러가 나온다. Gemma 4 26B를 로컬에서 돌리면 추가 비용은 전기세뿐이다. Mac mini M4 Pro의 전력 소비는 풀로드에서도 40W 수준 — 24시간 돌려도 월 전기세는 $5 미만이다. 물론 초기 하드웨어 투자가 있지만, API 비용이 누적되는 서비스에서는 수개월 내에 역전된다.

**둘째, 데이터가 로컬에 머문다.** 의료, 법률, 금융 도메인에서 AI를 도입하지 못하는 가장 큰 장벽은 기술이 아니라 규제다. 민감 데이터를 외부 API로 보낼 수 없는 환경이 대부분이다. 로컬 AI 스택은 이 장벽을 우회한다. 데이터가 네트워크를 떠나지 않으니 컴플라이언스 이슈가 근본적으로 발생하지 않는다. Apache 2.0 라이선스는 모델 자체의 상용 사용까지 자유롭게 풀어주므로, 기업이 자체 서비스에 내장하는 데도 법적 장벽이 없다.

**셋째, 에이전트의 자율성이 높아진다.** ChromaFs가 보여준 것은 RAG → 파일시스템 전환 자체보다 더 큰 트렌드의 일부다. 에이전트에게 "결과를 전달"하는 대신 "도구를 주고 스스로 탐색하게" 만드는 패턴이 확산되고 있다. Claude Code가 코드베이스를 직접 탐색하는 것, Devin이 브라우저를 직접 조작하는 것, 그리고 ChromaFs가 문서를 파일시스템으로 제공하는 것 — 모두 같은 방향이다. Agentic한 접근이 passive한 retrieval보다 효과적이라는 합의가 형성되고 있다.

---

## 8. 한계와 경계 — 아직은 아닌 것들

낙관만으로 글을 닫으면 정직하지 못하다. 이 스택에는 분명한 한계가 있다.

**로컬 모델의 품질 천장.** Gemma 4 31B가 아무리 뛰어나도, Claude Opus 4.6이나 GPT-4.5의 전체 역량을 대체하지는 못한다. 복잡한 다단계 추론, 긴 문서의 정밀한 분석, 미묘한 뉘앙스 파악에서는 여전히 프론티어 모델과 격차가 있다. 로컬 모델은 "충분히 좋은(good enough)" 유즈케이스에서 빛나고, "최고의 품질이 필요한" 유즈케이스에서는 클라우드 API가 여전히 정답이다.

**ChromaFs의 적용 범위.** 앞서 언급했듯이, 이 접근법은 데이터가 잘 구조화된 경우에만 통한다. 비정형 데이터 — 슬랙 대화 로그, 이메일 아카이브, 스캔된 PDF — 에는 파일시스템 메타포가 맞지 않는다. 이런 데이터에 대해서는 여전히 RAG가, 혹은 Agentic RAG가 더 적절한 선택이다.

**mesh-llm의 성숙도.** GitHub 스타 503개, 활발한 개발 중이지만 아직 프로덕션 레벨이라고 하기엔 이르다. 네트워크 지연, 노드 장애 시 복구, 보안 등 분산 시스템의 고전적 문제들이 아직 완전히 해결되지 않았다.

**메모리의 벽.** Ollama가 32GB unified memory를 권장하는 데는 이유가 있다. 16GB Mac에서 26B 모델을 돌리려면 공격적인 양자화가 필요하고, 양자화는 품질 저하를 수반한다. 하드웨어 투자 없이 "무료로 AI를 쓴다"는 프레이밍은 과장이다.

---

## 9. AI가 내려오고 있다

2026년 4월 첫째 주에 동시에 터진 이 세 가지 사건은, 독립적으로 보면 각각의 뉴스에 불과하다. Mintlify가 아키텍처를 바꿨고, Google이 모델을 공개했고, Ollama가 업데이트를 했다. 그런데 셋을 나란히 놓으면 하나의 흐름이 보인다.

AI의 무게중심이 클라우드에서 로컬로 이동하고 있다. 모델은 더 작고 효율적으로 진화하고(MoE), 라이선스는 더 자유로워지고(Apache 2.0), 실행 환경은 더 빨라지고(MLX), 여러 대를 묶는 인프라가 등장하고(mesh-llm), 에이전트가 데이터를 다루는 방식도 로컬 탐색에 최적화되고 있다(ChromaFs).

이전에 쓴 [RAG 글](rag-not-silver-bullet.md)에서 "도구가 아니라 문제를 보라"고 했다. 같은 원칙이 여기에도 적용된다. "클라우드 vs 로컬"은 도구 선택의 문제다. 진짜 질문은 "내 문제의 형태에 어떤 스택이 맞는가"이다. 민감 데이터를 다루는 의료 스타트업에게 로컬 AI 스택은 선택이 아니라 필수다. 수백만 사용자의 실시간 요청을 처리하는 대규모 서비스에는 여전히 클라우드가 맞다. 대부분의 경우는 그 사이 어딘가에 있을 것이다 — 민감한 데이터는 로컬에서, 고품질 추론이 필요한 작업은 클라우드에서.

확실한 것은 하나다. 1년 전에는 "로컬에서 AI를 돌린다"는 말이 취미 프로젝트를 의미했다. 지금은 프로덕션 아키텍처의 선택지 중 하나가 되었다. 그리고 이 움직임은 가속되고 있다.

---

## 참고 자료

- [How we built a virtual filesystem for our Assistant](https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant) — Mintlify 블로그
- [Hacker News: ChromaFs 토론](https://news.ycombinator.com/item?id=47618223) — 217포인트, 96 댓글
- [Gemma 4: Byte for byte, the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) — Google 공식 발표
- [What Is Google Gemma 4? Architecture, Benchmarks](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/) — WaveSpeedAI 기술 분석
- [Google releases Gemma 4 under Apache 2.0 — and that license change may matter more than benchmarks](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks) — VentureBeat
- [Ollama is now powered by MLX on Apple Silicon](https://ollama.com/blog/mlx) — Ollama 공식 블로그
- [Ollama adopts MLX for faster AI performance on Apple Silicon](https://9to5mac.com/2026/03/31/ollama-adopts-mlx-for-faster-ai-performance-on-apple-silicon-macs/) — 9to5Mac
- [mesh-llm: Pool compute to run powerful open models](https://github.com/michaelneale/mesh-llm) — GitHub
- [Gemma 4 Model Card](https://ai.google.dev/gemma/docs/core/model_card_4) — Google AI for Developers
