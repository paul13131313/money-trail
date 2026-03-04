import type { Metadata } from "next";
import { Unbounded, Poppins } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MONEY TRAIL",
  description: "あなたが払ったお金は、どこへ消えるのか",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "MONEY TRAIL",
    description: "あなたが払ったお金は、どこへ消えるのか",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MONEY TRAIL",
    description: "あなたが払ったお金は、どこへ消えるのか",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${unbounded.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
