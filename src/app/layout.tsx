import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/ui/sidebar";

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
  title: "Moksha Solutions",
  description: "Aurangabad, Maharashtra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className={`min-h-screen flex font-sans`}> 
          <aside className="w-64 bg-teal-500 text-yellow-500"> 
            {/* <Sidebar/> */}
          </aside> 
          <main className="flex-1 bg-gray-100 p-6"> 
            {children} 
          </main> 
        </div>
      </body>
    </html>
  );
}
