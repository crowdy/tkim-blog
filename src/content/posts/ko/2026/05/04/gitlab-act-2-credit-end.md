---
title: "GitLab Act 2 — CREDIT의 종언, 그리고 핸드북 회사의 정체성 포기"
description: "GitLab은 정리해고와 CREDIT 가치관 폐기를 동시에 발표했다. all-remote와 transparent handbook으로 실리콘밸리의 안티테제를 자처해 온 회사가 그 정체성의 마지막 한 줄까지 내려놓는다는 신호다. 한 주 전의 GitHub 균열과 함께 보면 'Git forge SaaS'라는 카테고리의 비즈니스 모델 자체가 흔들리고 있다."
pubDate: 2026-05-04T00:00:00.000Z
lang: ko
pairSlug: gitlab-act-2-credit-end
draft: false
---

# GitLab Act 2 — CREDIT의 종언, 그리고 핸드북 회사의 정체성 포기

> GitLab의 CREDIT 종료 발표는 단순한 가치관 리뉴얼인가, 아니면 "all-remote, transparent, handbook-first"라는 실리콘밸리 안티테제 정체성의 공식 포기 선언인가. 그리고 그것이 사실이라면, 우리가 12년 동안 "투명한 회사의 모범"이라고 불러 온 것은 무엇이었나.

## 도입 — 두 번째 막의 첫 장면

2026년 5월 4일 새벽, GitLab CEO Bill Staples는 회사 공식 블로그에 "GitLab Act 2"라는 제목의 글을 올렸다. 같은 시각 사내에는 정리해고 통지가 나갔다. 회사가 활동하던 18개 국가 중 최대 30%에서 사업을 접고, 일부 부서에서는 관리 계층을 세 단계까지 줄이며, R&D는 약 60개의 더 작고 독립적인 팀으로 재편된다. 5월 18일까지는 자발적 퇴사 신청 창구가 열려 있다. 회사는 같은 발표에서 12년 동안 회사의 영혼이라고 불러 온 CREDIT 가치관 — Collaboration, Results, Efficiency, Diversity·Inclusion·Belonging, Iteration, Transparency — 의 종료를 함께 알렸다. 그 자리에는 Speed with Quality, Ownership Mindset, Customer Outcomes라는 세 가지 새 운영 원칙이 들어선다.

발표가 Hacker News 1면에 오른 직후 게시판에서는 두 가지 반응이 동시에 나왔다. 한쪽은 "한 회사가 흔한 다운사이징을 발표했을 뿐이다"라는 시큰둥한 반응이었고, 다른 한쪽은 "이건 다운사이징이 아니라 정체성 폐기 선언이다"라는 격앙된 반응이었다. 둘 다 부분적으로 옳다. 인원 감축의 절대 규모는 다른 빅테크의 사례에 비하면 작은 편이다. 그러나 GitLab이 폐기한다고 선언한 것이 단순한 인사 정책이 아니라 회사의 존재 이유 그 자체였다는 점에서, 이 발표는 보통의 정리해고 공지와는 다른 무게를 갖는다.

GitLab은 2014년 우크라이나에서 시작해 처음부터 사무실이 없는 회사였다. CEO와 CTO가 각각 다른 대륙에 살았고, 모든 회의록과 인사 정책과 급여 구조가 공개 핸드북 위에 적혔다. 그 핸드북은 2,700페이지를 넘기며 "투명한 원격 회사가 어떻게 운영되는가"의 사실상 표준 텍스트가 됐다. CREDIT의 D — Diversity, Inclusion, Belonging — 와 T — Transparency — 는 그 정체성의 두 기둥이었다. 5월 4일 새벽, GitLab은 그 두 기둥을 새 운영 원칙 어디에서도 호명하지 않기로 결정했다. 한 주 전 GitHub이 한 주에 다섯 개 축에서 동시에 흔들리는 모습을 보였다면, GitLab은 한 발표에서 자기 정체성의 두 기둥을 한꺼번에 내려놓는 모습을 보였다. Git forge SaaS라는 카테고리 자체에 무엇이 일어나고 있는 것인가.

## 본문 1 — Act 2가 정확히 무엇을 발표했는가

