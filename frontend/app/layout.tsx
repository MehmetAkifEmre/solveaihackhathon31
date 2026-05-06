import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NavigationStack } from "@/components/NavigationStack";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Ops Assistant",
  description: "AI-assisted operational request processing dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <NavigationStack />
        <Header />
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
