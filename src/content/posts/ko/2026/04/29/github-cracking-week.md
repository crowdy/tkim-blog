---
title: "GitHub 신화의 6일 — 거버넌스, 가동률, 보안, 비용이 동시에 무너진 한 주"
description: "2026년 4월 마지막 주, 우리가 코드를 맡겨 둔 단일 플랫폼은 우연히 운이 나빴던 것일까, 아니면 18년 동안 미뤄둔 청구서가 한꺼번에 도착한 것일까."
pubDate: 2026-04-29T00:00:00.000Z
lang: ko
pairSlug: github-cracking-week
draft: false
---

# GitHub 신화의 6일 — 거버넌스, 가동률, 보안, 비용이 동시에 무너진 한 주

> 이번 주 GitHub은 운이 나빴던 것인가, 아니면 18년치 청구서가 한꺼번에 도착한 것인가. 그리고 우리가 그 차이를 구별하지 못한다면, 우리가 의탁한 것은 인프라인가 아니면 신화인가.

## 도입 — 키보드 위의 눈물

2026년 4월 28일, Mitchell Hashimoto는 자신의 블로그에 "Ghostty가 GitHub을 떠난다(Ghostty is leaving GitHub)"는 글을 올렸다. HashiCorp의 공동 창업자였고, 자신의 이름을 검색 엔진에 넣으면 "GitHub 사용자 번호 1299"라는 결과가 나오는 사람이다. 2008년 2월에 가입했으니 18년째 한 플랫폼에서 일해 온 셈이다. 그가 자신의 글에 직접 댓글을 달았다. "이 글을 쓰면서 실제로 울었다. 눈물이 키보드에 떨어졌다. 부끄럽지만 사실이다(I actually cried writing this blog post — tears hit my keyboard, I'm embarrassed to say)."

그가 든 이유는 의외로 단순했다. "지난 한 달 동안 거의 매일 X를 표시했다." 그가 개인적으로 작성한 가동률 일지에는 GitHub이 자신의 작업을 막은 날에 X 표시가 들어 있었고, 그 X는 거의 모든 날짜에 찍혀 있었다. 4월 27일에는 GitHub Actions 장애로 약 두 시간 동안 PR 리뷰가 불가능했다. 그는 그 두 시간을 단순한 다운타임이 아니라 인격적 문제로 받아들였다. "GitHub은 매일같이 나를 실패시키고 있고, 그것은 개인적이다(GitHub is failing me, every single day, and it is personal)."

이 글이 Hacker News 1면에 올라간 4월 28일 저녁, 같은 페이지에는 GitHub 가용성에 관한 GitHub 자신의 사과 포스트, GitHub Enterprise Server의 RCE(원격 코드 실행) 취약점 분석, GitHub Copilot 코드 리뷰 과금 정책 변경 공지, 그리고 "GitHub Actions가 가장 약한 고리(GitHub Actions is the weakest link)"라는 보안 분석 글이 동시에 올라가 있었다. 며칠 사이에 GitHub은 거버넌스, 가동률, 보안, 비용, 공급망 무결성이라는 다섯 가지 축에서 동시에 흔들리는 모습을 보였다. 단일 사건이 아니라 동시다발적 균열이었다.

그렇다면 단일 사건과 동시다발적 균열의 차이는 무엇인가. 한 가지가 무너졌을 때는 사고지만, 다섯 가지가 같은 주에 무너졌을 때는 구조가 드러난 것이다. 이번 주 GitHub에서 일어난 일은 후자에 가깝다.

## 6일의 연표 — 무엇이 일어났는가

먼저 사실관계를 시간 순서대로 정리해 보자.

**4월 23일.** GitHub Merge Queue에서 squash merge가 잘못된 커밋을 만들어 내며 658개 리포지토리, 2,092개 풀 리퀘스트의 기본 브랜치 상태를 잘못된 상태로 남겼다. GitHub CTO Vlad Fedorov는 며칠 뒤 공식 블로그에서 "다중 프로세스 실패(multiple process failures)"가 원인이었다고 인정하며 "데이터 손실은 없었으나 영향받은 디폴트 브랜치의 상태는 부정확했다"고 적었다.

