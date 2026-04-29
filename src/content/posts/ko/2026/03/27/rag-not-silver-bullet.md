---
title: 'RAG는 Silver Bullet이 아니었다 — 72%가 실패하는 이유'
description: 'Oncall 대응 수순서를 RAG로 자동화하면, 엔지니어의 새벽 3시가 달라질 거라 믿었다. 모델을 바꾸고, chunking을 바꾸고, 몇 달을 투자했다. 정해율은 70%에 도달하지 못했고, 프로젝트는 파기됐다.'
pubDate: 2026-03-27T08:26:39.192Z
lang: ko
pairSlug: 'rag-not-silver-bullet'
draft: false
---
# RAG는 Silver Bullet이 아니었다 — 72%가 실패하는 이유

> Oncall 대응 수순서를 RAG로 자동화하면, 엔지니어의 새벽 3시가 달라질 거라 믿었다. 모델을 바꾸고, chunking을 바꾸고, 몇 달을 투자했다. 정해율은 70%에 도달하지 못했고, 프로젝트는 파기됐다.

---

## 1. 나도 실패했다

장애가 발생하거나 스크립트가 점검이 필요하다고 판단하면, 자동으로 엔지니어를 호출하는 시스템이 있었다. 새벽 3시에도 울린다. 알람이 오면 잠에서 깨어 로그를 뒤지고, 어떤 순서로 대응해야 하는지 머릿속으로 되새겨야 한다. 반복되는 장애 유형이라면 특히 더 그렇다. "이미 답이 있는데, 왜 매번 사람이 찾아야 하지?"

그래서 시작한 게 RAG 프로젝트였다. 사내에 흩어진 대응 수순서 문서를 인덱싱하고, oncall 알람이 올 때 관련 수순을 함께 전달하자는 아이디어였다. 장애 유형이 분류되면 embedding으로 가장 유사한 문서를 찾아 슬랙 메시지에 붙여 넣는다. 단순하고, 명쾌해 보였다.

하지만 hit ratio는 올라가지 않았다. 모델을 업그레이드했다. chunking 전략을 바꿨다. overlap을 늘리고, 문서를 재구조화했다. 그래도 정해율은 70%를 넘지 못했다. 틀린 수순서가 붙어 나오거나, 아예 "관련 문서 없음"으로 처리되는 경우가 계속 발생했다.

몇 달이 지나서야 근본적인 문제가 보였다. 수순서 자체가 제대로 정비되어 있지 않았다. 어떤 장애 유형은 문서가 두 개였고 내용이 달랐다. 어떤 유형은 문서가 아예 없었다. 작성된 수순서도 실제 환경과 맞지 않게 방치된 경우가 많았다. RAG는 좋은 문서를 빠르게 찾아주는 도구인데, 찾을 문서 자체가 엉망인 상태였다.

결론은 명확했다. 한정된 자원으로 oncall 대응 시간을 줄이는 데 투자하는 것보다, oncall 자체를 줄이는 데 자원을 쓰는 게 맞다. 프로젝트는 접었다.

그런데 이 경험이 내게만 특수한 것이었을까. 업계 데이터는 그렇지 않다고 말한다.

---

## 2. 72%가 실패한다 — 숫자가 말하는 현실

Gartner는 2024년 보고서에서, 2025년 말까지 GenAI 프로젝트의 30% 이상이 PoC(개념 증명) 이후 폐기될 것이라고 발표했다. 원인으로 꼽은 것은 네 가지다: 데이터 품질 문제, 리스크 관리 부재, 예상을 초과하는 비용, 그리고 불분명한 비즈니스 가치. 주목할 점은 "모델 성능"이 원인 목록에 없다는 것이다. 실패는 기술 자체보다 그 기술을 받쳐주는 기반에서 발생한다.

한 업계 분석에 따르면 상황은 더 가혹하다. 전 TikTok·Salesforce Principal Engineer 출신으로 RAG 아키텍처를 다루는 David Richards(ragaboutit.com)는, 엔터프라이즈 RAG 프로젝트의 72%가 첫 해에 실패하거나 기대 이하의 성과에 그친다고 추정한다. 물론 이는 블로그 기반의 업계 추정이지 peer-reviewed 연구는 아니다. 그러나 현장에서 쌓인 경험에서 나온 숫자인 만큼, 완전히 무시하기도 어렵다.

