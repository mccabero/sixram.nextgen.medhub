import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionTitle } from "@/components/sections/section-title";
import { siteConfig } from "@/services/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MedHub for product inquiries, bulk orders, and healthcare supply support.",
};

const contactCards = [
  { label: "Email", value: siteConfig.email, icon: Mail },
  { label: "Phone", value: siteConfig.phone, icon: Phone },
  { label: "Address", value: siteConfig.address, icon: MapPin },
  { label: "Hours", value: siteConfig.hours, icon: Clock3 },
];

export default function ContactPage() {
  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <SectionTitle
        eyebrow="Contact"
        title="Need help sourcing products or preparing a larger order?"
        description="Reach out for sales assistance, catalog questions, or general storefront support."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => (
              <article
                key={card.label}
                className="rounded-[2rem] border border-[color:var(--border)] bg-white p-5 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-subtle)] text-[color:var(--primary)]">
                  <card.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-sm uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
                  {card.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink)]">
                  {card.value}
                </p>
              </article>
            ))}
          </div>

          <div className="map-placeholder rounded-[2.5rem] border border-[color:var(--border)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
              Google Maps placeholder
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[color:var(--ink)]">
              Replace this panel with your live map embed during rollout.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-[color:var(--muted-ink)]">
              The layout already reserves space for a map block, address copy, and
              location context without changing the rest of the page structure.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