먼저 발표 그 자체를 정리해 보자. Bill Staples는 글 첫머리에서 이번 재편을 "에이전트 시대(agentic era)에 맞춰 회사의 모양을 다시 잡는 일"이라고 정의했다. 그가 제시한 진단은 두 줄로 요약된다. "운영적으로 우리는 지난 시대에 맞는 모양으로 자라났고, 그 모양은 이번 시대에 맞지 않는다(Operationally, we grew into a shape that was right for the last era and isn't right for this one)." 그리고 "에이전트 시대는 우리 회사 역사상 가장 큰 기회를 GitLab에게 제공한다(The agentic era affords GitLab the largest opportunity in our history as a company)." 정리해고 발표 안에 "최대의 기회"라는 표현이 들어 있다는 것은 그 자체로 이 글의 톤을 보여 준다.

구체적인 구조 변경은 네 갈래다. 첫째, 국가 풋프린트 축소. 현재 GitLab이 정식으로 고용 인프라를 운영하는 18개 국가 중 최대 30%에서 운영을 종료한다. Simon Willison이 댓글에서 지적했듯, 이는 핸드북의 employment-solutions 페이지에 등재된 다섯 개가량의 국가가 사라진다는 뜻이다. 둘째, 관리 계층 평탄화. 일부 부서에서 최대 세 개 층의 관리 계층을 제거한다. 셋째, R&D 재편. 기존 팀들을 약 60개의 더 작고 자율적인 팀으로 재구성하며, 독립 팀의 수를 거의 두 배로 늘린다. 넷째, 자발적 퇴사 창구. 5월 18일까지 자발적 퇴사 신청을 받고 그에 따른 패키지를 제공한다. 절감된 비용은 R&D 가속화와 GTM(Go-To-Market) 강화에 재투자된다고 명시했다. Q1과 FY27 가이던스는 그대로 유지되며, 재무 세부 사항은 6월 2일 어닝콜에서 공유된다.

CREDIT 종료는 같은 발표 안에서 별도의 장으로 다뤄진다. Staples는 CREDIT가 "회사의 첫 번째 장(first chapter)을 이끌어 준 가치관"이었음을 인정하면서도, 두 번째 장에 맞는 새 운영 원칙이 필요하다고 적었다. 그가 제시한 세 원칙은 다음과 같다. **Speed with Quality** — 더 강한 가드레일과 함께 더 빠르게 움직이기. **Ownership Mindset** — 일에 가장 가까운 사람에 의한 자율적 의사결정. **Customer Outcomes** — 내부 활동이 아니라 고객 임팩트로 성공을 측정하기. 이 세 항목은 영어 문구 자체로 보면 매우 평범한 SaaS 회사의 OKR 헤더다. 그러나 이 세 항목이 들어선 자리에서 사라진 것이 D와 T라는 점에서, 평범함의 의미가 뒤집힌다.

CREDIT의 여섯 글자 중 어떤 것이 새 원칙으로 흡수되고, 어떤 것이 사라졌는지를 한 번 매핑해 보자. C(Collaboration)는 Ownership Mindset의 자율 결정 안에 분산됐다고 볼 수 있다. R(Results)와 E(Efficiency)는 Speed with Quality와 Customer Outcomes로 흡수됐다. I(Iteration)는 Speed with Quality의 "더 빠르게"에 들어갔다. 그러면 남는 것이 D — Diversity·Inclusion·Belonging — 와 T — Transparency — 두 글자다. 이 두 글자가 어디로 갔는지에 대해서는 발표문 어디에도 명시적인 답이 없다. 운영 원칙의 이름에서도, 본문의 설명에서도 "diversity"나 "transparency"라는 단어는 등장하지 않는다. 회사가 새 가치관을 발표하면서 옛 가치관 중 어떤 것을 버렸는지 명시하지 않은 것이 우연이라고 보기는 어렵다.

또 하나 주목할 부분은 Staples가 직접 적은 다음 문장이다. "우리의 투명한 재편 절차는 진짜이고 어려운 불확실성을 만든다, 그리고 나는 그걸 부정하지 않을 것이다(Our transparent restructure process creates uncertainty that is real and it's hard, and I'm not going to pretend otherwise)." HN의 hemul3n은 이 문장을 두고 "이건 의심스럽게도 Claude가 쓴 것 같다(reads suspiciously like Claude)"고 쓴웃음 섞인 평을 남겼다. 더 본질적인 문제는 다른 데 있다. T를 가치관 목록에서 빼면서 같은 글에서 "transparent restructure process"라는 표현을 쓰는 것은 모순이라기보다, T가 이제 가치관이 아니라 기법(technique)으로 격하되었다는 신호다. 가치관에서 빼고 형용사로 살아남은 단어는 회사의 정체성에서는 사라지지만 마케팅 카피에서는 살아남는다.