숫자보다 더 직관적인 것은 실제 구축 사례다. 개발자 블로그 andros.dev에는 Hacker News에서 292포인트를 받은 글이 있다 — 10년치 사내 기술 문서 1TB를 RAG로 인덱싱하는 과정을 기록한 것이다. 스택은 LlamaIndex + ChromaDB + Ollama(llama3.2:3b). 결과물은 738,470개의 vector와 54GB 인덱스였다. 하지만 그 전에 먼저 해야 했던 일이 있었다. 전체 파일의 54%를 걸러내는 것 — 동영상, 이미지, 실행 파일 등 텍스트로 처리할 수 없는 파일들이었다. 커스텀 필터링 파이프라인이 필요했고, 체크포인트와 모니터링 인프라 없이는 대규모 인덱싱 자체가 불가능하다는 결론에 이르렀다. GPU 렌털 비용만 €184, 기간은 2~3주였다.

Hacker News 댓글 스레드에서 경험 많은 개발자들의 반응은 일관됐다. "PDF를 마크다운으로 변환하면 끝이라는 생각은 환상이다." Vector similarity search만으로는 시간 순서가 중요한 데이터, PDF 속 이미지, 여러 소스를 동시에 참조해야 하는 질의를 처리할 수 없다는 지적이 반복됐다. 가장 많이 인용된 말 중 하나는 이것이었다: "데이터 품질이 80%다." 흥미롭게도, 같은 스레드에서 "RAG는 죽었다"는 주장은 경험자들로부터 일제히 반박됐다 — 단순 vector search가 처음부터 진짜 해법이었던 적이 없다는 이유에서다.

결국 Gartner의 30%도, 72%라는 추정도, andros.dev의 2~3주짜리 사투도 같은 방향을 가리킨다. RAG는 쉽지 않다. 그렇다면 성공한 곳은 무엇이 달랐을까?

---

## 3. 성공한 곳은 뭐가 달랐나

먼저 비용 현실부터 직시할 필요가 있다. Stratagem Systems의 분석에 따르면, 100,000건 이상의 문서를 대상으로 한 엔터프라이즈 RAG 초기 구축 비용은 $34,400에서 $58,000 사이다. 월간 운영 비용은 $14,000에서 $27,000, 전담 엔지니어 인건비만 연간 $75,000에서 $150,000에 이른다. 여기서 가장 크게 과소평가되는 항목이 데이터 정제 및 전처리 비용인데, 대부분의 프로젝트에서 전체 비용의 30~50%를 차지한다. 실제로 투입된 비용을 사후에 분석한 팀들은 대부분 처음 예상의 2~3배를 썼다고 말한다. 진입 비용 자체가 이미 높다.

그런데도 성공한 사례들이 있다. 그 차이를 들여다보면 공통된 패턴이 보인다.

영국의 금융 서비스 기업 NewDay는 연간 250만 건의 고객 상담 전화를 처리한다. 이 회사가 RAG를 도입한 방식은 야심차지 않았다. 대상 문서는 약 200개의 knowledge article로 한정했고, AWS 서버리스 아키텍처에 Claude 3 Haiku를 얹었다. 월 운영 비용은 $400 미만. 결과는 인상적이었다 — 90% 이상의 정확도, 상담원의 검색 시간은 90초에서 4초로 단축됐다.

하지만 그 길이 처음부터 매끄럽지는 않았다. 실제 상담원 10명에게 시스템을 개방했을 때, 정확도는 70%로 곤두박질쳤다. 원인은 예상 밖이었다. 상담원들이 내부 약어와 줄임말을 자연스럽게 쓰고 있었는데, 시스템이 이것을 전혀 이해하지 못했다. 문서는 정식 명칭으로 작성되어 있었고, 사람은 현장 언어로 질의했다. 작은 간극이었지만 치명적이었다.