**4월 27일.** 두 가지 사건이 같은 날에 일어났다. 첫째, Elasticsearch 기반의 GitHub 검색이 다운되었다. Fedorov는 "봇넷 공격으로 추정되는 부하"가 원인이었다고 밝혔다. 둘째, 같은 날 GitHub은 Copilot Code Review가 6월 1일부터 GitHub Actions 분(minutes)을 소진하기 시작한다고 공지했다. 사용자는 이제 동일한 코드 리뷰 기능에 대해 Copilot 프리미엄 요청 단위와 Actions 분이라는 이중 과금에 노출된다. 단가는 공지에 명시되지 않았다.

**4월 28일.** 보안 회사 Wiz가 CVE-2026-3854라는 이름의 GitHub 원격 코드 실행 취약점을 공개했다. CVSS 점수 8.7, 등급 Critical. 영향 범위는 GitHub.com과 GitHub Enterprise Server(GHES) 전체. 공개 시점에서 GHES 인스턴스의 88%가 패치되지 않은 상태였다. 같은 날, Mitchell Hashimoto는 블로그에 이별 글을 올렸고, Armin Ronacher는 "GitHub 이전(Before GitHub)"이라는 회고를 발표했으며, 한 보안 연구자는 "GitHub Actions는 가장 약한 고리"라는 글로 91%라는 충격적인 수치를 제시했다.

**4월 29일.** Hacker News의 1면 상위 5개 중 4개가 GitHub 관련 포스트로 채워졌다. 종합 점수는 글마다 200점에서 2,000점 사이였고, 댓글은 한 글당 100건에서 600건 이상 쏟아졌다.

이것이 단순한 우연이라고 보기에는 사건 간 인과의 결이 너무 짙다. 한 축씩 깊이 들어가 보자.

## 본문 1 — 거버넌스: "이 사이트에는 리더십이 없다"

Mitchell Hashimoto는 인프라를 옮기겠다고 했다. Armin Ronacher는 그보다 한 걸음 더 나아갔다. Flask와 Jinja의 메인테이너이자 Pocoo 그룹의 창립자인 그는 "이 사이트에는 리더십이 없다(the site has no leadership)"고 단언했다. "이 정도로 잘 굴러가고 있다는 게 기적이다(It's a miracle that things are going as well as they are)." 이 문장이 충격적인 이유는 분노의 표현이라서가 아니라, 정확한 관찰일 가능성이 있기 때문이다.

GitHub의 경영 구조는 2018년 Microsoft 인수 이후 여러 차례 재편되었다. 전임 CEO Thomas Dohmke는 2026년 8월에 사임하면서 후임을 발표하지 않았고, 그 이후 GitHub은 Microsoft의 CoreAI 조직에 통합되었다. CEO 자리는 공석에 가깝고, 의사결정은 Microsoft 본사의 AI 전략 흐름에 종속된 형태가 되었다. 이 구조에서 일어난 첫 번째 결과가 바로 Copilot 과금 정책의 모호함이다. 4월 27일 공지는 "에이전트 아키텍처가 GitHub Actions 위에서 동작하므로(That agentic architecture runs on GitHub Actions)" 이제 그쪽으로 과금하겠다고만 적었을 뿐, 분당 단가도, 평균 PR당 소비량도, 기존 Copilot 계약과의 합산 한도도 공개하지 않았다. 사용자는 청구서가 도착해야 가격을 알 수 있다.

가격 정책의 불투명성은 단순한 마케팅 실수가 아니다. 그것은 거버넌스의 부재에서 나오는 증상이다. 누구도 "이렇게 하면 사용자가 떠난다"고 말할 권한이 없거나, 말해도 영향력이 없을 때, 가격은 합의가 아니라 통지가 된다.

여기에서 Hashimoto의 결정이 의미를 얻는다. 그는 단순히 한 사용자가 화가 난 것이 아니라, 18년 동안 그 플랫폼의 성장을 옆에서 지켜본 사람의 판단이다. 그가 "어떤 대안 플랫폼을 쓸지 아직 정하지 않았고, 상용·FOSS 양쪽 모두와 논의 중"이라고 적은 부분은 그래서 의미심장하다. 그는 지금 떠나려는 것이 아니라, 떠날 곳이 마련되는 즉시 떠나려는 것이다. 18년 단골이 그렇게 말할 때, 다른 단골들도 같은 메모를 받는다.

