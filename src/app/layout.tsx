import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Router from "./router";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EURO 2024 PICKEMS",
  description: "EURO 2024 PICKEMS",
};

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <Router />
        <Toaster />
      </body>
    </html>
  );
}
