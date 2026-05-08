import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/ui/card";

export const metadata: Metadata = {
  title: "리포트",
  description: "기간·Scope 요약보내기",
};

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>리포트</CardTitle>
          <CardDescription>
            경영 보고용 PDF/CSV보내기, 기간 비교 등은 이후 단계에서 구현합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            현재는{" "}
            <Link href="/dashboard" className="font-medium text-emerald-700 underline dark:text-emerald-400">
              요약
            </Link>{" "}
            화면의 수치를 기준으로 발표·캡처를 준비하시면 됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
