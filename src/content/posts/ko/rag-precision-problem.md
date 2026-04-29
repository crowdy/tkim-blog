---
title: 'RAG의 정밀도가 낮아서 고민하는 회사에게'
description: '"우리도 RAG 해봤는데… 생각보다 별로더라고요."'
pubDate: 2026-03-05T00:00:00.000Z
lang: ko
pairSlug: 'rag-precision-problem'
draft: false
sourceDir: posted
---
# RAG의 정밀도가 낮아서 고민하는 회사에게

> "우리도 RAG 해봤는데… 생각보다 별로더라고요."

요즘 AI 도입을 검토하는 기업의 회의실에서 심심치 않게 들리는 말이다. LLM이 처음 등장했을 때, 많은 회사들은 RAG(Retrieval-Augmented Generation)를 마법 같은 해결책으로 봤다. 사내 문서를 벡터 DB에 넣고, 질문이 들어오면 관련 문서를 꺼내서 LLM에게 건네주면 된다. 개념은 단순하고, 데모는 인상적이다. 그래서 PoC를 만든다. 경영진이 감탄한다. 예산이 나온다. 그런데 실제 운영에 올리는 순간 문제가 시작된다. 정확도가 기대에 못 미치고, 사용자들은 하나둘 시스템을 외면한다.

이 현상은 한 회사만의 이야기가 아니다. 전 세계적으로 동시에 벌어지고 있는 일이다.

---

## 장밋빛 기대와 냉혹한 현실 사이

숫자부터 보자.

MIT NANDA 이니셔티브가 2025년 발표한 "GenAI Divide: State of AI in Business" 리포트는 충격적이다. **기업의 GenAI 파일럿 프로젝트 중 95%가 측정 가능한 비즈니스 성과를 내지 못하고 있다.** 150명의 임원 인터뷰, 350명의 직원 설문, 300건의 공개 AI 배포 사례를 분석한 결과다. 보고서는 실패의 핵심 원인으로 "데이터 준비 미흡과 RAG 파이프라인 통합 부실"을 명시적으로 지목했다.

Gartner는 2024년 7월 경고를 날렸다. **2025년 말까지 GenAI 프로젝트의 30%가 PoC 단계에서 폐기될 것**이라고. 이유는 낮은 데이터 품질, 불충분한 리스크 관리, 비용 증가, 불명확한 비즈니스 가치다. 2025년 2월에는 더 강한 예측을 추가했다. AI 준비가 안 된 데이터를 가진 AI 프로젝트의 **60%가 2026년까지 폐기**될 거라고. Gartner가 248명의 데이터 관리 리더를 조사한 결과, **63%의 조직이 AI를 위한 적절한 데이터 관리 체계를 갖추지 못했거나 갖췄는지조차 모른다**고 답했다. RAG의 전제 조건인 '잘 정리된 데이터'가 대부분의 기업에 없다는 이야기다.

NTT DATA의 2024년 글로벌 GenAI 리포트는 더 직접적이다. **GenAI 배포 노력의 70~85%가 목표 ROI를 달성하지 못하고 있다.** S&P Global Market Intelligence가 1,000개 이상의 기업을 조사한 결과, 대부분의 AI 이니셔티브를 폐기한 회사의 비율이 **2024년 17%에서 2025년 42%로 급증**했다. 2년도 안 되어 2.5배로 늘어난 것이다.

McKinsey의 2025년 AI 현황 보고서는 또 다른 단면을 보여준다. **AI를 하나 이상의 비즈니스 기능에 사용하는 조직은 78%**에 달한다. 그러나 **AI가 기업 EBIT에 측정 가능한 영향을 미쳤다고 응답한 비율은 39%**에 불과하다. 그것도 대부분 EBIT의 5% 미만이다. PoC는 넘쳤지만 실질적 성과는 드물다.

RAG 시스템으로 좁혀도 결과는 마찬가지다. 여러 산업 분석에 따르면 **엔터프라이즈 RAG 시스템의 73%는 프로덕션에서 기대한 성과를 내지 못한다.** 첫 1년 안에 실패하는 비율은 72%에 달한다. 엔터프라이즈 사용자가 요구하는 98% 이상의 정확도에 도달하려면 90%에서 시작해도 수개월의 전담 엔지니어링이 필요하다.

---

## 전 세계 기업들이 겪고 있는 구체적인 사례들

### 법률 AI: "환각 없음"이라는 약속이 무너지다

Thomson Reuters의 Westlaw AI-Assisted Research와 LexisNexis의 Lexis+ AI는 모두 RAG 기술을 기반으로 "환각 없는(hallucination-free)" AI라고 공격적으로 마케팅했다. 검색 기반이니 정확하다는 논리였다.

스탠퍼드 대학교 RegLab과 HAI 연구팀이 2024년 이 주장을 사전 등록 실증 연구로 검증했다. 결과는 참담했다.

- **Westlaw AI-Assisted Research**: 정확도 **42%**, 환각률 **33%**
- **Lexis+ AI**: 정확도 **65%**, 환각률 **17%**
- 범용 LLM(ChatGPT, Llama, Claude): 법률 쿼리 환각률 **58~80%**

