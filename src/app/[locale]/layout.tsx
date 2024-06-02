import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Toaster } from "../components/ui/toaster";
import { UserProvider } from "../contexts/UserContext";
import "../globals.css";
import { createClient } from "../utils/supabase/server";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const Loading = dynamic(() => import("../components/loader"), { ssr: false });

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
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
  }

  return (
    <html lang={locale} className="dark">
      <body className={montserrat.className}>
        <main className="flex min-h-dvh flex-col items-center justify-start bg-black w-full overflow-hidden">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <UserProvider user={user}>
              <Loading />
              <Navbar locale={locale} />
              <div className="bg-neutral-800 w-full min-h-full flex justify-center items-center p-3 rounded sm:w-11/12 sm:p-[74px]">
                {children}
              </div>
              <Footer />
              <Toaster />
            </UserProvider>
          </NextIntlClientProvider>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
