import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/structured-data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://renocheck.be";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Renocheck Professionals — Partnerportaal voor architecten, bouwers & vakspecialisten",
    template: "%s · Renocheck Professionals",
  },
  description:
    "Renocheck Professionals is het partnerportaal van Renocheck — voor architecten, aannemers en vakspecialisten. Beheer uw blog, agenda en ledencontacten op één plek.",
  applicationName: "Renocheck Professionals",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Renocheck",
    "Renocheck Professionals",
    "bouwprofessionals",
    "architect",
    "architectenbureau",
    "aannemer",
    "interieurarchitect",
    "vakspecialist",
    "renovatie",
    "events bouwsector",
    "partnerportaal",
    "bouw netwerk België",
  ],
  authors: [{ name: "Renocheck Professionals", url: SITE_URL }],
  creator: "Renocheck Professionals",
  publisher: "Renocheck Professionals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: SITE_URL,
    siteName: "Renocheck Professionals",
    title: "Renocheck Professionals — Het partnerportaal",
    description:
      "Het partnerportaal van Renocheck — voor architecten, aannemers en vakspecialisten. Word lid en bouw mee aan het netwerk.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Renocheck Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renocheck Professionals — Het partnerportaal",
    description:
      "Het partnerportaal van Renocheck — voor architecten, aannemers en vakspecialisten.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "nl-BE": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add your verification tokens here when available
    // google: "...",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#FFFFFF" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl-BE"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="bg-paper relative flex min-h-full flex-col text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Ga naar hoofdinhoud
        </a>
        {children}
        <OrganizationSchema />
        <WebsiteSchema />
      </body>
    </html>
  );
}