## 본문 2 — handbook 회사가 왜 지금 정체성을 바꾸는가

GitLab이 가치관을 갈아 끼운 진짜 이유는 발표문 자체에 적혀 있지 않다. 그러나 그 이유를 추적할 단서는 충분히 많다.

가장 직접적인 단서는 주가다. simonw가 HN 댓글에서 지적했듯, GitLab 주식은 1년 전 약 52달러에서 발표 직전 약 26달러로 50% 가까이 떨어진 상태였다. 같은 기간 GitHub은 Microsoft에 흡수되어 더 이상 시장에서 따로 평가받지 않으니 비교가 어렵지만, 코딩 에이전트 사용량의 폭발적 증가에도 불구하고 가장 자연스러운 수혜자여야 할 Git forge SaaS의 주가가 절반이 됐다는 사실은 시장의 메시지로 해석된다. simonw의 표현을 빌리면, "투자자들의 두려움이 AI가 GitLab의 비즈니스를 *덜* 가치 있게 만든다는 것이라면, GitLab Act 2 발표에 이 문장을 끼워 넣은 것은 매우 합리적이다." 그가 인용한 그 문장은 다음과 같다. "에이전트 시대는 소프트웨어 수요를 곱한다. (...) 작년에 개발자 플랫폼 시장은 사용자당 월 수십 달러로 측정됐다, 올해는 사용자당 월 수백 달러이고, 수천 달러를 향해 가고 있다(Last year, the developer platform market used to be measured in tens of dollars per user per month, this year it is hundreds/user/month and headed to thousands)."

이 문장이 진실이라면 GitLab은 정리해고를 할 이유가 없다. 사용자당 매출이 십 배에서 백 배로 증가한다면 그것은 채용 사유다. 따라서 이 문장은 사실 진술이 아니라 투자자에게 보내는 시그널에 가깝다. HN의 torben-friis는 같은 모순을 더 단순하게 지적했다. "역사상 가장 큰 기회를 만나려면, 자원이 더 적게 필요하다고 그들은 믿는다. 그게 어떻게 따라오는지 나는 잘 이해가 안 된다(To meet their largest opportunity ever, they believe they need less resources. I'm not sure I understand how that follows)." Staples 자신도 이 모순을 의식한 것으로 보인다. 그가 제시한 답은 "내부 프로세스를 AI 에이전트로 재배선해서, 리뷰·승인·핸드오프를 자동화하고 우리를 가속한다(We're rewiring internal processes with AI agents, automating the reviews, approvals, and handoffs to speed us up)"는 것이었다. torben-friis는 이 답에 대해 다시 묻는다. "이게 '우리는 두 배로 빨리 코드를 만든다, 병목은 리뷰니까 YOLO하면 병목 없음'의 목록에 들어가는 것인가? 나는 아직 그것에 대한 설득력 있는 정당화를 본 적이 없다."

여기에 또 다른 댓글이 더 무거운 무게로 얹힌다. dunder_cat의 댓글이다. "CVE-2023-7028(이메일 사이에 세미콜론을 넣으면 비밀번호 재설정 메일이 두 사람에게 가는, 계정 탈취 취약점)이 내 클러스터를 상대로 익스플로잇된 적이 있다. 완전 자동화된 변경과 리뷰에 대한 자랑은 나를 두렵게 한다. 결함 코드는 AI가 쓴 것이 아니었지만, GitLab은 많은 작은 조직과 그들의 가장 소중한 자원 사이에 서 있는 존재다. 운 좋게 2FA가 피해를 막았지만, 다음번에는 무엇이 막아 줄 것인가." 이 댓글은 "Speed with Quality"라는 새 원칙의 균형이 어느 쪽으로 기울고 있는지를 의심하게 만드는 가장 솔직한 진술이다. Speed가 Quality 앞에 오는 단어 순서는 우연일 수도 있고, 의도일 수도 있다.

