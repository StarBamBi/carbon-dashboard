import type { ActivityRecord } from "@/src/entities/activity/types";
import type { EmissionFactor } from "@/src/entities/emission-factor/types";
import type { EmissionResult } from "@/src/entities/emission/types";

import {
  classifyLifeCycle,
  classifyScope,
} from "./classify-scope";
import { findEmissionFactor } from "./find-emission-factor";

/**
 * 활동 1건의 배출량을 계산한다.
 *
 *   배출량(kgCO2e) = 활동량 × 발생일 시점의 유효 배출계수
 *
 * 이 공식이 코드와 1:1 매칭되도록 설명적인 변수명을 유지한다.
 * 계수가 없거나 단위가 어긋나면 null 을 반환해 호출부에서 명시적으로 처리한다.
 */
export const calculateEmission = (
  record: ActivityRecord,
  factors: EmissionFactor[],
): EmissionResult | null => {
  const factor = findEmissionFactor({
    category: record.category,
    subcategoryCode: record.subcategoryCode,
    occurredAt: record.occurredAt,
    factors,
  });
  if (!factor) return null;

  // 계수의 분모 단위와 활동 단위는 반드시 일치해야 한다.
  // 일치하지 않으면 계산 자체가 무의미하므로 null 처리.
  if (factor.inputUnit !== record.unit) return null;

  const co2eKg = record.amount * factor.factor;

  return {
    activityId: record.id,
    occurredAt: record.occurredAt,
    category: record.category,
    subcategoryCode: record.subcategoryCode,
    scope: classifyScope(record.category),
    lifeCycleStage: classifyLifeCycle(record.category),
    activityAmount: record.amount,
    activityUnit: record.unit,
    factor: factor.factor,
    factorVersion: factor.version,
    co2eKg,
  };
};

/** 활동 레코드 배열을 한 번에 계산. 계수가 매칭되지 않은 항목은 제외된다. */
export const calculateEmissions = (
  records: ActivityRecord[],
  factors: EmissionFactor[],
): EmissionResult[] =>
  records
    .map((record) => calculateEmission(record, factors))
    .filter((result): result is EmissionResult => result !== null);
