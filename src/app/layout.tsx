import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: 'Mezcal in Cactus',
    default: "Mezcal in Cactus website"
  },
  description: "Mezcal in Cactus",
  applicationName: "Mezcal in Cactus"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-home-img h-screen bg-cover bg-center`}
    >
      <div className="mx-auto width-full">
        <Header />
        <div className="mt-32 h-screen">
          {children}
        </div>
        <Footer />
        <Toaster />
      </div>
    </body>
  </html>
  );
}
