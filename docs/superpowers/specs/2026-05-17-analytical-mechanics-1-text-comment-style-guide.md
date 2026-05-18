# Analytical Mechanics I — 본문 해설 — Style Guide

> 본 시리즈 (`analytical-mechanics-1-text-comment`) 의 모든 포스트가 따라야 하는 형식·문체·표기 규약. 章별 spec 은 이 문서를 *유일한 source* 로 참조한다.

## 1. 한 편의 분량

- 한국어 본문 **1,500–2,500 자** 가 기본 (공백 포함).
- 절의 난이도·중요도에 따라 ±30% 까지 허용 (1,000 자 이하나 3,500 자 이상으로는 가지 않는다).
- 짧은 절(예: 1.4.7 引き戻しと微分写像) 이라도 *왜 다음 절로 넘어가는가* 의 다리는 반드시 포함한다.

## 2. 포스트 표준 골격

````markdown
---
title: '<章.節.小節> — <한국어 제목>: <부제>'
description: '<2–3 문장의 요약. 첫 LaTeX 식 한 줄을 포함하면 좋다.>'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: <1 … 104 의 시퀀스 번호>
lang: ko
pairSlug: am1tc-<章>-<節>-<小節>-<영문-슬러그>
draft: false
updated: <YYYY-MM-DD>
---

# <章.節.小節> — <한국어 제목>: <부제>

> <description 과 동일한 한 줄(또는 두 줄) 의 인용블록>

## 본문이 말하는 것

(1–2 단락. 원서가 그 절에서 무엇을 *주장* 하는지 정리. 핵심 식·정의는 LaTeX 로 다시 적는다.)

## 한 번 더, 천천히

(주장을 풀어 쓴다. 식의 변형 단계를 한 줄씩. 필요하면 하위 H3 로 나눈다.)

## 파이썬으로 확인 — <간단 제목>

(코드가 적절한 절일 때만. 코드 직전·직후에 짧은 해설 문단.)

## 다음 절(<N.M.K>)로 가는 다리

(이 절의 결론 → 다음 절의 첫 줄 사이의 *서사적* 연결. 한 단락.)
````

각 H2 의 사용은 다음과 같다.

| H2 | 용도 | 생략 가능? |
|---|---|---|
| 본문이 말하는 것 | 원서의 주장 요약 | ✗ 必須 |
| 한 번 더, 천천히 | 풀이 본체 | ✗ 必須 |
| 파이썬으로 확인 — … | 작은 수치 실험 | ✓ (절의 성격에 따라) |
| 다음 절로 가는 다리 | 서사 잇기 | ✗ 必須 (마지막 절 5.5.4 만 예외 — 책 전체 회수로 대체) |

## 3. 톤·인칭

- 인칭은 *비인칭* 을 기본 ("...이다." "...로 적힌다."). "우리는" 같은 1인칭 복수도 OK, 단 남발하지 않는다.
- 원서 인용은 "원서 X.Y.Z 절은 ... 라고 적는다." 로 통일.
- 한국어/한자어 어휘 우선. 일본어 그대로 두는 경우는 *원서의 핵심어* 가 한국어 정확한 짝이 없을 때 (예: 配位空間, 拘束) — 첫 등장 시 한자 + (한국어 직역) 병기.

## 4. LaTeX 표기 규약

- 인라인: `$ ... $`, 디스플레이: `$$ ... $$`
- 벡터: `\mathbf{x}`, `\mathbf{F}` (인수는 *항상* 중괄호. 단글자에서도 braces 사용 — 다인수 벡터로 확장될 때 첫 글자만 굵게 처리되는 버그를 방지). 단위벡터: `\hat{\mathbf{x}}`, `\hat{\mathbf{n}}`.
- 시간 미분: 뉴턴 점 표기 `\dot x`, `\ddot x` (벡터의 경우 `\dot{\mathbf{x}}`, `\ddot{\mathbf{x}}` — `\mathbf` 의 인수를 중괄호로 감싸는 일반 규약이 그대로 적용된다). 일반 미분: `\frac{df}{dx}`, 편미분: `\frac{\partial f}{\partial x}`.
- 인덱스: 아인슈타인 합 규약. 반변(위) + 공변(아래) 의 짝. 합 기호 `\sum` 는 *규약을 깨야 할 때* 만 명시.
- 좌표 변환·미분형식이 등장하는 章 (1.3 / 1.5 / 1.6 / 5.x) 에서는 절 초입에 *이 절에서 새로 등장한 기호* 만 한두 줄 모은다.

