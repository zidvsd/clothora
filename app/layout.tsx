import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsProvider from "@/components/ProductsProvider";
import PageAnimation from "@/lib/animate/PageAnimation";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clothora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-background font-poppins antialiased`}
      >
        <ProductsProvider />
        <Navbar />
        <PageAnimation>{children}</PageAnimation>

        <Footer />
      </body>
    </html>
  );
}