해법은 우아하지 않았다 — 약어 사전을 LLM 프롬프트에 정적으로 주입했다. 그리고 반복적으로 최적화했다. 70%에서 80%로, 80%에서 90%로. 수치가 회복되기까지 여러 번의 피드백 루프가 필요했다. NewDay가 성공한 이유는 기술이 뛰어나서가 아니다. 문서 범위를 200개로 좁혀 도메인을 통제하고, 사용자 피드백을 시스템으로 흡수하며, 각오하고 덤볐기 때문이다.

LinkedIn의 사례는 접근 방식 자체가 달랐다. 7명의 연구자로 구성된 팀이 Knowledge Graph + RAG 하이브리드 아키텍처를 설계했다. Neo4j(그래프 DB)와 QDrant(벡터 DB), GPT-4, BERT/E5 임베딩 — 4개 시스템을 조합했다. Jira 티켓에서 이슈 간 관계를 추출해 이중 레벨 그래프 구조를 구축했고, 규칙 기반 추출과 LLM 파싱을 혼합한 하이브리드 파싱 파이프라인을 운용했다. 결과는 MRR 77.6% 향상, 이슈 해결 시간 28.6% 단축. 이것은 단순 vector search가 아니었다 — 그래프 기반 추론이었다.

다시 andros.dev로 돌아오면: GPU 렌털 비용 €184는 "푼돈"이었다. Hacker News 댓글에서 한 개발자는 이렇게 정리했다 — "인프라 비용은 푼돈이다. 진짜 비용은 인건비다." 3 man-week의 엔지니어링 노동이 실제 투입 비용의 본체였다.

세 사례를 나란히 놓으면 패턴이 보인다. 성공한 팀들은 "일단 인덱싱하고 보자"는 방식으로 접근하지 않았다. NewDay는 도메인 범위를 통제하고, 사용자 피드백을 데이터로 흡수하는 루프를 만들었다. LinkedIn은 단순 vector search로는 풀리지 않는 문제라는 것을 인정하고, 그에 맞는 아키텍처를 설계했다. FAQ 수준의 구조화된 질의와, 복잡한 도메인 판단이 필요한 질의는 요구하는 시스템이 근본적으로 다르다. 문제의 형태가 성패를 가른다.

> "RAG 데모는 하루면 만든다. 프로덕션 RAG는 각오가 다르다."

성공한 곳들은 Knowledge Graph, 하이브리드 검색, 피드백 루프, 전담 엔지니어 — 즉, RAG 단독이 아니라 "RAG를 포함한 시스템"을 구축했다. 그리고 이 사실은 RAG가 왜 구조적으로 silver bullet이 될 수 없는지로 이어진다.

---

## 4. RAG의 구조적 한계 — 왜 Silver Bullet이 될 수 없는가

RAG가 왜 이렇게 자주 실망을 안겨주는지를 이해하려면, 동작 원리의 밑바닥까지 내려가야 한다.

RAG의 핵심 메커니즘은 vector embedding이다. 문단 하나를 통째로 숫자 배열 하나로 압축한다. OpenAI의 기본 모델을 기준으로 1536개의 숫자로 이루어진 좌표 하나 — 이른바 bi-encoder 방식이다. 문서를 한 번 인코딩해 벡터로 저장하고, 질의도 같은 방식으로 인코딩한 뒤 두 벡터 사이의 각도(cosine similarity)가 가까울수록 의미가 비슷하다고 판단하는 구조다. 빠르고 확장성이 좋다. 하지만 이 설계는 근본적으로 손실을 감수한다. 복잡한 다단계 추론이 담긴 문단도, 단순한 정의 한 줄도, 결국 같은 차원의 점 하나가 된다. 문장의 맥락과 구조는 그 과정에서 얼마간 사라진다. "cosine similarity가 가깝다 = 의미적으로 관련 있다"는 전제가 항상 성립하는 게 아닌데도, 이 전제 위에 모든 것이 쌓인다.

이론적 context window와 실제 사용 가능한 context window 사이에도 간극이 있다. Hacker News에서 한 개발자가 공유한 경험이 이를 잘 보여준다 — 2000줄짜리 React 컴포넌트를 RAG에 통째로 붙여 넣었을 때 결과는 쓸 수 없는 수준이었고, 200줄로 잘랐을 때는 제대로 작동했다. 모델이 "처리할 수 있는" 길이와, 실제로 의미를 잘 추출하는 길이는 다르다. 토큰 수가 한계 이하라고 해서 문제가 없는 게 아니다.

