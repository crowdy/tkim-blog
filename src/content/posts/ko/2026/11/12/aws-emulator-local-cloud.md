---
title: "AWS가 직접 만든 로컬 AWS — 에이전트가 쓴 에뮬레이터는 얼마나 믿을 수 있나"
description: "AWS가 계정 없이 로컬에서 도는 AWS Emulator를 CC0로 공개했다. 코드는 전부 자율 AI 에이전트가 썼고 사람은 한 줄도 리뷰하지 않았다고 한다. 일본 엔지니어의 CDK·Terraform 실측을 통해, 충실도 점수와 실제 동작 사이의 간극을 따져 본다."
pubDate: 2026-11-12T00:00:00.000Z
lang: ko
pairSlug: aws-emulator-local-cloud
draft: false
---

# AWS가 직접 만든 로컬 AWS — 에이전트가 쓴 에뮬레이터는 얼마나 믿을 수 있나

> 사람이 한 줄도 리뷰하지 않은 에뮬레이터가 내놓는 "통과"는 테스트의 증거인가, 또 하나의 검증 대상인가.

## 도입

2026년 11월 11일, AWS는 What's New 공지로 AWS Emulator를 발표했다. 로컬 컴퓨터나 CI 파이프라인에서 AWS 애플리케이션을 빌드·테스트하기 위한 도구로, 공지는 "with no deployments or AWS account required"라고 쓴다. 기존 SDK와 CLI 호출을 그대로 에뮬레이터로 돌리면 배포도 계정도 없이 테스트할 수 있다는 것이다. 소스는 GitHub의 `aws/aws-emulator`에 CC0 1.0 퍼블릭 도메인 헌정으로 공개됐고, 에뮬레이터 자체에는 추가 요금이 없다. 이튿날 이 저장소는 Hacker News에서 992점, 댓글 266개를 받았다.

화제가 된 이유는 기능보다 제작 방식이었다. 같은 날 Amazon 공식 블로그에 실린 Sr. Principal Engineer Matthew Goldberg의 글은 이렇게 시작한다. "Thousands of autonomous AI agents wrote every line of code in AWS Emulator." 그리고 한 문장을 덧붙인다. "Our team hasn't written or reviewed any of the code." 세계 최대 클라우드 사업자가 자사 API의 로컬 복제본을 내놓으면서, 그 코드를 사람이 쓰지도 읽지도 않았다고 공언한 것이다.

같은 날 일본의 Qiita에는 이 에뮬레이터 위에 실제 CDK와 Terraform 스택을 올려 본 실측 글이 올라왔다. 이 글은 두 소스를 겹쳐 읽는다. AWS가 말하는 충실도(fidelity)와 실무자가 측정한 동작 사이의 간극이 이 도구를 어디까지 믿어도 되는지를 알려 주기 때문이다.

## 현상 분석 — 무엇이 공개됐고, 어떻게 만들어졌나

README에 따르면 AWS Emulator는 "a local emulator of the AWS APIs"다. Rust로 작성됐고, Linux에서는 RPM이나 Debian 패키지를 설치해 `aws-emulator`를 실행하며, Windows와 macOS에서는 Docker 컨테이너로 돌린다. 소스 빌드는 자체 서명 인증서로 `127.0.0.1:9297`에서 HTTPS를 연다. Rust 테스트에 dev-dependency로 넣어 프로세스 안에서 돌리는 임베디드 모드도 있다. README는 용도를 빌드, 테스트, CI로 한정하고 "Don't use it for production workloads or to test security"라고 못 박는다. 텔레메트리는 기본으로 켜져 있고 플래그, 환경 변수, 설정 파일로 끌 수 있다. 저장소는 "This repository does not take PRs"라고 명시한다. 2026년 11월 16일 확인 기준으로 저장소는 별 8.5천 개, 열린 이슈 445개, 커밋 32,502개였다.

공지가 내세우는 계약은 두 가지다. 첫째, 지원하는 작업에 대해서는 유효한 호출에 AWS와 같은 결과를 돌려준다. 지원하지 않는 작업은 501을 돌려준다. 둘째, 인스턴스마다 포트, 키, 메모리 상태가 따로라서 병렬 에이전트나 테스트 스위트, CI 잡이 서로 간섭하지 않는다. 상태는 메모리에만 있고 멈추면 사라진다.

