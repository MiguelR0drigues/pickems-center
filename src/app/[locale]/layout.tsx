import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat } from "next/font/google";
import { Toaster } from "./components/ui/toaster";
import "./globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EURO 2024 PICKEMS",
  description: "EURO 2024 PICKEMS",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = require(`../../../messages/${locale}.json`);
  return (
    <html lang={"en"} className="dark">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <body className={montserrat.className}>
          {children}
          <Toaster />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
