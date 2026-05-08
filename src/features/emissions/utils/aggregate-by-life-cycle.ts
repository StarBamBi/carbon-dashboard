import type { EmissionResult } from "@/src/entities/emission/types";
import { LIFE_CYCLE_STAGES } from "@/src/entities/emission/types";

import type { LifeCycleAggregation } from "../types/aggregation";

/**
 * PCF 전과정 단계(원소재 → 제조 → 운송 → 사용 → 폐기) 별 합계와 비율.
 *
 * 데이터에 없는 단계도 0 으로 포함시켜 차트가 5단계 축을 그대로 유지한다 →
 * "사용·폐기 단계 데이터가 비어있다" 자체도 PCF 관점에서 의미 있는 시그널.
 */
export const aggregateByLifeCycle = (
  results: EmissionResult[],
): LifeCycleAggregation[] => {
  const totals = LIFE_CYCLE_STAGES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {});

  for (const r of results) {
    totals[r.lifeCycleStage] += r.co2eKg;
  }

  const grandTotal = Object.values(totals).reduce((sum, v) => sum + v, 0);

  return LIFE_CYCLE_STAGES.map((stage) => ({
    stage,
    totalKg: totals[stage],
    ratio: grandTotal === 0 ? 0 : totals[stage] / grandTotal,
  }));
};