## 본문 2 — 가동률과 보안: 30배의 부하, 88%의 미패치

Vlad Fedorov의 사과 포스트에는 단 한 줄, 그러나 이번 균열 전체를 설명해 주는 인과 명제가 들어 있다. "에이전트형 개발 워크플로(agentic development workflows)가 2025년 12월 이후 가속화되며, 30배의 용량 확장이 필요해졌다." 즉, ChatGPT Codex나 Claude Code, Cursor와 같은 코딩 에이전트들이 자동으로 PR을 만들고, CI를 돌리고, 리뷰를 요청하면서 GitHub의 인프라에 인간 사용자만으로는 도달할 수 없었던 수준의 부하가 걸리기 시작했다는 것이다. 그리고 이 부하는 GitHub이 그동안 미뤄 둔 모든 아키텍처적 부채를 청구서로 만들어 들이밀었다.

Fedorov가 약속한 개선 항목 목록은 그래서 시사적이다. Webhooks를 MySQL에서 분리하기, 세션 캐시 재설계, 인증 흐름 최적화, 그리고 결정적으로 "성능 민감 코드를 Ruby 모놀리스에서 Go로 이관"하기. 18년 된 모놀리스를 지금에야 분해하기 시작했다는 사실은, 30배 부하라는 외부 압력이 없었다면 더 미뤄졌을 일이라는 뜻이다.

보안 쪽으로 눈을 돌리면 그림은 더 어두워진다. CVE-2026-3854는 Wiz Research가 발견하고 3월 4일 GitHub에 보고한 취약점이다. GitHub.com은 단 6시간 만에 패치를 적용했다. 빠른 대응이다. 그런데 GitHub Enterprise Server(고객사가 자체 운영하는 버전) 패치는 3월 10일에야 나왔고, 4월 28일 공개 시점에서 인스턴스의 88%가 여전히 미패치 상태였다. 인증된 사용자의 단일 git push 명령으로 RCE가 가능한 취약점이 한 달 반 동안 거대 기업 네트워크 곳곳에서 노출된 채 방치된 것이다.

이 88%라는 숫자가 단순히 GHES 운영자들의 게으름을 의미하는 것은 아니다. 그것은 자체 운영 GitHub이라는 옵션이 점점 운영 부담을 감당하기 어려워지고 있다는 신호이기도 하다. SaaS GitHub은 6시간 안에 패치되지만, 자기 손으로 운영하면 한 달 반이 걸린다는 이 비대칭은, 결국 "GitHub.com을 떠나라"는 권고와 "스스로 운영하라"는 권고를 동시에 어렵게 만든다.

GitHub Actions 쪽 그림은 한층 더 구조적이다. nesbitt.io에 올라온 분석은 "전체 제품이 각각은 편리한 기능들의 모음인데, 그것들이 합쳐지면 매우 위험한 무언가가 된다"고 진단한다. 구체적인 수치도 함께 나왔다. 서드파티 GitHub Actions를 쓰는 PyPI 패키지의 91%가 변경 가능한 태그(mutable tag)로 액션을 참조한다. 패키지의 3분의 2는 적어도 하나의 워크플로에 `permissions:` 블록이 없다. 그 결과는 이미 청구서로 도착한 바 있다. 2025년 3월 tj-actions/changed-files 침해는 23,000개의 다운스트림 리포지토리에 메모리 스크레이퍼를 흘려 넣었고, 같은 해 8월 nx/s1ngularity 사건은 5,000개 이상의 비공개 리포지토리를 잠시나마 공개로 노출시켰다. 2026년 4월 elementary-data 사건에서는 PR 코멘트 트리거 후 10분 안에 악성 릴리스가 게시됐다.

이 모든 사례의 공통점은, 어느 것도 "버그"가 아니라는 점이다. 그것들은 GitHub Actions의 기본 동작이 만들어내는 합법적 결과다. SHA가 아니라 태그로 액션을 참조하는 것은 권장되는 사용법이고, `pull_request_target`은 공식 문서에 등재된 트리거이며, 기본 GITHUB_TOKEN이 쓰기 권한을 갖는 것은 2023년 2월 이전에 만들어진 모든 리포지토리의 기본값이다. 즉, GitHub Actions의 보안 문제는 "사용자가 잘못 썼다"가 아니라 "기본값이 위험하다"는 데 있다.