RAG가 환각을 줄인 건 맞다. 그러나 마케팅이 주장한 "환각 없음"과는 거리가 멀었다. 스탠퍼드 연구팀은 논문 제목에 "Hallucination-Free?" 라는 물음표를 달았다. 더 심각한 발견도 있었다. RAG는 검색된 문서가 실제로 질문에 답하지 못하는 경우에도 모델이 "모르겠습니다"라고 말하는 대신, **오히려 더 자신 있게 틀린 답을 만들어낸다**는 것이다. 검색된 문서가 존재한다는 사실 자체가 모델의 자신감을 끌어올리는 것이다. Google 연구팀도 같은 현상을 "불충분한 컨텍스트(insufficient context)" 문제로 정리했다.

DoNotPay라는 스타트업의 사례는 더 극단적이다. "세계 최초 로봇 변호사"를 자처하며 AI가 완벽한 법적 문서를 생성하고 변호사 없이 소송을 도울 수 있다고 주장했다. FTC는 2025년 2월 최종 제재를 내렸다. 회사는 실제로 자사 AI가 인간 변호사 수준으로 작동하는지 **테스트한 적이 없었고**, 연방·주 법률 데이터베이스를 기반으로 훈련하지도 않았다. **19만 3천 달러의 제재금**과 함께 AI 변호사 관련 마케팅이 금지됐다.

### 고객 서비스: Klarna의 교훈

스웨덴 핀테크 기업 Klarna의 이야기는 AI 과신의 교과서적 사례가 됐다.

2024년 초, CEO Sebastian Siemiatkowski는 자사 AI 챗봇이 **700명의 정규직 상담사에 해당하는 업무를 처리하고 있다**고 발표했다. "AI는 이미 인간이 하는 모든 일을 할 수 있다"는 발언도 했다. 언론은 이를 AI 혁명의 신호탄으로 보도했다.

1년이 채 지나지 않아 회사는 인간 상담사 채용을 재개했다. CEO는 직접 인정했다.

> "비용이 너무 지배적인 평가 기준이 되다 보니, 결국 품질이 낮아졌습니다. 우리가 너무 멀리 갔습니다."

문서화된 문제들: 단순한 FAQ 질문에도 최대 **20초의 응답 지연**, 브랜드 보이스와 동떨어진 Generic한 답변("혼란을 드려서 죄송합니다"), 복잡하거나 감정적인 고객 상황 처리 불능. 챗봇의 결말은 결국 인간 상담사에게 연결하는 것이었다. 비용 절감은 없었고 고객 경험만 나빠졌다.

### 항공사: 잘못된 답이 법적 책임이 되다

캐나다 Air Canada의 AI 챗봇은 고객 Jake Moffatt에게 항공편 탑승 이후에도 사별 할인 요금을 소급 적용받을 수 있다고 안내했다. 실제 정책과 정반대였다. Air Canada는 법정에서 "챗봇은 별도의 법적 실체"라고 주장했다. BC 민사조정위원회는 이를 "놀라운 주장"이라며 기각했고, Air Canada에 법적 책임을 부과했다.

이 사건은 AI 챗봇 책임에 관한 대표적 판례가 됐다. 챗봇이 틀린 말을 해도 회사가 전적으로 책임진다.

### 기업 내부 지식 관리: 포기한 회사들의 이야기

RAG 기반 문서 어시스턴트를 Cloudflare, Stripe 등 200개 이상의 기술 기업에 제공하는 kapa.ai는 고객사 분석을 공개했다.

- **대형 통신사**: 1년 반 동안 AI 문서 어시스턴트를 개발하다 **완전히 포기**
- **엔터프라이즈 소프트웨어 기업**: 6개월 투자 후 환각률을 **7% 이하로 내리지 못해 폐기** (내부 기준 미달)
- **Fortune 500 기술 기업**: 한 엔지니어가 파트타임으로 관리, 1년 방치 후 문서 변화로 **시스템이 자연 퇴화**

kapa.ai의 핵심 결론: 내부에서 RAG 지식 베이스를 구축한 대부분의 회사가 **6~18개월 내에 폐기하거나 교체**한다. 90% 정확도에서 엔터프라이즈가 요구하는 98% 이상까지 올리는 데 수개월의 전담 엔지니어링이 필요하다. 그런데 대부분의 팀은 이 현실을 사전에 모른다.

Microsoft SharePoint를 지식 소스로 사용하는 Copilot Studio도 유사한 문제를 겪고 있다. Microsoft 공식 Q&A 포럼에는 "일관되게 낮은 품질의 응답", "쿼리를 직접 다루지 않는 부정확한 답변" 등의 불만이 쌓여 있다. 원인은 URL 깊이 제한, 콘텐츠 필터로 인한 필요 내용 제거, 권한 설정 불일치로 인한 검색 오류다.

### 의료·헬스케어: 생명과 직결된 정밀도

2024년 Mayo Clinic 연구는 ChatGPT, Microsoft Bing Chat, Google Bard가 신장 질환 임상 질문에 대해 **40% 미만의 정확도**를 보인다는 결과를 발표했다. 미국 43개 주요 의료 시스템을 조사한 결과, **77%가 미성숙한 AI 도구를 배포의 최대 장벽**으로 꼽았다. ECRI Institute의 2026년 건강기술 위험 보고서는 **의료 현장에서의 AI 챗봇 오용을 올해 1위 환자 안전 위험**으로 지정했다.

Mount Sinai의 2025년 연구는 더 심각한 문제를 짚었다. RAG 기반 시스템에 잘못된 의학 정보가 담긴 문서가 들어오면, 시스템은 그 오정보를 교정하는 게 아니라 **오히려 확신 있게 증폭시킨다**는 것이다.

