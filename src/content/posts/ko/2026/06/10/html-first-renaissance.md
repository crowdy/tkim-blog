---
title: "Astro 와 HTML-first 의 부활 — React 가 돌려준 사용자를 되찾을 수 있는가"
description: "Alistair Davidson 의 한 줄 — 'HTML-first 로 다시 만들었더니 사용자가 두 배가 되었다'. 1098 점의 Hacker News 응답이 가리키는 것은 React 의 종말인가, 사용 도구의 재배치인가."
pubDate: 2026-06-10T00:00:00.000Z
lang: ko
pairSlug: html-first-renaissance
draft: false
---

# Astro 와 HTML-first 의 부활 — React 가 돌려준 사용자를 되찾을 수 있는가

> "HTML-first 로 다시 만들었더니 사용자가 두 배가 되었다" 는 한 개발자의 보고가 Hacker News 의 1 위에 올랐다. 이것은 React 의 종말인가, 도구가 적용되는 자리의 재배치인가.

## 도입 — 폼 하나가 두 배의 사용자를 만든 사건

2026 년 6 월 10 일, 영국 개발자 Alistair Davidson 이 자신의 블로그에 짧은 글을 올렸다. 제목은 "HTML-first 사이트를 만들었더니 하룻밤 사이에 사용자가 두 배가 되었다" 였다. Hacker News 의 첫 페이지에 올라 1098 점을 받고 댓글 498 개를 모았다. 같은 주의 어떤 뉴스보다 강한 응답이다. 글의 맥락은 단순하다. Davidson 은 영국의 한 규제 받는 공익 사업자 (utility company) 의 고객 응대 폼을 만들었다. 이전 버전은 오프쇼어 계약 개발팀이 React 로 만든 것이었고, 출시 사흘 만에 실패했다. localStorage 의 5MB 제한에 부딪혀 첨부 이미지 저장이 망가졌고, 사용자가 폼을 끝낼 수 없게 되었다. Davidson 은 React 를 들어내고 Astro 를 들여 HTML-first 로 다시 짰다. 그 결과 폼을 완료하는 사용자 수가 정확히 두 배가 되었다.

이 한 줄의 보고가 만든 파장은 단순한 케이스 스터디를 넘어선다. 사용자 두 배는 ROI 측면의 강력한 신호지만, 그보다 더 중요한 것은 분석학적 어휘다. Davidson 의 글은 React 가 어떻게 사용자를 잃었는지에 관한 짧은 설명을 담는다. JavaScript-기반 analytics 는 JavaScript 가 망가져서 페이지가 빈 화면이 된 사용자를 측정하지 못한다. 두 배가 된 새 사용자는 사실 "전부터 거기 있었지만 측정되지 않았던 사용자" 다. 이 발견은 단순한 도구 교체의 이야기가 아니라, 우리가 무엇을 측정해 왔고 무엇을 측정하지 못해 왔는가에 관한 이야기다. 1098 점이 의미하는 바는 그 이야기가 업계의 한 신경을 정확히 건드렸다는 사실이다.

## React 의 자리와 Astro 의 자리 — 무엇이 무엇으로 대체되었는가

Davidson 이 들어낸 스택은 단순한 React 가 아니라 "React 위에 글로벌 JS 상태와 localStorage 의존을 잔뜩 얹은 SPA" 였다. 새로 짠 스택은 Astro 다. Astro 는 server-rendered HTML 을 기본으로 하고, 필요할 때만 JavaScript "섬 (islands)" 으로 인터랙티브한 부분을 끼워 넣는 프레임워크다. Davidson 의 표현으로는 "JavaScript 는 향상시키는 도구이지, 필수가 되어서는 안 된다" 는 원칙이 가장 정확한 요약이다. 폼 검증 자체는 1KB 미만의 자체 제작 web component 로 처리됐고, 후일 이를 `validation-enhancer` 라는 일반 목적 라이브러리로 떼어 냈다.

기능적으로 무엇이 바뀌었는가. 첫째, 백엔드 세션. 이전 React 버전은 사용자가 입력한 내용을 localStorage 에 저장했다. 5MB 제한과 브라우저 정리 정책이 합쳐져, 사흘 만에 데이터 손실이 시작되었다. 새 버전은 폼 입력을 서버 세션에 저장한다. Davidson 은 "한 사용자가 폼을 시작한 지 한 달 만에 완료한 사례" 를 자랑한다. 이는 React 가 잘못한 것이 아니라 React 위에 잘못된 아키텍처가 올라간 것이지만, "단일 페이지 + 클라이언트 상태" 라는 React 의 자연스러운 사용 패턴이 그 잘못을 부추긴 것은 사실이다.

