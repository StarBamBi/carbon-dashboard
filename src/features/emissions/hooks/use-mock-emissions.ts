"use client";

import { useMemo } from "react";

import type { EmissionResult, GhgScope } from "@/src/entities/emission/types";
import { GHG_SCOPES } from "@/src/entities/emission/types";
import { aggregateByMonth } from "@/src/features/emissions/utils/aggregate-by-month";
import { aggregateByScope } from "@/src/features/emissions/utils/aggregate-by-scope";
import { calculateEmissions } from "@/src/features/emissions/utils/calculate-emission";
import { sumEmissionsKg } from "@/src/features/emissions/utils/sum-emissions";
import { MOCK_ACTIVITY_RECORDS } from "@/src/mocks/fixtures/activity-records";
import { MOCK_EMISSION_FACTORS } from "@/src/mocks/fixtures/emission-factors";

/** 차트 친화적으로 평탄화한 월별 행. nested dataKey 대신 시리즈마다 1 컬럼. */
export type MonthlyChartRow = {
  month: string;
  totalKg: number;
} & Record<GhgScope, number>;

/**
 * 과제용 더미 활동·계수로부터 배출량을 계산해 메모이즈한다.
 * 차트·KPI 가 동일 스냅샷을 공유하도록 단일 훅으로 묶는다.
 */
export const useMockEmissions = () =>
  useMemo(() => {
    const results: EmissionResult[] = calculateEmissions(
      MOCK_ACTIVITY_RECORDS,
      MOCK_EMISSION_FACTORS,
    );
    const byScope = aggregateByScope(results);
    const byMonth = aggregateByMonth(results);
    const totalKg = sumEmissionsKg(results);

    const monthlyChartRows: MonthlyChartRow[] = byMonth.map((row) => {
      const flat = GHG_SCOPES.reduce(
        (acc, scope) => {
          acc[scope] = row.byScope[scope];
          return acc;
        },
        {} as Record<GhgScope, number>,
      );
      return { month: row.month, totalKg: row.totalKg, ...flat };
    });

    return { results, byScope, byMonth, monthlyChartRows, totalKg };
  }, []);
