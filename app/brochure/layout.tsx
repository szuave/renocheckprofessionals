import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales-brochure",
  description:
    "Renocheck Professionals — sales-folder voor architectenbureaus, vakspecialisten en bouwondernemers.",
  robots: { index: false, follow: false },
};

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
