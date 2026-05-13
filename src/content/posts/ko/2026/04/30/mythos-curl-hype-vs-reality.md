---
title: "Mythos가 curl에서 찾은 '단 하나' — AI 보안 분석의 마케팅과 현실"
description: "Anthropic이 위험할 만큼 뛰어나다고 선언한 Mythos가 curl 코드베이스에서 찾아낸 진짜 취약점은 단 한 건이었다. 이는 AI 코드 분석의 한계인가, 아니면 curl이 너무 단단한 표적이었던 것인가."
pubDate: 2026-04-30T00:00:00.000Z
lang: ko
pairSlug: mythos-curl-hype-vs-reality
draft: false
---

# Mythos가 curl에서 찾은 '단 하나' — AI 보안 분석의 마케팅과 현실

> Anthropic이 "위험할 만큼 뛰어나다"고 한 Mythos가 가장 까다로운 C 코드베이스에서 찾아낸 취약점이 단 한 건이라는 사실은, 모델의 무능을 가리키는가 아니면 우리가 AI 코드 분석의 가치를 측정하는 축을 잘못 잡고 있었다는 사실을 가리키는가.

## 도입 — "재앙의 쓰나미"를 예고했던 모델

2026년 4월, Anthropic은 자사의 새 모델 Mythos가 "위험할 만큼" 소스 코드 보안 결함을 잘 찾는다고 발표했다. 너무 잘 찾기 때문에 일반에 즉시 풀 수 없고, 일부 선별된 기업과 프로젝트에 먼저 풀어 방어자들이 우위를 잡을 시간을 주겠다는 것이 발표의 골자였다. 미디어는 즉시 이 표현을 받아 적었다. 일부 보안 책임자는 "취약점의 쓰나미"가 몰려온다고 이사회에 보고했고, 예산을 끌어왔다. 한 네덜란드 준정부 기관의 CISO는 HN 댓글에서 "Mythos 때문에 살짝 패닉에 빠진 우리 보스 덕에 보안 예산이 늘었다. 좋은 마케팅 공포는 절대 낭비하지 말 것(Never waste a good marketing scare)"이라고 적었다.

5월 6일, 이 모델은 마침내 curl 소스 코드에 적용됐다. curl은 1996년부터 계속 다듬어져 온 C 프로젝트로 약 178,000줄의 소스를 가지고 있다. 200억 개의 인스턴스에 설치돼 있고 110개 운영체제, 28개 CPU 아키텍처에서 돈다. 누적 188개 CVE를 발표한 만큼 결함이 없는 코드는 아니지만, OSS-Fuzz, Coverity, CodeQL, 유료 감사, 그리고 최근 8～10개월 동안에는 AISLE, Zeropath, OpenAI Codex Security 같은 AI 보안 도구까지 모두 거쳐 간 코드다. AI 도구만으로도 그 사이 200～300건의 버그픽스가 머지됐다. 즉 Mythos가 들어간 시점의 curl은 사실상 "하드모드"였다. 이런 코드에서 새 모델이 무엇을 찾아낼 것인가가 5월의 작은 시험대였다.

리드 개발자 Daniel Stenberg가 5월 11일 블로그에 결과를 올렸다. 제목 그대로다. "Mythos가 curl에서 취약점을 찾았다 — 그렇다, 단수, 단 하나다(Mythos finds a curl vulnerability — yes, as in singular one)." 이 한 줄은 4월에 Anthropic이 만든 거대한 마케팅 풍선에 바늘을 꽂았다. 그러나 같은 날 Hacker News의 685점짜리 토론 스레드는, Stenberg의 결론을 그대로 받아들이지 않았다. "위험하지 않다"가 아니라 "curl은 예외일 뿐이다"라는 반대 의견이 위로 올라왔다. 이 비대칭이 이번 글의 출발점이다.

## 본문 1 — 5건이 1건이 된 과정

