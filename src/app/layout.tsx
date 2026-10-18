import type { Metadata, Viewport } from "next";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Amanah",
  title: { default: "Amanah: Transparent Giving", template: "%s · Amanah" },
  description:
    "Give to verified Islamic organisations and follow exactly how every naira is spent.",
  appleWebApp: { capable: true, title: "Amanah", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f5132",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" dir="ltr">
      <body className="min-h-dvh antialiased">
        <Providers>
          <OfflineBanner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
