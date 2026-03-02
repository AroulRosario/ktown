import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-TOWN | Korean Cafe, Merch & Community",
  description: "The ultimate hub for Korean culture, food, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-brand-purple/30`}>
        <Navbar />
        <main className="pt-24 pb-12 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-bold text-sm">K</div>
                <span className="text-xl font-black tracking-tighter">KTOWN</span>
              </div>
              <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                The ultimate neon-lit community hub for K-culture enthusiasts.
              </p>
            </div>

            <div className="flex gap-8 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>

        {/* Global decorative elements */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </body>
    </html>
  );
}
