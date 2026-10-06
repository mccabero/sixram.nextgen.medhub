import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PaginationState } from "@/types/commerce";
import { cn } from "@/utils/cn";

type PaginationProps = {
  pathname: string;
  pagination: PaginationState;
  searchParams?: Record<string, string | undefined>;
};

function buildHref(
  pathname: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  params.set("page", String(page));
  return `${pathname}?${params.toString()}`;
}

export function Pagination({
  pathname,
  pagination,
  searchParams,
}: PaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={buildHref(
          pathname,
          Math.max(1, pagination.currentPage - 1),
          searchParams,
        )}
        aria-disabled={pagination.currentPage === 1}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[color:var(--ink)] transition",
          pagination.currentPage === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(pathname, page, searchParams)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
            pagination.currentPage === page &&
              "border-[color:var(--primary)] bg-[color:var(--primary)] text-white hover:text-white",
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={buildHref(
          pathname,
          Math.min(pagination.totalPages, pagination.currentPage + 1),
          searchParams,
        )}
        aria-disabled={pagination.currentPage === pagination.totalPages}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[color:var(--ink)] transition",
          pagination.currentPage === pagination.totalPages &&
            "pointer-events-none opacity-40",
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
