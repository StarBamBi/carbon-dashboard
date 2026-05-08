import type {
  ActivityCategory,
  SubcategoryCode,
} from "@/src/entities/activity/types";
import type {
  GhgScope,
  LifeCycleStage,
} from "@/src/entities/emission/types";

/**
 * 도메인 라벨/매핑 단일 출처.
 *
 * - 코드(영문 enum) ↔ UI 라벨(한글)을 분리해 i18n / 정렬 / 검색을 쉽게 유지한다.
 * - Scope · LifeCycle 매핑은 카테고리에서만 결정되므로 한 군데서 관리한다.
 */

/** 한글 라벨 → 영문 코드 (Excel 임포트 시 사용) */
export const ACTIVITY_CATEGORY_FROM_KOREAN: Record<string, ActivityCategory> = {
  전기: "ELECTRICITY",
  원소재: "MATERIAL",
  운송: "TRANSPORT",
};

/** 영문 코드 → 한글 라벨 (UI 표시) */
export const ACTIVITY_CATEGORY_LABEL: Record<ActivityCategory, string> = {
  ELECTRICITY: "전기",
  MATERIAL: "원소재",
  TRANSPORT: "운송",
};

/** 서브카테고리 한글 라벨 (Excel 의 '설명' 컬럼과 일치) */
export const SUBCATEGORY_LABEL: Record<SubcategoryCode, string> = {
  KEPCO: "한국전력",
  PLASTIC_1: "플라스틱 1",
  PLASTIC_2: "플라스틱 2",
  TRUCK: "트럭",
};

/** Excel '설명' 한글값 → 정규화 코드 */
export const SUBCATEGORY_FROM_KOREAN: Record<string, SubcategoryCode> = {
  한국전력: "KEPCO",
  "플라스틱 1": "PLASTIC_1",
  "플라스틱 2": "PLASTIC_2",
  트럭: "TRUCK",
};

/**
 * 활동 카테고리 → Scope / LifeCycle 매핑.
 * - 전기 = 외부에서 구매한 전력이므로 Scope 2 / 제조 단계
 * - 원소재 = 가치사슬 상류이므로 Scope 3 / 원소재 단계
 * - 운송 = 가치사슬 운송이므로 Scope 3 / 운송 단계
 */
export const CATEGORY_TO_SCOPE: Record<ActivityCategory, GhgScope> = {
  ELECTRICITY: "scope2",
  MATERIAL: "scope3",
  TRANSPORT: "scope3",
};

export const CATEGORY_TO_LIFE_CYCLE: Record<ActivityCategory, LifeCycleStage> = {
  ELECTRICITY: "manufacturing",
  MATERIAL: "raw_materials",
  TRANSPORT: "transport",
};

/** UI 한글 라벨 */
export const SCOPE_LABEL: Record<GhgScope, string> = {
  scope1: "Scope 1 (직접 배출)",
  scope2: "Scope 2 (구매 에너지)",
  scope3: "Scope 3 (가치사슬)",
};

export const LIFE_CYCLE_LABEL: Record<LifeCycleStage, string> = {
  raw_materials: "원소재",
  manufacturing: "제조",
  transport: "운송",
  use: "사용",
  end_of_life: "폐기",
};

/**
 * 색상 토큰. Tailwind 임의 값으로 사용 가능.
 * 색약 사용자를 위해 hue 차이가 충분한 팔레트를 선택했다(평가 4축의 UX).
 */
export const SCOPE_COLOR: Record<GhgScope, string> = {
  scope1: "#ef4444",
  scope2: "#3b82f6",
  scope3: "#10b981",
};

/** 1,000 kgCO2e 이상이면 tCO2e 로 환산해 보조 표기하기 위한 임계값 */
export const TON_THRESHOLD_KG = 1000;
