"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, Utensils, ShoppingBag, Mic2, Users } from "lucide-react";
import NeonButton from "@/components/NeonButton";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const featuredItems = [
  {
    title: "Trending Food",
    desc: "From spicy Tteokbokki to crispy Korean Fried Chicken.",
    icon: Utensils,
    href: "/food",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Latest Merch",
    desc: "Exclusive K-pop albums, lightsticks, and streetwear.",
    icon: ShoppingBag,
    href: "/shop",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800",
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    title: "Noraebang Booking",
    desc: "Private karaoke rooms with premium sound & neon vibes.",
    icon: Mic2,
    href: "/karaoke",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Join Community",
    desc: "Connect with K-culture fans and share your passion.",
    icon: Users,
    href: "/community",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 px-6 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center">
        {/* Antigravity floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-32 h-32 glass rounded-3xl -z-10 opacity-40 shadow-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[15%] w-48 h-48 glass rounded-full -z-10 opacity-30 shadow-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 text-xs font-bold tracking-widest text-purple-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Vibe with the Soul of Seoul
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic">
            WELCOME TO <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-white to-brand-violet text-glow">
              K-TOWN
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">
            Your neon-lit portal to premium Korean cuisine, exclusive merchandise,
            and the ultimate Noraebang experience.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
            <div className="relative w-full max-w-md group">
              <input
                type="text"
                placeholder="Search K-Town..."
                className="w-full h-14 pl-14 pr-6 rounded-2xl glass border-white/5 bg-white/5 focus:bg-white/10 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-white/30"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={20} />
            </div>
            <Link href="/food">
              <NeonButton size="lg" className="h-14">
                Explore Menu <ArrowRight size={20} />
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2">FEATURED SECTIONS</h2>
            <p className="text-white/40">Everything you need to immerse yourself in the culture.</p>
          </div>
          <Link href="/explore" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 font-bold mb-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, idx) => (
            <Link key={item.title} href={item.href}>
              <GlassCard
                delay={idx * 0.1}
                className="h-[400px] flex flex-col p-4 group overflow-hidden relative"
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    Explore Now <ArrowRight size={14} />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto w-full pb-24">
        <GlassCard className="p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/20 blur-[100px] -z-10" />
          <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">
              READY TO JOIN THE <br />
              <span className="text-glow text-purple-400">INNER CIRCLE?</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              Join thousands of K-Town members. Exclusive drops, private karaoke events, and
              exclusive cafe rewards waiting for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <NeonButton size="lg">Sign Up Free</NeonButton>
              <NeonButton variant="outline" size="lg">Learn Rewards</NeonButton>
            </div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 w-80 h-80 border border-white/5 rounded-full -z-10 flex items-center justify-center"
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
