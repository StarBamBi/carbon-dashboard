export const queryKeys = {
  emissions: {
    all: ["emissions"] as const,
    list: (facilityId?: string) => ["emissions", "list", facilityId] as const,
    detail: (emissionId: string) => ["emissions", "detail", emissionId] as const,
  },
  dashboard: {
    summary: (year: number) => ["dashboard", "summary", year] as const,
  },
} as const;