### 금융 서비스: 단 하나의 오류도 허용되지 않는 환경

Goldman Sachs는 2024년 6월 "Gen AI: Too Much Spend, Too Little Benefit?"이라는 제목의 보고서를 발간했다. 수석 주식 리서치 애널리스트 Jim Covello는 썼다.

> "AI 기술은 지나치게 비싸다. 비용을 정당화하려면 기술이 복잡한 문제를 해결할 수 있어야 하는데, 그렇게 설계되어 있지 않다."

금융 규제 준수 영역에서의 RAG 환각은 단순한 불편함이 아니다. 준수 챗봇이 "해당 거래 유형은 AML 보고 의무 없음"이라고 잘못 안내하거나, 시장 분석 도구가 존재하지 않는 보도자료를 근거로 특정 은행이 실적을 미달했다고 보고하는 것은 법적 리스크로 직결된다. 금융안정위원회(FSB), 미국 GAO, FINOS 모두 RAG 환각이 금융 서비스에 미치는 구체적 리스크를 공식 경고로 발표했다.

---

## "그럼 문서 전체를 컨텍스트에 넣으면 되지 않나?"

RAG 정밀도 문제에 직면한 일부 기업들이 선택하는 대안이 있다. Gemini 1M 토큰, Claude 200K 토큰처럼 Large Context Window 모델에 문서 전체를 집어넣는 것이다. 검색 자체를 없애버리자는 발상이다. 개념적으로 매력적이다.

하지만 비용이 문제다.

### 현실적인 비용 계산

CopilotKit의 분석에 따르면 같은 질문에 대해:
- **Large Context 방식** (전체 문서 컨텍스트): 쿼리당 약 **$3.00**
- **RAG 방식** (관련 청크만): 쿼리당 약 **$0.03**
- **비용 차이: 100배**

Redis의 엔터프라이즈 스케일 시뮬레이션 결과:
- 1,000명 직원, 하루 5회 질의 시
- Large Context: **하루 $15,000** (연간 약 54억 원)
- RAG: **하루 $150** (연간 약 5,400만 원)

실제 측정 데이터에서도 차이는 뚜렷하다. 같은 엔터프라이즈 워크로드를 비교하면, RAG는 쿼리당 평균 62,000 토큰을, Long Context는 평균 400,000 토큰을 처리한다(약 26배 차이). 응답 속도는 RAG가 약 **1초**, Long Context가 **30~60초**다.

자료가 수백만 건인 기업이라면 Large Context는 아예 불가능한 방식이다. 기술적으로 1M 토큰을 지원하는 모델도 실제로는 그 이전에 성능이 저하된다. Databricks의 연구에 따르면 Llama-3.1-405B는 32K 토큰 이후부터, GPT-4는 64K 토큰 이후부터 성능이 떨어지기 시작한다. 이른바 **"Lost in the Middle" 현상** — 컨텍스트 중간에 위치한 정보는 처음이나 끝에 있는 정보보다 모델이 훨씬 더 자주 놓친다. 정확성이 10~20 포인트 이상 떨어질 수 있다.

프롬프트 캐싱(Claude 90% 할인, Gemini 75% 할인)을 활용하면 동일 문서 반복 쿼리에서 비용을 크게 줄일 수 있다. 하지만 문서가 자주 바뀌거나 쿼리 패턴이 다양하면 캐싱 효과는 제한적이다. 결국 Large Context는 자료가 정적이고 소량이며 쿼리 빈도가 낮은 특수한 경우에만 현실적인 선택이다.

---

## 이 문제, 한국과 아시아도 예외가 아니다

ITWorld Korea는 2025년 "기업용 RAG는 왜 실패하는가"라는 심층 분석을 게재했다. 한국 기업들이 특히 어려움을 겪는 이유로 이렇게 짚었다.

상용 RAG 패키지 소프트웨어가 한국의 복잡한 레거시 데이터 환경을 충분히 처리하지 못한다. 문서 명명 규칙의 불일치, 비정형 한국어 레거시 문서, 인코딩 오류가 임베딩을 왜곡시킨다. 그리고 가장 핵심적인 지적: **실제 어려움은 프롬프트 설계나 모델 선택에 있지 않다. 데이터 수집·정제, 검색 최적화, 메타데이터 관리, 버전 관리, 인덱싱, 성능 평가, 장기 거버넌스에 있다.** 대부분의 팀은 모델을 고르는 데 시간을 쓰고, 데이터 파이프라인을 경시한다.

SK하이닉스는 AWS Korea 기술 블로그를 통해 내부 RAG 플랫폼 성능 평가 결과를 공개했다. RAG 추론 레이어(임베딩 + 지식 검색)를 추가하면 첫 토큰 응답 시간(TTFT)이 **30~40% 증가**한다는 점을 발견했다. 레이턴시 민감한 프로덕션 환경에서 이는 무시할 수 없는 변수다.

KT Cloud 기술 블로그는 더 직접적인 사례를 소개했다. 정제되지 않은 로그를 RAG 소스로 활용한 챗봇이 완전히 틀린 답변을 반환했다. 인코딩 오류를 수정하고 광고·각주 같은 불필요한 텍스트를 제거하는 전처리가 필수임을 강조했다. 고객 지원 문서 파싱 오류를 방치한 한 글로벌 기업은 RAG 챗봇 도입 후 **고객 만족도가 27% 하락**한 뒤에야 데이터 파이프라인을 수정했다.