데이터 유형에 따른 근본적인 취약점도 있다. 특정 날짜의 분기 실적 — "2024년 3분기 영업이익이 전분기 대비 몇 퍼센트 변했는가" 같은 시계열 질의는, vector similarity 검색의 언어로 번역되지 않는다. PDF에 이미지로 박혀 있는 표와 그래프는 텍스트 인덱싱 자체가 되지 않는다. 여러 문서를 동시에 참조해야 비로소 답이 나오는 cross-document 질의는, 하나의 유사 문서를 반환하는 구조와 애초에 어울리지 않는다. 이런 질의들은 vector similarity가 근본적으로 잘 처리하지 못하는 영역이다.

그런데 실제 현장에서 RAG 실패의 가장 큰 원인은 retrieval도 generation도 아닌 것으로 나타난다. Analytics Vidhya의 2025년 7월 분석에 따르면, RAG 실패의 80%는 chunking 단계로 거슬러 올라간다. 어떤 모델을 쓰느냐, 어떻게 검색하느냐보다, 문서를 어떻게 잘라놓았느냐가 훨씬 더 크게 결과를 결정한다는 뜻이다. 의미 단위를 무시하고 기계적으로 분할된 chunk는 아무리 좋은 embedding 모델도 살려낼 수 없다. 싸움은 입력 단계에서 이미 끝나 있다.

내가 겪은 oncall 자동화 프로젝트로 다시 잠깐 돌아오면 — 수순서 문서가 엉망이었던 것은 사실이다. 하지만 더 근본적인 문제가 있었다. "지금 이 장애에는 어떤 수순서를 적용해야 하는가"는 유사도 계산이 아니라 상황 판단의 문제였다. 같은 알람이라도 선행 조건에 따라 수순이 달라졌다. 이것은 RAG 구현의 실패가 아니라 RAG 패턴 자체의 미스매치였다 — 문제의 형태가 RAG가 잘하는 것과 달랐다.

이 한계들을 인식하고 나면, 다음 질문은 자연스럽다 — 그러면 뭘 써야 하는가?

---

## 5. 그러면 뭘 써야 하는가 — 2026년의 선택지

RAG의 한계를 확인했다고 해서 대안이 하나뿐인 것은 아니다. 2026년 현재, 선택지는 네 가지 방향으로 갈린다.

**Long context.** vector search 한 번의 비용은 약 $0.00008 수준이다. 반면 long context로 긴 문서 전체를 추론에 투입하면 쿼리당 $0.1 전후가 나온다. 여기서 오해가 자주 생기는데 — RAG도 retrieval 이후에 LLM 생성이 뒤따르므로 단순 비교는 성립하지 않는다. 중요한 것은 쓰임새의 차이다. 계약서, 보고서, 문서 비교처럼 "경계가 정해진 문서 전체를 넘나드는 추론"이 필요할 때 long context는 빛난다 — 문서를 통째로 넣고 모델이 알아서 맥락을 이어가도록 하면 된다. 단, 관련 정보가 문서의 중간에 위치할 경우 정확도가 10~20% 하락한다는 점은 알고 들어가야 한다. 모델은 앞과 뒤를 더 잘 기억한다 — primacy bias와 recency bias다.

**Hybrid (retrieval → reasoning).** vector search로 후보를 좁히고, 추려진 chunk들을 long context로 함께 추론하는 방식이다. 비용과 정확도 사이의 균형을 실질적으로 맞출 수 있는 구조로, 2025~2026년의 현장에서 가장 자주 통하는 공식이다. LinkedIn과 NewDay가 성공한 방식을 뒤로 돌아보면, 이 패턴에 가까운 설계를 하고 있었다 — 당시에 "hybrid"라는 이름을 달지 않았더라도.

**Agentic RAG.** 검색 자체를 모델이 스스로 제어하는 방향이다. Self-RAG(Asai et al., ICLR 2024)는 LLM이 직접 검색 쿼리를 생성하고, reflection token으로 검색 결과의 품질을 평가한 뒤 부족하다고 판단하면 재검색하는 구조다. Corrective RAG(CRAG)도 유사한 자기 교정 메커니즘을 갖는다. 이것은 단순한 유사도 매칭을 넘어서 — 모델이 검색의 질 자체를 능동적으로 판단한다. 아직 성숙 단계는 아니지만, "embed and search"와는 근본적으로 다른 접근이다.

