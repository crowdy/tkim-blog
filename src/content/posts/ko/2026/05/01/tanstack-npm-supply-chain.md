---
title: "TanStack의 6분 — Trusted Publisher가 막지 못한 npm 공급망 침해의 해부"
description: "2026년 5월 11일, TanStack의 42개 패키지가 단 6분 사이에 84개의 악성 버전으로 교체되었다. 메인테이너 계정도, npm 토큰도 탈취되지 않았는데 어떻게."
pubDate: 2026-05-01T00:00:00.000Z
lang: ko
pairSlug: tanstack-npm-supply-chain
draft: false
---

# TanStack의 6분 — Trusted Publisher가 막지 못한 npm 공급망 침해의 해부

> Trusted Publisher와 OIDC, 메인테이너 MFA가 모두 정상 작동했는데도 42개의 인기 npm 패키지가 6분 만에 악성 버전으로 교체됐다. 우리가 지난 1년간 "공급망 보안의 정답"이라 부르던 것들은 무엇을 막고, 무엇을 막지 못한 것인가.

## 도입 — postmortem이 도착했다

2026년 5월 11일 19시 20분 UTC. `@tanstack/router`, `@tanstack/history`, 그리고 그 형제 패키지 40개가 npm 레지스트리에서 한꺼번에 새 버전으로 갱신되었다. 6분 뒤인 19시 26분, 같은 일이 한 번 더 일어났다. 합계 42개 패키지, 84개의 악성 버전. 모두 TanStack 조직의 정식 GitHub Actions 워크플로가 OIDC 토큰으로 정상 인증해 publish한 것들이다. 메인테이너의 npm 토큰은 탈취되지 않았다. MFA도 우회되지 않았다. trusted publisher 바인딩은 의도된 대로 작동했다.

그리고 그 모든 것이 정상 작동한 결과로, 악성 패키지가 npm에 올라갔다.

5월 11일 사건의 postmortem은 그로부터 약 사흘 뒤인 5월 14일에 TanStack 팀에서 공개되었다. 본 글이 다루는 시점은 그보다 며칠 더 지나, 사건이 Hacker News 1면을 점령하고 1,072점, 댓글 450개를 넘어선 5월 13일 전후다. 댓글창은 평소처럼 둘로 갈라져 있다. 한쪽에서는 "TanStack 팀이 무엇을 잘못했나"를 따지고, 다른 한쪽에서는 "정확히 무엇도 잘못한 것이 없는데도 이런 일이 생긴다는 사실"을 응시한다.

