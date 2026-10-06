import * as React from "react";

import { cn } from "@/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--ink)] shadow-sm outline-none transition placeholder:text-[color:var(--muted-ink)] focus:border-[color:var(--primary)] focus:ring-4 focus:ring-[color:var(--ring-soft)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
