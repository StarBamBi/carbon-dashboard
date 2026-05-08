export type FieldErrorMap<T extends string> = Partial<Record<T, string>>;

export type FormStatus = "idle" | "submitting" | "success" | "error";
