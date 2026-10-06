import { LoadingState } from "@/components/sections/loading-state";

export default function Loading() {
  return (
    <div className="page-shell space-y-8 py-10 sm:py-12">
      <div className="space-y-3">
        <div className="h-4 w-28 animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
        <div className="h-10 max-w-xl animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
        <div className="h-6 max-w-2xl animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
      </div>
      <LoadingState cards={6} />
    </div>
  );
}
