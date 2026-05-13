---
title: "Bambu Lab과 오픈소스의 사회 계약 — 라이선스는 지켰지만 정신은 위반한 회색지대"
description: "AGPL을 지키면서도 사용자를 클라우드에 가두는 하드웨어 제조사의 등장. 4월 GitHub 사태와 같은 주에 벌어진 이 사건은, OSS의 법적 구속력과 도덕적 구속력 사이의 거리를 정확히 드러냈다."
pubDate: 2026-05-02T00:00:00.000Z
lang: ko
pairSlug: bambu-oss-social-contract
draft: false
---

# Bambu Lab과 오픈소스의 사회 계약 — 라이선스는 지켰지만 정신은 위반한 회색지대

> 한 회사가 오픈소스 코드를 가져다 자신의 클로즈드 클라우드 안으로 사용자를 몰아넣고, 그 클라우드 밖으로 빠져나가려는 fork 개발자에게 법적 위협을 보낸다. 이때 우리는 무엇을 깨졌다고 말해야 하는가 — 라이선스인가, 아니면 라이선스가 보호하지 않는 어떤 다른 것인가.

## 도입 — 4월의 두 번째 OSS 신화 균열

2026년 5월 12일, Jeff Geerling은 자신의 블로그에 "Bambu Lab is abusing the open source social contract"라는 글을 올렸다. Hacker News 1면 상위에 곧장 진입했고, 1,200점이 넘는 점수와 380건이 넘는 댓글이 달렸다. 글의 요지는 단순했다. 3D 프린터 제조사 Bambu Lab이 OrcaSlicer라는 오픈소스 슬라이서의 fork — 더 정확히는 그 fork의 fork인 OrcaSlicer-bambulab — 의 단독 개발자에게 cease and desist를 보냈고, 그 과정에서 "impersonation attack"이라는 강한 표현으로 그 개발자를 공개 블로그에서 비난했다는 것이다.

이 사건이 단순한 한 회사의 PR 사고로 끝나지 않는 이유는, 그 며칠 전에 일어난 또 다른 사건의 그림자 때문이다. 2026년 4월 마지막 주, GitHub은 거버넌스, 가동률, 보안, 비용이라는 네 축에서 동시에 균열을 보였고, Mitchell Hashimoto는 "키보드 위에 눈물이 떨어졌다"는 글로 GitHub에서의 18년을 정리하며 떠났다. 같은 시기에 OSS 생태계 다른 한쪽 끝, 즉 하드웨어 제조사 영역에서도 비슷한 결의 균열이 보고된 것이다.

두 사건은 표면적으로 다르다. GitHub은 호스팅 SaaS이고, Bambu는 3D 프린터 제조사다. 그러나 핵심 메커니즘은 같다. 한 회사가 오픈소스라는 공유 자원 위에 자신의 사업을 올려놓되, 사용자가 그 회사의 통제를 우회하려는 순간 — 그것이 Hashimoto처럼 떠나려는 시도이든, OrcaSlicer-bambulab의 개발자처럼 fork를 만드는 시도이든 — 회사 측이 가진 비대칭적 권력(브랜드, 법무팀, 인프라 통제권)이 그 사용자에게 향한다. 그리고 그 권력의 행사는 거의 항상 합법이다. 이번 글은 이 합법성과 정당성 사이의 회색지대를 들여다 본다.

## 본문 1 — 무엇이 일어났는가: BambuNetwork와 강제 클라우드의 정치학

먼저 사실관계부터 정리하자. Bambu Lab은 2022년 X1 시리즈로 데뷔한 중국계 3D 프린터 제조사다. "그냥 동작한다(just works)"는 사용자 경험으로 시장을 빠르게 잠식했고, 2025년 즈음에는 데스크톱 FDM 프린터 시장의 사실상 표준 자리를 차지했다. 동시에 그들은 자체 슬라이서인 Bambu Studio를 배포해 왔는데, 이것은 PrusaSlicer의 fork이고, PrusaSlicer는 Slic3r의 fork이다. 모두 AGPLv3 라이선스다.