## 본문 3 — 의존의 청구서: 우리는 어디로 가야 하는가

여기에 더해, 같은 주에 다른 한 건의 사건이 함께 일어났다. 4월 28일에는 Anthropic의 Claude.ai와 API가 광범위하게 다운되었다. 코딩 에이전트가 GitHub 인프라를 30배 부하로 밀어붙이는 동시에, 그 에이전트의 두뇌인 모델 자체도 함께 무너지고 있다는 의미다. 다시 말해, 우리가 이번 주 목격한 것은 두 개의 단일 고장점(SPOF)이 동시에 흔들린 풍경이다. 코드의 단일 고장점은 GitHub이고, 코딩 에이전트의 단일 고장점은 모델 제공자다.

Hacker News 댓글창에서는 GitHub 직원으로 보이는 idan이라는 사용자가 이런 의견을 남겼다. "GitHub은 변화를 만들고 싶어하는 사람들이 안에 머물러야만 좋아진다(GitHub only gets better if people who give a shit stick around to make it better)." 이에 대해 margalabargala는 단호하게 답했다. "지금까지 사용해 온 방식 그대로 계속 사용하는 것으로는 GitHub을 더 좋게 만들 수 없다(There is no avenue by which you make GitHub better by continuing to use it)." 이 두 댓글의 대립은 외부 사용자의 영향력에 관한 가장 솔직한 진술이다. 제품의 방향은 사용자의 눈물이 아니라 사용자의 지갑과 발자국으로 결정된다.

그렇다면 어디로 가야 하는가. 댓글창에 거론된 후보들을 정리하면 이렇다.

첫째, **Codeberg**. Forgejo 기반의 비영리 운영 포지(forge)다. 이미 Zig, Strudel, Tenacity 같은 인지도 있는 프로젝트들이 이전했다. 단점은 디스커버리 측면에서 GitHub만큼의 검색·SEO·통합 생태계를 제공하지 않는다는 것이다.

둘째, **GitLab**. 같은 댓글 작성자 ahartmetz의 표현을 빌리면 "GitHub과 비슷한 정도로 느리지만, 라이선스와 소유주가 더 낫다(about as slow as GitHub, but with a better license and owner)." 즉, 기능적으로 안전한 대안이지만 인프라적 만족감을 약속하지는 않는다.

셋째, **자체 호스팅(Forgejo, Gitea, sr.ht)**. 가장 이상적인 분산화이지만, GHES의 88% 미패치 통계가 보여주듯 운영 부담이 만만치 않다. 또한 Hacker News의 injidup이 지적했듯, "분산 버전 관리는 분산된 리포지토리를 발견하고 접근할 수 있는 어떤 수단이 있을 때만 작동한다. 결국 항상 중앙 레지스트리로의 드리프트가 일어난다." 즉 self-host는 발견 가능성을 포기하는 일이기도 하다.

Armin Ronacher는 그래서 또 다른 방향을 제시한다. 새 포지를 찾는 게 아니라, "공공의, 지루한, 잘 펀딩된 보존 인프라(public, boring, well-funded archive)"를 만들어야 한다는 주장이다. 코드 호스팅은 상업적 회사가 해도 좋지만, 코드의 메모리 — 즉 과거 프로젝트, 죽은 의존성, 끊어진 링크 — 는 어느 한 회사의 비즈니스 모델 안에 머물러서는 안 된다는 것이다. 그가 직접 만들었다가 이미 잊은 자신의 옛 프로젝트 Colubrid가 PyPI에 죽은 GitHub 링크를 매단 채 등록되어 있다는 일화는, 이 주장의 근거이자 상징이다.

엔지니어 개인 차원에서 지금 당장 할 수 있는 일은 더 작은 단위에서 시작된다. nesbitt.io의 권고를 추리면 다섯 가지로 압축된다. zizmor 같은 정적 분석 도구를 워크플로에 도입할 것. 액션을 태그가 아니라 SHA로 핀할 것. 워크플로 최상단에 `permissions: {}`를 두고 필요한 권한만 추가할 것. `pull_request_target`을 사용하지 말 것. 인증 없는 사용자가 PR에 넣을 수 있는 모든 텍스트를 결국 셸 스크립트가 될 것이라고 가정할 것. 이 다섯 가지는 GitHub을 떠나지 않더라도, GitHub이 우리 인프라의 가장 약한 고리가 되지 않도록 하는 최소한의 보험이다.

