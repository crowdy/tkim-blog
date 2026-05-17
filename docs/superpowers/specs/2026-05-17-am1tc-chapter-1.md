# Analytical Mechanics I — 본문 해설 — Phase 1 (章 1: 序章·数学の準備) — Design

> 解析力学 I 의 章 1 (序章 — 数学の準備) 의 37 절 중, Phase 0 에서 출하한 1.1.1 을 제외한 **36 편** (시퀀스 002 ~ 037) 의 한국어 본문 해설을 모두 작성한다. 모든 commit 은 로컬 `main` 에 쌓고, 章 1 마지막 편까지 끝낸 뒤 **단 한 번 push** 한다 (= 한 번 deploy).

**Reference**: [Phase 0 design](2026-05-17-analytical-mechanics-1-text-comment-design.md), [Style guide](2026-05-17-analytical-mechanics-1-text-comment-style-guide.md).

## Motivation

Phase 0 가 시리즈 framework (책 메타·스타일 가이드·1.1.1 샘플) 을 박았다. Phase 1 은 그 framework 을 章 1 의 나머지 36 절에 instantiate 한다. 章 1 은 본 책의 *수학 준비편* — 다양체·텐서·미분형식까지 이 章 안에서 모두 등장하므로, 이 章 의 글이 잘 풀려야 章 2 이후의 라그랑주·해밀턴 형식이 자연스럽게 손에 잡힌다.

## Scope

- **In:** 시퀀스 002 ~ 037 의 36 편 작성.
- **Out:** 章 2 ~ 5 (별 spec/plan), 일·영 번역 (별 plan).
- **Deploy 단위:** 章 1 의 36 편이 모두 끝난 뒤 단 한 번 push. 중간 push 금지.

## Architecture

Phase 0 의 file layout · routing · schema 를 그대로 사용. 새 파일은 다음 36 개:

```
src/content/studies/ko/analytical-mechanics-1-text-comment/
  002-1-1-2-constraints-and-config-space.md
  003-1-1-3-constraint-force-and-virtual-work.md
  004-1-1-4-equation-of-motion-on-config-space.md
  ...
  037-1-6-8-stokes-theorem.md
```

각 편은 [Style guide](2026-05-17-analytical-mechanics-1-text-comment-style-guide.md) section 2 의 표준 골격을 따른다.

### Execution batching (PR 분할 ≠ commit 분할)

PR 은 분할하지 않는다 (= 마지막에 단 한 번 push). 단, 실행은 **6 plan 으로 분할** — 큰절(section) 1 개 = 1 plan. 이는 컨텍스트 관리와 reviewer 부담을 줄이기 위함이며, 모든 commit 은 로컬 `main` 에 그대로 누적된다.

| Plan | 큰절 | 절 범위 | 편 수 |
|---|---|---|---:|
| Plan-1.1 | 運動方程式 | 1.1.2 ~ 1.1.4 | 3 |
| Plan-1.2 | 曲面上の拘束運動 | 1.2.1 ~ 1.2.5 | 5 |
| Plan-1.3 | 曲面上のテンソルと共変微分 | 1.3.1 ~ 1.3.4 | 4 |
| Plan-1.4 | 多様体とベクトル場 | 1.4.1 ~ 1.4.11 | 11 |
| Plan-1.5 | 双対空間と共変テンソル | 1.5.1 ~ 1.5.5 | 5 |
| Plan-1.6 | 余接バンドルと微分形式 | 1.6.1 ~ 1.6.8 | 8 |
| | 합계 | | **36** |

각 plan 의 마지막 commit 은 *해당 큰절까지의 누적 glossary 갱신* (이 spec 의 section 5 표를 갱신해 commit).

## Resolved open questions (carried over from Phase 0)

### Q1: 1.4.9 / 1.4.10 동명 (リー群とリー代数) 처리

원서 인쇄가 두 절 모두 같은 제목으로 박혀 있다. 기능적으로 분할:

- **1.4.9 — 리 군과 리 대수 (정의·구조)**: 리 군 $G$ 의 정의 (군이자 매끄러운 다양체), 좌·우 평행이동 $L_g$, $R_g$, 리 대수 $\mathfrak g = T_e G$ 의 구성.
- **1.4.10 — 리 군과 리 대수 (좌불변·구조 상수)**: 좌불변 벡터장 $X^L$ 의 동형 $\mathfrak g \cong \{X^L\}$, 구조 상수 $c^k_{ij}$, 자코비 항등식 $[[X, Y], Z] + \text{cyclic} = 0$.

각 포스트의 부제로 분할 의도를 명시 (예: `1.4.9 — 리 군과 리 대수: 정의·구조`).

### Q2: glossary commit 단위