Bambu Studio가 인기를 얻은 뒤, 커뮤니티는 다시 그 fork인 OrcaSlicer를 만들었다. OrcaSlicer는 Bambu Studio의 코드를 가져와 멀티 벤더 지원과 더 많은 사용자 친화적 기능을 추가한 fork다. 즉 Bambu Lab은 자신의 슬라이서를 PrusaSlicer fork로 만들고, 그 슬라이서가 다시 OrcaSlicer로 fork된 생태계 위에서 사업을 하고 있다. AGPL의 카피레프트 사슬을 그대로 따른 것이고, 라이선스적으로는 무결하다.

균열이 시작된 지점은 슬라이서가 아니라 네트워크 계층이다. Bambu의 모든 프린터는 BambuNetwork라는 클로즈드 컴포넌트를 통해 클라우드와 통신한다. 일반 사용자가 Bambu Studio로 프린트 작업을 보내면, 그 작업은 사용자의 LAN을 떠나 Bambu의 서버를 한 번 경유한 뒤 다시 같은 집의 프린터로 돌아온다. 이는 원격 모니터링과 모바일 앱 제어를 위한 구조이지만, 결과적으로 Bambu는 사용자가 인쇄한 모든 STL의 메타데이터를 보게 된다. Geerling이 "내가 인쇄한 모든 것을 그들이 본다(they can see everything you ever print)"고 표현한 부분이 이것이다.

2025년 1월, Bambu는 한 발 더 나아갔다. Bambu Connect라는 새 인증 레이어를 도입하면서, 사실상 모든 프린터 동작 — LAN 모드의 인쇄 시작, 펌웨어 업그레이드, 카메라 스트리밍, 모션 제어 — 에 클라우드 인증을 요구하는 펌웨어 업데이트를 발표했다. 당시 공식 블로그(현재 archive.org에서도 일부 차단)에 적힌 권한 강제 항목은 다음과 같다. 프린터 바인딩/언바인딩, 원격 비디오 액세스, 펌웨어 업그레이드, 인쇄 작업 시작(LAN 또는 클라우드 모드), 모션 시스템·온도·팬·AMS 설정·캘리브레이션 등 모든 제어. Hacker News 사용자 ghostpepper는 이 변경의 의미를 한 줄로 요약했다. "원래 그들은 LAN 모드의 인쇄에도 클라우드 인증이 필요하다고 발표했고, 백래시를 보고 나서야 그 부분만 철회한 것이다(they originally announced cloud auth would be required even for printing locally in LAN mode, and only backpedalled on that when they saw the backlash)."

백래시 이후 Bambu가 도착한 타협안은 두 모드의 분리였다. "Cloud" 모드에서는 모든 기능을 쓸 수 있지만 Bambu Studio 또는 Bambu Connect 클라이언트를 강제로 거쳐야 한다. "LAN/Developer" 모드에서는 클라이언트 선택의 자유는 회복되지만 원격 모니터링은 모두 비활성화된다. Hacker News 사용자 bri3d가 정리한 표현이 가장 정확하다. "유저들이 원하는 것은 케이크를 먹으면서 동시에 케이크를 갖는 것이다 — 즉 로컬 토큰 인증과 클라우드 인증이 동시에 켜진 상태(local token authentication and the cloud authentication enabled at the same time)이다. 그것은 현재 시스템에서는 불가능하다."