제작 과정은 Goldberg의 글에 나온다. 시작은 주말 실험이었다. 그는 Kiro에게 세 단계 프롬프트를 줬다. AWS CLI로 테스트를 쓰고, 실제 AWS에서 통과할 때까지 고치고, 그 테스트를 통과하는 메모리 내 구현을 만들라는 것이다. Kiro는 약 15분 만에 Amazon SQS의 첫 버전을 만들었고 주말 동안 나머지를 만들었다. 물론 빈틈이 많았다. 그는 에이전트들이 C 컴파일러를 만든 Anthropic의 연구에서 착안했다고 밝힌다. 명세와 참조 구현이 잘 정의돼 있으면 에이전트가 명세를 따르는 무언가를 만들 수 있다는 논리다. AWS에는 Smithy API 모델이라는 명세가 있고, 실제 AWS라는 참조 구현이 있다.

제품화는 훨씬 오래 걸렸다. 에이전트는 세 팀으로 나뉜다. 테스트 작성 팀은 Smithy 모델에서 시나리오를 뽑아 실제 AWS에서 검증하고, 그 결과를 AWS 호출 없이 재생할 수 있게 저장한다. 이슈 탐지 팀은 그 테스트를 에뮬레이터에 재생해 실패를 이슈로 등록하고, 원인이 같아 보이는 실패를 묶는다. 수정 팀은 이슈를 하나씩 맡아 빌드, 리뷰, 보안, 충실도를 보는 머지 게이트에 수정을 제출한다. 초기 골격은 438개 AWS API 모델의 요청을 처리했고, 충실도 테스트는 "tens of thousands"에 이르며, "hundreds of agents"가 동시에 일하며 "thousands of issues fixed every day"라고 한다. 다만 완전히 구현된 서비스가 몇 개인지는 밝히지 않는다. Goldberg는 이렇게 쓴다. "Without this merge gate, we wouldn't trust what our agents are building." 해결된 이슈는 `issues/things-that-now-work`, 미해결 이슈는 `issues/things-that-do-not-work` 폴더에 파일로 남는다.

## 심층 분석 — 충실도 점수와 실제 동작 사이

Qiita에 실측 글을 올린 Nana_777은 2026년 11월 12일, Windows 11과 Docker 환경에서 에뮬레이터 v1.0.322를 대상으로 CDK 스택을 10단계로 나눠 배포했다. S3 버킷, 온디맨드 DynamoDB, SQS+SNS 구독, EventBridge 규칙, Step Functions, `Code.fromAsset`으로 배포한 Lambda는 모두 배포와 동작이 됐다. API Gateway와 Lambda, DynamoDB를 잇는 POST/GET 경로도 IAM 권한 부여 누락으로 두 번 실패한 뒤 동작했다. 필자는 Lambda 권한 부족이 `AccessDeniedException`으로 잡힌 것을 오히려 유용하다고 평가했다.

실패도 구체적이다. 인라인 코드 Lambda(`Code.fromInline`)는 배포는 되지만 호출하면 `exports is not defined`로 실패했다. CloudWatch Alarm은 CloudFormation상으로는 `CREATE_COMPLETE`인데 `describe-alarms`에 나타나지 않았다. `LambdaRestApi`가 기본으로 만드는 프록시 권한은 `statementId`가 100자 제한을 넘어 실패했다. Lambda Function URL 권한 생성은 `InvokedViaFunctionUrl`로 실패해 롤백됐다. Terraform 1.16.2(AWS provider 6.73.0)로는 S3와 DynamoDB를 `init`, `apply`(13초), `destroy`(6초)까지 성공시켰다. 그런데 `apply` 직후 `plan`에서 DynamoDB `on_demand_throughput`이 `-1 -> null`로 차이를 보였고, 두 번째 `apply`는 `UpdateTable`의 `ValidationException`으로 실패했다. 27개 API를 찔러 보니 4개(Athena ListWorkGroups, Translate, Comprehend, QuickSight)가 501을 돌려줬다. 필자는 나머지 23개가 오류 없이 응답했다고 해서 AWS와 같다는 증거는 아니라고 선을 긋는다.

