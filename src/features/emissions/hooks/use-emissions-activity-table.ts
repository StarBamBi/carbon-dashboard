"use client";

import { useMemo, useState } from "react";

import type { ActivityTableRow } from "@/src/features/emissions/types/activity-table";
import { useEmissionsFilterStore } from "@/src/features/emissions/stores/use-emissions-filter-store";
import { calculateEmissions } from "@/src/features/emissions/utils/calculate-emission";
import { enrichActivityRows } from "@/src/features/emissions/utils/enrich-activity-rows";
import { MOCK_ACTIVITY_RECORDS } from "@/src/mocks/fixtures/activity-records";
import { MOCK_EMISSION_FACTORS } from "@/src/mocks/fixtures/emission-factors";
import {
  ACTIVITY_CATEGORY_LABEL,
  LIFE_CYCLE_LABEL,
  SCOPE_LABEL,
  SUBCATEGORY_LABEL,
} from "@/src/shared/constants/carbon";
import { formatCo2eKg } from "@/src/shared/lib/utils/format-co2e";

const buildSearchHaystack = (row: ActivityTableRow): string =>
  [
    row.occurredAt,
    ACTIVITY_CATEGORY_LABEL[row.category],
    SUBCATEGORY_LABEL[row.subcategoryCode],
    SCOPE_LABEL[row.scope],
    LIFE_CYCLE_LABEL[row.lifeCycleStage],
    row.factorSource,
    String(row.activityAmount),
    row.activityUnit,
    String(row.factor),
    String(row.factorVersion),
    formatCo2eKg(row.co2eKg),
  ]
    .join(" ")
    .toLowerCase();

/**
 * 배출 활동 테이블용: 전체 행 + Scope·검색 필터 결과.
 */
export const useEmissionsActivityTable = () => {
  const rows = useMemo(() => {
    const results = calculateEmissions(MOCK_ACTIVITY_RECORDS, MOCK_EMISSION_FACTORS);
    return enrichActivityRows(results, MOCK_EMISSION_FACTORS);
  }, []);

  const scope = useEmissionsFilterStore((s) => s.scope);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (scope !== "all" && row.scope !== scope) return false;
      if (!q) return true;
      return buildSearchHaystack(row).includes(q);
    });
  }, [rows, scope, query]);

  return { rows, filtered, query, setQuery, scope };
};
