import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshstartx.com"),
  title: {
    default: "Fresh Start | Dünya & Türk Mutfağı",
    template: "%s | Fresh Start",
  },
  description:
    "Antalya'da taze ve ev yapımı lezzetler. Fresh Start'ta Türk ve dünya mutfağından günlük hazırlanan yemekler, hızlı paket servis ve gel-al seçenekleri.",
  keywords: [
    "Fresh Start",
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
  authors: [{ name: "Fresh Start" }],
  creator: "Fresh Start",
  publisher: "Fresh Start",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fresh Start | Dünya & Türk Mutfağı",
    description:
      "Antalya'da taze ve ev yapımı lezzetler. Türk ve dünya mutfağından günlük hazırlanan yemekler, hızlı paket servis ve gel-al seçenekleri.",
    url: "https://freshstartx.com",
    siteName: "Fresh Start",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Start | Dünya & Türk Mutfağı",
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
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