## 5. 코드 규약

- 언어: **Python 3.10+**. 표준 도구: NumPy, SciPy, Matplotlib. 그 외는 *절의 본질이 요구할 때* 만.
- 한 절의 코드는 **30 ~ 60 줄** 이 기본. 그보다 길어지면 *코어 함수만* 보이고 구성 함수는 본문에서 말로 설명한다.
- 모든 코드는 *복붙해서 그대로 실행* 되어야 한다 — `import` 부터 결과 출력까지.
- 그래프는 코드 본문에 명령은 적되 *블로그 본문에는 이미지를 박지 않는다* (Astro 의 정적 그림 의존을 피해, 코드 + 기대 출력 문장으로 대체).
- 코드 직전에 "이 코드의 메시지는 …" 한 줄, 직후에 "이 결과는 … 임을 보인다" 한 줄을 둔다.

## 6. 코드가 적절하지 않은 절

순수 정의·동치성·범주적 추상의 절은 코드 대신 *도해 설명* 으로 간다. 후보(章 1 기준):

- 1.4.1 微分可能多様体
- 1.4.4 接ベクトルと接空間
- 1.4.7 引き戻しと微分写像
- 1.5.1 双対空間と1ベクトル
- 1.6.6 ボアンカレの補題

이 외의 절은 *기본적으로 코드 포함* 으로 시작한다.

## 7. 어휘 사전 (cumulative)

각 章 spec 의 첫 단락에 *그 章 까지 누적된* 한·일·영 어휘 사전을 박는다. 본 시리즈의 한국어 어휘 결정의 *유일한* source 이며, 章 진행 중 새 어휘는 같은 표에 행을 더해 commit 한다.

