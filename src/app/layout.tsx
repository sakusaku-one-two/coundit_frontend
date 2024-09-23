
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { UserStateProvider } from "@/components/layout/LoginContext";
import StoreProvider from "./redux/provider";
import { CurrentArticleProvider } from "./redux/context/currentArticleContext";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <CurrentArticleProvider>
          <StoreProvider>
          <UserStateProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow pt-[200px]">
              {children}
              </main>
              <Footer />
            </div>
            
          </UserStateProvider>
          </StoreProvider>
          </CurrentArticleProvider>
      </body>
    </html>
  );
}
