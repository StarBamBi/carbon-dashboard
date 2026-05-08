"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { GhgScope } from "@/src/entities/emission/types";
import type { ScopeAggregation } from "@/src/features/emissions/types/aggregation";
import { SCOPE_COLOR, SCOPE_LABEL } from "@/src/shared/constants/carbon";
import { formatCo2eDual } from "@/src/shared/lib/utils/format-co2e";
import { formatPercent } from "@/src/shared/lib/utils/format-percent";

type PieDatum = {
  scope: GhgScope;
  name: string;
  value: number;
  ratio: number;
  fill: string;
};

type Props = {
  byScope: ScopeAggregation[];
  /** 차트 영역 접근성용 제목 id */
  titleId: string;
};

type ScopeTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: unknown }>;
};

const ScopeTooltip = ({ active, payload }: ScopeTooltipProps) => {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload as PieDatum | undefined;
  if (!item) return null;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{item.name}</p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-300">
        배출량: {formatCo2eDual(item.value)}
      </p>
      <p className="text-zinc-600 dark:text-zinc-300">비중: {formatPercent(item.ratio)}</p>
    </div>
  );
};

/**
 * GHG Scope 1·2·3 비중을 도넛으로 표시한다.
 * - 0인 Scope 는 슬라이스에서 제외하되, 아래 요약 표에는 항상 3행을 노출한다(색만으로 정보 전달 금지).
 */
export const ScopeBreakdownDonut = ({ byScope, titleId }: Props) => {
  const data: PieDatum[] = byScope
    .filter((row) => row.totalKg > 0)
    .map((row) => ({
      scope: row.scope,
      name: SCOPE_LABEL[row.scope],
      value: row.totalKg,
      ratio: row.ratio,
      fill: SCOPE_COLOR[row.scope],
    }));

  const hasSlice = data.length > 0;

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-4">
      <div className="h-[260px] w-full min-w-0">
        {hasSlice ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="48%"
                outerRadius="72%"
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.scope} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<ScopeTooltip />} />
              <Legend
                verticalAlign="bottom"
                formatter={(value) => (
                  <span className="text-xs text-zinc-700 dark:text-zinc-300">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-zinc-500">
            표시할 배출 데이터가 없습니다.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/40">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">Scope별 배출량 및 비중</caption>
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              <th className="px-3 py-2 font-medium">Scope</th>
              <th className="px-3 py-2 font-medium">코드</th>
              <th className="px-3 py-2 font-medium">배출량</th>
              <th className="px-3 py-2 font-medium">비중</th>
            </tr>
          </thead>
          <tbody>
            {byScope.map((row) => (
              <tr
                key={row.scope}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-sm ring-1 ring-zinc-300/80 dark:ring-zinc-600"
                      style={{ backgroundColor: SCOPE_COLOR[row.scope] }}
                      aria-hidden
                    />
                    <span className="text-zinc-800 dark:text-zinc-200">
                      {SCOPE_LABEL[row.scope]}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-zinc-600 dark:text-zinc-400">
                  {row.scope}
                </td>
                <td className="px-3 py-2 text-zinc-800 dark:text-zinc-200">
                  {formatCo2eDual(row.totalKg)}
                </td>
                <td className="px-3 py-2 text-zinc-800 dark:text-zinc-200">
                  {formatPercent(row.ratio)}
                  <span className="ml-1 text-zinc-500 dark:text-zinc-400">
                    ({formatCo2eDual(row.totalKg)})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
