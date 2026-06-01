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
      "Renocheck Professionals — Vlaams bouwnetwerk voor architecten, vakspecialisten & bouwondernemers",
    template: "%s · Renocheck Professionals",
  },
  description:
    "Renocheck Professionals is een gesloten bouwnetwerk in Vlaanderen — één geselecteerde partner per rubriek per regio. Voor architectenbureaus, vakspecialisten en bouwondernemers in West-Vlaanderen, Oost-Vlaanderen, Antwerpen en Vlaams-Brabant.",
  applicationName: "Renocheck Professionals",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Renocheck Professionals",
    "bouwnetwerk Vlaanderen",
    "bouwnetwerk België",
    "architectennetwerk",
    "vakspecialisten netwerk",
    "bouwondernemers netwerk",
    "partner worden bouwsector",
    "architectenbureau West-Vlaanderen",
    "architectenbureau Oost-Vlaanderen",
    "architectenbureau Antwerpen",
    "architectenbureau Vlaams-Brabant",
    "betrouwbare aannemer Vlaanderen",
    "dakwerker netwerk",
    "renovatie partnernetwerk",
    "geselecteerde vakman",
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
    title: "Renocheck Professionals — Vlaams bouwnetwerk",
    description:
      "Gesloten netwerk van architectenbureaus, vakspecialisten en bouwondernemers in Vlaanderen. Eén partner per rubriek per regio. Word partner of vind het juiste team.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Renocheck Professionals — Vlaams bouwnetwerk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renocheck Professionals — Vlaams bouwnetwerk",
    description:
      "Gesloten netwerk van architectenbureaus, vakspecialisten en bouwondernemers in Vlaanderen.",
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
