import Link from "next/link";
import { ShieldCheck, Stethoscope, Truck } from "lucide-react";

import { SearchBar } from "@/components/commerce/search-bar";
import { Button } from "@/components/ui/button";

const trustPoints = [
  {
    title: "Verified medical essentials",
    description: "Focused catalog built for healthcare equipment and non-pharma supplies.",
    icon: ShieldCheck,
  },
  {
    title: "Ready for home and clinic use",
    description: "From diagnostic tools to mobility aids, shop dependable everyday care products.",
    icon: Stethoscope,
  },
  {
    title: "Fast, secure fulfillment",
    description: "Shopify-powered checkout with a storefront tuned for responsive browsing.",
    icon: Truck,
  },
];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(101,197,255,0.24),_transparent_36%),linear-gradient(135deg,#ffffff_0%,#eff7ff_42%,#dfefff_100%)] px-6 py-10 shadow-[0_45px_100px_-72px_rgba(7,64,122,0.65)] sm:px-10 sm:py-14 lg:px-14">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,_rgba(11,99,206,0.14),_transparent_55%)] lg:block" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--primary-strong)]">
              Phase 1 MVP
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Trusted medical supplies with a storefront built for confidence.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted-ink)] sm:text-lg">
              MedHub helps families, clinics, and care teams source healthcare
              equipment, consumables, and home care products in one clean,
              professional buying experience.
            </p>
          </div>

          <SearchBar />

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">Shop products</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/collections">Browse collections</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {trustPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_40px_-32px_rgba(7,64,122,0.45)] backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--surface-subtle)] text-[color:var(--primary)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[color:var(--ink)]">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-7 text-[color:var(--muted-ink)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
