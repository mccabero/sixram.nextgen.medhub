import type { Metadata } from "next";
import { HeartHandshake, ShieldCheck, Warehouse } from "lucide-react";

import { SectionTitle } from "@/components/sections/section-title";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how MedHub helps homes, clinics, and care teams source trusted medical supplies online.",
};

const pillars = [
  {
    title: "Focused healthcare catalog",
    description:
      "MedHub is intentionally built around medical supplies, home care equipment, PPE, diagnostic tools, and wellness devices.",
    icon: ShieldCheck,
  },
  {
    title: "Service for modern care teams",
    description:
      "The experience supports busy caregivers, clinics, and procurement teams with faster browsing and clearer product presentation.",
    icon: HeartHandshake,
  },
  {
    title: "Operationally ready foundation",
    description:
      "The MVP is structured for Shopify-backed commerce, Vercel deployment, and future catalog scale-up.",
    icon: Warehouse,
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <section className="grid gap-8 rounded-[2.5rem] border border-[color:var(--border)] bg-white px-6 py-10 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <div className="space-y-5">
          <SectionTitle
            eyebrow="About MedHub"
            title="A healthcare-commerce storefront built for trust from the first visit."
            description="MedHub's Phase 1 MVP is designed to launch quickly with a professional catalog experience for medical supplies only."
          />
          <p className="max-w-2xl text-sm leading-8 text-[color:var(--muted-ink)]">
            We focus on practical equipment, everyday consumables, home care
            essentials, and wellness support devices. The platform deliberately
            avoids pharmacy workflows, prescription uploads, and medical-record
            complexity so the shopping experience stays clear and compliant with the
            MVP scope.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { label: "Catalog model", value: "Medical supplies only" },
            { label: "Commerce engine", value: "Shopify Storefront API" },
            { label: "Deployment", value: "Vercel-ready Next.js app" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] bg-[color:var(--surface-subtle)] p-6"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-[color:var(--ink)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Our approach"
          title="Three principles guiding the MVP."
          description="Every page and interaction is tuned for a cleaner, more trustworthy medical supplies shopping flow."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-subtle)] text-[color:var(--primary)]">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[color:var(--ink)]">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
