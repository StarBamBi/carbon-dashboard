"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { MAIN_NAV } from "@/src/shared/constants/navigation";

type Props = {
  children: ReactNode;
};

/**
 * 데스크톱: 좌측 사이드바 + 상단 헤더 + 본문.
 * 모바일: 상단에 로고·내비를 쌓고 본문은 풀폭(태블릿까지 고려).
 */
export function DashboardShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 md:flex-row dark:bg-zinc-950">
      <aside className="flex shrink-0 flex-col border-zinc-200 bg-white md:w-56 md:border-r dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <Link href="/dashboard" className="block font-semibold text-zinc-900 dark:text-zinc-50">
            Carbon Dashboard
          </Link>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">PCF · GHG</p>
        </div>
        <nav className="flex flex-row gap-1 overflow-x-auto px-2 py-2 md:flex-col md:gap-0 md:px-2 md:py-3">
          {MAIN_NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors md:whitespace-normal ${
                  active
                    ? "bg-emerald-50 font-medium text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
              >
                <span className="block">{item.label}</span>
                <span className="mt-0.5 hidden text-xs font-normal text-zinc-500 md:block dark:text-zinc-500">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                탄소 발자국 관리
              </p>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {MAIN_NAV.find(
                  (n) => pathname === n.href || pathname.startsWith(`${n.href}/`),
                )?.label ?? "대시보드"}
              </h1>
            </div>
            <p className="hidden text-right text-xs text-zinc-500 sm:block dark:text-zinc-400">
              과제용 더미 데이터
              <br />
              (CT-045)
            </p>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
