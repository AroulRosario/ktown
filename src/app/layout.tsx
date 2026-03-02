import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

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
        <Providers>
          <Navbar />
          <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            <div className="light-streak top-[20%] left-[-10%]" />
            <div className="light-streak top-[50%] right-[-10%] animation-delay-1000" />
            <div className="light-streak top-[80%] left-[20%] animation-delay-2000" />
          </div>
          <main className="pt-24 pb-12 min-h-screen relative z-10">
            {children}
          </main>
          <footer className="border-t border-white/5 py-12 px-6 relative z-10 bg-black/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(94,23,235,0.4)]">K</div>
                  <span className="text-xl font-black tracking-tighter text-glow">KTOWN</span>
                </div>
                <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                  The ultimate neon-lit community hub for K-culture enthusiasts.
                </p>
              </div>
              <div className="flex gap-8 text-sm text-white/60 font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-brand-purple transition-colors">Privacy</a>
                <a href="#" className="hover:text-brand-purple transition-colors">Terms</a>
                <a href="#" className="hover:text-brand-purple transition-colors">Contact</a>
              </div>
            </div>
          </footer>
          {/* Global Neon Orbs */}
          <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-purple/20 blur-[150px] rounded-full pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-neon-magenta/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        </Providers>
      </body>
    </html>
  );
}
