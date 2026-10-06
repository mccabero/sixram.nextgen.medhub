import { cn } from "@/utils/cn";

type LoadingStateProps = {
  className?: string;
  cards?: number;
};

export function LoadingState({
  className,
  cards = 4,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white p-4 shadow-sm"
        >
          <div className="aspect-[4/3] animate-pulse rounded-[1.5rem] bg-[color:var(--surface-subtle)]" />
          <div className="mt-4 h-4 animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
          <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
          <div className="mt-6 h-10 animate-pulse rounded-full bg-[color:var(--surface-subtle)]" />
        </div>
      ))}
    </div>
  );
}
