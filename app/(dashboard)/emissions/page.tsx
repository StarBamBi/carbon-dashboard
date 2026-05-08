import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/ui/card";

export const metadata: Metadata = {
  title: "배출 활동",
  description: "활동 데이터 입력·점검",
};

export default function EmissionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>배출 활동</CardTitle>
          <CardDescription>
            활동량과 배출계수를 분리해 관리합니다. 다음 단계에서 테이블·필터·Excel 임포트 UI를 붙일
            예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            계산 공식은{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              배출량(kgCO₂e) = 활동량 × 해당 일자의 유효 배출계수
            </span>
            입니다.
          </p>
          <p>
            요약 지표는{" "}
            <Link href="/dashboard" className="font-medium text-emerald-700 underline dark:text-emerald-400">
              요약
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