Stenberg가 받은 Mythos 보고서는 178K LOC를 분석한 결과로 "확인된 보안 취약점(Confirmed security vulnerabilities)" 5건을 명시했다. 그는 "AI가 자기 입으로 '확인됐다(confirmed)'고 하는 것은 살짝 웃긴다(I think using the term confirmed is a little amusing when the AI says it confidently by itself)"라고 적었다. 그의 보안 팀이 이 5건을 몇 시간 동안 검토한 결과, 진짜 보안 취약점으로 남은 것은 1건이었다. 나머지 4건의 운명은 이렇다. 3건은 false positive로, API 문서에 이미 명시된 한계를 결함으로 잘못 지목한 사례였다. 마지막 1건은 "그냥 버그(just a bug)" — 동작 불일치는 맞지만 보안 의미는 없는 케이스였다.

남은 1건은 6월 말 예정된 curl 8.21.0 릴리스와 함께 공개될 severity low CVE다. Stenberg의 표현으로는 "누구의 숨도 멎게 하지 않을(not going to make anyone grasp for breath)" 결함이다. low 등급 CVE 한 건. 이것이 "쓰나미"의 정체였다. 4월의 마케팅 메시지와 5월의 보고서 사이의 거리는 단순한 기대치 조정 이상으로 컸다.

다만 보고서에 가치가 전혀 없는 것은 아니었다. 취약점이 아닌 일반 버그로 분류된 약 20건이 있었고, Stenberg는 이 부분을 명시적으로 칭찬했다. "false positive가 거의 없었다. 임계치를 꽤 높게 잡은 모양이다(Barely any false positives, so I presume they have had a rather high threshold for certainty)." curl 팀은 이 20건을 하나씩 검토하면서 동의되는 것부터 패치를 머지하고 있다. 즉 "보안 도구"로서의 Mythos는 hype에 못 미쳤지만 "코드 리뷰어"로서는 쓸 만했다는 평가다.

이 결과를 맥락 없이 보면 모델이 별로처럼 보인다. 그러나 Stenberg가 보고서 본문에 인용한 Mythos 자신의 첫 문장이 결정적이다. "curl은 현존하는 가장 fuzzed되고 audited된 C 코드베이스 중 하나다(curl is one of the most fuzzed and audited C codebases in existence (OSS-Fuzz, Coverity, CodeQL, multiple paid audits)). hot path(HTTP/1, TLS, URL parsing core)에서 무언가를 찾을 가능성은 낮다." 그리고 모델은 실제로 그 영역에서 아무것도 찾지 못했다. 모델이 자기가 들어간 환경의 난이도를 정확히 인식했고, 그 인식대로 결과를 냈다. 이 메타 인식 자체는 이전 도구들에서 보기 드문 특성이다.

수치상의 비교도 필요하다. AISLE, Zeropath, Codex Security 등 이전 AI 도구들은 같은 8～10개월 동안 200～300건의 버그픽스를 끌어냈고, 그중 "수십 건 이상"이 실제 CVE로 발표됐다. Mythos는 같은 코드에 들어와서 1건의 low CVE와 약 20건의 일반 버그를 가져왔다. 단순 산수로는 이전 도구들의 한 달치에도 못 미친다. 그러나 이전 도구들이 들어갔을 때의 curl과 Mythos가 들어갔을 때의 curl은 다른 코드다. 후자는 이미 전자가 다 훑고 간 후의 코드다. 이 점이 Stenberg의 결론과 HN 다수 의견이 갈리는 지점이다.

Stenberg의 결론은 두 줄이다. "이 모델 주변의 큰 hype는 주로 마케팅이었다(the big hype around this model so far was primarily marketing)." 그리고 "Mythos 이전의 다른 도구들이 한 것보다 특별히 높거나 진보된 수준으로 문제를 찾는다는 증거를 보지 못했다(I see no evidence that this setup finds issues to any particular higher or more advanced degree than the other tools have done before Mythos)." 한 코드베이스의 결과로 모델 전체를 평가하는 것은 부당하다는 단서를 그도 달았다. 그러나 헤드라인은 "marketing hype" 쪽으로 굳어졌다.

## 본문 2 — Stenberg vs HN — '잘 단단해진 코드'의 함정

