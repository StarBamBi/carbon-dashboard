import type { EmissionResult } from "@/src/entities/emission/types";
import { ACTIVITY_CATEGORIES } from "@/src/entities/activity/types";

import type { CategoryAggregation } from "../types/aggregation";

/**
 * 활동 카테고리(전기/원소재/운송) 별 합계와 비율.
 *
 * Scope 와는 별도 축으로 보여줄 수 있어야 한다 — 예: Scope 3 안에서도
 * 원소재 vs 운송 비중을 따로 보고 싶은 경우.
 */
export const aggregateByCategory = (
  results: EmissionResult[],
): CategoryAggregation[] => {
  const totals = ACTIVITY_CATEGORIES.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c] = 0;
      return acc;
    },
    {},
  );

  for (const r of results) {
    totals[r.category] += r.co2eKg;
  }

  const grandTotal = Object.values(totals).reduce((sum, v) => sum + v, 0);

  return ACTIVITY_CATEGORIES.map((category) => ({
    category,
    totalKg: totals[category],
    ratio: grandTotal === 0 ? 0 : totals[category] / grandTotal,
  }));
};