OrcaSlicer-bambulab은 정확히 그 "불가능"을 가능하게 만들기 위해 만들어진 fork다. 이 fork는 Bambu Studio Linux 버전에 들어 있는 — 즉 Bambu가 직접 AGPL로 공개한 — 코드를 그대로 가져와, OrcaSlicer 안에서 BambuNetwork 호출을 발생시킬 수 있게 한다. 결과적으로 사용자는 OrcaSlicer라는 자유로운 슬라이서를 쓰면서도 Bambu의 클라우드 기능 일부를 잃지 않는다. Bambu Lab의 4월 발표는 바로 이 fork에 대한 cease and desist의 형태로 나왔다. 그들은 그 fork가 "공식 Bambu Studio 클라이언트인 것처럼 가장하기 위해 위조된 신원 메타데이터를 네트워크 통신에 주입했다(injected falsified identity metadata into network communication)"고 비난했다. 그러나 그 fork의 개발자가 응수한 것처럼, 그 코드는 Bambu가 스스로 공개한 Linux용 Bambu Studio의 코드를 그대로 사용한 것이었다.

여기까지가 사실관계다. 라이선스 위반은 어디에서도 일어나지 않았다. AGPL은 누구라도 fork와 재배포를 허용한다. 그러나 Geerling의 글 제목이 "abusing the open source social contract"인 이유는, 깨진 것이 라이선스가 아니라 라이선스 외부의 어떤 약속이기 때문이다. 그 약속은 무엇인가.

## 본문 2 — OSS 사회 계약의 본질: 라이선스가 보호하지 않는 것들

오픈소스 라이선스는 본질적으로 두 가지를 보장한다. 코드를 읽을 권리와, 코드를 수정·재배포할 권리. 이 두 권리는 법정에서 강제 가능하다. 그러나 OSS 생태계가 30년에 걸쳐 만들어 온 것은 이 두 권리만이 아니다. 그것은 일종의 비공식적 사회 계약이고, 그 계약은 대개 다음과 같은 항목으로 구성된다.

첫째, **상호성**. 커뮤니티의 코드를 가져다 쓰는 회사는 그 커뮤니티에 어떤 형태로든 환원해야 한다. 그것은 패치 기여일 수도, 자금 지원일 수도, 단순한 신뢰 표시일 수도 있다.

둘째, **무력 행사 자제**. 라이선스가 허용하는 한, 사용자가 코드를 어떻게 쓰든 — 개인 fork이든 상업적 fork이든 — 회사는 법적 위협이라는 카드를 함부로 꺼내지 않는다. 라이선스가 허락한 일을 회사가 사후적으로 막으려 들면, 그것은 법적으로는 가능하지만 정치적으로는 신호가 된다.

셋째, **사용자 자율성의 존중**. 사용자가 산 하드웨어는 사용자의 것이고, 사용자가 산 소프트웨어 라이선스는 그 안에서 자유롭게 쓰일 수 있어야 한다. 클라우드 통합은 옵션이어야지 강제여서는 안 된다.

Bambu Lab의 사례는 이 세 항목 중 두 번째와 세 번째를 정면으로 위반한다. 첫 번째 항목 — 상호성 — 은 그들이 일부 지키고 있다고도 볼 수 있다. Bambu Studio 자체는 AGPL로 공개되어 있고, Linux 빌드도 제공된다. 그러나 그 공개된 코드를 가져다 만든 fork에 대해 cease and desist를 보내는 순간, 그들은 자신이 라이선스로 부여한 권리를 자신이 다시 빼앗으려 하고 있다. 라이선스 텍스트는 그 권리를 빼앗는 행위 자체를 막지 못한다. 법적 위협의 비용 — 변호사 비용, 시간, 정신적 부담 — 은 fork 개발자 한 사람이 떠안기에는 너무 크기 때문이다.

