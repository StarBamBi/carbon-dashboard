import type { GhgScope } from "@/src/entities/emission/types";
import { createStore } from "@/src/shared/lib/zustand/create-store";

type ScopeFilter = GhgScope | "all";

type EmissionsFilterState = {
  scope: ScopeFilter;
  setScope: (scope: ScopeFilter) => void;
};

export const useEmissionsFilterStore = createStore<EmissionsFilterState>((set) => ({
  scope: "all",
  setScope: (scope) => set({ scope }),
}));
