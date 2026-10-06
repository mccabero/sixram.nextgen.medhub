export const siteConfig = {
  name: "MedHub",
  shortName: "MedHub",
  description:
    "MedHub is a modern healthcare supplies marketplace for trusted medical equipment, home care essentials, and everyday clinical consumables.",
  tagline: "Your trusted medical supplies marketplace.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://medhub.example.com",
  ogImage: "/og-image.svg",
  email: "care@medhub.example.com",
  phone: "+63 917 555 0123",
  address: "3F MedHub Center, Bonifacio Global City, Taguig, Metro Manila",
  hours: "Mon-Sat, 8:00 AM-6:00 PM",
  nav: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  keywords: [
    "medical supplies",
    "healthcare equipment",
    "ppe supplier",
    "home care products",
    "diagnostic devices",
    "medhub",
  ],
} as const;

export function getBaseUrl() {
  return siteConfig.url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
