import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/lib/SessionProvider";

import { getServerSession } from "next-auth";

import Header from "./_components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HomeHero",
  description: "Home Services",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <div className=" mx-3 md:mx-8">
            <Header />
            {children}
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
