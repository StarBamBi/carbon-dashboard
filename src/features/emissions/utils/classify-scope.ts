import type { ActivityCategory } from "@/src/entities/activity/types";
import type { GhgScope, LifeCycleStage } from "@/src/entities/emission/types";
import {
  CATEGORY_TO_LIFE_CYCLE,
  CATEGORY_TO_SCOPE,
} from "@/src/shared/constants/carbon";

/**
 * 활동 카테고리를 GHG Scope 와 PCF 전과정 단계로 분류한다.
 *
 * 매핑은 `shared/constants/carbon.ts` 에 단일 출처로 두어,
 * 카테고리 추가 시 그곳만 수정하면 모든 차트/테이블이 자동 반영된다.
 */
export const classifyScope = (category: ActivityCategory): GhgScope =>
  CATEGORY_TO_SCOPE[category];

export const classifyLifeCycle = (category: ActivityCategory): LifeCycleStage =>
  CATEGORY_TO_LIFE_CYCLE[category];
