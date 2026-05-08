import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export const Card = ({ className = "", children, ...rest }: CardProps) => (
  <div
    className={`rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export const CardHeader = ({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
  <div className={`border-b border-zinc-100 px-4 py-3 dark:border-zinc-800 ${className}`} {...rest}>
    {children}
  </div>
);

export const CardTitle = ({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
  <h2 className={`text-sm font-semibold text-zinc-900 dark:text-zinc-50 ${className}`} {...rest}>
    {children}
  </h2>
);

export const CardDescription = ({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) => (
  <p className={`mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 ${className}`} {...rest}>
    {children}
  </p>
);

export const CardContent = ({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
  <div className={`px-4 py-4 ${className}`} {...rest}>
    {children}
  </div>
);