Hacker News 댓글창에서 이 비대칭은 여러 각도에서 짚혔다. danielrmay는 보안 관점에서 Bambu의 주장을 해체했다. "'그것이 공식 클라이언트인 것처럼 가장했다'는 말은, 그 메커니즘이 클라이언트가 보낸 메타데이터에 의존하고 있다면 보안 논변이 될 수 없다. 그것은 임퍼소네이션이 아니라, Bambu가 사용자 에이전트 문자열은 인증이 아니라는 사실을 발견한 것이다(That's not impersonation. That's Bambu discovering that user agents are not authentication)." 9cb14c1ec0은 같은 결의 다른 지점을 지적했다. Bambu가 블로그에서 "허가받지 않은 트래픽의 스파이크가 서비스 중단을 야기했다"고 한 부분에 대해, "그러니까 자기네 프린터가 인기 있는 것이 문제이고, 인프라를 스케일링하는 수고는 하기 싫고, 그래서 USER AGENT STRING으로 모든 것을 게이팅하겠다는 거다. 이 변명을 나는 믿지 않는다(So it's a problem that their printers are popular, and they can't be bothered to scale their infra, so let's gate everything based on USER AGENT STRING!)."

JoheyDev888은 OSS 사회 계약을 가장 직접적으로 호명했다. "Bambu Studio는 말 그대로 PrusaSlicer fork다. 커뮤니티 위에 올라타 놓고 그 커뮤니티를 위협해서는 안 된다(Bambu Studio is literally a PrusaSlicer fork. You don't get to build on the community and then threaten it)." 이 한 문장이 사회 계약의 골자다. 받은 것이 있다면, 적어도 그 받은 출처가 정한 규범 — 라이선스 텍스트가 아니라 그 규범 — 안에서 행동해야 한다는 것.

Bambu의 항변은 두 가지 축을 가진다. 첫째, 무허가 트래픽이 인프라를 위협한다는 보안적 주장. 둘째, 허가 없이 만든 fork가 fork 사용자에게 보안 위험이 될 수 있다는 책임론적 주장. 두 주장 모두 표면적으로는 그럴듯하다. 그러나 그 주장이 정당화하려는 행동 — 단독 fork 개발자에 대한 공개 비난과 법적 위협 — 과의 균형이 맞지 않는다. daemonk가 댓글에서 적은 "동의하지 않는 것은 그들의 운영적 입장이 아니라 그들의 처리 방식이다(I don't disagree with Bambu from an operational standpoint, but disagree with their handling of this). 사용자가 비공인 소프트웨어로 자기네 클라우드에 접근하기를 원하지 않는다면, 그저 인증을 붙이고 명시적으로 그렇게 알리면 된다"는 지적이 가장 균형 잡힌 평가에 가깝다.

여기에서 GitHub 4월 사건과 Bambu 5월 사건의 공통점이 드러난다. 두 회사 모두 단기적으로 합리적이고 합법적인 결정을 내렸다. GitHub은 30배의 부하를 처리하기 위해 가격 정책을 조정했고, Bambu는 자기 서버 부하를 보호하기 위해 인증 레이어를 강화했다. 그러나 두 결정 모두, 그동안 회사가 누려 온 — 그리고 그 회사가 의식적으로 누리고 있는지조차 잊은 — OSS 커뮤니티의 호의를 비용으로 치렀다. OSS 사회 계약의 무서움은, 그 계약이 깨졌을 때 즉각적인 법적 청구가 발생하지 않는다는 점이다. 청구는 몇 년 뒤, 회사가 새 사용자를 잃기 시작할 때, 그리고 가장 중요하게는 채용 시장에서 그 회사의 평판이 떨어졌을 때 도착한다.

## 본문 3 — Fork가 항의의 도구가 되는 순간, 그러나 그 한계

Bambu에 대한 커뮤니티의 응답은 신속했다. Cease and desist가 알려진 며칠 안에 FULU Foundation이라는 새 비영리 단체 명의로 OrcaSlicer-bambulab의 거울 fork가 GitHub에 다시 올라왔다. 이 fork의 README는 단순하다. "이 버전의 OrcaSlicer는 Bambu Lab 프린터에 대한 BambuNetwork 지원을 완전히 복구한다. 당신은 LAN에만 제한되지 않는다. 이전과 똑같이 인터넷을 통해 BambuNetwork로 작동한다(You are not limited to LAN only. It works over the internet just like before, through BambuNetwork)." FULU Foundation은 자신의 슬로건으로 "Fighting for Digital Ownership Rights"를 내세우고 있다. 이 표현은 의도적이다. 그들은 자신을 단순한 OrcaSlicer fork 메인테이너가 아니라 디지털 소유권 운동의 한 노드로 정의한다.

