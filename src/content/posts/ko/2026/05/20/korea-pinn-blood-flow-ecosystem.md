---
title: "한국 PINN-혈류 시뮬레이션 생태계의 태동기"
description: "2023~2026년 5월의 한국 PINN-혈류 생태계를 학계·임상·산업·정부·국제 5축으로 정리한다. 검증 가능한 한국 1저자 peer-reviewed 논문은 인제대 vanilla PINN 과 한양대 PINGS-X 두 갈래에 집중되고, CFD 산업화(에이아이메딕 HeartMedi+)가 PINN 학술을 앞서가는 역전 구조가 핵심이다."
pubDate: 2026-05-20T00:00:00.000Z
lang: ko
pairSlug: korea-pinn-blood-flow-ecosystem
draft: false
---

# 한국 PINN-혈류 시뮬레이션 생태계의 태동기

> 2023~2026년 5월의 한국 PINN-혈류 생태계를 학계·임상·산업·정부·국제 5축으로 정리한다. 검증 가능한 한국 1저자 peer-reviewed 논문은 인제대 vanilla PINN 과 한양대 PINGS-X 두 갈래에 집중되고, CFD 산업화(에이아이메딕 HeartMedi+)가 PINN 학술을 앞서가는 역전 구조가 핵심이다.

한국의 PINN(Physics-Informed Neural Networks) 기반 혈류 시뮬레이션 연구는 **2025년을 기점으로 본격적 태동기에 진입**한 신생 분야다. 2023~2026년 5월 사이 검증 가능한 한국 1저자/교신저자 PINN-혈류 peer-reviewed 논문은 인제대 일산백병원의 두개내 동맥류 vanilla PINN 연구(2025)와 한양대학교의 4D Flow MRI 초해상화(PINGS-X, 2025–2026 arXiv) 두 갈래에 집중되어 있다. 글로벌 PINN-혈류 연구가 Brown(Karniadakis), Stanford(Marsden), UPenn(Perdikaris)에서 주도되어 온 반면, 한국은 **임상 CFD 인프라(서울대병원·세브란스·아산)와 산업 CT-FFR 상용화(에이아이메딕 HeartMedi+, 식약처 혁신의료기기)** 가 먼저 성숙해 있고, 그 위에 PINN 이 후행적으로 도입되는 구조를 보인다. 정부도 2024년 KISTI 이슈브리프, 2025년 NIPA 320억 PINN 사업 등으로 인프라를 깔고 있으나 펀딩은 아직 제조 분야에 집중되어 있어, 의료·혈류 응용은 향후 3~5년이 본격 확산기로 예상된다.

## 학계 연구: 두 개의 명확한 거점과 다수의 잠재 노드

검증 가능한 **한국 소속 1저자의 PINN-혈류 직접 적용 논문은 단 1편** 이다. 인제대 일산백병원 신경외과 **구해원(Hae-Won Koo) 교수** 와 임상연구지원센터 **김광현(Kwang Hyeon Kim)** 연구원이 *Journal of the Korean Physical Society* 87권(2025)에 게재한 "Hemodynamic prediction in a simplified 3D sidewall saccular aneurysm model using physics-informed neural networks" 가 그것이다. 3D 측벽형 두개내 동맥류 단순 모델에 정상상태 Navier–Stokes 기반 **vanilla PINN**(9-layer FCN, 20,000 collocation points)을 적용하여 속도장·압력장·벽전단응력(WSS)을 예측했고, 속도 R²=0.66, 압력 R²=0.60 수준의 초기 결과를 보고했다. XPINN·NSFnets 같은 변형은 사용되지 않은 가장 단순한 형태로, 한국 임상 의학자 주도의 1세대 적용 사례라는 의미가 크다.