Samsung SDS는 내부 GenAI 해커톤에서 기업 맞춤형 RAG 적용 사례를 공개했고, Skelter Labs는 RAG 도입률이 2023년 31%에서 2024년 51%로 급증했지만 실제 배포 성공률은 기대에 크게 미치지 못한다고 지적했다.

아시아 전체를 봐도 같은 패턴이 보인다. Deloitte의 2024년 아태지역 GenAI 조사에 따르면 **기업의 약 75%가 자사 직원들의 GenAI 기대 수준에 미치지 못하고 있다.** 일본은 상황이 더 심각하다. 정부의 적극적인 AI 투자에도 불구하고 **기업의 33%만이 초기 도입 단계에서 측정 가능한 ROI를 보고했다.** 아태지역의 가장 큰 문제는 AI 자체가 아니라는 분석도 있다. 국가마다 다른 규제, 비표준화된 레거시 시스템, 데이터 형식 불일치 등 **단편화(fragmentation)**가 RAG 배포를 더욱 어렵게 만든다.

---

## 왜 RAG는 프로덕션에서 무너지는가

수백 건의 엔터프라이즈 배포 사례를 분석한 arxiv 논문 "Seven Failure Points When Engineering a Retrieval Augmented Generation System"(2024, IEEE/ACM)은 RAG 실패 지점을 7가지로 분류한다.

1. **지식 베이스에 답이 없음** — 문서 범위가 쿼리를 커버하지 못함
2. **검색 실패** — 관련 문서가 있는데도 검색이 놓침
3. **컨텍스트 윈도우 한계** — 검색된 내용이 너무 많거나 적음
4. **LLM이 틀린 답변 생성** — 올바른 문서를 받았는데도 틀린 답
5. **출력 형식 오류** — 원하는 형식으로 답하지 못함
6. **모호한 답변** — 애매하고 불완전한 응답
7. **불완전한 답변** — 핵심을 빠뜨린 응답

이 논문이 강조하는 가장 중요한 포인트는 이것이다. **RAG 시스템의 진짜 검증은 운영 중에만 가능하다.** 스테이징 환경에서 0.95 recall을 보이던 시스템이 프로덕션에서는 corpus가 50배로 늘어나고 동시 쓰기가 발생하면서 0.71로 떨어질 수 있다. 그런데도 레이턴시는 정상이기 때문에 아무런 경보가 울리지 않는다. 팀이 레이턴시는 모니터링하지만 **검색 품질을 모니터링하지 않기 때문**이다.

데이터 품질 문제도 있다. 기업 내부 데이터의 80% 이상이 PDF, 이미지, 스프레드시트 등 비정형 형식이다. 이를 텍스트로 변환하는 과정에서 품질 저하가 발생한다. 문서가 많아질수록 오히려 검색 정밀도가 떨어지는 "오염(pollution)" 현상도 흔하다. 그리고 기업의 지식은 계속 변한다. 제품 사양, 규정, 조직 구조가 바뀌는데, RAG 인덱스가 이를 따라가지 못하면 시스템은 구식 정보로 자신 있게 답한다.

---

## 실제로 효과가 있는 해결책들

희망적인 소식이 있다. 성과를 내고 있는 기업들이 있고, 그들이 사용하는 방법은 명확하다. ROI 기준으로 정리하면 다음과 같다.

### 1단계: 하이브리드 검색 — 먼저 해야 할 것

RAG의 검색은 크게 두 가지 방식으로 나뉜다.

**벡터 검색(의미 기반)** 은 텍스트를 임베딩 모델로 숫자 벡터로 변환하고, 쿼리 벡터와 문서 벡터 사이의 코사인 유사도로 관련 문서를 찾는다. "강아지"와 "개"를 비슷한 의미로 인식하는 게 장점이다. 반면 정확한 숫자, 제품 코드, 고유명사처럼 표현이 달라지면 안 되는 키워드에는 약하다.

**BM25(키워드 기반 희소 검색)** 는 전통적인 통계 기반 텍스트 검색 알고리즘이다. 쉽게 말하면 세 가지 원칙으로 동작한다. 첫째, 찾는 단어가 문서에 많이 나올수록 점수가 높아진다. 둘째, 문서가 길어서 자연스럽게 단어가 많이 등장하는 것은 길이 보정으로 조정한다. 셋째, "이", "그", "의"처럼 모든 문서에 흔한 단어는 가중치가 낮다. 임베딩 없이 키워드 자체를 기준으로 찾기 때문에, "2024년 3분기 영업이익"처럼 정확한 숫자와 날짜가 중요한 쿼리에서 벡터 검색보다 월등하다.

두 방식은 서로의 약점을 보완한다. 이것을 함께 실행하고 RRF(Reciprocal Rank Fusion)로 결과를 통합하는 것이 **하이브리드 검색**이다. RRF는 각 방식의 원시 점수를 직접 비교하는 대신 "몇 번째로 좋은 결과인가"라는 순위 위치만으로 합산하기 때문에 별도의 점수 정규화 없이 안정적으로 작동한다.

엔터프라이즈 배포 사례에서 일관되게 **15~30%의 정밀도 향상**이 보고된다. Anthropic의 자체 실험에서도 임베딩 + BM25 조합은 임베딩 단독보다 일관되게 우월했다. 구현 난이도 대비 효과가 가장 크기 때문에 첫 번째로 적용해야 할 기법이다.

