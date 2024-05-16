import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import Navbar from "../components/navbar";
import { Toaster } from "../components/ui/toaster";
import "../globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EURO 2024 PICKEMS",
  description: "EURO 2024 PICKEMS",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={montserrat.className}>
        <main className="flex min-h-screen flex-col items-center justify-start bg-black ">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <div className="bg-neutral-800 w-11/12 min-h-full flex justify-center items-center p-20 rounded">
              {children}
            </div>
            <Toaster />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