**RAG를 쓰지 않는 것도 답이다.** 도구를 바꾸는 것이 항상 정답은 아니다. 때로는 문제의 형태를 다시 정의하는 것이 더 나은 선택이다. oncall 자동화 프로젝트를 접었을 때, 팀이 내린 결론은 "더 좋은 retrieval 시스템을 만들자"가 아니었다. oncall 빈도 자체를 줄이는 방향으로 에너지를 옮겼고, 그것이 맞는 판단이었다. 도구를 문제에 맞추는 것이지, 문제를 도구에 끼워 맞추는 것이 아니다.

네 선택지를 한 줄로 정리하면 이렇다: 문서 단위 추론이라면 long context, 비용과 품질의 균형이 필요하면 hybrid, 검색 품질 자체가 변수라면 Agentic RAG를 고려하라. 그리고 어느 것도 문제의 형태와 맞지 않는다면, 문제를 다시 보는 것이 가장 현명한 수다.

---

## 6. 도구가 아니라 문제를 보라

RAG는 죽지 않았다. 여전히 FAQ 챗봇, 지식 검색, 문서 Q&A 같은 영역에서는 가장 현실적인 선택이다. 하지만 만능이 아니다.

기술을 선택하기 전에 먼저 물어야 할 것은 "어떻게 구현하는가"가 아니라, "이 문제의 형태가 RAG에 맞는가"다. FAQ 성격이라면 RAG가 맞다. 문서 전체를 넘나드는 추론이라면 long context가 낫다. 검색 결과 자체의 질이 문제라면 Agentic RAG를 고려할 수 있다. 그리고 어느 도구도 딱 맞지 않는다면, 문제 자체를 줄이는 것이 정답일 수 있다.

우리 팀이 내린 결론은 결국 그것이었다 — 대응 시간을 줄이는 것보다, oncall 자체를 줄이자.

---

## 참고 자료

- [Lack of AI-Ready Data Puts AI Projects at Risk](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk) — Gartner, 2025
- [Why 72% of Enterprise RAG Implementations Fail in the First Year](https://ragaboutit.com/why-72-of-enterprise-rag-implementations-fail-in-the-first-year-and-how-to-avoid-the-same-fate/) — David Richards, ragaboutit.com
- [From zero to a RAG system: successes and failures](https://en.andros.dev/blog/aa31d744/from-zero-to-a-rag-system-successes-and-failures/) — Andros Fenollosa
- [Hacker News discussion](https://news.ycombinator.com/item?id=47499356) — andros.dev 글에 대한 댓글 스레드
- [RAG System Cost: 2026 Pricing, Build & Ops Guide](https://www.alphacorp.ai/blog/how-much-does-a-rag-system-cost-infrastructure-development-and-ongoing-expenses) — AlphaCorp
- [RAG Implementation Cost ROI Analysis](https://www.stratagem-systems.com/blog/rag-implementation-cost-roi-analysis) — Stratagem Systems (89개 프로덕션 배포 분석)
- [NewDay builds a Generative AI based Customer Service Agent Assist with over 90% accuracy](https://aws.amazon.com/blogs/machine-learning/newday-builds-a-generative-ai-based-customer-service-agent-assist-with-over-90-accuracy/) — AWS Machine Learning Blog
- [Retrieval-Augmented Generation with Knowledge Graphs for Customer Service Question Answering](https://arxiv.org/html/2404.17723v1) — LinkedIn 연구팀, arXiv 2024
- [Enterprise RAG Failures: The 5-Part Framework](https://www.analyticsvidhya.com/blog/2025/07/silent-killers-of-production-rag/) — Analytics Vidhya, 2025
- [Is RAG Still Relevant in 2026?](https://konstantinos.top/blog/37/) — RAG vs Long Context 비교
- [RAG vs Large Context Window: Real Trade-offs for AI Apps](https://redis.io/blog/rag-vs-large-context-window-ai-apps/) — Redis
- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511) — Asai et al., ICLR 2024