| 일본어 | 한국어 | 영어 | 등장 절 |
|---|---|---|---|
| 質点 | 질점 | point particle | 1.1.1 |
| 慣性系 | 관성계 | inertial frame | 1.1.1 |
| 拘束条件 | 구속조건 | constraint | 1.1.2 |
| 配位空間 | 배위공간 | configuration space | 1.1.2 |
| ホロノミック拘束 | 홀로노믹 구속 | holonomic constraint | 1.1.2 |
| 仮想仕事 | 가상일 | virtual work | 1.1.3 |
| 拘束力 | 구속력 | constraint force | 1.1.3 |
| 一般化座標 | 일반화 좌표 | generalized coordinate | 1.1.4 |
| 一般化力 | 일반화 힘 | generalized force | 1.1.4 |
| パラメータ表示 | 매개변수 표현 | parametrization | 1.2.1 |
| 第一基本形式 | 제1기본형식 | first fundamental form | 1.2.1 |
| 計量 | 계량 | metric | 1.2.1 |
| 法線 | 법선 | normal | 1.2.3 |
| クリストッフェル記号 | 크리스토펠 기호 | Christoffel symbols | 1.2.4 |
| 慣性運動 | 관성운동 | inertial motion | 1.2.5 |
| 測地線 | 측지선 | geodesic | 1.2.5 |
| 反変ベクトル | 반변벡터 | contravariant vector | 1.3.1 |
| 共変ベクトル | 공변벡터 | covariant vector | 1.3.1 |
| テンソル | 텐서 | tensor | 1.3.2 |
| 接続 | 접속 | connection | 1.3.3 |
| 平行移動 | 평행이동 | parallel transport | 1.3.3 |
| 共変微分 | 공변미분 | covariant derivative | 1.3.4 |
| 多様体 | 다양체 | manifold | 1.4.1 |
| チャート | 차트 | chart | 1.4.1 |
| 接ベクトル | 접벡터 | tangent vector | 1.4.4 |
| 接空間 | 접공간 | tangent space | 1.4.4 |
| 接バンドル | 접번들 | tangent bundle | 1.4.5 |
| ベクトル場 | 벡터장 | vector field | 1.4.5 |
| 積分曲線 | 적분곡선 | integral curve | 1.4.6 |
| 1径数変換群 | 1-매개변수 변환군 | one-parameter group | 1.4.6 |
| 引き戻し | 당김 | pullback | 1.4.7 |
| リー微分 | 리 미분 | Lie derivative | 1.4.8 |
| リー群·リー代数 | 리 군·리 대수 | Lie group / algebra | 1.4.9 |
| 指数写像 | 지수사상 | exponential map | 1.4.11 |
| 双対空間 | 쌍대공간 | dual space | 1.5.1 |
| コベクトル | 코벡터 | covector / 1-vector | 1.5.1 |
| 共変テンソル | 공변텐서 | covariant tensor | 1.5.3 |
| 交代テンソル | 교대텐서 | alternating tensor | 1.5.4 |
| 外積 (wedge) | 외적 (wedge) | wedge product | 1.5.5 |
| 余接空間 | 여접공간 | cotangent space | 1.6.1 |
| 余接バンドル | 여접번들 | cotangent bundle | 1.6.1 |
| 1形式 | 1-형식 | one-form / 1-form | 1.6.2 |
| テンソル場 | 텐서장 | tensor field | 1.6.3 |
| リーマン計量 | 리만 계량 | Riemannian metric | 1.6.3 |
| p形式 | p-형식 | p-form | 1.6.4 |
| 外微分 | 외미분 | exterior derivative | 1.6.5 |
| ストークスの定理 | 스토크스 정리 | Stokes' theorem | 1.6.8 |
| ラグランジュ方程式 | 라그랑주 방정식 | Euler–Lagrange equation | 2.1.1 |
| ラグランジアン | 라그랑지언 | Lagrangian | 2.1.1 |
| スクレロノーマス | 스클레로노믹 | scleronomic | 2.1.1 |
| レオノーマス | 레오노믹 | rheonomic | 2.1.2 |
| 共変性 | 공변성 | covariance | 2.1.3 |
| 一般化ポテンシャル | 일반화 포텐셜 | generalized potential | 2.1.4 |
| ゲージ変換 | 게이지 변환 | gauge transformation | 2.1.5 |
| 第１積分 | 제1적분 | first integral | 2.2.1 |
| 一般化運動量 | 일반화 운동량 | generalized momentum | 2.2.2 |
| 循環座標 | 순환 좌표 | cyclic coordinate | 2.2.2 |
| ネーターの定理 | 노에터 정리 | Noether's theorem | 2.2.3 |
| ハミルトニアン | 해밀토니언 | Hamiltonian | 2.2.4 |
| エネルギー積分 | 에너지 적분 | energy integral | 2.2.4 |
| 自由度の削減 | 자유도의 삭감 | reduction of degrees of freedom | 2.2.5 |
| 基本1形式 | 기본 1-형식 | fundamental 1-form (Poincaré–Cartan) | 2.3.1 |
| 基本2形式 | 기본 2-형식 | fundamental 2-form | 2.3.1 |
| 擾座標 | 준좌표 | quasi-coordinate | 2.4.1 |
| 非ボアンカレ方程式 | 비푸앵카레 방정식 | non-Poincaré equation (Boltzmann–Hamel) | 2.4.2 |
| ラグランジュ乗数 | 라그랑주 곱셈자 | Lagrange multiplier | 2.5.1 |
| 非ホロノミック拘束 | 비홀로노믹 구속 | non-holonomic constraint | 2.5.3 |
| 作用積分 | 작용 적분 | action integral | 3.1.1 |
| ハミルトンの原理 | 해밀턴의 원리 | Hamilton's principle | 3.1.1 |
| 拡大配位空間 | 확장 배위공간 | extended configuration space | 3.1.2 |
| 拡大状態空間 | 확장 상태공간 | extended state space | 3.1.3 |
| 変分 | 변분 | variation | 3.1.5 |
| ラグランジュの未定乗数法 | 라그랑주의 미정 곱셈자법 | method of Lagrange multipliers | 3.1.8 |
| ワイスの原理 | 워이스의 원리 | Weiss's principle | 3.2.1 |
| モーメント関数 | 모멘트 함수 | momentum function | 3.2.2 |
| 正準方程式 | 정준 방정식 | canonical equations | 4.1.2 |
| 相空間 | 상공간 | phase space | 4.1.3 |
| 正準1形式 | 정준 1-형식 | canonical 1-form | 4.1.3 |
| 拡大相空間 | 확장 상공간 | extended phase space | 4.1.5 |
| シンプレクティック多様体 | 심플렉틱 다양체 | symplectic manifold | 4.2.1 |
| ハミルトニアン・ベクトル場 | 해밀토니언 벡터장 | Hamiltonian vector field | 4.2.3 |
| 力学系 | 동력학 시스템 | dynamical system | 4.3.1 |
| 相流 | 상류 | phase flow | 4.3.2 |
| 不変集合 | 불변 집합 | invariant set | 4.3.2 |
| 平衡解 | 평형해 | equilibrium | 4.3.3 |
| 周期解 | 주기해 | periodic solution | 4.3.3 |
| 安定性 | 안정성 | stability | 4.3.3 |
| 線形化 | 선형화 | linearization | 4.3.4 |
| 分岐 | 분기 | bifurcation | 4.3.6 |
| リャプノフ関数 | 랴푸노프 함수 | Lyapunov function | 4.3.7 |
| ポアンカレ写像 | 푸앵카레 사상 | Poincaré map | 4.3.8 |
| 構造安定性 | 구조 안정성 | structural stability | 4.4.2 |
| リウウィルの定理 | 리우빌의 정리 | Liouville's theorem | 4.4.4 |
| ポアンカレの再帰定理 | 푸앵카레의 재귀 정리 | Poincaré recurrence | 4.4.5 |
| レジャンドル変換 | 르장드르 변환 | Legendre transform | 5.1.2 |
| 積分不変式 | 적분 불변식 | integral invariant | 5.2.2 |
| カルタンの原理 | 카르탕의 원리 | Cartan's principle | 5.2.3 |
| 正準変換 | 정준 변환 | canonical transformation | 5.3.1 |
| 母関数 | 생성 함수 (모함수) | generating function | 5.3.2 |
| シンプレクティック条件 | 심플렉틱 조건 | symplectic condition | 5.4.1 |
| シンプレクティック写像 | 심플렉틱 사상 | symplectic map | 5.4.1 |
| 正準変換群 | 정준 변환군 | canonical transformation group | 5.4.4 |

(章 1 spec 에서 본 표를 1.1.1 ~ 1.6.8 의 어휘로 채운다.)

## 8. 파일·시퀀스 번호 매핑

전체 104 편의 시퀀스 매핑은 별표로 두지 않고, 章 spec 의 시작 부분에 該 章 의 매핑 (시퀀스 → 章.節.小節 → 영문 슬러그) 만 박는다. 1.1.1 의 매핑은 다음과 같다.

| 시퀀스 | 章.節.小節 | 영문 슬러그 | 파일명 |
|---:|---|---|---|
| 001 | 1.1.1 | newtonian-mechanics | `001-1-1-1-newtonian-mechanics.md` |

(章 1 spec 에서 002 ~ 037 의 매핑을 이어 채운다.)