여기서 흥미로운 비대칭이 발생한다. Stenberg의 글은 685점을 받았고, 281개의 댓글이 달렸다. 그런데 가장 위로 올라온 댓글들은 Stenberg를 100% 지지하지 않는다. patrickmeenan은 명확히 반대편에 섰다. "Mythos의 메시지는 톱 보안 전문가, 톱 언어/프로토콜/코드 전문가의 전문성을 누구든 사용할 수 있게 만들어 준다는 것이다. 위험은 방어자가 그 수준의 전문성에 접근하기 전에 그 접근을 세상에 풀어버리는 데 있었다. curl은 중심 도구라는 이유로 수년 동안 보안, 프로토콜, 언어 전문가들이 쑤셔본 코드다. Mythos가 무언가를 찾았다는 것 자체가 흥미롭지만 그것이 hype였다거나 위험하지 않다는 신호는 아니다(That Mythos found anything is interesting but not a sign that it's been marketing hype and isn't dangerous). 99.99%의 프로젝트가 curl만큼 안전하지 않다는 데 베팅해도 된다. 오픈이든 클로즈드이든 상관없다 — LLM은 클로즈드 소스도 디컴파일해 탐색한다. fuzzing과 기존 AI 도구와 전문가 검토를 거치지 않은 프로젝트라면 이미 해킹 가능하다고 봐야 한다."

srcreigh는 다른 각도에서 같은 결론을 폈다. "curl은 본질적으로 비교적 단순하고 잘 격리된 도구다. 운영체제나 웹 브라우저, 데이터베이스, 수십억 달러 회사의 코드베이스와 비교해 보라. Mythos/ChatGPT 5.5가 curl에는 없는 복잡성에서 훨씬 더 좋다는 것이 말이 된다. curl은 분명히 '뭐든지 클라이언트'로서 풀피처드지만, 우리가 의존하는 다른 소프트웨어보다 자릿수가 다르게 덜 복잡하다(it's orders of magnitude less complex than other software we rely on)."

EMM_386의 댓글은 더 직접적이다. "AI 에이전트가 한 소프트웨어 유틸리티에서 0개의 버그를 찾았다면, 그것이 어떻게 'AI가 버그 찾는 데 별로 능하지 않다'는 의미가 되는가? 만약 정말로 버그가 0개라면? '5건은 우리가 기대했던 광범위한 목록에 비하면 아무것도 아닌 것 같았다'는 표현은 — 기대가 현실과 맞지 않은 것일 뿐, Mythos가 주장만큼 능력 있지 않다는 의미는 아닐 수 있다." yjftsjthsd-h는 Stenberg가 본문에서 쓴 "특별히 위험하지 않다(not particularly dangerous)"는 표현을 직접 인용하며 받아쳤다. "그것이 따라 나오는지는 잘 모르겠다. 글에서 지적했듯이 curl은 가용한 모든 도구로 죽을 만큼 분석된 코드다. 대부분의 소프트웨어는 그 수준이 아니다(curl was already analyzed to death with every tool available; most software isn't at that level)."

이 반론들은 한 줄로 압축된다. "잘 단단해진 코드(well-hardened code)에 대한 결과는 그 도구의 일반 성능에 대한 결론이 될 수 없다." Stenberg 자신도 본문에 단서를 달았다 — "이는 단 하나의 소스 코드 저장소이고 다른 것에서는 훨씬 좋을 수 있다(This is only natural ... This is just one source code repository and maybe it is much better on other things)." 그러나 그의 헤드라인 결론은 "마케팅 hype"이고, 본문 단서는 헤드라인 아래 묻혔다. HN의 다수 의견은 그 묻힌 단서를 위로 끌어올린 셈이다.