이 글의 가치는 그다음 단계에 있다. 필자는 릴리스에 첨부된 `scores.json.gz`를 내려받아 서비스별 통과율을 직접 다시 셌다. 공식 점수표가 아니라 필자의 집계라는 단서가 붙는다. skipped를 제외한 42,857건 중 24,243건 통과, 전체 56.6%였다. SQS 90%, S3 79%, DynamoDB 77%, IAM 71%, Lambda 46%, CloudFormation 16%다. 흥미로운 것은 CloudFormation이 16%인데도 필자의 단순한 스택은 모두 배포됐다는 점이다. 필자는 CloudFormation 테스트 상당수가 서비스를 가로지르거나 롤백·업데이트를 수반하는 복잡한 구성을 다루기 때문일 것이라고 추정하면서도, 내역까지는 확인하지 않았다고 밝힌다. 결론은 이렇다. 점수가 낮다고 내 구성이 안 도는 것은 아니며, 쓰는 API 범위에서 직접 시험해 보는 것이 확실하다.

필자는 공식 저장소의 `issues/` 폴더(미해결 6,544건, 해결 12,708건)도 전문 검색해, 자신이 찾은 차이 6건과 대조했다. `on_demand_throughput`의 `-1`, `statementId` 100자 초과, CloudFormation 경유 Alarm 미노출은 이미 미해결 이슈로 기록돼 있었다. 인라인 Lambda, Function URL, 같은 스택 안의 `prod` 스테이지 이름 중복은 해당 이슈를 찾지 못해 미보고일 가능성이 있다고 했다.

이 대조가 보여주는 것은 에이전트식 개발의 강점과 약점이 같은 곳에 있다는 사실이다. 강점은 투명성이다. 에이전트가 찾은 차이가 하나하나 파일로 남아 있어서, 외부 사용자가 자기 관측을 기존 기록과 기계적으로 대조할 수 있다. 약점은 "성공"의 의미다. CloudFormation이 `CREATE_COMPLETE`를 보고하는데 리소스가 실제로는 쓸 수 없는 Alarm 사례는, 상태 코드를 믿는 테스트가 공허하게 통과할 수 있음을 뜻한다. 필자의 권고도 바로 이것이다. 스택이 성공했다는 것만으로 판단하지 말고, 만들어진 리소스를 describe나 실제 호출로 따로 확인하라.

보안 경계도 분명히 해야 한다. 공식 보안 페이지는 IAM 정책, 권한 경계, 버킷 정책 같은 리소스 기반 정책, KMS 키 정책, 계정·리전 간 접근을 이 에뮬레이터로 테스트하지 말라고 한다. HN에 인용된 해당 페이지에 따르면, 에뮬레이터는 자신의 키로 서명된 요청을 절대 거부하지 않고 KMS 키 정책이나 S3 버킷 정책을 확인하지 않는다. 권한 오류가 잡혔다는 Qiita 필자의 관측과 함께 읽으면, 권한 오류가 "잡힐 때도 있다"는 것과 권한 검증에 "쓸 수 있다"는 것은 전혀 다른 이야기다.

HN의 반응은 두 갈래였다. 한쪽은 시장 구조를 봤다. 직접 인용은 아니고 요지를 요약하면, 에이전트가 없었다면 AWS 안에서 이 많은 서비스를 에뮬레이트하겠다는 생각을 아무도 못 했을 것이고, 이로써 fakecloud나 LocalStack 같은 도구의 해자는 사라졌다는 반응이다. 같은 방식이 경쟁사가 AWS 서비스를 복제하는 일도 쉽게 만들어 클라우드가 완전히 범용재가 됐음을 드러낸다는 지적도 있었다. Cloudflare의 miniflare는 사람이 손으로 만든 것이고, "에이전트가 만들고 실제 서비스에 대고 검증하는" 방식이 진짜 새로운 점이라는 평가도 나왔다. 다른 쪽은 신뢰를 문제 삼았다. 이것이 계속 유지될 제품인지 일회성 실험인지 불분명하다며 Testcontainers 모듈이 있는 Floci를 쓰겠다는 댓글, 코드가 지난 한 달 사이 거의 전부 Claude로 생성된 것으로 보인다는 주장, 몇 달 지켜본 뒤에 판단하겠다는 반응이 이어졌다(모두 직접 인용은 아니고 댓글 요지 요약).

## 전망과 시사점 — 어디에 쓰고, 어디에 쓰지 말 것인가

