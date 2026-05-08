import type { ActivityRecord } from "@/src/entities/activity/types";

/**
 * 과제 제공 더미 데이터 (CT-045).
 *
 * 원본 Excel 의 '일자(원본) / 활동 유형 / 설명 / 량 / 단위' 컬럼을
 * 정규화된 ActivityRecord 형태로 옮긴 것.
 *
 * - 같은 월에 여러 라인이 입력되는 케이스(예: 2025-05-01 전기 120, 101)는
 *   원본 그대로 보존하고 월별 집계는 utils 단에서 SUM 한다.
 *   (raw 보존 → 추후 개별 라인 추적/감사 가능)
 * - id 는 결정성 있게 `act-<카테고리코드>-<일련번호>` 로 부여.
 */
export const MOCK_ACTIVITY_RECORDS: ActivityRecord[] = [
  // 전기 (Scope 2 / 제조 단계 / 한국전력)
  { id: "act-elec-01", occurredAt: "2025-01-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 110, unit: "kWh" },
  { id: "act-elec-02", occurredAt: "2025-02-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 112, unit: "kWh" },
  { id: "act-elec-03", occurredAt: "2025-03-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 115, unit: "kWh" },
  { id: "act-elec-04", occurredAt: "2025-04-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 130, unit: "kWh" },
  { id: "act-elec-05", occurredAt: "2025-05-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 120, unit: "kWh" },
  { id: "act-elec-06", occurredAt: "2025-06-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 110, unit: "kWh" },
  { id: "act-elec-07", occurredAt: "2025-07-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 120, unit: "kWh" },
  { id: "act-elec-08", occurredAt: "2025-08-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 111, unit: "kWh" },
  { id: "act-elec-09", occurredAt: "2025-05-01", category: "ELECTRICITY", subcategoryCode: "KEPCO", amount: 101, unit: "kWh" },

  // 원소재 (Scope 3 / 원소재 단계)
  { id: "act-mat-01", occurredAt: "2025-01-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 230, unit: "kg" },
  { id: "act-mat-02", occurredAt: "2025-02-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 340, unit: "kg" },
  { id: "act-mat-03", occurredAt: "2025-03-01", category: "MATERIAL", subcategoryCode: "PLASTIC_2", amount: 23, unit: "kg" },
  { id: "act-mat-04", occurredAt: "2025-03-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 430, unit: "kg" },
  { id: "act-mat-05", occurredAt: "2025-04-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 510, unit: "kg" },
  { id: "act-mat-06", occurredAt: "2025-05-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 424, unit: "kg" },
  { id: "act-mat-07", occurredAt: "2025-05-01", category: "MATERIAL", subcategoryCode: "PLASTIC_2", amount: 40, unit: "kg" },
  { id: "act-mat-08", occurredAt: "2025-06-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 450, unit: "kg" },
  { id: "act-mat-09", occurredAt: "2025-07-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 340, unit: "kg" },
  { id: "act-mat-10", occurredAt: "2025-07-01", category: "MATERIAL", subcategoryCode: "PLASTIC_2", amount: 43, unit: "kg" },
  { id: "act-mat-11", occurredAt: "2025-08-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 230, unit: "kg" },
  { id: "act-mat-12", occurredAt: "2025-05-01", category: "MATERIAL", subcategoryCode: "PLASTIC_1", amount: 232, unit: "kg" },

  // 운송 (Scope 3 / 운송 단계 / 트럭)
  { id: "act-trn-01", occurredAt: "2025-01-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 41, unit: "ton-km" },
  { id: "act-trn-02", occurredAt: "2025-02-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 211, unit: "ton-km" },
  { id: "act-trn-03", occurredAt: "2025-03-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 123, unit: "ton-km" },
  { id: "act-trn-04", occurredAt: "2025-04-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 42, unit: "ton-km" },
  { id: "act-trn-05", occurredAt: "2025-05-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 123, unit: "ton-km" },
  { id: "act-trn-06", occurredAt: "2025-06-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 123, unit: "ton-km" },
  { id: "act-trn-07", occurredAt: "2025-07-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 41, unit: "ton-km" },
  { id: "act-trn-08", occurredAt: "2025-08-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 123, unit: "ton-km" },
  { id: "act-trn-09", occurredAt: "2025-05-01", category: "TRANSPORT", subcategoryCode: "TRUCK", amount: 12, unit: "ton-km" },
];
