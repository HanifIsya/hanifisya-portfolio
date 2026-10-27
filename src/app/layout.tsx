import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hanifisya.dev"),
  title: {
    default: `${site.name} — Software Engineer`,
    template: `%s — ${site.name}`,
  },
  description:
    "Portfolio of Hanif Isya Annafi — AI extraction pipelines, safety-critical systems, and production web platforms.",
  keywords: [
    "Hanif Isya Annafi",
    "Hanif Isya",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "Laravel",
    "Flutter",
    "AI Engineer",
    "Indonesia",
  ],
  authors: [{ name: site.name, url: site.github.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — Software Engineer`,
    description:
      "AI extraction pipelines, safety-critical systems, and production web platforms.",
    url: "https://hanifisya.dev",
    siteName: site.name,
    images: [{ url: "/avatar.jpg", width: 460, height: 460 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Engineer`,
    description:
      "AI extraction pipelines, safety-critical systems, and production web platforms.",
    images: ["/avatar.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="bg-black text-paper antialiased">{children}</body>
    </html>
  );
}
