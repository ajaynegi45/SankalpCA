import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Suspense } from 'react'
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SankalpCA",
  description: "SankalpCA - Your path to CA Foundation success starts here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ background:"#222831"}}>
      <Navbar/>
        <Suspense fallback={<p>Loading result…</p>}>
            {children}
        </Suspense>
      <Footer/>
      </body>
</html>
  );
}