다만 Stenberg의 결론에도 경험적 무게는 있다. 그는 단순한 외부 관찰자가 아니라 5건을 받아 1건으로 추리는 작업을 직접 한 사람이다. false positive 4건이 어떤 종류의 false positive였는지를 본 사람이고, 그 양상이 이전 AI 도구들의 false positive와 질적으로 다르지 않다고 판단한 사람이다. 그가 "특별히 더 진보된 수준으로 찾는다는 증거를 보지 못했다"고 했을 때, 그것은 도구 5종을 1년 가까이 돌려 본 사람의 비교 진술이다. patrickmeenan과 srcreigh의 반론이 옳더라도, "그러면 Mythos를 다른 어떤 코드베이스에서 검증할 것인가?"라는 질문에 답이 없다. Anthropic의 마케팅은 "위험할 만큼 좋다"였고, 그 위험성은 일반적이라는 함의였다. curl 결과가 그 일반적 함의를 한 부분 반증한다면, 그 반증은 그 자체로 의미가 있다.

rzmmm의 첫 댓글은 이 양면성을 가장 깔끔하게 정리한다. "이 공간의 경쟁이 거칠고, 크고 작은 마케팅이 끼어 있다는 것을 다시 떠올리게 해 준다. 좋은 알림이다(It's a good reminder for us all that the competition in this space is rough and lots of more or less subtle marketing is involved)." Mythos가 무능하다는 결론도, 잘 단단해진 코드가 면역됐다는 결론도, 둘 다 부분적으로만 맞다. 둘 다 맞는 부분만 본다면 우리는 새로운 평가축을 만들어야 한다.

## 본문 3 — AI 코드 분석의 새 평가축

지금까지 AI 코드 분석 도구는 거의 전부 "벤치마크 코드베이스에서 몇 건의 CVE를 찾는가"로 평가됐다. curl은 그 사실상의 표준 벤치마크 중 하나였다. 그러나 5월의 결과는 그 벤치마크가 더 이상 변별력이 없다는 사실을 노출했다. curl에서는 어떤 도구든 비슷한 수준의 한 자릿수 결과를 낼 가능성이 높다. 새로 발견할 수 있는 결함이 거의 남지 않았기 때문이다. 이 상태에서 도구 간 차이를 보려면 평가축 자체를 바꿔야 한다.

첫 번째 새 축은 "보고된 결함의 신호 대 잡음비(signal-to-noise ratio)"다. Mythos가 받은 점수에서 가장 두드러진 부분은 5건 중 1건이 진짜였다는 결과(20% 정밀도)가 아니라, 보안 결함이 아닌 일반 버그 약 20건에서 false positive가 "거의 없었다"는 점이다. Stenberg가 직접 칭찬한 부분이고, Mythos가 임계치를 꽤 높게 잡았다는 추정의 근거다. 보안 보고서에서는 이 임계치가 너무 헐거웠고, 일반 버그 보고서에서는 적절했다는 해석이 가능하다. 보안 영역의 false positive는 4건이었지만, 그 4건이 모두 "API 문서에 명시된 한계"였다는 점을 보면, 모델이 코드는 분석했지만 문서는 못 읽었다는 구조적 한계가 보인다. 이는 다음 세대 도구가 무엇을 보강해야 하는가를 가리킨다 — 코드 + 사양/문서의 결합 분석.

두 번째 새 축은 "코드베이스 난이도에 대한 자기 인식"이다. Mythos 보고서가 "curl은 가장 fuzzed/audited된 C 코드베이스 중 하나다. hot path에서 찾을 가능성은 낮다"라고 스스로 적었다는 점은 이전 정적 분석기에서는 보기 드문 행위다. 모델이 결과를 내기 전에 "이 환경에서 무엇을 기대해야 하는지"를 추정하고, 그 추정에 맞는 결과를 낸다. 이 인식이 정직하다면 — 그리고 Stenberg의 보고서를 보면 정직한 것 같다 — 도구가 사용자에게 보고하는 것은 단순한 결함 목록이 아니라 "이 코드베이스의 보안 성숙도에 대한 평가"가 된다. CISO에게는 이 평가가 결함 목록보다 더 가치 있을 수도 있다.

