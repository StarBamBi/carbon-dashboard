import type {
  ActivityCategory,
  SubcategoryCode,
} from "@/src/entities/activity/types";
import type { EmissionFactor } from "@/src/entities/emission-factor/types";

type FindArgs = {
  category: ActivityCategory;
  subcategoryCode: SubcategoryCode;
  /** 활동 발생일 (ISO date). 이 시점에 유효한 계수를 찾는다. */
  occurredAt: string;
  factors: EmissionFactor[];
};

/**
 * 활동 발생 시점 기준으로 유효한 배출계수 1건을 조회한다.
 *
 * 같은 (category, subcategoryCode) 안에서 validFrom ≤ occurredAt ≤ (validTo ?? +∞)
 * 를 만족하는 첫 항목을 반환한다. 일치하는 계수가 없으면 null.
 *
 * 계수 변경 이력 추적 요구를 충족하기 위해 "현재값 덮어쓰기"가 아니라
 * 시간 윈도우로 조회하도록 설계했다.
 */
export const findEmissionFactor = ({
  category,
  subcategoryCode,
  occurredAt,
  factors,
}: FindArgs): EmissionFactor | null => {
  const target = Date.parse(occurredAt);
  if (Number.isNaN(target)) return null;

  const matches = factors.filter(
    (factor) =>
      factor.category === category &&
      factor.subcategoryCode === subcategoryCode &&
      Date.parse(factor.validFrom) <= target &&
      (factor.validTo === null || target <= Date.parse(factor.validTo)),
  );

  // 동일 시점에 복수 계수가 매칭되면 최신 버전 우선
  matches.sort((a, b) => b.version - a.version);
  return matches[0] ?? null;
};
