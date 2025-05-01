import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HealthCare - Premium Medical Teleconsultation",
  description:
    "Connect with top healthcare professionals through secure video consultations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 

 
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-sans`}>
        <Providers>
         
        {children}
      
        </Providers>
      </body>
    </html>
  );
}