### 2단계: Re-ranking — 두 번째 필터를 달아라

초기 검색(하이브리드 포함)으로 상위 20~100개의 후보를 가져온 뒤, Cross-Encoder나 ColBERT 같은 별도 Re-ranking 모델이 쿼리와 각 문서를 함께 보며 관련성 점수를 재산정한다. 초기 검색이 "일단 많이 가져오기"라면, Re-ranking은 "진짜 필요한 것만 골라내기"다.

**"시간이 더 걸리지 않나?"** 맞다. 하지만 실제로는 허용 가능한 수준이다. 초기 하이브리드 검색이 수십 ms로 후보를 좁혀오면, Re-ranker는 그 좁혀진 후보에만 적용되므로 추가 시간은 **50~200ms** 수준이다. 전체 파이프라인은 여전히 1~2초 이내에 완료된다. 오히려 Re-ranking 없이 초기 검색 결과를 그대로 LLM에 넘기면, LLM이 관련 없는 문서까지 처리하느라 **더 많은 토큰을 소비하고 정확도도 낮아진다.** Re-ranking의 수백 ms가 LLM 처리 시간(수초)보다 훨씬 짧기 때문에 체감 속도에는 거의 영향이 없다.

측정된 성과는 인상적이다. SQuAD 벤치마크에서 **81.22% → 92.35%** (+11 포인트), Llama2 리뷰 데이터에서 hit-rate **58.63% → 75.00%** (+16 포인트). Azure AI는 쿼리 재작성과 의미론적 랭커를 결합해 NDCG@3 기준 **+22 포인트** 향상을 달성했다(이전 프로덕션 랭커 대비 약 2배). Re-ranking은 일반적으로 **10~25%의 추가 정밀도 향상**을 가져다준다.

프로덕션에서 자주 사용하는 Re-ranker는 TinyBERT 기반 Cross-encoder(빠름, 저렴), Cohere Rerank API(정확도 높음), ColBERT(레이턴시와 정확도의 균형)다.

### 3단계: 청킹 전략 재설계

NVIDIA가 5개 문서 데이터셋에서 측정한 결과, **청킹 전략 하나만으로 recall이 최대 9 포인트 차이**가 난다. 다른 변수는 동일한데도 그렇다.

고정 길이 청킹의 문제는 단락이나 문장 중간에서 자른다는 것이다. 의미 단위를 끊어버리면 임베딩 품질이 떨어진다. 의미론적 청킹(semantic chunking)은 문장 간 임베딩 코사인 거리를 보고 의미적 경계에서 자른다. 임상 의사결정 지원 연구에서 고정 청킹 **50%** vs 의미론적 청킹 **87%**, 즉 **+37 포인트**의 정확도 차이가 나타났다.

계층적 청킹(Hierarchical Chunking)도 효과적이다. 검색에는 작은 자식 청크(100~500 토큰)를 사용해 정밀도를 높이고, LLM에게 전달할 때는 더 큰 부모 청크(500~2000 토큰)를 제공해 충분한 맥락을 보장한다. LangChain의 ParentDocumentRetriever가 이 방식을 구현한다.

Anthropic이 2024년 말 발표한 **Contextual Retrieval**은 한 단계 더 나간다. 각 청크를 임베딩하기 전에 LLM이 해당 청크가 전체 문서에서 어떤 맥락인지를 설명하는 약 100토큰짜리 요약을 앞에 붙인 뒤, **요약문 + 원본 청크 전체를 하나의 텍스트로 합쳐서 임베딩**한다.

예를 들어 이런 식이다:

> **[맥락 요약]** "이 문단은 2024년 3분기 실적 발표 보고서에서 전년 동기 대비 영업이익 변화를 설명하는 부분입니다."
> **[원본 청크]** "3분기 영업이익은 전년 동기 대비 12% 증가한 450억 원을 기록했으며..."

요약을 별도로 저장하거나 따로 처리하는 게 아니다. 두 텍스트를 이어붙인 전체를 **하나의 벡터로 임베딩**한다. 원본 청크만 임베딩하면 "3분기 영업이익 12% 증가"라는 문장이 어느 회사의, 어느 연도의 이야기인지 벡터가 모른다. 맥락 요약을 앞에 붙이면 임베딩이 "이 청크가 문서 전체에서 어떤 위치의 정보인지"를 포함한 채 만들어지기 때문에 검색 정밀도가 높아진다.

결과는 명확했다. Contextual Embeddings 단독으로 검색 실패율이 **35% 감소**, BM25와 Re-ranking까지 결합하면 **67% 감소**다.

### 4단계: HyDE로 쿼리를 변환하라

사용자는 짧고 모호하게 질문한다. 문서는 길고 구체적으로 작성되어 있다. 이 두 가지를 직접 비교하면 당연히 미스매치가 생긴다.

HyDE(Hypothetical Document Embeddings)는 이 문제를 우회한다. 흐름을 보면 이해가 빠르다.

```
1. 사용자 쿼리: "환불 정책이 어떻게 되나요?"
        ↓
2. LLM이 가상 답변 문서 생성:
   "환불은 구매 후 30일 이내에 가능하며, 고객센터를 통해
    신청할 수 있습니다. 처리는 영업일 기준 5일이 소요됩니다..."
        ↓
3. 이 가상 문서를 임베딩 → 벡터 검색 실행
        ↓
4. 실제 문서 청크들이 반환됨
        ↓
5. 반환된 실제 문서를 LLM에게 전달 → 최종 답변 생성
```

