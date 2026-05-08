import { TON_THRESHOLD_KG } from "@/src/shared/constants/carbon";

/**
 * 배출량 표기 유틸.
 *
 * 룰: "1,000 kgCO2e 이상은 tCO2e 로 환산해 보조 표기".
 * - formatCo2eKg: 1,234 kgCO2e
 * - formatCo2eTon: 1.23 tCO2e
 * - formatCo2eAuto: 임계값 기준으로 자동 선택 (KPI 카드의 메인 숫자에 사용)
 * - formatCo2eDual: 메인 + 보조 동시 표기 (툴팁/상세에 사용)
 *
 * 모든 함수는 NaN/음수에도 깨지지 않도록 fallback 을 둔다.
 */

const FALLBACK = "0 kgCO₂e";

const formatNumber = (value: number, fractionDigits: number): string =>
  value.toLocaleString("ko-KR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

export const formatCo2eKg = (kg: number): string => {
  if (!Number.isFinite(kg)) return FALLBACK;
  return `${formatNumber(kg, 0)} kgCO₂e`;
};

export const formatCo2eTon = (kg: number): string => {
  if (!Number.isFinite(kg)) return "0 tCO₂e";
  return `${formatNumber(kg / 1000, 2)} tCO₂e`;
};

export const formatCo2eAuto = (kg: number): string => {
  if (!Number.isFinite(kg)) return FALLBACK;
  return Math.abs(kg) >= TON_THRESHOLD_KG ? formatCo2eTon(kg) : formatCo2eKg(kg);
};

/**
 * 메인 단위 + 괄호 보조 단위. 임계값 미만이면 보조 표기는 생략한다.
 * 예: "1.23 tCO₂e (1,234 kgCO₂e)"
 */
export const formatCo2eDual = (kg: number): string => {
  if (!Number.isFinite(kg)) return FALLBACK;
  if (Math.abs(kg) < TON_THRESHOLD_KG) return formatCo2eKg(kg);
  return `${formatCo2eTon(kg)} (${formatCo2eKg(kg)})`;
};
