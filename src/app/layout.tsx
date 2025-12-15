import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Background3D from "@/components/canvas/Background3D";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hazar Volga | Digital Studio",
  description: "A dark, elegant digital studio where design, engineering, and strategy converge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable}`}>
        <div id="canvas-container">
          <Background3D />
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
