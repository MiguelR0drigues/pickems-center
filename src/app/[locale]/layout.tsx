import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import Footer from "../components/footer";
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
        <main className="flex min-h-dvh flex-col items-center justify-start bg-black w-full overflow-hidden">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <div className="bg-neutral-800 w-full min-h-full flex justify-center items-center p-3 rounded sm:w-11/12 sm:p-[74px]">
              {children}
            </div>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