Fork를 항의의 도구로 쓰는 것은 OSS 역사에서 새로운 일이 아니다. OpenOffice → LibreOffice, MySQL → MariaDB, ElasticSearch → OpenSearch, Redis → Valkey. 모두 모회사의 라이선스 변경이나 거버넌스 결정에 대한 항의로 만들어진 fork이고, 모두 어느 정도 모회사의 행보에 영향을 끼쳤다. OrcaSlicer-bambulab도 같은 가계도에 들어간다. 다른 점은, 이 fork가 막아 내려는 것이 라이선스 변경이 아니라 라이선스 외부 — 즉 클라우드 API와 펌웨어 — 의 통제 강화라는 점이다.

여기에서 fork 전략의 결정적 한계가 드러난다. OrcaSlicer-bambulab은 슬라이서 fork이지 펌웨어 fork가 아니다. Bambu가 다음 펌웨어 업데이트에서 BambuNetwork API의 인증 메커니즘을 변경하면 — 예컨대 단순한 사용자 에이전트 검사가 아니라 디바이스 측에서 생성한 attestation 토큰을 요구하면 — 이 fork의 우회 메커니즘은 즉시 무력화된다. 댓글창의 morphle가 다소 극단적인 표현으로 호소한 "Bambu 펌웨어를 처음부터 다시 만드는 어셈블리 프로그래머에게 우리가 십시일반 돈을 보내야 한다"는 주장은 정확히 이 한계를 지목한다. 슬라이서는 fork할 수 있어도 펌웨어는 fork하기가 어렵다는 것이다. 그리고 펌웨어를 통제하는 자가 결국 하드웨어를 통제한다.

이 점에서 GitHub 사례와 Bambu 사례 사이에는 중요한 비대칭이 있다. 4월 GitHub 사태에 대한 응답으로 Hashimoto는 떠나겠다고 선언할 수 있었고, Codeberg와 GitLab과 자체 호스팅 같은 대안이 (불완전하나마) 존재한다. SaaS는 이론적으로 떠날 수 있다. 그러나 Bambu 사례에서 사용자는 이미 산 하드웨어를 떠날 수 없다. mrdoosun의 댓글이 이 점을 정리한다. "여기서 중요한 것은 단순히 프린터 지원이 아니라, 사용자가 이미 가진 하드웨어를 벤더 클라우드 경로 없이 계속 쓸 수 있느냐이다. 로컬 네트워크 지원은 사라지기 전까지는 편의 기능처럼 보인다. 사라지고 나서야 그것이 소유권 모델의 일부였음이 명백해진다(Local network support tends to look like a convenience feature until it disappears. Then it becomes obvious that it was part of the ownership model)."

소비자 측 응답으로는 시장 보이콧이 있다. 1년 전 Bambu의 첫 클라우드 강제 시도 이후 syntaxing이 댓글에 적은 것처럼 "고객으로서 압력을 가하는 것이 회사의 방향을 움직이는 방법이다(Putting pressure as a customer is how you steer company's direction)." 그러나 이 압력의 약점은 명확하다. 그 압력이 작동하려면 충분한 수의 신규 구매자가 다른 선택을 해야 하고, 그 다른 선택에는 최소한 비교 가능한 사용자 경험이 있어야 한다. 댓글창의 추천 대안은 Prusa, Snapmaker U1, Creality K2 Plus 같은 후보로 수렴되지만, kn100이 지적한 대로 "Bambu만큼 그냥 동작하는(just works)" 경험을 제공하면서도 가격이 같은 대안은 현재 존재하지 않는다. Prusa는 비싸고 나머지는 약간의 학습 비용을 요구한다.

