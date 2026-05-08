import type { EmissionResult } from "@/src/entities/emission/types";

/**
 * 테이블 한 행. 계산 결과 + 배출계수 메타(출처).
 * UI 에서 한글 라벨은 `shared/constants/carbon.ts` 로 매핑한다.
 */
export type ActivityTableRow = EmissionResult & {
  factorSource: string;
};
