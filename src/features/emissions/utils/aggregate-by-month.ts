import type { EmissionResult, GhgScope } from "@/src/entities/emission/types";
import { GHG_SCOPES } from "@/src/entities/emission/types";

import type { MonthlyAggregation } from "../types/aggregation";

const EMPTY_BY_SCOPE: Record<GhgScope, number> = GHG_SCOPES.reduce(
  (acc, scope) => {
    acc[scope] = 0;
    return acc;
  },
  {} as Record<GhgScope, number>,
);

/**
 * 월별 + Scope별 배출량 집계.
 *
 * - 키는 occurredAt 의 앞 7글자(YYYY-MM)를 사용 → date 라이브러리 의존성 없이 동작.
 * - 결과는 month 오름차순으로 정렬해 차트 X축이 자동 정렬되게 한다.
 * - 같은 month 에 데이터가 1건이라도 있으면 모든 Scope 키가 0 으로라도 존재해
 *   stacked area/bar 차트가 빈 면을 그리지 않는 사고를 막는다.
 */
export const aggregateByMonth = (
  results: EmissionResult[],
): MonthlyAggregation[] => {
  const map = new Map<string, MonthlyAggregation>();

  for (const r of results) {
    const month = r.occurredAt.slice(0, 7);
    const existing =
      map.get(month) ??
      ({
        month,
        totalKg: 0,
        byScope: { ...EMPTY_BY_SCOPE },
      } satisfies MonthlyAggregation);

    existing.totalKg += r.co2eKg;
    existing.byScope[r.scope] += r.co2eKg;
    map.set(month, existing);
  }

  return [...map.values()].sort((a, b) => a.month.localeCompare(b.month));
};
