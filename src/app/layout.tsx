import type { Metadata } from "next";
import { Manrope, Merriweather } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/components/providers/cart-provider";
import { getShopifyConfig } from "@/lib/shopify";
import { absoluteUrl, getBaseUrl, siteConfig } from "@/services/site";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${siteConfig.name} | Medical Supplies Marketplace`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  openGraph: {
    type: "website",
    url: getBaseUrl(),
    title: `${siteConfig.name} | Medical Supplies Marketplace`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Medical Supplies Marketplace`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shopify = getShopifyConfig();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CartProvider shopifyConfigured={shopify.configured}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
