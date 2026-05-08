import type { DateString, Id } from "@/src/types/common";

/**
 * 활동 데이터 도메인 타입.
 *
 * 원본(Excel) 행은 한글 라벨을 그대로 보존하고(RawActivityRow),
 * 시스템 내부에서는 영문 코드로 정규화한 ActivityRecord 만 사용한다.
 * → "Excel 직접 임포트" 인터페이스 확장 시 normalizer 한 곳만 수정하면 된다.
 */

export const ACTIVITY_CATEGORIES = ["ELECTRICITY", "MATERIAL", "TRANSPORT"] as const;
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

export const ACTIVITY_UNITS = ["kWh", "kg", "ton-km"] as const;
export type ActivityUnit = (typeof ACTIVITY_UNITS)[number];

/**
 * 카테고리별 서브카테고리 코드.
 * 원본 데이터의 '설명' 컬럼(한국전력/플라스틱 1/플라스틱 2/트럭)을 영문 코드로 정규화한 값.
 * 새 항목 추가 시 이 union 과 라벨 맵(`shared/constants/carbon.ts`)만 갱신한다.
 */
export type SubcategoryCode = "KEPCO" | "PLASTIC_1" | "PLASTIC_2" | "TRUCK";

/** 시스템 내부에서 사용하는 정규화된 활동 레코드 */
export type ActivityRecord = {
  id: Id;
  /** 활동 발생일 (월별 집계 시 month 단위로 합산) */
  occurredAt: DateString;
  category: ActivityCategory;
  subcategoryCode: SubcategoryCode;
  amount: number;
  unit: ActivityUnit;
};

/**
 * Excel/CSV 에서 가공 없이 들어오는 원본 행.
 * 컬럼명은 과제 데이터 그대로(한글) 유지하여 임포트 시 매핑이 단순해지도록 한다.
 */
export type RawActivityRow = {
  "일자(원본)": string;
  "활동 유형": "전기" | "원소재" | "운송";
  설명: string;
  량: number;
  단위: ActivityUnit;
};