실무적 결론은 Qiita 필자의 정리표가 가장 잘 요약한다. 맞는 용도는 IaC 구문 오류, 리소스 간 참조, 기본적인 생성·삭제, CI 스모크 테스트, SDK를 쓰는 앱의 결합 테스트다. 맞지 않는 용도는 IAM과 리소스 정책 검증이다. 그 밖에 몇 가지 함정이 있다. `AWS_ENDPOINT_URL`이 비어 있는 셸에서 실행하면 명령이 실제 AWS로 간다. CDK가 출력하는 URL은 실제 AWS 호스트명이라서 브라우저로 그대로 열면 안 된다. Lambda 안에서 다른 서비스를 부르려면 엔드포인트, 인증 정보, `NODE_EXTRA_CA_CERTS`를 직접 넣어 줘야 한다. 포트 매핑을 축약형으로 쓰면 에뮬레이터가 네트워크 전체에 노출되니 `127.0.0.1:9297:9297`처럼 명시해야 한다. 에뮬레이터가 하루에도 여러 번 릴리스되므로 릴리스 번호, 검증일, 사용 서비스의 충실도 점수를 기록해 두라는 권고도 있다.

특히 첫 번째 함정은 강조할 만하다. 에뮬레이터를 향하던 테스트가 환경 변수 하나가 빠지는 순간 실제 계정의 자격 증명으로 실제 AWS를 건드린다. 로컬 테스트의 안전성은 에뮬레이터가 아니라 그 환경 변수가 반드시 설정돼 있다는 전제에 달려 있다. CI에 넣는다면 엔드포인트가 비어 있을 때 실패하게 하는 사전 검사가 필수다.

향후 전개는 세 갈래로 볼 수 있다. 낙관적 시나리오에서는 충실도 테스트와 머지 게이트라는 구조가 계속 돌아 통과율이 꾸준히 오르고, AWS Emulator가 로컬 AWS 테스트의 사실상 표준이 된다. 서드파티 에뮬레이터 시장은 크게 줄어든다. 비관적 시나리오에서는 "성공했다고 보고하지만 실제로는 다른" 차이가 테스트를 공허하게 통과시키는 일이 쌓이고, 사람이 리뷰하지 않는 코드베이스에서 그 원인을 추적하기 어려워진다. 현실적 시나리오는 그 사이다. 단순한 서비스(SQS, S3, DynamoDB)는 빠르게 쓸 만해지고, CloudFormation처럼 서비스를 가로지르는 영역은 오랫동안 개별 확인이 필요하며, 보안 검증은 계속 실제 AWS의 몫으로 남는다.

## 결론

리드 질문으로 돌아가자. 사람이 리뷰하지 않은 에뮬레이터의 "통과"는 증거인가. 지금 시점의 답은 "제한된 범위의 증거"다. 이 에뮬레이터의 신뢰는 코드 리뷰가 아니라 실제 AWS에 대고 검증한 수만 개의 테스트와 머지 게이트에서 나온다. 그 신뢰는 정확히 테스트가 다루는 범위까지만 성립한다. 서비스별 통과율이 16%에서 90%까지 벌어져 있다는 사실, 그리고 CloudFormation이 성공을 보고해도 리소스가 쓸 수 없는 경우가 있다는 사실은 그 범위의 경계를 보여준다.

그래서 이 도구를 쓰는 팀이 해야 할 일은 명확하다. 에뮬레이터의 성공 응답을 테스트 결과로 그대로 쓰지 말고, 리소스를 다시 조회하거나 실제로 호출해서 확인하는 단계를 테스트에 넣어야 한다. 그리고 엔드포인트 환경 변수가 비면 실패하도록 만들어야 한다. Qiita 필자가 공식 기록에 없는 차이 세 건을 찾아낸 방식, 곧 자기 관측을 공개 이슈 목록과 대조하는 방식은 이런 도구를 대하는 좋은 모범이다.

당신의 CI는 지금 "성공"이라는 응답을 받으면 무엇을 추가로 확인하는가. 에이전트가 만든 도구가 늘어날수록 이 질문의 무게도 커진다.

---
출처:
- https://github.com/aws/aws-emulator
- https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/
- https://www.aboutamazon.com/news/aws/how-autonomous-ai-agents-built-aws-emulator
- https://qiita.com/Nana_777/items/3f3c71525d867b22c9f2
- https://news.ycombinator.com/item?id=50456631
