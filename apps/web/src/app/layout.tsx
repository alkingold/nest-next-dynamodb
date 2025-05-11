import type { Metadata } from "next";
import "./styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Alert Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gray-50 text-gray-900"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
