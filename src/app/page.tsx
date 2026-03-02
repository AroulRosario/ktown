"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, Utensils, ShoppingBag, Mic2, Users, Play, TrendingUp } from "lucide-react";
import NeonButton from "@/components/NeonButton";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import NewsFeed from "@/components/NewsFeed";
import Stories from "@/components/Stories";
import KpopReels from "@/components/KpopReels";

const featuredItems = [
  {
    title: "Trending Food",
    desc: "From spicy Tteokbokki to crispy Korean Fried Chicken.",
    icon: Utensils,
    href: "/food",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800",
    color: "from-brand-purple/20 to-neon-pink/20",
  },
  {
    title: "Latest Merch",
    desc: "Exclusive K-pop albums, lightsticks, and streetwear.",
    icon: ShoppingBag,
    href: "/shop",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800",
    color: "from-neon-magenta/20 to-brand-violet/20",
  },
  {
    title: "Noraebang Booking",
    desc: "Private karaoke rooms with premium sound & neon vibes at ₹1000/hr.",
    icon: Mic2,
    href: "/karaoke",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
    color: "from-neon-cyan/20 to-brand-purple/20",
  },
  {
    title: "Join Community",
    desc: "Connect with K-culture fans and share your passion.",
    icon: Users,
    href: "/community",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    color: "from-neon-lime/20 to-emerald-500/20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 px-6 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center">
        {/* Antigravity floating elements */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[5%] w-40 h-40 glass rounded-[2.5rem] -z-10 opacity-60 shadow-[0_0_50px_rgba(94,23,235,0.3)] flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-transparent border border-white/5" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-[10%] w-60 h-60 glass rounded-full -z-10 opacity-40 shadow-[0_0_70px_rgba(188,19,254,0.2)]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl space-y-10 relative"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-brand-purple/30 text-[10px] font-black tracking-[0.4em] text-purple-300 uppercase animate-flicker">
            <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_10px_#5e17eb]" />
            K-TOWN NIGHT SHIFT IS LIVE
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] italic uppercase">
            NEON <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-neon-cyan to-brand-violet text-glow animate-pulse">
              SEOUL
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium leading-relaxed">
            Step into the high-frequency pulse of <span className="text-white">Gangnam nights</span>. Premium tastes, selective merch, and the city&apos;s best Noraebang at <span className="text-brand-purple">₹1000/hr</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
            <div className="relative w-full max-w-md group">
              <input
                type="text"
                placeholder="Find your vibe..."
                className="w-full h-16 pl-16 pr-8 rounded-2xl glass border-white/5 bg-white/5 focus:bg-white/10 focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder-white/20 text-lg"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-purple transition-colors" size={24} />
            </div>
            <Link href="/food">
              <NeonButton size="lg" className="h-16 px-10 text-lg shadow-[0_0_30px_rgba(94,23,235,0.4)]">
                Enter K-Town <ArrowRight size={24} />
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stories Section */}
      <Stories />

      {/* K-Pop Reels Section */}
      <KpopReels />

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2 uppercase italic">FEATURED <span className="text-purple-500">SECTIONS</span></h2>
            <p className="text-white/40">Everything you need to immerse yourself in the culture.</p>
          </div>
          <Link href="/explore" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 font-black uppercase text-xs tracking-widest mb-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, idx) => (
            <Link key={item.title} href={item.href}>
              <GlassCard
                delay={idx * 0.1}
                className="h-[400px] flex flex-col p-4 group overflow-hidden relative border-white/5 hover:border-brand-purple/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 p-2 rounded-lg glass text-white">
                    <item.icon size={20} />
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors uppercase italic">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all">
                    Explore Now <ArrowRight size={14} />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* News Feed Section */}
      <NewsFeed />

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto w-full pb-24 px-4 overflow-hidden">
        <GlassCard className="p-12 md:p-24 overflow-hidden relative border-brand-purple/20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/20 blur-[100px] -z-10" />
          <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">
              READY TO JOIN THE <br />
              <span className="text-glow text-purple-400">INNER CIRCLE?</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              Join thousands of K-Town members. Exclusive drops, private karaoke events, and
              exclusive cafe rewards waiting for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/signin">
                <NeonButton size="lg">Sign Up Free</NeonButton>
              </Link>
              <NeonButton variant="outline" size="lg">Learn Rewards</NeonButton>
            </div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 w-80 h-80 border border-white/5 rounded-full -z-10 flex items-center justify-center opacity-40"
          >
            <div className="w-60 h-60 border border-purple-500/10 rounded-full flex items-center justify-center">
              <div className="w-40 h-40 border border-purple-500/20 rounded-full" />
            </div>
          </motion.div>
        </GlassCard>
      </section>
    </div>
  );
}
