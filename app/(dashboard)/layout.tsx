import type { Metadata } from "next";

import { DashboardShell } from "@/src/widgets/app-shell/dashboard-shell";

export const metadata: Metadata = {
  title: {
    template: "%s | Carbon Dashboard",
    default: "Carbon Dashboard",
  },
};

export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
