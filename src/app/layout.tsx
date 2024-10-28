import type { Metadata } from "next";
import { Poppins, Quicksand, Source_Sans_3 } from "next/font/google";

// ** Custom Components
import Header from "@/components/page/Header";
import Footer from "@/components/page/Footer";
import Script from "next/script";

// ** Context
import { SidebarProvider } from "@/context/SidebarContext";
import { TimerSettingProvider } from "@/context/TimerSettingContext";
import { FontProvider } from "@/components/FontContext";

import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand_init = Quicksand({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-quicksand",
});

const source_sans_3_init = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--fonnt-source_sans_3",
});

export const metadata: Metadata = {
  title: "Timer Online Aesthetic - Cocotimer",
  description:
    "Free aesthetic online timer for desktop and mobile browsers with three stylish layout : Analog, Digital, and Flip. You can set minutes and seconds, theme and relaxing sound.",
  alternates: {
    canonical: `https://cocotimer.com/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SidebarProvider>
        <TimerSettingProvider>
          <FontProvider>
            <body
              className={`${poppins.className} ${quicksand_init.variable} ${source_sans_3_init.variable}`}
            >
              {" "}
              <main className={`overflow-hidden bg-[#303338]`}>
                <Header />
                {children}
                <Footer />
              </main>
            </body>
          </FontProvider>
        </TimerSettingProvider>
      </SidebarProvider>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6480658573882258"
        crossOrigin="anonymous"
      ></script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WMC851XNFS"
      />
      <Script id="gtag">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WMC851XNFS');`}
      </Script>
      <meta
        name="google-site-verification"
        content="w4CSut5CTNfb5Y0kSVvr2zZUAyhzLhanO8ukzx3kXVU"
      />
    </html>
  );
}