**Plan 단위로 1회**. 각 plan 의 *마지막* commit 에서 이 spec 의 section 5 표에 그 plan 이 새로 도입한 어휘 행을 추가한다. plan 의 마지막 본문 commit 직후 별도 commit (`study(am1tc-ch1): glossary update through 1.X`).

### Q3: `pairSlug` 명명

`am1tc-<章>-<節>-<小節>-<영문-슬러그>` 유지 (예: `am1tc-1-3-2-tensor-on-surface`). 시퀀스만 박는 짧은 안은 인간 가독성을 잃기에 기각.

### Q4 (final review 추가): 코드 없는 절의 형식

"파이썬으로 확인" H2 자체를 생략한다. 대신 "한 번 더, 천천히" 본문 안에 **도해 단락** 1–2개를 박는다. 도해 단락의 표준 형식:

- 1–3개의 작은 예시 ($S^2$, $T^2$, $SO(3)$, 단진자 등) 를 *문장*으로 묘사
- 정의에서 끌리는 그림을 *문장* 으로 그려 보임 (이미지 X)
- 직관과 정식 정의 사이의 격차를 한 문장으로 명시

예시 templete (1.4.4 接ベクトルと接空間):

```markdown
도해를 그려 두면 — 구면 $S^2$ 의 북극 $p$ 를 잡자.
$p$ 를 통과하는 곡선들은 모두 *수평 평면* 위의 속도 벡터를 시각 0 에서 갖는다. ...
직관은 "곡면에 접하는 화살표"지만, 정식 정의는 *곡선의 동치류*다 — 이 격차가 1.4.5 에서 *접번들* 의 정의로 메워진다.
```

## 36 편의 매핑 표 (시퀀스 002 ~ 037)