세 번째 축은 patrickmeenan과 srcreigh가 가리킨 부분이다. "복잡성과 미감사 영역의 함수." 99.99%의 프로젝트는 curl만큼 검토되지 않았고, 운영체제, 브라우저, 데이터베이스, 사내 모놀리식 코드베이스는 curl보다 자릿수가 다르게 복잡하다. AI 코드 분석의 진짜 시험대는 curl이 아니라 그쪽이다. Mythos를 운영하는 Anthropic이 만약 다음 발표에서 비공개 엔터프라이즈 코드베이스에서 발견한 결함 통계를 — 익명화해서라도 — 공개한다면, 5월의 marketing hype 비판은 부분적으로 회수될 수도 있다. 그러나 현 시점에서는 그런 데이터가 없다. "위험할 만큼 좋다"는 주장의 검증 가능한 근거는 curl 결과뿐이고, 그 결과는 약하다.

네 번째 축은 가장 실무적이다. "PR 리뷰 보조 도구로서의 가치." Stenberg가 본문에서 명시했듯이 curl 팀은 GitHub Copilot과 Augment를 PR 리뷰 봇으로 쓰고 있고, 이들이 인간 리뷰를 대체하는 것이 아니라 보강한다(They help us, they don't replace us). Mythos의 일반 버그 20건은 사실상 이 영역의 작업이다. 이것이 보안 마케팅 메시지보다 덜 자극적이지만, 더 지속 가능한 가치다. AI 도구가 리뷰어로서 인간을 보강하는 효과는 누적되고 측정 가능하며 false positive 비용이 낮다. 보안 hype는 한 번의 발표에서 오는 임팩트가 크지만, "5건 중 1건"같은 결과로 한 번에 무너진다. 시장이 어느 쪽에 가치를 부여하는가가 이번 사건의 다음 챕터다.

## 결론 — 무엇을 측정할 것인가

리드 질문으로 돌아간다. Mythos가 curl에서 단 하나의 low CVE를 찾았다는 사실은 모델의 무능을 가리키는가, 아니면 우리의 평가축이 잘못됐다는 사실을 가리키는가. 답은 둘 다 부분적으로 맞다. 모델은 "위험할 만큼 좋다"는 마케팅 메시지가 함의하는 일반 능력을 curl 결과로 입증하지 못했다. 그 점에서 Stenberg의 "marketing hype"는 정확하다. 동시에 curl은 8년 동안 모든 종류의 도구로 죽을 만큼 검토된 코드이고, 그런 코드에서 한 자릿수 결과가 나온다는 것은 모델 자체보다 코드의 상태에 대해 더 많은 것을 말한다. 그 점에서 patrickmeenan의 반론도 정확하다.

문제는 두 진술이 동시에 옳을 때, 마케팅이 한 쪽만 가져간다는 것이다. Anthropic은 "위험할 만큼"이라는 표현으로 일반성을 주장했고, Stenberg는 한 코드베이스의 결과로 일반성을 반증했다. HN의 반론은 "그 한 코드베이스가 일반성의 표본이 못 된다"고 다시 반박했다. 이 삼각 구도에서 빠진 것은 데이터다. 일반 엔터프라이즈 코드베이스에서 Mythos가 무엇을 찾는지에 대한 익명화된 통계, false positive 비율, signal-to-noise ratio. 이 데이터가 없는 한 어느 쪽도 결론을 못 낸다.

그러나 한 가지는 이번 사건이 분명히 보여 줬다. AI 코드 분석을 "CVE 카운트"로만 평가하는 시대는 끝났다. 잘 단단해진 코드에서 CVE는 거의 안 나온다. 새 모델의 가치는 결함 카운트가 아니라 — 결함 신호의 정밀도, 코드베이스 성숙도에 대한 메타 평가, PR 리뷰 보조의 누적 효용, 미감사 영역에서의 발견율 — 이런 다축 평가에서 결정된다. Mythos가 curl에서 단 하나만 찾았다는 사실은 슬라이드 한 장에 들어가는 헤드라인이지만, false positive가 거의 없었다는 사실은 다음 분기 도구 선정 회의의 핵심 슬라이드다. 시장이 헤드라인 대신 그 다음 슬라이드를 보는 법을 배울 때, AI 보안 분석 산업은 hype 사이클의 다음 단계로 넘어갈 수 있다. 5월 11일의 Stenberg 글은 그 학습의 첫 교재가 됐다.
