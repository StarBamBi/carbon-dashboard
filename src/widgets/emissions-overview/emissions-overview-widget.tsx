"use client";

import { EmissionsKpiCards } from "@/src/features/emissions/components/emissions-kpi-cards";
import { EmissionsMonthlyTrendChart } from "@/src/features/emissions/components/emissions-monthly-trend-chart";
import { ScopeBreakdownDonut } from "@/src/features/emissions/components/scope-breakdown-donut";
import { ScopeFilterToggle } from "@/src/features/emissions/components/scope-filter-toggle";
import { useMockEmissions } from "@/src/features/emissions/hooks/use-mock-emissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/ui/card";

const SCOPE_TITLE_ID = "scope-breakdown-title";
const TREND_TITLE_ID = "monthly-trend-title";

/**
 * 대시보드 첫 화면용 조합 위젯.
 * KPI(경영자) + Scope 도넛 + 월별 추이를 동일 데이터 스냅샷으로 묶는다.
 */
export const EmissionsOverviewWidget = () => {
  const { byScope, totalKg, monthlyChartRows } = useMockEmissions();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          PCF · GHG 대시보드
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          제품 탄소 발자국 요약
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          활동 데이터와 배출계수를 분리해 두었으며, 배출량은{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            활동량 × 해당 일자의 유효 배출계수
          </span>
          로 계산합니다. 아래 수치는 과제용 더미(CT-045)입니다.
        </p>
      </header>

      <EmissionsKpiCards totalKg={totalKg} byScope={byScope} />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle id={TREND_TITLE_ID}>월별 배출 추이</CardTitle>
              <CardDescription>
                Scope 1·2·3 누적 면적 차트. 필터를 바꾸면 같은 데이터를 단일 Scope로도 볼 수
                있습니다.
              </CardDescription>
            </div>
            <ScopeFilterToggle ariaLabel="추이 차트 Scope 필터" />
          </div>
        </CardHeader>
        <CardContent>
          <EmissionsMonthlyTrendChart rows={monthlyChartRows} titleId={TREND_TITLE_ID} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle id={SCOPE_TITLE_ID}>Scope별 배출 비중</CardTitle>
          <CardDescription>
            Scope 1·2·3 구분 색상은 범례·표와 함께 제공합니다. Scope 1 데이터가 없으면 슬라이스는
            생략되고 표에는 0으로 표시됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScopeBreakdownDonut byScope={byScope} titleId={SCOPE_TITLE_ID} />
        </CardContent>
      </Card>
    </div>
  );
};