| Seq | 章.節.小節 | 일본어 원제 | 한국어 제목 | 코드 | 파일명 |
|---:|---|---|---|:---:|---|
| 002 | 1.1.2 | 拘束条件と配位空間 | 구속조건과 배위공간 | ✓ | `002-1-1-2-constraints-and-config-space.md` |
| 003 | 1.1.3 | 拘束力と仮想仕事 | 구속력과 가상일 | ✓ | `003-1-1-3-constraint-force-and-virtual-work.md` |
| 004 | 1.1.4 | 配位空間上の運動方程式 | 배위공간 위의 운동방정식 | ✓ | `004-1-1-4-eom-on-config-space.md` |
| 005 | 1.2.1 | 曲面のパラメータ表示 | 곡면의 매개변수 표현 | ✓ | `005-1-2-1-parametrized-surface.md` |
| 006 | 1.2.2 | 加速度ベクトルと運動方程式 | 가속도 벡터와 운동방정식 | ✓ | `006-1-2-2-acceleration-and-eom.md` |
| 007 | 1.2.3 | 拘束力の決定 | 구속력의 결정 | ✓ | `007-1-2-3-determining-constraint-force.md` |
| 008 | 1.2.4 | 曲面上の運動方程式 | 곡면 위의 운동방정식 | ✓ | `008-1-2-4-eom-on-surface.md` |
| 009 | 1.2.5 | 慣性運動と測地線 | 관성운동과 측지선 | ✓ | `009-1-2-5-inertia-and-geodesic.md` |
| 010 | 1.3.1 | 曲面上のベクトル | 곡면 위의 벡터 | ✓ | `010-1-3-1-vector-on-surface.md` |
| 011 | 1.3.2 | 曲面上のテンソル | 곡면 위의 텐서 | ✓ | `011-1-3-2-tensor-on-surface.md` |
| 012 | 1.3.3 | 接続と平行移動 | 접속과 평행이동 | ✓ | `012-1-3-3-connection-and-parallel-transport.md` |
| 013 | 1.3.4 | 共変微分と加速度 | 공변미분과 가속도 | ✓ | `013-1-3-4-covariant-derivative-and-acceleration.md` |
| 014 | 1.4.1 | 微分可能多様体 | 미분가능 다양체 | — | `014-1-4-1-smooth-manifold.md` |
| 015 | 1.4.2 | 多様体上の関数と曲線 | 다양체 위의 함수와 곡선 | ✓ | `015-1-4-2-functions-and-curves.md` |
| 016 | 1.4.3 | 方向微分と微分作用素 | 방향미분과 미분작용소 | ✓ | `016-1-4-3-directional-derivative.md` |
| 017 | 1.4.4 | 接ベクトルと接空間 | 접벡터와 접공간 | — | `017-1-4-4-tangent-vector-and-space.md` |
| 018 | 1.4.5 | 接バンドルとベクトル場 | 접번들과 벡터장 | ✓ | `018-1-4-5-tangent-bundle.md` |
| 019 | 1.4.6 | 積分曲線と1径数変換群 | 적분곡선과 1-매개변수 변환군 | ✓ | `019-1-4-6-integral-curve-and-flow.md` |
| 020 | 1.4.7 | 引き戻しと微分写像 | 당김과 미분사상 | — | `020-1-4-7-pullback-and-differential.md` |
| 021 | 1.4.8 | リー微分 | 리 미분 | ✓ | `021-1-4-8-lie-derivative.md` |
| 022 | 1.4.9 | リー群とリー代数 | 리 군과 리 대수 — 정의·구조 | ✓ | `022-1-4-9-lie-group-and-algebra-def.md` |
| 023 | 1.4.10 | リー群とリー代数 | 리 군과 리 대수 — 좌불변·구조 상수 | ✓ | `023-1-4-10-left-invariant-and-structure-constants.md` |
| 024 | 1.4.11 | 1径数部分群と指数写像 | 1-매개변수 부분군과 지수사상 | ✓ | `024-1-4-11-one-param-subgroup-and-exp.md` |
| 025 | 1.5.1 | 双対空間と1ベクトル | 쌍대공간과 코벡터 | — | `025-1-5-1-dual-space-and-covector.md` |
| 026 | 1.5.2 | 反変ベクトルと共変ベクトル | 반변벡터와 공변벡터 | ✓ | `026-1-5-2-contravariant-vs-covariant.md` |
| 027 | 1.5.3 | 共変テンソル | 공변텐서 | — | `027-1-5-3-covariant-tensor.md` |
| 028 | 1.5.4 | 交代テンソルとベクトル | 교대텐서와 벡터 | ✓ | `028-1-5-4-alternating-tensor.md` |
| 029 | 1.5.5 | テンソルの交代化と外積 | 텐서의 교대화와 외적 | ✓ | `029-1-5-5-alternation-and-wedge.md` |
| 030 | 1.6.1 | 余接空間と1ベクトル | 여접공간과 코벡터 | — | `030-1-6-1-cotangent-space.md` |
| 031 | 1.6.2 | 1形式 (1次外微分形式) | 1-형식 (1차 외미분형식) | ✓ | `031-1-6-2-one-form.md` |
| 032 | 1.6.3 | テンソル場とリーマン計量 | 텐서장과 리만 계량 | ✓ | `032-1-6-3-tensor-field-and-riemannian-metric.md` |
| 033 | 1.6.4 | p形式 (p次外微分形式) | p-형식 (p차 외미분형식) | ✓ | `033-1-6-4-p-form.md` |
| 034 | 1.6.5 | 外微分 | 외미분 | ✓ | `034-1-6-5-exterior-derivative.md` |
| 035 | 1.6.6 | ボアンカレの補題 | 푸앵카레 보조정리 | — | `035-1-6-6-poincare-lemma.md` |
| 036 | 1.6.7 | 微分形式の積分 | 미분형식의 적분 | ✓ | `036-1-6-7-integration-of-forms.md` |
| 037 | 1.6.8 | ストークスの定理 | 스토크스 정리 | ✓ | `037-1-6-8-stokes-theorem.md` |

**원서 인쇄 오기 메모**: 사용자가 보낸 원서 차례의 1.6 큰절 제목 "金接バンドルと微分形式" 의 *金接* 은 *余接* 의 오기 (또는 OCR 결과). 본 spec 에선 余接 (여접) 으로 통일.

## 누적 어휘 사전 (章 1 종료 시점의 final 표)

