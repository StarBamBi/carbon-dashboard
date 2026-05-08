"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { LifeCycleStage } from "@/src/entities/emission/types";
import type { LifeCycleAggregation } from "@/src/features/emissions/types/aggregation";
import { LIFE_CYCLE_COLOR, LIFE_CYCLE_LABEL } from "@/src/shared/constants/carbon";
import { formatCo2eAuto, formatCo2eDual } from "@/src/shared/lib/utils/format-co2e";
import { formatPercent } from "@/src/shared/lib/utils/format-percent";

type Props = {
  byLifeCycle: LifeCycleAggregation[];
  /** 차트 영역 접근성용 제목 id */
  titleId: string;
};

type ChartDatum = {
  stage: LifeCycleStage;
  label: string;
  totalKg: number;
  ratio: number;
};

type LifeCycleTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: ChartDatum }>;
};

const LifeCycleTooltip = ({ active, payload }: LifeCycleTooltipProps) => {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{item.label}</p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-300">
        배출량: {formatCo2eDual(item.totalKg)}
      </p>
      <p className="text-zinc-600 dark:text-zinc-300">비중: {formatPercent(item.ratio)}</p>
    </div>
  );
};

/**
 * PCF 전과정 단계(원소재 → 제조 → 운송 → 사용 → 폐기) 별 가로 막대 차트.
 *
 * - 데이터에 없는 단계도 0 막대로 그대로 노출 → "데이터 누락" 자체가 시그널.
 * - 색만으로 정보 전달 금지: 우측 표에 한글 라벨·코드·수치 병기.
 */
export const EmissionsLifeCycleChart = ({ byLifeCycle, titleId }: Props) => {
  const data: ChartDatum[] = byLifeCycle.map((row) => ({
    stage: row.stage,
    label: LIFE_CYCLE_LABEL[row.stage],
    totalKg: row.totalKg,
    ratio: row.ratio,
  }));

  return (
    <section aria-labelledby={titleId} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(value: number) => formatCo2eAuto(value)}
              tick={{ fontSize: 11, fill: "#71717a" }}
              tickLine={false}
              axisLine={{ stroke: "#e4e4e7" }}
            />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fontSize: 12, fill: "#52525b" }}
              tickLine={false}
              axisLine={{ stroke: "#e4e4e7" }}
              width={72}
            />
            <Tooltip content={<LifeCycleTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="totalKg" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.stage} fill={LIFE_CYCLE_COLOR[d.stage]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/40">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">PCF 전과정 단계별 배출량 및 비중</caption>
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              <th className="px-3 py-2 font-medium">단계</th>
              <th className="px-3 py-2 font-medium">배출량</th>
              <th className="px-3 py-2 font-medium">비중</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.stage}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-sm ring-1 ring-zinc-300/80 dark:ring-zinc-600"
                      style={{ backgroundColor: LIFE_CYCLE_COLOR[row.stage] }}
                      aria-hidden
                    />
                    <span className="text-zinc-800 dark:text-zinc-200">{row.label}</span>
                  </span>
                </td>
                <td className="px-3 py-2 text-zinc-800 dark:text-zinc-200">
                  {formatCo2eAuto(row.totalKg)}
                </td>
                <td className="px-3 py-2 text-zinc-800 dark:text-zinc-200">
                  {formatPercent(row.ratio)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
