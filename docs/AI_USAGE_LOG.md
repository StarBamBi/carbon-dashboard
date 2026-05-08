# AI 사용 로그 (Carbon Dashboard)

이 문서는 과제 발표 시 "AI로 **무엇을** 했고, 어떤 **프롬프트**를 사용했고, **왜** 그렇게 결정했는지"를 구분 설명하기 위한 작업 기록이다. 작업 단위 종료 시마다 항목을 추가한다.

## 항목 작성 템플릿

```md
## YYYY-MM-DD - <작업 제목>

- **무엇을**: AI 로 만든 결과물 (예: Scope별 도넛 차트 컴포넌트 초안)
- **프롬프트 요지**: 핵심 지시 (한 줄 요약)
- **AI 출력 평가**: 그대로 사용 / 일부 수정 / 폐기
- **수정·검증 포인트**: 도메인 또는 룰 위반이 있었던 부분과 수정 내용
- **결정 이유**: 왜 이 방식이 다른 대안보다 적절했는가 (트레이드오프)
- **관련 커밋**: <commit-hash>
```

---

## 2026-05-09 - 프로젝트 컨텍스트 룰 셋업

- **무엇을**: 과제 배경/평가기준/도메인을 모든 세션에 자동 적용되도록 `.cursor/rules/*.mdc` 5종으로 분리. AI 사용 로그 템플릿(`docs/AI_USAGE_LOG.md`) 작성.
- **프롬프트 요지**: 회사 소개·과제 목적·산출물·평가기준 4축을 그대로 전달하면서, "프로젝트 전체가 해당 내용을 참고하면서 진행될 수 있게" 영구 컨텍스트로 박아 달라고 지시.
- **AI 출력 평가**: 일부 수정. 단일 파일 `.cursor/rules` 였던 것을 디렉토리 + `alwaysApply: true` 메타로 재구성.
- **수정·검증 포인트**:
  - Cursor 표준은 `.cursor/rules/` 디렉토리 + `.mdc` 파일 → 단일 파일이면 세션에서 누락될 위험.
  - 기존 단일 파일 룰을 5개로 분리(엔지니어링 표준 / 프로젝트 컨텍스트 / 탄소 도메인 / 평가기준 / AI 사용정책)해 한 룰 한 책임 원칙 준수.
- **결정 이유**: 룰을 한 파일에 몰아넣으면 새 작업 시 일부만 적용되어 도메인·평가기준이 누락될 수 있음. 도메인 정의(PCF, Scope 1·2·3) 는 필수 상시 컨텍스트라 분리.
- **관련 커밋**: (이번 셋업 커밋 해시 추후 기재)

---

## 2026-05-09 - 도메인 모델 + 과제 더미 데이터(CT-045) 적용

- **무엇을**: 과제 이미지의 활동 데이터(전기/원소재/운송)·배출계수 표를 도메인 모델로 옮기고, 계산 유틸 3종을 추가.
  - `entities/activity|emission-factor|emission/types.ts`
  - `shared/constants/carbon.ts` (Scope/LifeCycle/한글 라벨/색상)
  - `mocks/fixtures/activity-records.ts`, `mocks/fixtures/emission-factors.ts`
  - `features/emissions/utils/{classify-scope, find-emission-factor, calculate-emission}.ts`
- **프롬프트 요지**: 이미지 표를 그대로 더미데이터로 적용해 달라. 룰(`carbon-domain.mdc`, `engineering-standards.mdc`)을 따를 것.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 원본 Excel 이 한글 컬럼이라 `RawActivityRow` 타입을 별도로 만들고, 시스템 내부에서는 영문 enum 으로 정규화 → 추후 "Excel 직접 임포트(가점)" 인터페이스 구현 시 normalizer 한 군데만 수정하면 된다.
  - 배출계수에 `version`, `validFrom`, `validTo` 를 두어 시간 윈도우 조회 가능하게 설계 → 이미지의 "DB 별도 테이블 + 버전 이력 추적" 가이드 충족. 데모 효과를 위해 KEPCO v0(2024 가정값)을 추가해 버전 분기를 보여줌.
  - `calculateEmission` 은 단위 불일치 시 null 반환하도록 강화 → 잘못된 계수 매칭이 조용히 잘못된 합계로 누적되는 사고 방지.
  - 동일 일자에 여러 라인이 존재하는 원본 데이터(2025-05-01 전기 120/101 등)를 합치지 않고 raw 로 보존 → 추후 감사/추적 가능. 월별 SUM 은 다음 단계의 집계 utils 에서 처리 예정.
  - 기존 단순 `EmissionRecord`/`EmissionScope` 타입은 새 `EmissionResult`/`GhgScope` 로 교체. 폐기 파일은 삭제하고 store import 도 함께 갱신.
