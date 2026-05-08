/**
 * Mock 데이터 진입점.
 *
 * 도메인 레이어가 늘어나면 fixtures/* 에서 추가로 re-export 한다.
 * 핸들러(MSW 등)나 시나리오(다국어/대용량 등) 도 이곳에서 노출 예정.
 */
export { MOCK_ACTIVITY_RECORDS } from "./fixtures/activity-records";
export { MOCK_EMISSION_FACTORS } from "./fixtures/emission-factors";
