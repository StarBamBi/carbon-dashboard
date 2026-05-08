import type { ActivityCategory } from "@/src/entities/activity/types";
import type { GhgScope, LifeCycleStage } from "@/src/entities/emission/types";

/**
 * 집계 결과 타입.
 *
 * - 모든 합계는 kgCO2e 단위로 통일(총합·비율 계산이 단순해짐).
 * - 비율(ratio)은 0~1 의 소수. UI 가 % 변환은 formatter 에서 책임.
 * - 차트 라이브러리(Recharts)가 그대로 dataKey 로 사용할 수 있게
 *   필드명을 단순한 영문 슬러그로 유지한다. UI 라벨은 별도 매핑.
 */

export type MonthlyAggregation = {
  /** YYYY-MM (예: "2025-01"). 정렬·라벨 모두 이 키 기준 */
  month: string;
  totalKg: number;
  /** 같은 month 안에서 Scope 별 합계. Recharts stacked area/bar 의 dataKey 로 사용 */
  byScope: Record<GhgScope, number>;
};

export type ScopeAggregation = {
  scope: GhgScope;
  totalKg: number;
  /** 0~1. 합이 0이면 모든 항목 0 */
  ratio: number;
};

export type LifeCycleAggregation = {
  stage: LifeCycleStage;
  totalKg: number;
  ratio: number;
};

export type CategoryAggregation = {
  category: ActivityCategory;
  totalKg: number;
  ratio: number;
};
