import type { EmissionFactor } from "@/src/entities/emission-factor/types";

/**
 * 배출계수 더미 데이터.
 *
 * 과제 이미지 '배출계수 (지원자 참고용)' 표를 그대로 옮긴 v1 세트.
 *
 * 버전 이력 추적 가능성을 보여주기 위해 전기(KEPCO) 항목은
 * 가상의 v0(2024년) 계수도 함께 두었다. 계산 시 활동 발생일 기준으로
 * 유효(version=valid_from..valid_to) 한 계수가 자동 선택된다.
 */
export const MOCK_EMISSION_FACTORS: EmissionFactor[] = [
  // 전기 - 한국전력
  {
    id: "ef-kepco-v0",
    category: "ELECTRICITY",
    subcategoryCode: "KEPCO",
    factor: 0.4781,
    inputUnit: "kWh",
    source: "한국전력 평균 (2024 가정값)",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    version: 0,
  },
  {
    id: "ef-kepco-v1",
    category: "ELECTRICITY",
    subcategoryCode: "KEPCO",
    factor: 0.456,
    inputUnit: "kWh",
    source: "한국전력 기본값 (과제 제공)",
    validFrom: "2025-01-01",
    validTo: null,
    version: 1,
  },

  // 원소재 - 플라스틱
  {
    id: "ef-plastic1-v1",
    category: "MATERIAL",
    subcategoryCode: "PLASTIC_1",
    factor: 2.3,
    inputUnit: "kg",
    source: "과제 제공",
    validFrom: "2025-01-01",
    validTo: null,
    version: 1,
  },
  {
    id: "ef-plastic2-v1",
    category: "MATERIAL",
    subcategoryCode: "PLASTIC_2",
    factor: 3.2,
    inputUnit: "kg",
    source: "과제 제공",
    validFrom: "2025-01-01",
    validTo: null,
    version: 1,
  },

  // 운송 - 트럭
  {
    id: "ef-truck-v1",
    category: "TRANSPORT",
    subcategoryCode: "TRUCK",
    factor: 3.5,
    inputUnit: "ton-km",
    source: "과제 제공",
    validFrom: "2025-01-01",
    validTo: null,
    version: 1,
  },
];
