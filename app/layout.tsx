import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PropertyWalk - Property Walkthrough Videos | $49, 24-Hour Turnaround",
  description:
    "Property walkthrough videos for real estate agents and Airbnb hosts. $49 a video, 24-hour turnaround. Based in London, Ontario.",
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} dark`}>
      <head>
        {/* Satoshi isn't on Google Fonts, so it can't go through next/font/google like Jakarta does above. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 antialiased">
        <div className="ambient-mesh" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
