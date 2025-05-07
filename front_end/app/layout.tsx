import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Providers } from "./providers";



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

// Add this import
import { AuthProvider } from "@/contexts/AuthContext"

// Wrap your layout component with AuthProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
