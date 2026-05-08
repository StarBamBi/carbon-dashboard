import type { Metadata } from "next";

import { EmissionsActivityWidget } from "@/src/widgets/emissions-activity/emissions-activity-widget";

export const metadata: Metadata = {
  title: "배출 활동",
  description: "활동 데이터 입력·점검",
};

export default function EmissionsPage() {
  return <EmissionsActivityWidget />;
}
