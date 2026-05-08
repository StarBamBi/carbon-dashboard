import type { Metadata } from "next";

import { EmissionsOverviewWidget } from "@/src/widgets/emissions-overview/emissions-overview-widget";

export const metadata: Metadata = {
  title: "요약",
  description: "총 배출량 및 GHG Scope별 비중",
};

export default function DashboardPage() {
  return <EmissionsOverviewWidget />;
}