둘째, JavaScript 비활성화 사용자. 영국의 규제 받는 공익 사업자에게는 "고객 만족도 96% 미만" 이 벌금 대상이다. 그래서 PlayStation Portable 의 낡은 브라우저, 3G 연결, 기업의 strict CSP 환경 같은 변두리 사용자를 모두 챙겨야 한다. JavaScript 의존이 0 이 아니라 "JavaScript 가 없어도 폼이 완료될 수 있다" 는 보증이 필요했다. Astro 의 server-rendered HTML 은 이 보증을 자연스럽게 만든다. React 위의 SPA 는 같은 보증을 별도의 SSR 설정과 hydration 페일오버 로직으로 만들어야 한다.

셋째, 측정의 사각지대 자체. Davidson 이 핵심으로 짚은 점이다. "JavaScript-기반 analytics 는 JavaScript 가 망가져 빈 화면이 된 사용자를 측정하지 못한다." 이 한 줄은 단순한 사실이지만, 업계의 대부분은 이 사실을 무시하고 살아 왔다. Google Analytics, Mixpanel, Amplitude 모두 JavaScript 가 실행되어야 측정 핑을 보낸다. 5G·M1 MacBook 의 World 가 있고, 그 World 안에서 본 통계가 "전체 사용자" 의 통계로 받아들여졌다. 두 배가 된 새 사용자의 절반은 사실 측정의 사각지대에 머물던 사용자다. 이 측정 편향은 도구 선택의 편향으로 이어졌다. SPA 의 사용자 행동 데이터가 좋아 보이게 만든 한 원인이 바로 "SPA 가 실패한 사용자가 측정에서 빠진다" 는 사실이었다.

## 두 배의 사용자가 가리키는 진짜 질문 — JS 의 위치는 어디인가

Davidson 의 사례는 React 의 종말을 말하지 않는다. 정확히 말하면 그의 글 어디에도 "React 를 쓰지 마라" 는 결론은 없다. 그가 짚은 것은 "client-heavy 한 폼은 client-heavy 한 framework 의 자연스러운 적용처가 아니다" 라는 영역 명세다. Hacker News 의 토론은 이 명세를 확장한다.

가장 많은 동의를 받은 댓글은 사용자 chao- 의 한 줄이다. "익숙하지 않은 도구를 써서 같은 일을 하면 일이 더 많아 보인다. 실제로는 더 단순한 도구라 해도." Davidson 의 후임자가 새 코드를 보고 "전에 비해 일이 더 많다" 고 불평한 데 대한 응답이다. 이 비대칭은 도구 선택의 정치학을 가리킨다. 객관적 단순성과 주관적 익숙함이 같은 방향을 가리키지 않을 때, 채택은 익숙함을 따른다.

사용자 seangrogg 는 한 발 더 나간다. "대부분의 웹 개발자는 React 를 알고 광범위하게 쓴다. Astro 는 현장에서 배워야 하거나 따로 사람을 뽑아야 한다." 이 한 줄은 도구 선택이 기술의 우열이 아니라 채용 시장과 유지보수 비용의 함수라는 사실을 정확히 짚는다. React 가 사이즈와 복잡도에서 비합리적인 경우라도, React 를 아는 개발자의 풀이 다른 어떤 framework 보다 깊다는 사실 자체가 강력한 채택 압력이다.

사용자 iamjs 의 정리는 트레이드오프를 더 솔직하게 드러낸다. "우리는 simple server-rendered HTML 위에 progressive-enhancement 스타일의 JavaScript 만 얹었다. 비용도 있었다. off-the-shelf 의 풍부한 UI 컴포넌트를 가져다 쓸 수 없게 되었다." 이는 HTML-first 가 만들어내는 진짜 비용이다. React 생태계에는 Material UI, Chakra UI, Mantine, Radix UI 같은 성숙한 컴포넌트 라이브러리가 풍부하다. Astro·HTMX·Web Components 위에서는 그 자리에서 가져다 쓸 컴포넌트가 훨씬 적다. 처음부터 만들어야 한다. Davidson 의 폼은 단순하니 이 비용이 작았다. 풍부한 데이터 시각화나 실시간 협업이 필요한 SaaS 라면 같은 비용이 결정적으로 무겁다.

다른 한편, 가장 흥미로운 댓글은 사용자 igsomething 의 한 줄이다. "프로젝트 전원이 React 가 안 맞다는 데 동의했다. 그러나 우리는 아무것도 할 수 없었다. 정부 IT 부서의 누군가가 자기들이 실수했다고 인정해야 했기 때문이다." 도구 선택의 진짜 비용은 기술적인 것이 아니라 정치적인 것이라는 진실이다. 정부, 대기업, 규제 산업의 IT 결정은 한번 내려지면 되돌릴 비용이 너무 커서 잘못된 선택이 5 년 이상 살아남는다. Davidson 이 두 배의 사용자를 만들 수 있었던 까닭은 그가 작은 사업자의 컨설턴트였기 때문이지, 큰 기업의 직원이었기 때문이 아니었다.