핵심은 **검색에는 가상 문서의 벡터를 쓰고, LLM에게는 실제 검색된 문서를 전달한다**는 것이다. 가상 문서 자체가 최종 답변이 되는 게 아니다. 가상 문서는 단지 "이 질문에 어울리는 실제 문서를 찾기 위한 미끼" 역할만 한다.

왜 효과적인가? 짧은 사용자 쿼리("환불 정책")와 문서 청크("환불은 구매 후 30일 이내 가능하며…") 사이의 어휘·길이·스타일 불일치를 가상 문서가 메워주기 때문이다. 특히 한국어처럼 표현 다양성이 높은 언어에서 효과가 크다.

벤치마크 결과: "쿼리 직접 사용" 대비 **+14 포인트** 정확도 향상. 파인튜닝 없이 제로샷으로 도메인 특화 검색기와 경쟁할 수 있는 수준이다.

### 5단계: GraphRAG — 관계가 중요한 쿼리에

"우리 회사의 올해 3분기 영업이익이 전년 동기 대비 얼마나 변했나요?" 같은 질문은 벡터 검색으로 잘 처리되지 않는다. 여러 문서에서 수치를 찾고 계산까지 해야 한다.

일반 RAG는 문서를 청크로 자르고 각 청크를 독립적으로 저장한다. "삼성전자 2024년 3분기 실적"과 "갤럭시 S24 출시 발표"는 서로 다른 청크로 저장되어 연결고리가 없다.

GraphRAG는 다르게 작동한다. Microsoft가 2024년 오픈소스로 공개한 이 방식은 문서를 읽으면서 **엔티티(사람, 회사, 제품, 개념)와 관계를 추출해 지식 그래프를 구축**한다.

```
문서 분석 과정:
1. 엔티티 추출: "삼성전자", "갤럭시 S24", "3분기 영업이익"
2. 관계 추출: "삼성전자 → 출시 → 갤럭시 S24"
                "삼성전자 → 3분기 영업이익 → 450억"
3. 연결이 많은 엔티티들을 커뮤니티(클러스터)로 묶기
4. 각 커뮤니티의 요약문 생성 및 저장
```

쿼리가 들어오면 그래프를 탐색한다. "삼성전자 3분기 실적과 신제품 출시의 관계"를 묻는 질문은 표준 RAG에서 두 개의 독립된 청크를 우연히 모두 검색해야만 답할 수 있다. GraphRAG는 지식 그래프에서 "삼성전자" 노드를 따라가면 관련 엔티티들이 연결되어 있으므로 구조적으로 답을 조합할 수 있다.

FalkorDB의 2025년 벤치마크 결과는 드라마틱하다.

| 쿼리 유형 | 표준 RAG | GraphRAG |
|---|---|---|
| 단순 사실 질문 | 94% | 95% |
| 복잡한 다단계 추론 | 34% | 91% |
| 스키마 기반 (KPI, 예측값) | **0%** | **90%+** |
| 수치 추론 | ~50% | 100% |
| 시간적 추론 | 50% | 83% |

스키마 기반 쿼리에서 표준 RAG가 **0%**인 반면 GraphRAG는 **90% 이상**이라는 점이 결정적이다. 엔터프라이즈의 많은 중요한 질문들이 바로 이 영역에 해당한다.

**GraphRAG는 2026년 현재도 유효한가?** 그렇다. 단, "모든 경우에 쓰는 기본 도구"는 아니다. 그래프 구축 자체에 비용이 들고, 쿼리 레이턴시도 표준 RAG보다 약 **2.4배** 길다. 2025년 이후로는 Microsoft GraphRAG보다 가볍고 빠른 변형들(HippoRAG, LightRAG)도 나왔다. 현실적인 선택은 단순 사실 질문에는 표준 RAG, 관계·다단계 추론이 필요한 쿼리에는 GraphRAG로 라우팅하는 하이브리드 아키텍처다.

| 상황 | 추천 |
|---|---|
| 단순 FAQ, 빠른 응답 | 표준 RAG |
| KPI 비교, 수치 분석, 여러 문서 연결 | GraphRAG |
| 그래프 구축 비용이 부담스러운 경우 | HippoRAG (GraphRAG 대비 10~20배 저렴) |

### 6단계: 도메인 특화 임베딩 파인튜닝

범용 임베딩 모델(예: OpenAI text-embedding-ada-002)은 일반 인터넷 텍스트로 훈련됐다. 의학 약어 "MI"가 심근경색(Myocardial Infarction)인지 기계 학습(Machine Intelligence)인지 구별하지 못할 수 있다. 법률·금융·제조 등 전문 도메인에서 이 문제는 심각하다.

중요한 점을 짚고 넘어가자. 이것은 **새 임베딩 모델을 처음부터 만드는 게 아니다.** bge-base, E5 같은 기존 범용 임베딩 모델을 도메인 데이터로 "미세 조정(fine-tuning)"해서 도메인 특화 모델로 바꾸는 것이다.

