import {ClerkProvider} from "@clerk/nextjs";
import { shadcn } from '@clerk/ui/themes';
import type { Metadata } from "next";
import {IBM_Plex_Serif, Inter, Mona_Sans} from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";

import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets:['latin'],
  weight:['400','500','600','700'],
  display:'swap'
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets:['latin'],
  display:'swap'
})

export const metadata: Metadata = {
  title: "Bookified",
  description: "Transform your books into interactive AI conversations. Upload PDFs, and chat with your books using voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", ibmPlexSerif.variable, monaSans.variable, "relative",  "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <Navbar/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}