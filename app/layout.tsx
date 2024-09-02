import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import Script from "next/script";
import { BASE_URL } from "./_public-constants";
import "./globals.css";

const sans = Roboto_Flex({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FirstStage Tools",
  description:
    "Free and Open Source Tools provided built and maintained by the FirstStage team",
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        {children}

        {process.env.VERCEL_ENV === "production" && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-RYQXJ651TY"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-RYQXJ651TY');
              `}
            </Script>

            <Script id="apollo" strategy="afterInteractive">
              {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"66a23d9cc201c3051b6a48d6"})},
document.head.appendChild(o)}initApollo();`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