- **결정 이유**:
  - 활동 카테고리만 알면 Scope·LifeCycle 이 결정되므로 매핑을 상수 1곳(`carbon.ts`)에 집중 → 새 카테고리 추가 시 한 파일만 수정.
  - 계수와 활동을 분리해 저장 → "활동량은 그대로, 계수만 갱신" 운영 시나리오 지원.
  - 계산 결과(`EmissionResult`)에 활동량과 계수를 함께 보관 → UI 가 "활동량 × 계수 = 배출량" 식을 그대로 노출 가능 (도메인 이해 평가에 직결).
- **관련 커밋**: 57f2d99

## 2026-05-09 - 집계 utils + 표시 포맷터

- **무엇을**: 차트가 그대로 받아쓸 수 있는 집계 함수 5종 + 단위·비율 포맷터 2종.
  - `features/emissions/types/aggregation.ts`
  - `features/emissions/utils/{sum-emissions, aggregate-by-month, aggregate-by-scope, aggregate-by-life-cycle, aggregate-by-category}.ts`
  - `shared/lib/utils/{format-co2e, format-percent}.ts`
- **프롬프트 요지**: 다음 단계로 집계 utils(A) 진행. 차트가 받을 데이터를 미리 만드는 순수 함수 + 룰의 표기 규칙(kg/t 보조표기, % + 절대값) 포맷터까지.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 월별 집계는 `occurredAt.slice(0, 7)` 로 단순 처리(date-fns/dayjs 의존성 미추가) — 룰의 "추측 대신 폴더/파일 근거" 원칙. 입력은 항상 ISO date 라 안전.
  - Scope·LifeCycle·Category 집계는 데이터에 없는 항목도 0 으로 포함 → 도넛/범례에서 빈 항목이 사라져 "데이터 누락" 자체를 못 알아채는 사고 방지.
  - 비율은 항상 0~1 소수로 반환하고, % 변환은 formatter 가 책임 → 차트 라이브러리에 직접 % 값을 넘겨야 하는 상황에서도 재사용.
  - 포맷터는 NaN/음수에 대해 fallback 문자열을 반환하도록 방어 코드 추가.
  - `formatCo2eDual` 은 임계값 미만이면 보조표기를 생략 → "12 kgCO2e (0.012 tCO2e)" 같은 가독성 떨어지는 출력 방지.
- **결정 이유**:
  - 집계와 포맷팅을 **순수 함수**로 분리 → 차트(B)와 페이지(C)에서 동일 함수를 재사용해 모든 위젯이 같은 숫자를 보여줌(평가 4축의 안정성).
  - 집계 결과 타입을 차트 dataKey 와 1:1 매칭되는 슬러그로 설계 → Recharts 가 그대로 소비, 변환 레이어 불필요.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - Scope 도넛 + KPI 카드 (홈 대시보드)

- **무엇을**: Recharts 도넛(Scope 비중) + 총배출/Scope2·3 KPI 카드 + 조합 위젯 + 공용 Card + `useMockEmissions` 훅. 요약 UI는 이후 C 단계에서 `/dashboard`로 옮김(당시에는 `app/page.tsx`에 직접 연결).
- **프롬프트 요지**: A 다음 B 진행 — 핵심 위젯 1개(Scope 도넛 + KPI)로 시각화 검증.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 차트는 `"use client"` 경계에만 두고, 계산·집계는 기존 순수 함수 재사용 → `useMockEmissions`에서 `calculateEmissions` + `aggregateByScope` 한 스냅샷으로 묶음.
  - 색약 대응: 슬라이스 색만이 아니라 표에 Scope 코드(`scope1` 등)·한글 라벨·수치를 병기. 툴팁에 배출량(이중 단위) + 비중.
  - Scope 1 이 0이면 Pie 슬라이스에서 제외하되 표에는 0행 유지 → "데이터 없음"과 "0배출" 구분.
  - Next.js SSG 시 `ResponsiveContainer` 높이 -1 경고 → `height={260}` 고정으로 해결(`npm run build` 재확인).
  - 슬라이스 위 텍스트 라벨은 Recharts 타입/가독성 이슈로 생략하고 표·범례·툴팁으로 대체.
