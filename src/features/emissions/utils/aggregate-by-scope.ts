import type { EmissionResult } from "@/src/entities/emission/types";
import { GHG_SCOPES } from "@/src/entities/emission/types";

import type { ScopeAggregation } from "../types/aggregation";

/**
 * Scope 1·2·3 별 합계와 비율.
 *
 * - 사용 데이터에 Scope 1 이 0건이어도 0 항목으로 포함시킨다 →
 *   도넛/범례에서 항상 "어떤 Scope 가 비어있는지" 가 드러난다(UX·정확성).
 * - 비율은 0~1 (formatter 가 % 변환 책임).
 */
export const aggregateByScope = (
  results: EmissionResult[],
): ScopeAggregation[] => {
  const totals = GHG_SCOPES.reduce<Record<string, number>>((acc, scope) => {
    acc[scope] = 0;
    return acc;
  }, {});

  for (const r of results) {
    totals[r.scope] += r.co2eKg;
  }

  const grandTotal = Object.values(totals).reduce((sum, v) => sum + v, 0);

  return GHG_SCOPES.map((scope) => ({
    scope,
    totalKg: totals[scope],
    ratio: grandTotal === 0 ? 0 : totals[scope] / grandTotal,
  }));
};
