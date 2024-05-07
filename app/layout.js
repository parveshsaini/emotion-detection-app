"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/userProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
    </UserProvider>
  );
}
