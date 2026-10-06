import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-shell py-20">
      <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-[color:var(--border)] bg-white px-8 py-12 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--primary-strong)]">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-[color:var(--ink)]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-sm leading-8 text-[color:var(--muted-ink)]">
          The product, collection, or content you requested may have been moved or
          is not yet part of the current MedHub MVP catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
