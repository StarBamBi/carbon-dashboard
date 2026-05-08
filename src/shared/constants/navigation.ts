/**
 * 앱 메인 내비게이션. href 는 App Router 경로와 1:1.
 */
export const MAIN_NAV = [
  {
    href: "/dashboard",
    label: "요약",
    description: "총 배출·Scope 비중",
  },
  {
    href: "/emissions",
    label: "배출 활동",
    description: "활동 데이터·계수 점검",
  },
  {
    href: "/reports",
    label: "리포트",
    description: "보내기·기간 요약",
  },
] as const;

export type MainNavItem = (typeof MAIN_NAV)[number];