```
[1단계] 도메인 문서에서 LLM으로 합성 QA 쌍 생성
        예: "이 문단에 대한 질문 5개를 만들어줘"
        → (질문, 답변이 있는 청크) 쌍을 수천 개 만듦

[2단계] 범용 임베딩 모델을 그 QA 쌍으로 파인튜닝
        → 모델이 해당 도메인의 어휘, 약어, 관계를 학습

[3단계] 파인튜닝된 모델로 기존 벡터 DB를 재임베딩
        → 검색 정밀도 향상
```

처음부터 만드는 것이 아니기 때문에 데이터와 비용이 상대적으로 적게 든다. 불과 **6,300개의 합성 학습 샘플로도 ~7%의 검색 향상**이 가능하다.

Databricks의 Instructed Retriever는 이 접근법으로 전통적인 RAG 대비 **최대 70% 향상**을 달성했다(금융, 이커머스, 헬스케어). 도메인 특화 데이터가 많을수록 효과는 커진다.

### 7단계: 평가 없이는 개선도 없다

성과를 내고 있는 팀과 그렇지 못한 팀의 가장 큰 차이는 **지속적인 평가 체계**다.

RAGAS(Retrieval Augmented Generation Assessment)는 현재 RAG 평가의 사실상 표준이다. 레퍼런스 없이 LLM 판사가 4가지 차원을 자동 평가한다. **Faithfulness**(답변이 검색 내용에 근거하는가), **Answer Relevance**(답변이 질문에 답하는가), **Context Precision**(검색된 컨텍스트가 관련 있는가), **Context Recall**(필요한 정보가 모두 검색됐는가).

프로덕션 모니터링에는 TruLens가 유용하다. TruLens가 정의한 **"RAG 삼각형(RAG Triad)"** 은 세 가지 관계를 각각 독립적으로 평가한다.

```
          사용자 질문
              ↓           ← ① Contextual Relevance
    [검색] → 컨텍스트 청크들
              ↓           ← ② Groundedness
    [생성] → 최종 답변
              ↑
              └─── ③ Answer Relevance ──→ 사용자 질문
```

- **① Contextual Relevance (컨텍스트 관련성)**: "질문 ↔ 검색된 컨텍스트" 관계를 평가한다. 검색기가 진짜 필요한 문서를 가져왔는가? 이 점수가 낮으면 청킹·임베딩·검색 방식을 수정해야 한다.

- **② Groundedness (근거성)**: "검색된 컨텍스트 ↔ 최종 답변" 관계를 평가한다. 답변이 검색된 내용에만 근거하는가, 아니면 모델이 임의로 지어냈는가? 이것이 낮으면 환각(hallucination)이 발생 중이다.

- **③ Answer Relevance (답변 관련성)**: "질문 ↔ 최종 답변" 관계를 평가한다. 답변이 실제로 질문에 답하고 있는가? 이것이 낮으면 컨텍스트는 잘 찾았지만 LLM이 엉뚱한 내용을 생성하는 중이다.

세 가지를 함께 보는 이유는 **어느 단계에서 문제가 생겼는지 진단**하기 위해서다. Groundedness는 높은데 Answer Relevance가 낮다면 프롬프트 설계 문제다. Contextual Relevance가 낮고 나머지도 따라서 낮다면 검색 자체를 고쳐야 한다.

프로덕션 기준: 규제 영역(법률, 의료, 금융) ≥ 0.85, 일반 지식 업무 ≥ 0.75. 이 숫자가 없으면 시스템이 얼마나 나쁜지조차 모르는 상태로 운영하는 것이다.

---

## 성과를 낸 기업들의 실제 이야기

### Morgan Stanley: 검색 가능 문서를 7천 개에서 10만 개로

Morgan Stanley는 10만 건 이상의 독점 금융 문서에서 어드바이저 질문에 답하는 시스템이 필요했다. 초기 시스템은 약 7,000개 문서에서만 효과적이었고, 문서 recall은 **20%**였다. 어드바이저들은 시스템을 신뢰하지 않았다.

OpenAI와 함께 평가 주도 최적화를 반복적으로 진행했다. 요약 평가, 프롬프트 엔지니어링, 청킹 전략 개선이 핵심이었다. 결과: 문서 recall **80%로 향상**, 전체 10만 개 문서 코퍼스 커버, **어드바이저 팀의 98% 이상이 실제로 시스템을 사용**하게 됐다.

### FalkorDB: 스키마 쿼리 정확도 0% → 90%+

2023년 Diffbot 벤치마크 기준 표준 벡터 RAG의 전체 정확도는 56.2%였다. 스키마 기반 쿼리(KPI, 예측값 등)는 **0%**였다. 2025년 FalkorDB GraphRAG SDK를 적용한 결과 전체 **90%+** 달성.

### Droptica: 2단계 평가로 정확도 40% 향상

ProjektMagazin을 위한 전문 지식 관리 RAG 챗봇의 초기 버전은 "그럴듯하지만 틀린 답변"으로 사용자 신뢰를 잃었다. 광범위하게 검색한 뒤 LLM이 각 청크의 관련성을 재평가하는 2단계 문서 평가를 도입한 후 **정확도 40% 향상**.

---

## 결론: RAG는 틀리지 않았다, 하지만 생각보다 어렵다

"RAG는 왜 이렇게 어렵냐"는 질문에 대한 솔직한 답은 이것이다. **RAG는 하나의 기술이 아니라 여러 컴포넌트가 맞물린 시스템이기 때문이다.** 임베딩 모델, 청킹 전략, 검색 방식, Re-ranking, 데이터 품질, 인덱스 최신성, 평가 체계 — 이 중 하나라도 잘못되면 전체 정밀도가 무너진다.

