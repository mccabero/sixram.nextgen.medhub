import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Collection } from "@/types/commerce";

type CollectionCardProps = {
  collection: Collection;
  productCount?: number;
};

export function CollectionCard({
  collection,
  productCount,
}: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-42px_rgba(7,64,122,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface-subtle)]">
        {collection.image ? (
          <Image
            src={collection.image.url}
            alt={collection.image.altText}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-[rgba(5,35,74,0.78)] via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/80">
              Medical category
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {collection.title}
            </h3>
          </div>
          <div className="rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[color:var(--primary-strong)]">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-7 text-[color:var(--muted-ink)]">
          {collection.description}
        </p>
        {typeof productCount === "number" ? (
          <p className="text-sm font-semibold text-[color:var(--primary-strong)]">
            {productCount} products available
          </p>
        ) : null}
      </div>
    </Link>
  );
}