방법론적으로 더 진보한 활동은 **한양대학교의 "스마트 혈역학 지표 기반 정밀의료 플랫폼 센터(Center for Precision Medicine Platform Based on Smart Hemo-Dynamic Index)"** 에서 나오고 있다. 기계공학과 **송시몬(Simon Song) 교수** 와 AI·전자공학과 **홍제형(Je Hyeong Hong) 교수** 가 공동 주도하는 그룹은 *PINGS-X: Physics-Informed Normalized Gaussian Splatting with Axes Alignment for Efficient Super-Resolution of 4D Flow MRI*(Jo et al., arXiv:2511.11048, 2025년 11월 v1 / 2026년 1월 v2)를 발표했다. 이는 4D Flow MRI 초해상화에 가우시안 스플래팅과 PINN 손실을 결합한 새로운 변형으로, **싱가포르 NTU 의 Seok Young Hong** 과 공동 1저자로 진행된 국제 협력 연구다. 한양대 ERICA 캠퍼스의 **오제훈(Je Hoon Oh) 교수** 는 세브란스 신경외과(김용배, 조광춘)와 협력하여 2023년 *J Neurointerv Surg* 에 뇌동맥류 파열 위험 CNN 모델(CFD 기반 WSS·strain 을 입력으로 사용), 2024년 *J Cereb Blood Flow Metab* 에 paraclinoid 동맥류 혈역학 비교 연구를 발표하는 등 **CFD→딥러닝 융합** 트랙을 별도로 운영 중이다.

KAIST·POSTECH 은 PINN-혈류를 직접 다루지는 않지만 인접 영역에서 가장 활발하다. KAIST 기계공학과 **이승철(Seungchul Lee) 교수** 의 Industrial AI Lab 과 POSTECH 수학과 **최민석(Minseok Choi) 교수**, POSCO N.EX.T Hub 가 공저한 *Physics informed neural networks for fluid flow analysis with repetitive parameter initialization*(Lee et al., *Scientific Reports* 15:16740, 2025)은 lid-driven cavity Re=700~1000 에서 PINN 의 stiff 문제를 해결하는 **RI-PINN(반복 파라미터 초기화)** 기법을 제안했으며, 코드는 GitHub(`jongmok7/RI-PINN`)에 공개되어 있다. 이 그룹은 향후 혈류로의 확장 가능성이 높은 거점이다. 또한 KAIST 기계공학과 **김현진(Hyun Jin Kim) 교수** 는 HeartFlow 출신으로 영상 기반 심혈관 모델링과 관상동맥 질환 시뮬레이션을 연구하며, **MICCAI 2025 STACOM 워크샵(2025년 9월 대전)에서 "Biomechanics modeling enhanced by AI" 키노트** 를 맡아 image-based cardiovascular modeling 의 mechanics/data-driven 융합을 발표했다. 한국 PINN-혈류 분야의 국제 가시성을 끌어올린 가장 두드러진 사례다.

반면 서울대 김호영(생체유체), 연세대·POSTECH·UNIST·고려대·GIST 등에서 **PI 본인이 1저자/교신으로 PINN-혈류 논문을 출판한 사례는 본 조사 범위에서 확인되지 않았다**. 이는 연구 부재라기보다 학회 프로시딩(KSME·KSCFE·KOSOMBE) 위주의 미인덱싱 발표, 또는 출판 전 단계 활동일 가능성이 높다.

## 임상 응용: CFD 가 먼저, PINN 은 후행

한국 주요 상급종합병원의 혈류 시뮬레이션 임상 응용은 **PINN 보다 전통 CFD + 머신러닝 분류기 결합** 이 주류다. 가장 성숙한 거점은 **서울대병원 순환기내과 구본권(Bon-Kwon Koo) 교수** 의 FFR 코어랩으로, 에이아이메딕(AiMedic)의 HeartMedi+ 를 12개 다기관(서울대·계명대 동산·인제대 일산백·조선대·용인세브란스 등)에서 검증한 결과를 *Korean Circulation Journal*(2023) 과 *J Korean Med Sci* 2023;38:e254 에 게재했다. 이 제품은 **식약처 혁신의료기기 제41호 지정 및 3등급 품목허가** 를 받은 국내 최초의 비침습 CT-FFR 시뮬레이션 SaMD 이지만, 알고리즘은 PINN 이 아닌 **CFD + LPM(lumped parameter model) + 딥러닝 세그멘테이션** 조합으로 공식 자료에 명시되어 있다.