- **결정 이유**:
  - 위젯을 `widgets/emissions-overview`에 두어 `features`(도메인)와 `app`(라우팅) 사이 조합 레이어를 명확히 함.
  - KPI는 경영자(총량·비중+절대값 동시), 도넛+표는 실무자(Scope 점검) 페르소나에 맞춘 정보 밀도.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - 대시보드 레이아웃 셸 + 라우팅

- **무엇을**: `(dashboard)` 라우트 그룹 + `DashboardShell`(사이드바·헤더) + `/dashboard`·`/emissions`·`/reports` + 루트 `/` → `/dashboard` 리다이렉트. 루트 `layout`에 `QueryProvider` 연결. 내비 상수 `shared/constants/navigation.ts`.
- **프롬프트 요지**: C 단계 — 레이아웃 셸과 라우팅.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 라우트 그룹 `(dashboard)`로 URL 에 `(dashboard)` 가 노출되지 않게 유지.
  - 활성 링크: `pathname === href || pathname.startsWith(\`\${href}/\`)` 만 사용. `href !== "/"` 비교는 `MAIN_NAV` 의 href 가 리터럴 유니온이라 빌드 타입 오류(dead code)로 실패 → 제거.
  - `/emissions`·`/reports` 는 다음 작업용 플레이스홀더만 배치(스코프 과다 확장 방지).
- **결정 이유**:
  - 셸을 `widgets/app-shell`에 두어 `app/` 은 라우팅·메타만 담당(평가 4축의 모듈형 구조).
  - TanStack Query는 루트에 Provider 한 겹만 추가해 이후 API 훅에서 즉시 사용 가능.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - 월별 추이 차트 + Scope 필터 토글 (인터랙션)

- **무엇을**: `EmissionsMonthlyTrendChart`(Recharts stacked Area), `ScopeFilterToggle`(Zustand 연동), `useMockEmissions` 에 `byMonth` / `monthlyChartRows`(평탄화 시리즈) 추가, `EmissionsOverviewWidget` 에 추이 섹션 통합.
- **프롬프트 요지**: 월별 추이 차트를 `/dashboard` 에 붙이되 인터랙티브 요소도 함께 갖춰 달라.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - Recharts 의 nested dataKey 대신 `monthlyChartRows: { month, scope1, scope2, scope3, totalKg }` 평탄화 → 시리즈마다 단일 컬럼이라 type 안전·tooltip payload 처리 단순.
  - 토글 → Area 갱신 흐름은 `useEmissionsFilterStore` (이미 있던 store) 그대로 사용. "all" 일 때만 `stackId` 부여, 단일 Scope 선택 시 stack 해제로 단색 면 표시.
  - 색만으로 정보 전달 금지 룰: 토글 버튼에 색 점 + 텍스트, 툴팁에 한글 Scope 라벨 + 합계 보조 표기(`formatCo2eDual`).
  - SSG 높이 -1 경고 방지: `ResponsiveContainer height={280}` 고정.
  - Y축 tick formatter 에서 `formatCo2eAuto` 사용 → kg/t 자동 환산이 실제 화면에서 작동하는지 시각 검증.
- **결정 이유**:
  - 차트는 **Stacked Area** 선택. 막대보다 월간 변동폭과 Scope 누적이 동시에 보이고, 라인 단일보다 Scope 분포 메시지를 더 직관적으로 전달.
  - 필터 store 를 Zustand 로 둔 덕에 추후 도넛/테이블도 같은 store 를 구독해 동기화 가능 → "프로젝트 전반 인터랙션" 으로 확장 여지 확보.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - PCF 전과정 단계 차트 (LifeCycle)

