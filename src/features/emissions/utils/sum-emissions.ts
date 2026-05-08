import type { EmissionResult } from "@/src/entities/emission/types";

/**
 * 배출량 결과 배열의 단순 총합(kgCO2e).
 * 빈 배열이면 0 을 반환한다(UI 빈 상태 처리 단순화).
 */
export const sumEmissionsKg = (results: EmissionResult[]): number =>
  results.reduce((acc, r) => acc + r.co2eKg, 0);
