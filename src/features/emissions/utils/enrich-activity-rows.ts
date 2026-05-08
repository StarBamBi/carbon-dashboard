import type { EmissionFactor } from "@/src/entities/emission-factor/types";
import type { EmissionResult } from "@/src/entities/emission/types";

import type { ActivityTableRow } from "../types/activity-table";

/**
 * 계산 결과에 적용된 배출계수 레코드를 찾아 출처를 붙인다.
 * (category, subcategoryCode, version, factor 값) 으로 매칭 — 동일 버전 내 계수값은 유일하다고 가정.
 */
export const enrichActivityRows = (
  results: EmissionResult[],
  factors: EmissionFactor[],
): ActivityTableRow[] =>
  results.map((r) => {
    const matched = factors.find(
      (f) =>
        f.category === r.category &&
        f.subcategoryCode === r.subcategoryCode &&
        f.version === r.factorVersion &&
        f.factor === r.factor,
    );
    return {
      ...r,
      factorSource: matched?.source ?? "—",
    };
  });
