import type { Metadata } from "next";
import { Geist, Just_Another_Hand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const justAnotherHand = Just_Another_Hand({
  variable: "--font-handwritten",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "see you sometime",
  description: "An interactive 3D book that responds to your cursor.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${justAnotherHand.variable} h-full antialiased`}
    >
      <body className="bg-canvas text-ink flex min-h-full flex-col">{children}</body>
    </html>
  );
}