handbook 회사라는 정체성의 균열은 더 일찍부터 신호를 보내고 있었다. simonw가 인용한 핸드북 페이지에는 "Diversity, Inclusion & Belonging is one of our core values"라는 문장이 그대로 남아 있다. 그가 일부러 permalink를 걸어 둔 이유는, 그 문장이 곧 사라질 것이기 때문이다. 핸드북에 한 줄이 추가되는 것이 아니라 한 가치관이 통째로 빠지는 일은 GitLab 핸드북의 12년 역사에서 처음 있는 일이다. 더 흥미로운 것은 simonw가 함께 인용한 옛 payroll.md 페이지다. GitLab은 한때 모든 국가의 급여 구조를 공개 핸드북에 적었다. 몇 년 전 그 페이지는 비공개로 옮겨졌다. T가 가치관 목록에서 빠지는 일은 어느 날 갑자기 일어난 사건이 아니라, 여러 해 동안 진행된 후퇴의 마지막 한 걸음이다.

shimman의 한 줄짜리 댓글은 그래서 가혹하지만 정확하다. "GitLab은 결코 상장 회사가 되지 말았어야 할 라이프스타일 회사의 좋은 예다(GitLab is a great example of a lifestyle company that should have never become a public corporation)." 라이프스타일 회사라는 표현에는 조롱이 섞여 있지만, 그 안에는 구조적 진단이 들어 있다. 분기마다 어닝콜에서 성장률을 답해야 하는 상장 회사가 "transparent handbook을 우리 정체성으로 둔다"는 가치관을 끝까지 지키기는 어렵다. 핸드북 회사는 비상장이거나 비영리일 때 가장 잘 작동한다. 상장 GitLab의 12년은 그 명제의 검증이었고, 5월 4일은 그 검증의 결론이 발표된 날이다.

또 한 갈래의 단서는 제품 자체에 있다. 댓글창에는 GitLab의 제품 로드맵에 대한 비판이 줄을 잇는다. usernametaken29는 "GitLab은 그들의 제품 로드맵이 얼마나 나쁜지에 대해 끊임없이 나를 놀라게 한다. CI 개선 같은 실용적인 것들은 유니콘 색상의 UI 리브랜딩 뒤로 밀린다(Practical things like CI improvements are put off over UI rebranding on unicorn colours)"고 적었다. vultour는 더 신랄하다. "내가 발견한 모든 문제에 대해 4년에서 7년 된 오래된 이슈가 항상 열려 있었고, 매니저들이 무작위 라벨을 붙였다 떼었다 하고 있을 뿐인 소프트웨어와 상호작용해 본 것은 처음이었다. AI로 인한 그 엄청난 개발자 생산성 향상으로, 마침내 이 오래된 이슈들을 빠르게 고치고 백로그를 청소할 수 있을 것이다. 아니, AI 덕분의 'workforce reduction' 또. 이 사기극은 지루해지고 있다(This charade is getting boring)." petetnt는 한 번 더 비튼다. "현재 AI 셋업으로도 GitLab은 위대하다고 부를 만한 UX를 만들지 못했다. 남은 인간 요소를 제거하면 무엇을 만들 수 있을지 기대된다." 이 댓글들이 공통으로 가리키는 것은, GitLab의 진짜 문제는 인력의 양이 아니라 우선순위의 방향이라는 진단이다. 그리고 새 운영 원칙 어디에도 "open issues를 줄인다"는 항목은 없다.

## 본문 3 — Git forge SaaS의 4구도와 그 너머

이제 한 주 전의 GitHub 이야기와 이번 주의 GitLab 이야기를 같은 평면에 놓아 보자. 4월 마지막 주에 GitHub은 거버넌스, 가동률, 보안, 비용, 공급망 무결성이라는 다섯 축에서 동시에 균열을 보였다. 5월 첫 주에 GitLab은 정리해고와 가치관 폐기를 동시에 발표했다. 두 사건의 표면적 양상은 다르지만, 같은 한 가지 질문을 가리킨다. Git을 호스팅하고 그 위에 CI와 이슈와 패키지 레지스트리를 올려서 사용자당 월 구독료를 받는 비즈니스 모델 — 즉 Git forge SaaS — 는 에이전트 시대에도 같은 모양으로 작동하는가.