각 plan 의 마지막 commit 에서 본 표에 행을 더한다 (Q2 결정). spec 의 [Style guide](2026-05-17-analytical-mechanics-1-text-comment-style-guide.md) section 7 의 누적 어휘 사전은 이 표를 미러링한다.

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
| 測地線 | 측지선 | geodesic | 1.2.5 |
| クリストッフェル記号 | 크리스토펠 기호 | Christoffel symbols | 1.2.2 |
| 接続 | 접속 | connection | 1.3.3 |
| 平行移動 | 평행이동 | parallel transport | 1.3.3 |
| 共変微分 | 공변미분 | covariant derivative | 1.3.4 |
| (位置)多様体 | 다양체 | manifold | 1.4.1 |
| チャート | 차트 | chart | 1.4.1 |
| 接ベクトル | 접벡터 | tangent vector | 1.4.4 |
| 接空間 | 접공간 | tangent space | 1.4.4 |
| 接バンドル | 접번들 | tangent bundle | 1.4.5 |
| ベクトル場 | 벡터장 | vector field | 1.4.5 |
| 積分曲線 | 적분곡선 | integral curve | 1.4.6 |
| 1径数変換群 | 1-매개변수 변환군 | one-parameter group of diffeomorphisms | 1.4.6 |
| 引き戻し | 당김 | pullback | 1.4.7 |
| 微分写像 | 미분사상 | differential / pushforward | 1.4.7 |
| リー微分 | 리 미분 | Lie derivative | 1.4.8 |
| リー群 | 리 군 | Lie group | 1.4.9 |
| リー代数 | 리 대수 | Lie algebra | 1.4.9 |
| 左不変ベクトル場 | 좌불변 벡터장 | left-invariant vector field | 1.4.10 |
| 構造定数 | 구조 상수 | structure constants | 1.4.10 |
| 1径数部分群 | 1-매개변수 부분군 | one-parameter subgroup | 1.4.11 |
| 指数写像 | 지수사상 | exponential map | 1.4.11 |
| 双対空間 | 쌍대공간 | dual space | 1.5.1 |
| コベクトル / 1ベクトル | 코벡터 | covector / 1-vector | 1.5.1 |
| 反変ベクトル | 반변벡터 | contravariant vector | 1.5.2 |
| 共変ベクトル | 공변벡터 | covariant vector | 1.5.2 |
| 共変テンソル | 공변텐서 | covariant tensor | 1.5.3 |
| 交代テンソル | 교대텐서 | alternating tensor | 1.5.4 |
| 外積 (wedge) | 외적 (wedge product) | wedge product | 1.5.5 |
| 余接空間 | 여접공간 | cotangent space | 1.6.1 |
| 1形式 | 1-형식 | one-form / 1-form | 1.6.2 |
| テンソル場 | 텐서장 | tensor field | 1.6.3 |
| リーマン計量 | 리만 계량 | Riemannian metric | 1.6.3 |
| p形式 | p-형식 | p-form | 1.6.4 |
| 外微分 | 외미분 | exterior derivative | 1.6.5 |
| ボアンカレの補題 | 푸앵카레 보조정리 | Poincaré lemma | 1.6.6 |
| 微分形式 | 미분형식 | differential form | 1.6.2 |
| ストークスの定理 | 스토크스 정리 | Stokes' theorem | 1.6.8 |

(plan 진행 중 새 단어 추가 시 같은 표에 행 추가 → 그 plan 의 마지막 commit 으로 박음.)

## 분량·코드 비중 추정

- 36 편 × 평균 2,000 자 = **약 72,000 자** 의 한국어 본문 (章 1 전체).
- 코드 적절 29 편 / 도해 only 7 편 = 81% 코드 / 19% 도해.

## Testing / verification

각 plan 의 마지막 단계에서:

- `npm run check` — 0 errors.
- `npm run build` — 성공, 새로 추가된 dist/.../index.html 들이 모두 존재.
- 章 1 마지막 (Plan-1.6 끝) 에서 추가로:
  - `dist/ko/study/analytical-mechanics-1-text-comment/index.html` 의 list 가 37 편 모두 표시되는지 grep 확인.
  - dev server 띄워 1.1.2 / 1.4.4 (도해 only) / 1.6.8 (마지막) 3 편을 스폿 체크.

## Error handling / edge cases

- **`draft: true` 금지** — Phase 0 와 동일.
- **번호 충돌** — 본 spec 의 매핑 표가 single source of truth. plan 작성 시 이 표를 그대로 인용.
- **원서 인쇄 오기**:
  - 1.4.9 / 1.4.10 동일 제목 → 위 Q1 분할 적용.
  - 1.6 큰절 제목 "金接" → "余接" 정정.
  - 그 외 발견 시 spec 의 본 섹션에 메모 추가 commit.
- **글로서리 충돌** — 같은 일본어 어휘가 두 절에서 등장하면 가장 빠른 등장 절을 표의 "등장 절" 컬럼에 기록.

## Open questions for Phase 2 spec

- 章 1 작성을 통해 한국어 어휘 결정이 안정되면, 章 2 spec 작성 전에 본 spec 의 어휘 표를 한 번 재검토한다 (특히 "쌍대공간 vs. 듀얼 공간", "여접 vs. 코탄젠트" 같은 음역/직역 선택).
- 도해 단락의 표준 형식이 7 편의 도해 only 절을 거치면서 더 정밀해질 가능성 — 章 2 spec 작성 시 style guide section 6 을 update.

---

## Phase 1 의 다음 동작

1. 본 spec 승인 → commit.
2. **Plan-1.1** 작성 (`writing-plans` 스킬) — 3 편 (1.1.2 / 1.1.3 / 1.1.4) 의 본문을 plan 안에 *그대로* 박는다.
3. Plan-1.1 실행 → 4 commit (3 본문 + 1 glossary) 로컬 main 에 누적.
4. Plan-1.2, …, Plan-1.6 차례로.
5. Plan-1.6 끝나면 dev server 스폿 체크 후 단 한 번 push.
