"use client";

import type { ScopeAggregation } from "@/src/features/emissions/types/aggregation";
import { SCOPE_LABEL } from "@/src/shared/constants/carbon";
import { formatCo2eAuto, formatCo2eDual } from "@/src/shared/lib/utils/format-co2e";
import { formatPercentWithAbsolute } from "@/src/shared/lib/utils/format-percent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/ui/card";

type Props = {
  totalKg: number;
  byScope: ScopeAggregation[];
};

/**
 * 경영자용 요약 KPI + Scope별 절대·비중 동시 표기.
 */
export const EmissionsKpiCards = ({ totalKg, byScope }: Props) => {
  const scope2 = byScope.find((r) => r.scope === "scope2");
  const scope3 = byScope.find((r) => r.scope === "scope3");

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>총 배출량 (CO₂e)</CardTitle>
          <CardDescription>과제 더미 CT-045 · 활동량 × 배출계수 합계</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatCo2eAuto(totalKg)}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            보조: {formatCo2eDual(totalKg)}
          </p>
        </CardContent>
      </Card>

      {scope2 && (
        <Card>
          <CardHeader>
            <CardTitle>{SCOPE_LABEL.scope2}</CardTitle>
            <CardDescription>구매 전력 등 간접 배출</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formatPercentWithAbsolute(scope2.ratio, formatCo2eAuto(scope2.totalKg))}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              절대값: {formatCo2eDual(scope2.totalKg)}
            </p>
          </CardContent>
        </Card>
      )}

      {scope3 && (
        <Card>
          <CardHeader>
            <CardTitle>{SCOPE_LABEL.scope3}</CardTitle>
            <CardDescription>원소재·운송 등 가치사슬</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formatPercentWithAbsolute(scope3.ratio, formatCo2eAuto(scope3.totalKg))}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              절대값: {formatCo2eDual(scope3.totalKg)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
