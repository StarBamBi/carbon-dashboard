import type { DateString, Id } from "@/src/types/common";
import type {
  ActivityCategory,
  ActivityUnit,
  SubcategoryCode,
} from "@/src/entities/activity/types";

/** GHG Protocol 의 3가지 Scope */
export const GHG_SCOPES = ["scope1", "scope2", "scope3"] as const;
export type GhgScope = (typeof GHG_SCOPES)[number];

/** PCF 전과정 단계. 원소재 → 제조 → 운송 → 사용 → 폐기 */
export const LIFE_CYCLE_STAGES = [
  "raw_materials",
  "manufacturing",
  "transport",
  "use",
  "end_of_life",
] as const;
export type LifeCycleStage = (typeof LIFE_CYCLE_STAGES)[number];

/**
 * 활동 1건을 계산해 얻은 배출량 결과.
 *
 * 활동량과 계수는 결과에 그대로 포함시켜, UI 가 "배출량 = 활동량 × 계수"
 * 공식을 그대로 표시할 수 있게 한다(평가 4축의 도메인 이해 / 논리적 설명).
 */
export type EmissionResult = {
  activityId: Id;
  occurredAt: DateString;
  category: ActivityCategory;
  subcategoryCode: SubcategoryCode;
  scope: GhgScope;
  lifeCycleStage: LifeCycleStage;
  activityAmount: number;
  activityUnit: ActivityUnit;
  /** 적용된 배출계수 값 */
  factor: number;
  /** 적용된 계수의 버전 (이력 추적용) */
  factorVersion: number;
  /** 환산 결과: kgCO2e */
  co2eKg: number;
};
