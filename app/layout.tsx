import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://freshstartx.com"),
  title: {
    default: "F. Start | Dünya & Türk Mutfağı",
    template: "%s | F. Start",
  },
  description:
    "Antalya'da taze ve ev yapımı lezzetler. F. Start'ta Türk ve dünya mutfağından günlük hazırlanan yemekler, hızlı paket servis ve gel-al seçenekleri.",
  keywords: [
    "F. Start",
    "Antalya",
    "Türk mutfağı",
    "dünya mutfağı",
    "paket servis",
    "gel-al",
    "ev yemekleri",
    "ızgara",
    "sandviç",
    "çorba",
    "bowl",
  ],
  authors: [{ name: "F. Start" }],
  creator: "F. Start",
  publisher: "F. Start",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "F. Start | Dünya & Türk Mutfağı",
    description:
      "Antalya'da taze ve ev yapımı lezzetler. Türk ve dünya mutfağından günlük hazırlanan yemekler, hızlı paket servis ve gel-al seçenekleri.",
    url: "https://freshstartx.com",
    siteName: "F. Start",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "F. Start | Dünya & Türk Mutfağı",
    description:
      "Antalya'da taze ve ev yapımı lezzetler. Türk ve dünya mutfağından günlük hazırlanan yemekler, hızlı paket servis ve gel-al seçenekleri.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body 
        className="antialiased"
        data-new-gr-c-s-check-loaded="14.1271.0"
        data-gr-ext-installed=""
      >
        {children}
      </body>
    </html>
  );
}