뇌혈관 분야에서는 **세브란스병원 신경외과 김용배 교수–용인세브란스 조광춘 교수–한양대 ERICA 오제훈 교수** 의 3자 협력이 가장 명확한 임상–공학 컨소시엄을 이루고 있다. 2018년부터 2024년까지 BioMed Research International, Sci Reports, J Neurointerv Surg, J Cereb Blood Flow Metab 에 환자 맞춤형 동맥류 CFD/FSI + CNN 융합 결과를 꾸준히 출판했다. 세브란스 심장혈관병원 **장혁재(Hyuk-Jae Chang) 교수** 의 CONNECT-AI 센터는 Yonsei-Cedars Sinai 통합 영상연구센터와 연계하여 CCTA-OCT 융합 FFR 을 연구한다. 영상의학과 **김영진(Young Jin Kim) 교수** 는 4D Flow MRI 기반 활로4징 후 대동맥 평가를 *Korean Journal of Radiology* 에 보고하는 등 영상 임상 인프라를 책임진다.

**서울아산병원** 은 김남국(Namkug Kim) 교수의 융합의학과가 AAA 자동 측정, 영상 분할 등 딥러닝 트랙에 집중하며 순수 PINN 임상 검증 논문은 본 조사에서 확인되지 않았다. **삼성서울병원** 은 다기관 FFR 임상의 sub-center 로 참여하는 형태가 주를 이루고, 자체 주도 PINN 연구는 식별되지 않았다. 한양대 송시몬 교수 그룹은 좌심방이(LAA) 폐색 후 혈전 위험을 4D Flow MRI + 3D 프린팅 팬텀으로 평가한 proof-of-concept(2023)을 발표하는 등 **심방세동·LAA** 라는 독특한 임상 영역을 개척 중이다.

## 산업화: HeartMedi 와 디지털 트윈 SaMD 가 양대 축

| 기업 (대표) | 주요 제품 | 인허가/도입 시점 | 핵심 기술 | PINN 사용 |
|---|---|---|---|---|
| **에이아이메딕** (심은보, 강원대 기계의용공학부 교수) | HeartMedi+ (CT-FFR 시뮬레이션) | 식약처 혁신의료기기 제41호 (2023), 3등급 허가 | CFD + LPM + 딥러닝 세그멘테이션 | 명시되지 않음 |
| **애니메디솔루션** (김국배, 서울아산 스핀오프) | 수술계획 자동수립 디지털 트윈 SaMD | 2025년 11월 출시 | MRI/CT 기반 3D 모델 + **PINN 생체역학 예측** + 수술 프로토콜 | **명시적 PINN** |
| **메디픽셀** (송교석) | MPFFR-1000 (Angio-FFR) | 식약처 3등급 (2025.9), 보건복지부 NET 인증 (2025.7) | 압력손실 정량화 + 3D 혈관 재구성 | PINN 아님 |
| **메디컬아이피** (박상준) | MEDIP 3D 모델링 (뇌혈관 포함) | 식약처 인증 (3등급 DeepCatch 등) | 영상 분할·3D 모델링 | PINN 아님 |

**"PINN" 키워드를 의료기기 공식 자료에 명시한 첫 한국 상용 사례는 애니메디솔루션의 2025년 11월 디지털 트윈 SaMD** 다. 9년간 축적된 환자 맞춤형 3D 프린팅 데이터 8천 건 이상을 기반으로 PINN 생체역학 예측을 결합했고, 산업부 R&D '3D프린팅 수술 가이드 - 대동맥 재건 수술 임상적용'(2019–2022, 서울아산·서울대·삼성서울·세브란스 임상 컨소시엄) 결과물의 후속 상용화로 평가된다. 한편 에이아이메딕은 **강남세브란스 헬스체크업(2024)**, **명지병원** 등 건강검진·전문병원 채널로 비급여 도입을 확대 중이며, 상업적 측면에서는 한국 CFD-혈류 산업의 사실상 선도 기업이다.

## 정부·공공기관: 인프라는 깔렸지만 펀딩은 제조에 편중

**KISTI** 는 2024년 10월 「이슈브리프 제74호 - 물리정보 신경망(PINN)의 현황 및 전망 분석」을 발간하여 차세대 슈퍼컴퓨팅(누리온 25.7PF → 6호기 614PF, 2026년 상반기 가동)과 PINN 을 결합한 디지털 트윈·의료 이미지 분석 활용을 정책적으로 제시했다. **국가수리과학연구소(NIMS)** 부산 의료수학센터(센터장 윤강준, 부산대병원 융합의학연구동 입주)는 "심장 및 혈관 내 혈류역학 시스템 해석 연구" 를 공식 연구 주제로 명시한 유일한 출연연 단위 거점이다. **ETRI** 는 2024년 8월 전자통신동향분석 209호에 PINN 연구 동향 리뷰를 게재했고, NIPA 의 2025년 'PINN 모델 제조 융합데이터 수집·실증' 사업(경남대 주관, 약 320억 원)에 참여기관으로 합류했다. 다만 이 사업은 **혈류가 아닌 제조 LAM(거대 응용 모델) 중심** 이라는 점에서 의료 응용은 별도 트랙이 필요하다.

