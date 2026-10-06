import Link from "next/link";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[color:var(--border-strong)] bg-white/70 px-6 py-12 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-[color:var(--ink)]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted-ink)]">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
