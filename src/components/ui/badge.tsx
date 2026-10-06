import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]",
        className,
      )}
      {...props}
    />
  );
}
