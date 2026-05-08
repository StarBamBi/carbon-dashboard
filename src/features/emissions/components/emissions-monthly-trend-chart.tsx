"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { GhgScope } from "@/src/entities/emission/types";
import { GHG_SCOPES } from "@/src/entities/emission/types";
import type { MonthlyChartRow } from "@/src/features/emissions/hooks/use-mock-emissions";
import { useEmissionsFilterStore } from "@/src/features/emissions/stores/use-emissions-filter-store";
import { SCOPE_COLOR, SCOPE_LABEL } from "@/src/shared/constants/carbon";
import { formatCo2eAuto, formatCo2eDual } from "@/src/shared/lib/utils/format-co2e";

type Props = {
  rows: MonthlyChartRow[];
  /** 차트 영역 접근성용 제목 id */
  titleId: string;
};

type TooltipPayloadEntry = {
  name: string;
  value: number;
  color: string;
  dataKey: GhgScope;
  payload?: MonthlyChartRow;
};

type MonthlyTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<TooltipPayloadEntry>;
  label?: string;
};

const MonthlyTooltip = ({ active, payload, label }: MonthlyTooltipProps) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, item) => sum + (item.value ?? 0), 0);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{label}</p>
      <ul className="mt-1 space-y-0.5">
        {payload.map((item) => (
          <li key={item.dataKey} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span
              aria-hidden
              className="size-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="flex-1">{SCOPE_LABEL[item.dataKey]}</span>
            <span className="font-mono">{formatCo2eAuto(item.value)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 border-t border-zinc-100 pt-1.5 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
        합계: {formatCo2eDual(total)}
      </p>
    </div>
  );
};

const formatMonthLabel = (month: string) => {
  // "2025-01" -> "1월"
  const m = Number(month.slice(5, 7));
  return Number.isFinite(m) ? `${m}월` : month;
};

/**
 * 월별 배출량 추이(Scope 1·2·3 누적 면적).
 * - 필터가 "all" 이 아니면 선택 Scope 만 단색 면으로 표시.
 * - Y축 단위는 kg→t 자동 환산(formatCo2eAuto).
 */
export const EmissionsMonthlyTrendChart = ({ rows, titleId }: Props) => {
  const scope = useEmissionsFilterStore((s) => s.scope);
  const visibleScopes: GhgScope[] = scope === "all" ? [...GHG_SCOPES] : [scope];

  if (rows.length === 0) {
    return (
      <p className="flex h-[280px] items-center justify-center text-sm text-zinc-500">
        표시할 월별 데이터가 없습니다.
      </p>
    );
  }

  return (
    <section aria-labelledby={titleId} className="h-[280px] w-full min-w-0">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={rows} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonthLabel}
            tick={{ fontSize: 12, fill: "#71717a" }}
            tickLine={false}
            axisLine={{ stroke: "#e4e4e7" }}
          />
          <YAxis
            tickFormatter={(value: number) => formatCo2eAuto(value)}
            tick={{ fontSize: 12, fill: "#71717a" }}
            tickLine={false}
            axisLine={{ stroke: "#e4e4e7" }}
            width={80}
          />
          <Tooltip content={<MonthlyTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{value}</span>
            )}
          />
          {visibleScopes.map((s) => (
            <Area
              key={s}
              type="monotone"
              dataKey={s}
              name={SCOPE_LABEL[s]}
              stackId={scope === "all" ? "stacked" : undefined}
              stroke={SCOPE_COLOR[s]}
              fill={SCOPE_COLOR[s]}
              fillOpacity={0.35}
              strokeWidth={1.5}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};
