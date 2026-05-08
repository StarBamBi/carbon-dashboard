"use client";

import type { GhgScope } from "@/src/entities/emission/types";
import { GHG_SCOPES } from "@/src/entities/emission/types";
import { useEmissionsFilterStore } from "@/src/features/emissions/stores/use-emissions-filter-store";
import { SCOPE_COLOR, SCOPE_LABEL } from "@/src/shared/constants/carbon";

/**
 * Scope 필터 토글. 차트·테이블이 동일 스토어를 구독해 동기 변경되도록 한다.
 *
 * - 색만으로 정보를 전달하지 않도록 항상 텍스트 라벨을 함께 노출.
 * - 키보드 접근성: 일반 button 요소 사용(Tab/Enter/Space 기본 동작).
 */
type Props = {
  /** 토글 그룹의 접근성 라벨 */
  ariaLabel?: string;
};

const OPTIONS: Array<{ value: GhgScope | "all"; label: string; color?: string }> = [
  { value: "all", label: "전체" },
  ...GHG_SCOPES.map((scope) => ({
    value: scope,
    label: SCOPE_LABEL[scope].split(" (")[0],
    color: SCOPE_COLOR[scope],
  })),
];

export const ScopeFilterToggle = ({ ariaLabel = "Scope 필터" }: Props) => {
  const scope = useEmissionsFilterStore((s) => s.scope);
  const setScope = useEmissionsFilterStore((s) => s.setScope);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap gap-1 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950"
    >
      {OPTIONS.map((opt) => {
        const active = scope === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setScope(opt.value)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            }`}
          >
            {opt.color && (
              <span
                aria-hidden
                className="size-2 rounded-sm ring-1 ring-zinc-300/70 dark:ring-zinc-600"
                style={{ backgroundColor: opt.color }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