마지막으로, 중간지대의 부상도 짚어야 한다. 사용자 faangguyindia 는 자기 스택을 한 줄로 정리했다. "내 앱은 대부분 HTMX + Go + SQLite 다. 대부분의 프로젝트에 이걸로 충분하다." HTMX 는 HTML 의 속성으로 비동기 요청과 부분 페이지 교체를 처리하는 라이브러리다. JavaScript 를 쓰지만 SPA 의 frame 으로 가지는 않는다. Davidson 의 Astro 와 비슷한 자리에 있지만, server 측 언어와 더 단단히 묶인다. HTMX, Alpine.js, Astro, Hotwire (Rails 의 Turbo) 같은 중간지대 도구가 2026 년의 웹 개발에서 함께 떠오르는 것은 우연이 아니다. SPA 와 정통 server-rendered 의 양극 사이에 빈 자리가 있었고, 그 자리가 채워지고 있다.

## 실무자에게의 함의 — 측정 인프라부터 바꾸어야 한다

Davidson 의 사례가 실무 엔지니어에게 주는 시사점은 "React 를 들어내라" 가 아니다. 더 정확한 시사점은 셋이다.

첫째, **측정 인프라를 JavaScript-only 에서 분리하라.** JS-only analytics 는 JS 가 망가진 사용자를 측정에서 누락시킨다. 서버 측 로그 (NGINX, Cloudflare Workers 의 access log, edge function log) 와 클라이언트 측 analytics 를 결합해서, "페이지를 받았지만 measurement ping 을 못 보낸" 사용자의 규모를 측정 가능한 수치로 만들어야 한다. Davidson 의 두 배 사용자는 사실 측정 인프라가 보이게 한 결과다. 다른 회사의 measurement 격차는 더 작을 수도 더 클 수도 있다.

둘째, **client-heavy framework 의 자연스러운 적용 영역을 다시 그려라.** React, Vue, Svelte 의 빛나는 자리는 (a) 실시간 데이터 갱신이 핵심인 dashboard, (b) 복잡한 상태 머신을 가진 에디터·diagrammer, (c) 풍부한 클라이언트 측 인터랙션이 가치의 본체인 게임·시뮬레이션이다. 그 외의 자리 — 정적 콘텐츠, 단순한 폼, 글 중심의 사이트, 전자상거래의 상품 페이지 — 는 server-rendered HTML 이 자연스럽다. Astro 가 "콘텐츠 중심 사이트의 React" 라는 자리를 점한 것은 이 재배치를 반영한다.

셋째, **공익 사업자·정부 서비스의 IT 정책을 다시 보라.** Davidson 이 한 일은 "JavaScript 의존성 = 접근성 위험 = 규제 위반 위험" 이라는 등식을 실증한 것이다. 영국의 GDS (Government Digital Service) 는 이미 비슷한 원칙을 표준화해 두었다. progressive enhancement 가 GDS Design System 의 기본 원칙이다. 한국의 정부 24, 일본의 마이넘버 서비스가 같은 원칙을 따랐다면 React-only SPA 가 만들어낸 접근성 문제 (스크린 리더 미지원, 저사양 단말 미지원) 가 같은 수준에서 해결되었을 것이다. Davidson 의 사례는 그 원칙이 실제 ROI 와 연결된다는 증거다.

## 결론 — 두 배의 사용자, 그러나 React 는 죽지 않는다

Davidson 의 한 줄 — "HTML-first 로 다시 만들었더니 사용자가 두 배가 되었다" — 이 시사하는 바는 React 의 종말이 아니다. 정확히 말하면 React 가 모든 자리를 차지한 시대의 종말이다. 폼, 콘텐츠, 상품 페이지 같은 자리는 server-rendered HTML 이 자연스럽다. Dashboard, 에디터, 협업 도구 같은 자리는 여전히 React·Svelte·Vue 의 영역이다. 두 영역의 경계가 다시 그어지고 있고, Astro·HTMX·Hotwire 가 그 경계 위에 새로 자리잡고 있다.

진짜 질문은 그 경계 위에 선 회사가 무엇을 하는가다. Davidson 처럼 작은 사업자의 폼을 컨설팅하는 자리에서는 측정의 사각지대를 발견하기 쉽다. 큰 기업의 자리에서는 igsomething 의 댓글처럼 정치적 비용이 도구 선택을 묶는다. 그 사이에서 엔지니어가 할 수 있는 가장 정직한 일은, 자기 사용자가 실제로 측정되고 있는지부터 다시 확인하는 일이다. Davidson 의 두 배는 도구의 승리가 아니라 측정의 회복이었다. 그것이 1098 점이 정말로 의미하는 바다.

---
출처:
- https://mohkohn.co.uk/writing/html-first/
- https://news.ycombinator.com/item?id=48475483