simonw가 인용한 GitLab 본문의 한 문장을 다시 보자. 사용자당 월 매출이 수십 달러에서 수백 달러, 수천 달러를 향한다는 진단이다. 만약 그 진단이 맞다면, 그것은 인간 사용자에게 그렇다는 뜻이 아니다. 인간 한 명이 한 달에 수천 달러어치의 코드 호스팅을 소비할 방법은 없다. 그 매출은 결국 인간이 띄운 에이전트들이 인간을 대신해 결제하는 매출이다. 즉 Git forge SaaS의 미래 고객은 인간이 아니라 에이전트이고, 에이전트는 인간보다 훨씬 더 많은 PR을 만들고, 훨씬 더 많은 CI를 돌리며, 훨씬 더 가격에 민감하지 않다. 이 가설이 맞다면 GitHub의 30배 부하 발표와 GitLab의 "사용자당 수천 달러" 시그널은 같은 한 가지 풍경을 두 회사가 다른 각도에서 묘사한 것이다.

문제는 이 풍경 안에서 살아남는 형태가 반드시 SaaS여야 할 이유가 없다는 점이다. fidotron의 댓글은 그래서 의미심장하다. "지금 GitHub의 트레인렉을 (GitLab이) 자본화하지 못하고 있다는 사실 자체가 많은 것을 말해 준다. 만약 그들에게 옳은 제품이 있었다면, 사람들은 그들에게 돈을 던지고 있을 것이다(The fact they can't capitalize on the current trainwreck of GitHub speaks volumes. If they had the right product people would be throwing money at them)." 이 댓글이 가리키는 빈자리는 단순히 "더 좋은 GitLab"의 빈자리가 아니라, "GitHub도 GitLab도 아닌 무언가"의 빈자리에 더 가깝다.

그 빈자리의 후보들을 다시 점검해 보자. **Codeberg**는 비영리 Forgejo 기반 포지로, GitHub 균열 이후 의미 있는 마이그레이션 흐름을 받았다. 그러나 Codeberg는 정의상 "사용자당 월 수천 달러"의 비즈니스 모델을 거부하는 곳이다. 거기에서 받는 것은 안정성이지 에이전트 시대의 인프라가 아니다. **자체 호스팅 Forgejo·Gitea**는 운영 부담이 높지만, 에이전트 시대에는 그 운영 부담의 일부를 다시 에이전트가 짊어질 수 있다. 자체 호스팅이 한 번 더 매력을 회복할 수 있는 시나리오가 여기 있다. **GitLab Self-Managed**는 가장 흥미로운 카드다. GitLab은 이미 Self-Managed 라이선스 모델을 갖고 있고, 이번 발표가 SaaS 사업의 모양을 바꾼다고 해서 Self-Managed의 가치까지 사라지지는 않는다. 오히려 SaaS GitLab의 핸드북적 신뢰가 흔들리는 동안, 코드를 자기 인프라에 두고 라이선스만 사는 Self-Managed가 부분적인 안전선으로 다시 평가될 수 있다. 그리고 **GitHub**은 — 여전히 가장 큰 디스커버리 풀이고, Microsoft의 자본을 등에 업은 가장 큰 에이전트 친화 인프라다. 균열이 있어도 떠나기 어려운 종류의 균열이다.

이 4구도 어디에서도 "transparent handbook 회사"라는 자리는 보이지 않는다. 그것이 GitLab이 그 자리를 비우고 떠나는 이유다.

bayindirh의 댓글은 한 발 더 멀리 간다. "소프트웨어는 기계가 사람의 지시 아래 만들 것이다. AI는 미래 소프트웨어가 만들어질 기반(substrate)이다. 에이전트가 계획하고, 코딩하고, 리뷰하고, 배포하고, 수리할 것이다." Staples의 이 문장에 대해 그는 E. M. Forster의 1909년 단편 "기계가 멈춘다(The Machine Stops)"를 인용한다. "솔직히 사람들이 이전 사람들이 세워 둔 경고 사인을 얼마나 반복적으로 무시하거나 모르는지 믿을 수가 없다." 이 댓글은 직접적인 인프라 분석과는 거리가 있지만, 그것이 가리키는 정서 — 한 회사의 정체성이 한 발표로 바뀌는 일이 너무 쉬워 보인다는 정서 — 는 댓글창의 다른 많은 반응 안에 다른 어휘로 깔려 있다. handbook 12년이 한 발표로 폐기될 수 있다면, 그 핸드북 위에 작성된 모든 약속의 무게는 무엇이었나.