이 글은 후자의 시점에서 사건을 다시 짚는다. 4월 말 [GitHub Actions가 가장 약한 고리(GitHub Actions is the weakest link)](https://crowdy.dev/ko/2026/04/29/github-cracking-week)라는 제목으로 정리한 한 주의 보안 사건들 — tj-actions/changed-files, nx/s1ngularity, elementary-data — 의 직계 후속편이다. 그때 던진 진단은 단순했다. "GitHub Actions의 보안 문제는 사용자가 잘못 썼다는 것이 아니라 기본값이 위험하다는 데 있다." TanStack 사건은 그 진단을 한 단계 더 밀어붙인다. 사용자가 "권장된 해법"인 trusted publisher로 옮긴 다음에도 같은 부류의 사고가 일어난다는 것을, 그것도 단 6분 만에 일어난다는 것을, 정량적으로 증명한 첫 사례다.

## 본문 1 — 6분의 시간선: 무엇이 일어났는가

먼저 사실관계를 시간 순서대로 따라가 보자. 모든 시각은 UTC 기준이며, TanStack 팀의 postmortem과 GitHub 이슈 #7383의 타임라인을 교차 확인한 것이다.

**5월 10일 17시 16분.** 공격자 계정 `zblgg`(GitHub 사용자 ID 127806521)가 TanStack/router 리포지토리를 fork한다. fork 이름은 곧바로 `configuration`으로 변경된다. fork 네트워크 안에서 자신을 숨기기 위한 흔한 회피 기법이다. 이 fork 자체는 며칠 동안 평범하게 보인다.

**5월 10일 23시 29분.** 같은 공격자가 fork에 커밋을 하나 추가한다. 해시 `65bf499d…`로 시작하는 이 커밋에는 약 30,000줄짜리 번들 파일 `vite_setup.mjs`가 포함되어 있다. 표면상으로는 빌드 도구의 보일러플레이트처럼 보이도록 가공되어 있지만, 실제로는 페이로드의 1단계에 해당하는 의존성 설치 스크립트다.

**5월 11일 10시 49분.** PR #7378이 열린다. 제목은 "WIP: simplify history build". TanStack/router 같은 인기 OSS에는 매일 수십 건의 PR이 열리고, 상당수가 외부 기여자에게서 온다. 이 PR도 그 중 하나로 보였다.

**5월 11일 11시 11분.** PR이 force-push된다. 이 시점에서 fork의 HEAD는 앞서 준비해 둔 악성 커밋으로 교체된다. 그러자 `bundle-size.yml` 워크플로가 트리거된다. 이 워크플로의 트리거는 — 익숙하게도 — `pull_request_target`이다. PR HEAD 코드를 체크아웃해서 빌드하고, 빌드된 결과물의 사이즈를 PR 코멘트로 적어 주는 평범한 자동화다. 이 워크플로가 실행되는 순간, fork에서 온 악성 코드가 base 리포지토리의 secrets와 쓰기 권한을 가진 컨텍스트 안에서 실행된다.

**5월 11일 11시 29분.** `bundle-size.yml`이 종료되며 자신의 pnpm 캐시를 GitHub Actions 캐시 스토어에 저장한다. 키 이름은 `Linux-pnpm-store-6f9233a50def742c09fde54f56553d6b449a535adf87d4083690539f49ae4da11` 약 1.1 GB. 이 캐시 안에는 정상 의존성과 함께, 악성 코드가 심어 놓은 후속 단계 페이로드가 함께 들어 있다. 캐시 키는 `lockfile hash`에 의해 결정되므로, 동일 lockfile을 쓰는 다른 워크플로 — 즉 `release.yml` — 가 같은 키를 조회할 때 이 오염된 캐시가 그대로 복원된다.

**5월 11일 11시 31분.** 공격자가 PR을 다시 깨끗한 상태로 force-push한 뒤 PR을 삭제한다. fork도 함께 삭제된다. 표면적으로는 아무 일도 일어나지 않은 PR이 짧게 떴다 사라진 것처럼 보인다. 그러나 캐시 오염은 그대로 남아 있다.

**5월 11일 19시 15분 44초.** 약 8시간 뒤, TanStack 메인테이너가 정상적인 릴리스를 트리거한다. `release.yml`의 워크플로 ID는 `25613093674`. 이 워크플로는 `actions/cache@v5`로 의존성 캐시를 복원한다. 복원된 캐시에는 오염된 패키지가 포함되어 있고, 이 패키지의 postinstall 스크립트가 빌드 머신 위에서 실행된다.

**5월 11일 19시 20분 39초.** 첫 번째 배치 publish. 페이로드는 GitHub Actions Runner.Worker 프로세스의 메모리를 `/proc/<pid>/mem` 경유로 덤프해, 그 메모리에서 OIDC 토큰을 추출한다. 그 토큰으로 npm publish API를 직접 호출한다. 정상적인 워크플로 step 바깥에서, 그러나 정상적인 OIDC 자격 증명으로.

**5월 11일 19시 26분 14초.** 두 번째 워크플로 실행 `25691781302`에서 같은 일이 반복된다. 합계 42개 패키지, 84개 버전이 게시된다.

**5월 11일 19시 50분경.** 외부 보안 연구자 `ashishkurmi`(StepSecurity)가 새로 게시된 버전들의 지문을 보고 침해를 식별한다. TanStack 팀이 인지한 시점이 아니라 외부에서 먼저 발견된 시점이다. postmortem이 가장 솔직하게 인정하는 부분이 바로 여기다. 자체 publish 모니터링이 없었고, 발견은 외부에 의존했다.

**5월 11일 20시 ～ 21시 30분.** 팀 구성원 전원의 push 권한 회수, npm 보안팀에 tarball 서버 측 제거 요청, 84개 버전 전부 deprecate, SNS 공지, 캐시 purge, repository_owner 가드와 SHA 핀이 들어간 hardening PR 머지. 이 일련의 대응은 두 시간 안에 정리되었다.

여기까지 정리하면 그림이 명확해진다. 공격자는 메인테이너 계정에 손도 대지 않았다. npm 토큰을 훔치지도 않았다. trusted publisher OIDC 바인딩, 메인테이너 MFA, 워크플로 인증 모두 정상이다. 공격자가 한 일은 단 하나, "다른 워크플로가 캐시를 복원할 때까지 8시간을 기다린 것"이다.

## 본문 2 — 왜 일어났는가: 세 개의 합법적 기본값이 만든 사고

이 사건이 단일 버그로 환원되지 않는 이유는, 세 개의 서로 다른 GitHub Actions 동작이 — 각각은 의도된 동작인 채로 — 직렬로 연결되었을 때 비로소 RCE가 성립하기 때문이다. 세 개의 합법적 기본값은 다음과 같다.

**기본값 1. `pull_request_target`은 fork의 코드를 base 컨텍스트에서 실행할 수 있다.** 4월 29일 글에서 정리한 바로 그 트리거다. 이 트리거 자체가 잘못은 아니다. 라벨 자동 부착이나 환영 코멘트처럼 PR 본문 코드를 실행하지 않는 자동화에는 정당한 용도가 있다. 그러나 `bundle-size.yml`처럼 PR HEAD를 체크아웃해 빌드하는 워크플로가 이 트리거를 쓰는 순간 — TanStack의 경우 sender의 권한 체크 없이 `actions/checkout`이 PR HEAD SHA를 가져와 그대로 빌드했다 — 외부인의 코드가 base 컨텍스트의 권한과 캐시 스코프 안에서 실행된다.

**기본값 2. GitHub Actions 캐시는 리포지토리 단위로 공유되며, `pull_request_target` 실행이 main 브랜치 푸시와 같은 스코프를 쓴다.** Hacker News 댓글에서 `Ciantic`이 인용한 postmortem 한 줄이 가장 정확하다.

> "캐시 스코프는 리포지토리 단위이며, `pull_request_target` 실행(이쪽은 base 리포지토리의 캐시 스코프를 쓴다)과 main 푸시가 이를 공유한다. base 리포지토리 캐시 스코프에서 실행되는 PR이, 이후 main의 프로덕션 워크플로가 복원할 항목을 오염시킬 수 있다(Cache scope is per-repo, shared across pull_request_target runs which use the base repo's cache scope, and pushes to main. A PR running in the base repo's cache scope can poison entries that production workflows on main will later restore)."

이 한 줄이 사건의 메커니즘 전체다. 그리고 이 한 줄이 충격적인 이유는, 어디에도 "버그"라고 부를 만한 것이 없기 때문이다. 캐시는 의도대로 동작했다. 단지, 그 의도가 supply chain 시나리오에서 어떻게 보이는지를 충분히 깊게 검토한 사람이 없었을 뿐이다. `arianvanp`가 댓글에서 던진 한 문장이 이 무게를 가장 잘 잡아낸다.

> "왜 우리는 빌드 시스템을 hermetic하게 만들기 위해 이렇게 노력해 놓고, 결국 호출자가 키를 정하는 가변 글로벌 캐시를 브랜치 간에 그냥 공유해서 쓰고 있는가. 산업 전체의 실패다. 정말로 미친 짓이다(Why do we do all these efforts making our build systems hermetic and we end up just using a global mutable cache across branches where the caller picks the key? Failure of industry as a whole. Actually insane)."

**기본값 3. OIDC 토큰은 워크플로 step의 환경변수가 아니라 Runner 프로세스 메모리 안에 살아 있다.** trusted publisher가 약속한 보안 모델은 "장기 토큰을 메인테이너 머신에 두지 않는다"는 것이다. 그 약속은 지켜졌다. 그러나 publish가 일어나려면 어쨌든 short-lived 토큰이 어딘가에 한 번은 존재해야 한다. GitHub Actions의 경우, 그 토큰은 Runner.Worker 프로세스 메모리에 들어 있고, 같은 머신에서 실행되는 모든 코드가 — 즉 `npm install`이 실행한 임의의 postinstall 스크립트가 — `/proc/<pid>/mem`을 통해 읽을 수 있다. 이 정확한 메모리 덤프 스크립트는 새로 발명된 것이 아니다. postmortem은 그 점을 차분하게 짚는다.

> "공격자는 새로운 기법을 발명하지 않았다. 그들은 이미 발표된 연구를 재조합했을 뿐이다(The attacker did not invent novel tradecraft; they recombined published research)."

이 "이미 발표된 연구"의 출처가 바로 2025년 3월 tj-actions/changed-files 침해 사건이다. 13개월 전에 공개된 메모리 덤프 스크립트가 거의 그대로 재사용되었다.

세 개의 기본값을 합치면 이렇게 된다. fork의 코드 → base 컨텍스트에서 실행 → 캐시 오염 → 8시간 후 release 워크플로가 캐시 복원 → postinstall이 OIDC 토큰을 메모리에서 추출 → npm publish. 이 체인의 어느 한 단계만 끊어도 사고는 일어나지 않았을 것이다. 그러나 끊을 책임이 어디에 있는지가 모호한 것이 문제의 본질이다. `bundle-size.yml`을 쓴 메인테이너인가, `pull_request_target`의 기본 동작을 정한 GitHub인가, 캐시 스코프 모델을 설계한 GitHub인가, postinstall 실행을 기본으로 둔 npm/pnpm인가, OIDC 토큰을 Runner 메모리에 두는 방식 자체인가.

Hacker News에서 가장 먼저 떠오른 댓글은 이 책임 분산을 정면으로 지적한다. `padjo`의 정리가 가장 깔끔하다.

> "정리하면 이렇다. (1) fork에서 온 randomers의 PR에 쓰기 가능한 글로벌 공유 캐시가 제공된다. (2) 그 캐시가 deploy 파이프라인에서 재사용된다. (3) deploy는 CI 서버에 저장된 단일 인증 요소만으로 가능하다. (4) 리포지토리는 악성 deploy를 자체 점검하지 않고 사후에 제3자에게 의존한다. (5) 패키지 매니저는 기본값으로 패키지 업데이트 시 임의 코드를 실행한다. 우리는 어떤 세계에 살고 있는 것인가(What a world we live in)."

또 다른 댓글에서 `chrisweekly`는 더 자극적인 진단을 내놓는다.

> "postinstall 스크립트는 치명적이다. 다들 pnpm을 써야 한다. 그리고 fork에 push된 'orphan' 커밋이 (npm 클라이언트에서) 이런 일을 트리거할 수 있다는 것도 미친 일이다. 내 생각엔 GitHub의 책임이 크다. 악성 fork의 커밋이 공식 리포지토리와 구분되지 않는 URI로 GitHub의 공유 객체 저장소를 통해 도달 가능하다. 이건 정말 말이 안 된다(A malicious fork's commits are reachable via GitHub's shared object storage at a URI indistinguishable from the legit repo. That is absolutely bonkers)."

여기서 짚고 넘어갈 것은, 이 사건이 시작된 fork의 커밋이 이미 fork 자체가 삭제된 뒤에도 GitHub의 객체 저장소에는 그대로 살아 있을 수 있다는 점이다. fork 네트워크 안에서 한 번 push된 객체는 같은 네트워크의 어느 리포지토리에서든 SHA를 알면 접근 가능하다. 이는 GitHub이 디스크 사용량을 줄이기 위해 채택한 합리적 설계이지만, 공격자가 사라진 뒤에도 공격 흔적과 악성 코드가 GitHub 인프라 안에 영속한다는 부작용을 만든다.

그리고 보다 근본적인 시각도 있다. `jonchurch_`는 trusted publisher 자체에 대해 단정적인 평가를 내린다.

> "이건 (내 생각에) Trusted Publishing이 그 자체로는 CI에서 안전하게 publish하기에 충분치 않다는 증거다. CI 파이프라인 안의 공격자나 리포지토리 admin 자격 증명을 훔친 자는 손쉽게 publish할 수 있다. 새로운 정보는 아니다. TP는 이를 막기 위해 만들어진 것이 아니다. 그러나 로컬 publish + 2FA 모델에서 TP로 옮기는 것은 CI 침해를 통한 이 부류의 공격을 도입한다. (...) 내가 원하는 것은, GitHub의 신뢰 모델 안에서 publish가 완결되지 않는 것이다. 누군가가 npm 쪽에서 2FA를 사용해 artifact를 'published' 상태로 promote해야 하는, 단계화된(staged) publish 모델이 필요하다(What I want is staged publishing, so someone must go and use 2fa to promote an artifact to published on the npm side)."

이 마지막 문장이 이번 사건의 가장 중요한 정책 함의다. CI에서의 short-lived OIDC가 메인테이너 머신의 장기 토큰보다 안전하다는 것은 사실이지만, 그것은 "장기 토큰 노출"이라는 한 가지 위협을 막는 것이지 "publish의 두 번째 인간 검증"을 대체하지 않는다. 우리가 trusted publisher로 옮기면서 잃은 것은 정확히 그 두 번째 인간 검증이다.

## 본문 3 — 의미와 시사점: 공급망 보안의 두 번째 단계로

지난 1년의 npm 공급망 사건들을 한 줄로 정리하면 이렇게 된다. 2025년 3월 tj-actions/changed-files는 PAT(개인 액세스 토큰) 노출 → secrets 스크레이핑 패턴이었다. 2025년 8월 nx/s1ngularity는 npm 메인테이너 토큰 탈취 → 직접 publish 패턴이었다. 그리고 2026년 5월 TanStack은 trusted publisher OIDC가 정상 작동하는 와중에 메모리 덤프 + 캐시 오염으로 publish 권한이 빨려나간 패턴이다.

이 진화 곡선이 의미하는 것은, 지난 1년 동안 우리가 제안해 온 모든 "공급망 보안 권장 사항"이 한 단계씩 추월당했다는 것이다. PAT를 줄여라 → 줄였더니 메인테이너 토큰이 털렸다. MFA를 강제해라 → 강제했더니 토큰 자체를 우회하는 OIDC 트랙으로 옮겨갔다. trusted publisher로 옮겨라 → 옮겼더니 OIDC 토큰이 Runner 메모리에서 빠져나갔다.

이 시점에서 사용자가, 그러니까 메인테이너도 npm 보안팀도 GitHub도 아닌, "그 패키지를 그저 install해서 쓰는 사람"이 할 수 있는 일은 무엇인가. postmortem과 HN 댓글창에서 거론된 후보들을 정리하면 이렇다.

첫째, **postinstall을 끄는 것**. `npm install --ignore-scripts`나 `.npmrc`에 `ignore-scripts=true`를 두는 가장 단순한 방어다. 이 한 줄은 이번 사건의 detonation 단계 — pnpm 캐시 안에 들어 있던 패키지의 postinstall 스크립트가 빌드 머신에서 실행되는 단계 — 자체를 차단했을 것이다. 단점은 일부 정상 패키지(예: 네이티브 모듈을 빌드하는 패키지)가 동작하지 않는다는 것. 그러나 production 환경에서는 거의 모든 경우 사전 빌드된 바이너리를 받아 쓸 수 있고, postinstall은 사실상 dev 환경의 편의일 뿐이다.

둘째, **lockfile audit과 timing 기반 검증**. TanStack 사건의 모든 악성 버전은 정상 버전 직후 6분 이내에 publish됐다. CI에 "패키지의 신규 버전이 publish된 지 N시간이 지났는지"를 확인하는 단계 — `npm-locked-resolve`나 `socket.dev`, `snyk` 같은 도구가 제공한다 — 를 두면 사고 발생 후 deprecate되는 시간을 벌 수 있다. 완전한 방어는 아니지만, 6분짜리 사고를 6시간으로 늦춘다.

셋째, **버전 핀과 SHA 핀의 분리**. npm 패키지는 버전 문자열로만 핀할 수 있고 SHA로 핀할 수는 없다. 따라서 같은 버전 번호 아래에서 tarball이 교체되는 사고는 — 이번 사건처럼 — npm 측에서 unpublish하지 않는 한 핀으로 막을 수 없다. 그러나 `package-lock.json`의 `integrity` 해시는 잡아낸다. lockfile을 커밋하고, CI에서 `npm ci`를 쓰며, lockfile 해시 변경을 review하는 것은 적어도 "이미 install된 환경"이 자동 업그레이드되는 것을 막아준다.

넷째, **JSR과 Deno 같은 대안 레지스트리 검토**. `ezekg`가 인용한 npm 공식 정책 — "dependent가 있으면 unpublish할 수 없으므로 deprecate를 권장한다" — 가 보여주듯, npm은 사고 발생 후의 takedown 자체가 구조적으로 느리다. JSR은 publish 시 자동 코드 분석과 attestation을 요구하고, Deno는 기본적으로 권한 모델을 강제해 postinstall 같은 임의 실행을 차단한다. 단기간에 npm 생태계 전체가 옮겨갈 수는 없겠지만, 새 프로젝트나 라이브러리 단위에서는 검토할 만한 선택지다.

다섯째 — 그리고 가장 어려운 — **publish의 두 번째 인간 검증**. `jonchurch_`가 제안한 staged publish 모델이다. CI는 artifact를 npm staging에 올릴 수만 있고, production으로 promote하려면 npm 쪽의 별도 2FA가 필요한 구조. 이것은 npm registry 자체의 변화가 필요한 일이고, GitHub과 npm 양쪽의 합의가 있어야 한다. 그러나 trusted publisher OIDC가 단일 인증 요소라는 진단이 받아들여진다면, 이 방향은 결국 피할 수 없다.

여기에 한 가지 더, 사용자가 직접 할 수는 없지만 메인테이너 측에서 할 수 있는 일이 있다. `bundle-size.yml`이 했던 일 — fork PR 코드를 secrets/캐시 컨텍스트에서 실행 — 을 4월 29일 글에서 정리한 `pull_request` + `workflow_run` 패턴으로 분리하는 것이다. 이 패턴 하나만 적용했어도 캐시 오염 단계가 차단되었을 것이다.

## 결론 — Trusted가 아니라 Staged로

도입에서 던진 질문으로 돌아가자. 우리가 지난 1년간 "공급망 보안의 정답"이라 부르던 것들 — trusted publisher, OIDC, 메인테이너 MFA — 은 무엇을 막고 무엇을 막지 못한 것인가.

답은 분명하다. 그것들은 "메인테이너 머신에 장기 npm 토큰이 노출되어 통째로 털리는 사고"를 막았다. 그것은 nx/s1ngularity 같은 사건이 다시 일어날 확률을 줄였다. 그러나 그것들은 "publish 권한 자체가 CI 머신 위로 옮겨감으로써, 그 머신의 임의 코드 실행이 곧 publish 권한이 되는 사고"는 막지 못한다. 오히려 그것을 새로운 정상 공격면으로 만든다.

이 비대칭은 단순한 도구의 한계가 아니라 신뢰의 위치를 잘못 옮긴 결과다. 메인테이너의 머신에서 CI 머신으로 신뢰를 옮기면서, 우리는 "그 머신에서 실행되는 모든 코드가 임시 자격 증명을 정당하게 사용할 수 있다"고 묵시적으로 합의한 셈이다. 그러나 npm 패키지 install이라는 행위 자체가 "임의 코드 실행"인 생태계에서, 그 합의는 너무 헐겁다.

따라서 다음 단계는 trusted가 아니라 staged다. CI는 publish를 시작할 수 있지만 완료할 수는 없다. 누군가가 npm 측의 별도 채널에서 — 휴대전화 푸시든, 하드웨어 키든 — "이 버전을 정말 published 상태로 promote하시겠습니까"에 yes를 눌러야 한다. 이 단계가 6분을 6시간으로 늦추기만 해도, 외부 보안 연구자가 지문을 잡아낼 시간이 충분히 생긴다. TanStack 사건에서 발견까지 걸린 시간이 정확히 30분이었다는 사실은, 이 30분짜리 게이트가 얼마나 큰 차이를 만드는지를 역설적으로 보여준다.

마지막으로 한 가지. 4월 29일 글에서 지적한 "GitHub의 18년치 청구서가 한 주에 도착했다"는 진단은 이번 사건으로 한 단계 더 갱신된다. 이번에는 GitHub만의 청구서가 아니다. npm의 청구서이기도 하고, 우리 모두가 "메인테이너의 머신을 신뢰하는 모델"에서 "CI를 신뢰하는 모델"로 옮겨가면서 미뤄 둔 보안 가정의 청구서이기도 하다. TanStack 메인테이너들이 단 두 시간 안에 84개 버전을 deprecate하고 캐시를 정리하고 hardening PR을 머지한 그 빠른 대응은 칭찬받을 만하다. 그러나 그 빠른 대응이 필요했던 이유 자체가, 우리가 고른 신뢰 모델이 사고를 6분 안에 일으킬 수 있는 모델이기 때문이라는 점은 잊지 말아야 한다.

다음 사건은 이미 어디선가 commit되어 있다. 단지 force-push를 기다리고 있을 뿐이다.

---

출처:

- TanStack, "Postmortem: TanStack NPM supply-chain compromise," 2026-05-14. https://tanstack.com/blog/npm-supply-chain-compromise-postmortem
- Hacker News discussion, item 48100706, 2026-05-13. https://news.ycombinator.com/item?id=48100706
- TanStack/router 이슈 #7383 — 인시던트 트래킹. https://github.com/TanStack/router/issues/7383
- 본 블로그, "GitHub 신화의 6일 — 거버넌스, 가동률, 보안, 비용이 동시에 무너진 한 주," 2026-04-29. https://crowdy.dev/ko/2026/04/29/github-cracking-week
