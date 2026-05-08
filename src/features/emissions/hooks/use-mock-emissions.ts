"use client";

import { useMemo } from "react";

import type { EmissionResult } from "@/src/entities/emission/types";
import { calculateEmissions } from "@/src/features/emissions/utils/calculate-emission";
import { aggregateByScope } from "@/src/features/emissions/utils/aggregate-by-scope";
import { sumEmissionsKg } from "@/src/features/emissions/utils/sum-emissions";
import { MOCK_ACTIVITY_RECORDS } from "@/src/mocks/fixtures/activity-records";
import { MOCK_EMISSION_FACTORS } from "@/src/mocks/fixtures/emission-factors";

/**
 * 과제용 더미 활동·계수로부터 배출량을 계산해 메모이즈한다.
 * 차트·KPI 가 동일 스냅샷을 공유하도록 단일 훅으로 묶는다.
 */
export const useMockEmissions = () =>
  useMemo(() => {
    const results: EmissionResult[] = calculateEmissions(
      MOCK_ACTIVITY_RECORDS,
      MOCK_EMISSION_FACTORS,
    );
    const byScope = aggregateByScope(results);
    const totalKg = sumEmissionsKg(results);
    return { results, byScope, totalKg };
  }, []);
