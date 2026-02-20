import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexProvider } from "@/components/providers/ConvexProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EazyEnglish",
  description: "Ingliz tilini oson o'rganing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ConvexProvider>{children}</ConvexProvider>
      </body>
    </html>
  );
}
