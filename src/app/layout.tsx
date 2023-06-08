import "./globals.css";
import { Poppins } from "next/font/google";

const p = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "MeroByapar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={p.className}>{children}</body>
    </html>
  );
}