이 비대칭 — 비교 가능한 대안의 부재 — 이 바로 Bambu 같은 회사가 OSS 사회 계약을 비용 없이 위반할 수 있는 구조적 이유다. 회사는 자신이 위반하더라도 다음 분기 매출에 큰 영향이 없다는 사실을 안다. 그리고 그 사실이 사회 계약의 가장 약한 지점이다. 라이선스 위반은 법정에서 처벌받지만, 사회 계약 위반은 시장이 처벌한다. 그리고 시장이 처벌하려면 시장이 충분히 성숙해 있어야 한다.

## 결론 — 두 가지 깨짐, 하나의 풍경

처음 던진 질문으로 돌아가자. 한 회사가 오픈소스 코드를 자신의 클로즈드 클라우드에 통합하고, 그 클라우드 밖으로 나가려는 fork 개발자에게 법적 위협을 보낼 때, 무엇이 깨진 것인가.

라이선스는 깨지지 않았다. AGPL은 그대로다. Bambu의 행위는 AGPL의 어느 조항도 위반하지 않는다. fork 개발자가 Bambu Studio의 코드를 가져다 쓴 것도 AGPL이 허용한다. 그러나 깨진 것은 그 라이선스 위에 30년 동안 쌓아 올려진 비공식적 약속들 — 받은 만큼 돌려준다는 상호성, 라이선스가 허용한 일을 사후적으로 막지 않는다는 자제, 사용자가 산 하드웨어는 사용자의 것이라는 자율성 — 이다. 이 약속들은 어디에도 적혀 있지 않고, 어떤 법정도 강제하지 않는다. 그것이 약점이다.

그러나 그 약점이 곧 무력함을 의미하지는 않는다. FULU Foundation의 fork가 출현 첫 주에 1.7k 스타와 423개의 fork를 모은 것은, 그 약속들이 코드 한 줄 한 줄에 새겨져 있지 않더라도 커뮤니티의 기억 안에 새겨져 있음을 보여 준다. Louis Rossmann이 그 fork 개발자의 법적 비용을 위해 1만 달러를 즉각 약속한 것도 같은 맥락이다. 사회 계약은 법으로 강제되지 않지만, 누군가가 그것을 위반했을 때 그 위반을 기록하고 항의하는 사회적 메커니즘은 작동한다.

4월의 GitHub과 5월의 Bambu, 두 사건의 공통된 메시지는 결국 이렇다. 회사가 OSS 위에서 사업을 한다는 것은, 라이선스를 지키는 것 이상의 의무를 진다는 뜻이다. 그 의무를 지키지 않을 자유도 회사에는 있지만, 그 자유의 행사는 무료가 아니다. 청구서는 이번 분기가 아니라 다음 다음 분기에, 신규 사용자가 다른 옵션을 검토하기 시작할 때, 그리고 가장 천천히 — 그러나 가장 확실하게 — 기존 사용자가 다음 구매에서 다른 브랜드를 고려할 때 도착한다. Bambu가 그 청구서를 받기까지 얼마나 걸릴지는 알 수 없지만, 그 청구서가 도착하는 순간 가장 먼저 떠오를 이름은 OrcaSlicer-bambulab의 그 단독 개발자일 것이다.

---

출처:

- Jeff Geerling, "Bambu Lab is abusing the open source social contract," 2026-05-12. https://www.jeffgeerling.com/blog/2026/bambu-lab-abusing-open-source-social-contract/
- Hacker News discussion, item 48109224, 2026-05-12. https://news.ycombinator.com/item?id=48109224
- FULU-Foundation/OrcaSlicer-bambulab, GitHub repository. https://github.com/FULU-Foundation/OrcaSlicer-bambulab
- Hacker News discussion, "Restore full BambuNetwork support for Bambu Lab printers," item 48115127. https://news.ycombinator.com/item?id=48115127
- FULU Foundation, https://www.fulu.org/
- Bambu Lab firmware update notice (referenced via archive.org), https://blog.bambulab.com/firmware-update-introducing-new-authorization-control-system/