## 보강 — `pull_request_target` 트리거의 함정

이 다섯 가지 권고 중에서, 실무자에게 가장 모호하게 느껴지는 것이 네 번째다. "`pull_request_target`을 사용하지 말 것"이라고만 적혀 있을 뿐, 그러면 무엇을 트리거로 써야 하는지는 적혀 있지 않다. 그러나 GitHub Actions 사고의 거의 모든 사례가 이 트리거의 오용에서 출발한다는 점에서, 이 한 줄은 따로 풀어 둘 필요가 있다.

요점은 단순하다. 기본 트리거는 `pull_request`이고, secrets가 정말 필요하면 `workflow_run` 패턴으로 분리한다.

**`pull_request`와 `pull_request_target`의 차이**

| 트리거 | 실행 컨텍스트 | secrets | GITHUB_TOKEN | fork PR의 코드 실행 |
|---|---|---|---|---|
| `pull_request` | PR HEAD 컨텍스트 | 비어 있음 | read-only | 안전하게 실행됨 |
| `pull_request_target` | base 브랜치 컨텍스트 | 풀 액세스 | write 가능 | 위험 — RCE의 단골 진입점 |

`pull_request`는 "fork의 코드가 실행돼도 훔쳐 갈 것이 없는" 트리거다. 시크릿이 비어 있고 토큰은 읽기 전용이므로, 외부 기여자의 코드가 실행되어도 base 리포지토리에 영향을 주지 못한다. 반면 `pull_request_target`은 base 컨텍스트에서 실행되며 모든 secrets와 쓰기 권한을 가진 토큰을 받는다. 이 자체는 잘못이 아니지만, 워크플로가 PR HEAD 코드를 체크아웃하여 실행하는 순간 — 예컨대 `actions/checkout`에 `ref: ${{ github.event.pull_request.head.sha }}`를 지정하는 순간 — 외부인의 코드가 secrets를 손에 쥔 채로 실행된다. 2025년의 tj-actions/changed-files 사건이 23,000개 리포지토리를 한 번에 흔든 메커니즘이 정확히 이것이다.

**패턴 1 — 기본형: `pull_request`만으로 충분한 경우**

lint, 테스트, 빌드처럼 secrets가 필요하지 않은 모든 작업은 이 트리거 하나로 충분하다.

```yaml
on:
  pull_request:
permissions: {}
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm test
```

fork에서 온 PR이라도 안전하다. 토큰이 읽기 전용이고 secrets가 비어 있으므로, 악성 코드가 실행되어도 외부로 빠져나갈 데이터가 없다.

**패턴 2 — secrets가 필요한 경우: `workflow_run`으로 분리**

배포 미리보기 등 secrets가 필요한 시나리오는 두 단계로 쪼갠다. 첫 번째 워크플로는 untrusted 환경에서 빌드만 하고 결과물을 artifact로 업로드한다. 두 번째 워크플로는 그 artifact를 받아 secrets와 함께 처리한다.

```yaml
# pr-build.yml — untrusted, secrets 없음
on: pull_request
permissions: {}
jobs:
  build:
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm run build
      - uses: actions/upload-artifact@<SHA>
        with: { name: build, path: dist/ }
```

```yaml
# pr-deploy-preview.yml — trusted, secrets 있음
on:
  workflow_run:
    workflows: ["pr-build"]
    types: [completed]
permissions:
  pull-requests: write
jobs:
  deploy:
    if: github.event.workflow_run.conclusion == 'success'
    steps:
      - uses: actions/download-artifact@<SHA>
      - run: ./deploy-preview.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

핵심은 secrets에 닿는 단계에서는 PR HEAD 코드를 절대 실행하지 않는다는 것이다. 두 번째 워크플로는 첫 번째가 만든 정적 artifact만 다룬다.

**패턴 3 — `pull_request_target`을 정당하게 쓰는 거의 유일한 경우**

라벨 자동 부착, 환영 코멘트 등 PR HEAD 코드를 전혀 실행하지 않는 자동화에 한정된다.

```yaml
on: pull_request_target
permissions:
  pull-requests: write