- **무엇을**: `EmissionsLifeCycleChart`(가로 막대 5단계 + 보조 표) + `LIFE_CYCLE_COLOR` 색상 토큰 + `useMockEmissions.byLifeCycle` 노출 + 위젯 통합.
- **프롬프트 요지**: 월별 추이 다음 단계 — PCF 전과정(원소재→제조→운송→사용→폐기) 분해를 화면에 노출.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 색상 토큰을 `shared/constants/carbon.ts` 한 곳에 추가(SCOPE_COLOR 옆) → 색약 대응 책임을 한 파일에서 일괄 점검 가능.
  - 데이터에 없는 단계(use, end_of_life)도 0 막대로 표시 → "PCF 전과정 중 사용·폐기 단계 데이터가 없다"는 사실을 시각적으로 드러냄(평가의 도메인 이해).
  - 가로 막대(`layout="vertical"`) 선택: 5단계가 모두 동일한 X축(kgCO2e)에서 비교됨. 세로/스택보다 단계 간 절대 비교에 직관적.
  - 색만으로 정보 전달 금지 룰: 표에 한글 라벨·배출량·비중 병기.
- **결정 이유**:
  - 과제 산출물의 "PCF 전과정 데이터 시각화" 정체성을 화면에 직접 드러내는 첫 컴포넌트. Scope·월별과 함께 3축 분해(시간·관리경계·생애주기)를 갖춰 실무자/경영자 모두에게 의미 제공.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - `/emissions` 활동 테이블 (실무자 점검)

- **무엇을**: `EmissionsActivityWidget` + `useEmissionsActivityTable` + `enrichActivityRows` + `ActivityTableRow` 타입. 검색 input, 기존 `ScopeFilterToggle` 재사용, 계수 버전·출처·계산식 열.
- **프롬프트 요지**: `/emissions` 에 활동 테이블(필터·검색·계수 버전 표시).
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 런타임 `enrichActivityRows` 는 `types` 가 아닌 `utils` 로 분리(타입 파일은 타입만).
  - 계수 출처는 fixture 의 `EmissionFactor.source` 를 (category, subcategoryCode, version, factor) 로 역매칭.
  - 계산식 열에 `활동량 × 계수 = 배출량` 을 그대로 노출 → 평가 4축 도메인 이해 축 직격.
  - Scope 필터는 대시보드와 동일 `useEmissionsFilterStore` → 한 앱 안에서 필터 상태 일관(트레이드오프: 페이지 이동 시 필터 유지됨을 카드 설명에 명시).
  - 가로 스크롤(`min-w` + `overflow-x-auto`)로 좁은 화면에서도 테이블 파손 방지.
- **결정 이유**:
  - 실무자 페르소나 핵심은 "활동량과 계수가 분리되어 있고 어떤 버전이 적용됐는지"를 한 눈에 보는 것 → 테이블이 최적 UI.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

## 2026-05-09 - README 갱신 (도메인·설계·AI·페르소나)

- **무엇을**: 기본 create-next-app README 를 제거하고, 과제 제출용 README 로 전면 교체. 도메인(PCF·Scope·LifeCycle·공식·단위), 시스템 설계(스택·폴더·트레이드오프), 페르소나별 UX, AI 활용(`docs/AI_USAGE_LOG.md` 링크), 실행 방법·체크리스트 포함.
- **프롬프트 요지**: README 갱신 — 도메인·설계·AI 활용·페르소나.
- **AI 출력 평가**: 일부 수정.
- **수정·검증 포인트**:
  - 과제 산출물과 무관한 Vercel 템플릿 문구 삭제 → 평가자가 첫 화면에서 맥락을 잃지 않도록.
  - Postgres/Excel 가점은 “미구현 + 향후 확장”으로 명시해 과제 요구와 정직하게 정렬.
- **결정 이유**:
  - 과제 명시 제출물(Public GitHub + README)에 맞춰, 코드 밖에서도 4축 평가에 답할 수 있는 단일 진입 문서가 필요함.
- **관련 커밋**: (이번 단계 커밋 해시 추후 기재)

