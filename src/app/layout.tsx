import type { Metadata } from "next";
import { Caveat, Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const siteUrl = "https://seeyousometime.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "See You Sometime",
  description: "An interactive memory book to say goodbye to friends, coworkers, and more.",
  openGraph: {
    title: "See You Sometime",
    description: "An interactive memory book to say goodbye to friends, coworkers, and more.",
    url: siteUrl,
    siteName: "See You Sometime",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 523,
        alt: "See You Sometime — an interactive memory book with a handwritten note and the Vitally cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "See You Sometime",
    description: "An interactive memory book to say goodbye to friends, coworkers, and more.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="bg-canvas text-ink flex min-h-full flex-col">{children}</body>
    </html>
  );
}
