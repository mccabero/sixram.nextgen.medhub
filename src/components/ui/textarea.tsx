import * as React from "react";

import { cn } from "@/utils/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-3xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--ink)] shadow-sm outline-none transition placeholder:text-[color:var(--muted-ink)] focus:border-[color:var(--primary)] focus:ring-4 focus:ring-[color:var(--ring-soft)]",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
