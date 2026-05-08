"use client";

import Link from "next/link";

import { ScopeFilterToggle } from "@/src/features/emissions/components/scope-filter-toggle";
import { useEmissionsActivityTable } from "@/src/features/emissions/hooks/use-emissions-activity-table";
import {
  ACTIVITY_CATEGORY_LABEL,
  LIFE_CYCLE_LABEL,
  SCOPE_LABEL,
  SUBCATEGORY_LABEL,
} from "@/src/shared/constants/carbon";
import { formatCo2eKg } from "@/src/shared/lib/utils/format-co2e";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/ui/card";

const SEARCH_ID = "activity-search";

/**
 * 실무자용: 활동량·적용 계수·버전·출처·배출량을 한 화면에서 점검.
 * Scope 필터는 대시보드와 동일 Zustand 스토어를 공유한다.
 */
export const EmissionsActivityWidget = () => {
  const { rows, filtered, query, setQuery } = useEmissionsActivityTable();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          배출 활동
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          활동 데이터 점검
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          배출량은{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            활동량 × 해당 일자의 유효 배출계수
          </span>
          로 계산됩니다. 계수는 별도 테이블에서 버전·출처와 함께 관리됩니다.
        </p>
        <p className="text-sm">
          <Link
            href="/dashboard"
            className="font-medium text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
          >
            요약 대시보드로 이동
          </Link>
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CardTitle>활동별 배출 계산 내역</CardTitle>
              <CardDescription>
                과제 더미(CT-045) 기준. Scope 필터는 요약 화면과 동기화됩니다.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <label htmlFor={SEARCH_ID} className="sr-only">
                검색
              </label>
              <input
                id={SEARCH_ID}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="일자, 유형, 항목, Scope, 출처…"
                className="w-full min-w-[12rem] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-emerald-600/30 placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
              <ScopeFilterToggle ariaLabel="활동 테이블 Scope 필터" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            전체 {rows.length}건 · 표시 {filtered.length}건
          </p>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[920px] text-left text-xs">
              <caption className="sr-only">활동별 배출 계산 상세</caption>
              <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                <tr>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">일자</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">Scope</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">전과정</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">유형</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">항목</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium text-right">활동량</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">단위</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium text-right">계수</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">계수 단위</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium text-right">버전</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">출처</th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium text-right">배출량</th>
                  <th className="min-w-[200px] px-3 py-2 font-medium">계산</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-3 py-8 text-center text-sm text-zinc-500">
                      조건에 맞는 행이 없습니다. 검색어나 Scope 필터를 바꿔 보세요.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr
                      key={row.activityId}
                      className="bg-white odd:bg-zinc-50/50 dark:bg-zinc-950 dark:odd:bg-zinc-900/40"
                    >
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-zinc-800 dark:text-zinc-200">
                        {row.occurredAt}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-zinc-800 dark:text-zinc-200">
                        {SCOPE_LABEL[row.scope]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-zinc-800 dark:text-zinc-200">
                        {LIFE_CYCLE_LABEL[row.lifeCycleStage]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-zinc-800 dark:text-zinc-200">
                        {ACTIVITY_CATEGORY_LABEL[row.category]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-zinc-800 dark:text-zinc-200">
                        {SUBCATEGORY_LABEL[row.subcategoryCode]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-zinc-800 dark:text-zinc-200">
                        {row.activityAmount.toLocaleString("ko-KR")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-zinc-600 dark:text-zinc-400">
                        {row.activityUnit}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-zinc-800 dark:text-zinc-200">
                        {row.factor.toLocaleString("ko-KR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 6,
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-zinc-600 dark:text-zinc-400">
                        kgCO₂e / {row.activityUnit}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-zinc-800 dark:text-zinc-200">
                        v{row.factorVersion}
                      </td>
                      <td className="max-w-[140px] px-3 py-2 text-zinc-700 dark:text-zinc-300">
                        {row.factorSource}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-medium text-zinc-900 dark:text-zinc-50">
                        {formatCo2eKg(row.co2eKg)}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] leading-snug text-zinc-600 dark:text-zinc-400">
                        {row.activityAmount.toLocaleString("ko-KR")}{" "}
                        {row.activityUnit} ×{" "}
                        {row.factor.toLocaleString("ko-KR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 6,
                        })}{" "}
                        = {formatCo2eKg(row.co2eKg)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
