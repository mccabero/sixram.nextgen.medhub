import Link from "next/link";

import { siteConfig } from "@/services/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
            {siteConfig.name}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[color:var(--ink)]">
            Medical supplies for homes, clinics, and care teams.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--muted-ink)]">
            Browse trusted equipment, consumables, and home care essentials with
            a storefront designed for clarity, speed, and professional service.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)]">
            Navigation
          </h3>
          <div className="grid gap-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[color:var(--muted-ink)] transition hover:text-[color:var(--primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)]">
            Contact
          </h3>
          <div className="space-y-3 text-sm leading-7 text-[color:var(--muted-ink)]">
            <p>{siteConfig.address}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.hours}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-[color:var(--muted-ink)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MedHub. All rights reserved.</p>
          <p>No medicines. No prescriptions. Medical supplies only.</p>
        </div>
      </div>
    </footer>
  );
}