펀딩 측면에서는 **산업부 바이오헬스 R&D**(애니메디솔루션 대동맥 재건 과제, 2019–2022)와 **보건복지부 의료기기 R&D**(메디픽셀 MPFFR 신의료기술 평가 유예 트랙)가 산업 현장의 핵심 동력이었고, **한국연구재단(NRF)** 의 PINN-혈류 키워드 개별 과제는 NTIS/IRIS 에서 분산 검색되어 단일 사업으로 집계되지 않는다. **산업부 알키미스트 프로젝트의 '뉴로-AI 퓨전 슈퍼 휴먼' 테마**(KEIT 시행, 본연구 최대 40억)가 향후 PINN-바이오 융합에 활용될 잠재 트랙이다.

## 국제 학회·오픈소스: 국제 가시성은 키노트와 GitHub 두 채널

한국 연구자가 PINN-혈류로 국제 학회 정규 세션에서 발표한 검증 사례는 매우 제한적이다. 가장 두드러진 활동은 앞서 언급한 **KAIST 김현진 교수의 MICCAI 2025 STACOM 키노트** 이며, AIAA SciTech 2024–2025, APS DFD, SB3C, USNCCM, WCB 등에서 "한국 소속 + PINN + blood flow" 조합의 발표는 공개 프로그램상 직접 확인되지 않았다. **GitHub 공개 저장소** 는 한양대 SpatialAILab 의 `PINGS-X`(★6, 4D carotid MRV 데이터 + PINN/SIREN/PINGS-X 학습 파이프라인 + Google Drive 데이터셋 포함)와 POSTECH `jongmok7/RI-PINN` 이 한국발 핵심 자산이다. **한양대–NTU 싱가포르 공동 연구** 가 가장 명확한 국제 협력 노드이며, KAIST 는 HeartFlow(Stanford 인접) 출신 네트워크를 통해 간접적으로 미국 학계와 연결되어 있다.

## 한국 PINN-혈류 생태계의 5가지 통찰

첫째, **임상 데이터와 영상 인프라(4D Flow MRI, CT) 는 세계 최상위권** 이지만 PINN 알고리즘 적용은 vanilla 단계에 머물러 있다. 인제대 2025년 논문이 최초 직접 적용 사례인 점이 이를 단적으로 보여준다. 둘째, **CFD 산업화가 PINN 학술 연구를 앞서가는 역전 현상** 이 한국의 특수성이다. 에이아이메딕 HeartMedi+ 가 식약처 혁신의료기기로 자리잡은 반면, 그 위에 PINN 을 얹는 차세대 제품은 애니메디솔루션(2025.11)이 최초다. 셋째, **한양대학교(송시몬 + 홍제형 + 오제훈)와 KAIST(이승철 + 김현진)가 향후 5년의 두 핵심 거점** 으로 부상했으며, 인제대·세브란스·서울대병원이 임상 검증 파트너 역할을 맡는 구조가 굳어지고 있다. 넷째, **NIMS 부산 의료수학센터가 출연연 단위 거점** 으로 의수학–임상 가교 역할을 할 수 있으나 가시적 출판은 아직 부족하다. 다섯째, 한국 정부 PINN 펀딩의 무게중심이 제조(NIPA 320억)에 쏠려 있어, **보건복지부·식약처 차원의 디지털의료제품법(2025년 4월 시행) 하위 가이드라인에 PINN-혈류 시뮬레이션 SaMD 트랙이 명시적으로 추가** 되면 임상 응용이 가속될 전망이다. 글로벌 1세대 PINN-혈류 연구(Karniadakis, Marsden, Perdikaris)와의 격차는 여전하지만, 4D Flow MRI 임상 인프라와 CT-FFR 상용 경험이라는 한국 고유의 자산은 **patient-specific PINN 모델링의 임상 검증** 에서 한국이 빠르게 추격할 수 있는 발판이 된다.