jobs:
  label:
    steps:
      - uses: actions/labeler@<SHA>
```

이 워크플로에 `actions/checkout`으로 PR HEAD를 가져와 빌드·실행을 추가하는 순간, 그 자리에서 사고가 시작된다.

**한 줄 룰**

> "이 워크플로가 외부 기여자의 PR 본문을 코드로 실행하는가?"
> → 그렇다면 `pull_request` (필요 시 `workflow_run`과 결합).
> → 아니라면 (라벨·코멘트만) `pull_request_target`.

nesbitt.io가 "`pull_request_target`을 사용하지 말라"고 단정한 이유는, 실무에서 이 경계를 지킨 워크플로가 거의 없기 때문이다. 한 번이라도 PR 코드를 체크아웃하는 순간 secrets 누출이 일어나며, 그 사고는 단일 리포지토리에 머물지 않고 다운스트림 의존 트리 전체로 전파된다.

## 결론 — 신화의 끝, 인프라의 시작

이 글의 첫머리에서 던진 질문으로 돌아가 보자. 이번 주 GitHub은 운이 나빴던 것인가, 아니면 18년치 청구서가 한꺼번에 도착한 것인가.

답은 둘 다다. 한 주에 다섯 개의 사건이 겹친 것은 우연이다. 그러나 그 다섯 개의 사건이 거버넌스, 가동률, 보안, 비용, 공급망 무결성이라는 정확히 다섯 개의 서로 다른 축에서 동시에 흔들렸다는 것은 우연이 아니다. 18년 동안 우리가 한 회사의 한 SaaS에 코드, 이슈, CI, 패키지 레지스트리, 보존 아카이브, 그리고 이제 코딩 에이전트의 실행 런타임까지 모두 의탁해 왔다는 사실의 자연스러운 귀결이다.

신화는 보통 어느 한 사건으로 무너지지 않는다. 신화는 사람들이 더 이상 그것을 신화로 부르지 않게 될 때 무너진다. 4월 28일에 Mitchell Hashimoto가 자신의 키보드 위에 떨어뜨린 눈물은, 그가 마지막까지 GitHub을 신화로 부르고 있던 사람 중 한 명이었다는 사실의 증거다. 그가 그것을 신화로 부르기를 멈춘 순간, 다른 사람들도 같은 의문을 품기 시작한다.

다음 주에는 다시 1면이 다른 이야기로 채워질 것이다. 다음 달에는 GitHub의 30배 스케일링 작업이 어느 정도 결실을 맺을지도 모른다. 그러나 이번 주의 6일은 한 가지 사실을 영구적으로 바꿔 놓았다. 우리가 이제 GitHub을 "당연한 것"이 아니라 "한 가지 선택"으로 본다는 것. 한 가지 선택으로 본다는 것은, 다른 선택을 검토하기 시작했다는 것이다.

그래서 마지막 질문은 이렇게 바뀐다. 다음번에 한 주가 이렇게 무너졌을 때, 당신의 팀은 어디로 갈 준비가 되어 있는가.

---

출처:

- Mitchell Hashimoto, "Ghostty is leaving GitHub," 2026-04-28. https://mitchellh.com/writing/ghostty-leaving-github
- Vlad Fedorov, "An update on GitHub availability," GitHub Blog, 2026-04-28. https://github.blog/news-insights/company-news/an-update-on-github-availability/
- Wiz Research, "GitHub RCE Vulnerability: CVE-2026-3854 Breakdown," 2026-04-28. https://www.wiz.io/blog/github-rce-vulnerability-cve-2026-3854
- "GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026," GitHub Changelog, 2026-04-27. https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/
- "GitHub Actions is the weakest link," nesbitt.io, 2026-04-28. https://nesbitt.io/2026/04/28/github-actions-is-the-weakest-link.html
- Armin Ronacher, "Before GitHub," lucumr.pocoo.org, 2026-04-28. https://lucumr.pocoo.org/2026/4/28/before-github/
- Hacker News discussion, "Ghostty is leaving GitHub," item 47939579, 2026-04-28. https://news.ycombinator.com/item?id=47939579
