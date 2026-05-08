import type { DateString, Id } from "@/src/types/common";
import type {
  ActivityCategory,
  ActivityUnit,
  SubcategoryCode,
} from "@/src/entities/activity/types";

/**
 * 배출계수.
 *
 * "배출계수는 별도 테이블 + 버전 이력 추적" 요구를 반영해
 * (category, subcategoryCode) 조합당 여러 버전을 시간 축으로 보관한다.
 * 활동 발생일(occurredAt) 시점의 유효 계수를 조회해 계산에 사용한다.
 */
export type EmissionFactor = {
  id: Id;
  category: ActivityCategory;
  subcategoryCode: SubcategoryCode;
  /** 활동량 1단위(inputUnit)당 발생하는 CO2 환산량(kg) */
  factor: number;
  /** 분자 단위는 항상 kgCO2e 로 고정. 분모 단위만 계수마다 다르다. */
  inputUnit: ActivityUnit;
  /** 출처 표기 (예: "한국전력 평균", "환경부 LCI DB v3.0") */
  source: string;
  /** 이 버전이 유효해지는 날짜 (포함) */
  validFrom: DateString;
  /** null 이면 현재까지 유효 */
  validTo: DateString | null;
  /** 동일 (category, subcategoryCode) 안에서 1부터 증가 */
  version: number;
};