TeeWEE의 댓글은 다른 각도에서 같은 문제를 짚는다. "Git 자체는 분산되어 있고 스케일을 위해 설계됐다. 그들이 'Git'이라고 쓴 것은 'GitLab'이라는 뜻이라고 짐작한다. 그렇게 큰 실수가 발견되지 않고 지나갔을 리는 없으니까. 그들은 Git을 다시 만들 작정인가?" 이 부분은 발표문에 정말 그렇게 적혀 있다. "Git itself is being reengineered for machine scale." TeeWEE의 지적은 두 가지 가능성을 시사한다. 첫째, Staples가 진짜 Git을 다시 만들겠다는 뜻이라면 그것은 거대한 야심이다. 둘째, GitLab을 Git으로 잘못 쓴 것이라면 그것은 IR 카피의 부주의다. 어느 쪽이든 핸드북 회사의 정밀함과는 거리가 있다.

## 결론 — 두 번째 막의 관객

이 글의 첫머리에서 던진 질문으로 돌아가 보자. CREDIT 종료는 단순한 가치관 리뉴얼인가, 아니면 정체성의 공식 포기 선언인가.

답은 두 번째에 가깝다. 가치관을 리뉴얼하는 회사는 보통 옛 가치관 중 무엇이 새 항목 어디로 들어갔는지 매핑을 함께 공개한다. GitLab의 발표에는 그런 매핑이 없다. D와 T가 새 운영 원칙의 어느 모서리로 흡수됐는지 본문에 없다는 사실은, 그것이 "흡수되지 않았다"는 뜻에 가깝다. 핸드북의 D 페이지는 곧 수정될 것이고, T라는 단어는 가치관에서는 빠지고 형용사로만 남을 것이다. 12년 동안 GitLab을 GitLab으로 만들어 온 두 글자가 그렇게 사라진다.

그 사라짐이 이상한 이유는, 그것이 비밀스럽게 일어나지 않고 공개적으로 일어나기 때문이다. 핸드북 회사는 자기 정체성의 폐기조차 핸드북에 기록한다. simonw가 미리 걸어 둔 permalink는 그래서 이중적이다. 그것은 한 페이지의 이전 상태를 보존하는 동시에, 핸드북이라는 장르의 역설을 보존한다. 가치관을 폐기한 회사가 그 폐기 과정의 투명성으로 자신이 여전히 투명한 회사임을 증명하려 한다는 역설.

지난주 GitHub의 균열과 이번 주 GitLab의 정체성 발표는 같은 한 가지 사실의 두 얼굴이다. Git forge SaaS는 18년 동안 개발자의 일상에서 가장 안정적인 인프라였고, 그 안정성은 회사의 가치관 — 한쪽은 Microsoft 산하의 거대 SaaS, 다른 한쪽은 핸드북 위의 투명한 원격 회사 — 에 의해 부분적으로 보장됐다. 에이전트 시대는 그 가치관의 가격을 다시 매기고 있다. 인간이 더 이상 인프라의 주된 사용자가 아니게 될 때, 인간을 대상으로 한 가치관은 비용으로 보이기 시작한다.

두 번째 막의 첫 장면이 끝났다. 무대 위의 회사는 여전히 GitLab이라는 이름을 달고 있지만, 무대 아래의 관객은 — 18년 동안 그 핸드북을 인용하며 자기 회사의 원격 정책을 만들어 온 사람들은 — 처음으로 객석을 둘러보며 옆 사람에게 같은 질문을 한다. 우리는 지금까지 무엇을 보고 있었던 것인가.

---

출처:

- Bill Staples, "GitLab Act 2," GitLab Blog, 2026-05-04. https://about.gitlab.com/blog/gitlab-act-2/
- Hacker News discussion, "GitLab announces workforce reduction and end of their CREDIT values," item 48100500, 2026-05-04. https://news.ycombinator.com/item?id=48100500
- Simon Willison, "GitLab Act 2," 2026-05-11. https://simonwillison.net/2026/May/11/gitlab-act-2/
- GitLab Handbook, employment-solutions page (permalink), 2026-05. https://gitlab.com/gitlab-com/content-sites/handbook/-/blob/7ce61c4be88b04061f9ad9ab5eb64db91ce89d2a/content/handbook/people-group/employment-solutions.md
- (관련) "GitHub 신화의 6일 — 거버넌스, 가동률, 보안, 비용이 동시에 무너진 한 주," 2026-04-29.