그리고 실패의 핵심은 거의 항상 같은 곳에 있다. 데이터다. RAND Corporation 연구는 AI 프로젝트의 80%가 실패하는 이유 중 하나로 "AI가 해결하기에 너무 어려운 문제에 AI를 적용함"을 꼽는다. 그런데 기업 내부 데이터는 대개 깨끗하게 정리되어 있지 않다. 일관성 없고, 중복되고, 흩어져 있다. "Garbage in, garbage out"은 RAG에서도 그대로 적용된다.

전 세계적으로 같은 패턴이 반복되고 있다. 데모는 잘 된다. PoC도 인상적이다. 그런데 실제 프로덕션, 실제 사용자, 방대한 실제 데이터가 들어오면 문제가 시작된다. 한국도, 일본도, 미국도 마찬가지다.

그렇다고 포기하기에는 이르다. 방향은 명확하다. 하이브리드 검색으로 시작해 Re-ranking을 추가하고, 청킹 전략을 개선하고, RAGAS로 지속적으로 측정하라. 도메인 특화 데이터가 있다면 임베딩을 파인튜닝하고, 관계형 쿼리가 많다면 GraphRAG를 검토하라. 그리고 무엇보다, 데이터를 먼저 정리하라.

Morgan Stanley처럼 처음엔 20%였던 시스템이 98%의 팀이 매일 쓰는 시스템으로 바뀔 수 있다. 거기까지 가는 길이 생각보다 길고 험할 뿐이다.

---

### 참고 자료

- [MIT NANDA "GenAI Divide" Report — Fortune (2025)](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Gartner: 30% of GenAI Projects Will Be Abandoned After PoC (2024)](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025)
- [Gartner: Lack of AI-Ready Data Puts AI Projects at Risk (2025)](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk)
- [NTT DATA: 70-85% of GenAI Deployments Failing to Meet ROI (2024)](https://www.nttdata.com/global/en/insights/focus/2024/between-70-85p-of-genai-deployment-efforts-are-failing)
- [McKinsey: The State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value)
- [Stanford HAI: Legal Models Hallucinate 1 in 6 Queries (2024)](https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries)
- [FTC Finalizes Order with DoNotPay (2025)](https://www.ftc.gov/news-events/news/press-releases/2025/02/ftc-finalizes-order-donotpay-prohibits-deceptive-ai-lawyer-claims-imposes-monetary-relief-requires)
- [Klarna CEO Admits Aggressive AI Cuts Went Too Far](https://mlq.ai/news/klarna-ceo-admits-aggressive-ai-job-cuts-went-too-far-starts-hiring-again-after-us-ipo/)
- [Air Canada Liable for Chatbot Misinformation — CBC News (2024)](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416)
- [kapa.ai: Why You Shouldn't Build Your Own AI Knowledge Base](https://www.kapa.ai/blog/why-you-shouldnt-build-your-own-ai-knowledge-base)
- [Goldman Sachs: Gen AI — Too Much Spend, Too Little Benefit? (2024)](https://www.goldmansachs.com/pdfs/insights/pages/top-of-mind/generative-ai-hype-or-truly-transformative/report.pdf)
- [Anthropic: Contextual Retrieval (2024)](https://www.anthropic.com/news/contextual-retrieval)
- [Microsoft GraphRAG Research](https://www.microsoft.com/en-us/research/project/graphrag/)
- [FalkorDB: GraphRAG Accuracy Benchmark (2025)](https://www.falkordb.com/blog/graphrag-accuracy-diffbot-falkordb/)
- [Databricks: Instructed Retriever +70% (VentureBeat)](https://venturebeat.com/data/databricks-instructed-retriever-beats-traditional-rag-data-retrieval-by-70)
- [OpenAI: Morgan Stanley Case Study](https://openai.com/index/morgan-stanley/)
- [Redis: RAG vs Large Context Window — Real Trade-offs](https://redis.io/blog/rag-vs-large-context-window-ai-apps/)
- [Databricks: Long Context RAG Performance of LLMs](https://www.databricks.com/blog/long-context-rag-performance-llms)
- [arxiv: Seven Failure Points When Engineering a RAG System (2024)](https://arxiv.org/abs/2401.05856)
- [VentureBeat: Why Enterprise RAG Systems Fail (Google Study)](https://venturebeat.com/ai/why-enterprise-rag-systems-fail-google-study-introduces-sufficient-context-solution)
- [ITWorld Korea: 기업용 RAG는 왜 실패하는가 (2025)](https://www.itworld.co.kr/article/4112593/)
- [AWS Korea: SK하이닉스의 RAG 플랫폼 구축 및 성능 평가 사례](https://aws.amazon.com/ko/blogs/tech/sk-hynix-rag-platfrom-analysis-evaluate/)
- [Deloitte: Generative AI in Asia Pacific (2024)](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/generative-ai-adoption-asia-pacific-region.html)
- [Azure AI: Query Rewriting +22 NDCG@3](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/raising-the-bar-for-rag-excellence-query-rewriting-and-new-semantic-ranker/4302729)
- [RAND Corporation: Root Causes of Failure for AI Projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html)
- [S&P Global: AI Rapid Adoption But Mixed Outcomes (2025)](https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning)
