"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, TrendingUp, Music2, Heart, Users, Eye } from "lucide-react";
import GlassCard from "./GlassCard";
import { useState } from "react";

const reels = [
    {
        id: 1,
        title: "BTS Busan Live Highlights 2024",
        video: "https://player.vimeo.com/external/517081513.hd.mp4?s=4de35e1657c7d23d8349250558110996c9f698ed&profile_id=175",
        tag: "LIVE",
        likes: "2.4M",
        viewers: "128K",
    },
    {
        id: 2,
        title: "NewJeans 'Hype Boy' Viral Dance",
        video: "https://player.vimeo.com/external/494252666.hd.mp4?s=72094c6b2867d9f6f69c6fc94c7b8e5c1e95655d&profile_id=175",
        tag: "TRENDING",
        likes: "1.8M",
        viewers: "85K",
    },
    {
        id: 3,
        title: "Blackpink World Tour Visuals",
        video: "https://player.vimeo.com/external/392040265.hd.mp4?s=d968e4a9057c32087c9f6fc94c7b8e5c1e95655d&profile_id=175",
        tag: "AESTHETIC",
        likes: "3.2M",
        viewers: "210K",
    },
    {
        id: 4,
        title: "Stray Kids Comeback Prep",
        video: "https://player.vimeo.com/external/519532588.hd.mp4?s=d968e4a9057c32087c9f6fc94c7b8e5c1e95655d&profile_id=175",
        tag: "EXCLUSIVE",
        likes: "950K",
        viewers: "42K",
    },
];

export default function KpopReels() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full relative py-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex items-center gap-3 text-brand-purple font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    Trending Now
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter">
                            K-POP <span className="text-purple-500 font-extrabold text-glow">REELS</span>
                        </h2>
                        <p className="text-white/40 text-lg font-medium">Join the global buzz with exclusive K-culture highlights.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/10 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="viewer" />
                                </div>
                            ))}
                        </div>
                        <div className="text-xs font-bold self-center text-white/60">
                            <span className="text-white">500+</span> watching live
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-12">
                {reels.map((reel, i) => (
                    <motion.div
                        key={reel.id}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="flex-shrink-0 w-[300px] md:w-[350px] group relative"
                    >
                        <GlassCard className="p-0 overflow-hidden relative h-[550px] border-white/5 group-hover:border-purple-500/50 transition-all duration-700 rounded-[2.5rem]">
                            <video
                                src={reel.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Vercel-style progress bars at the top like stories */}
                            <div className="absolute top-4 inset-x-4 flex gap-1.5 z-20">
                                {reels.map((_, idx) => (
                                    <div key={idx} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                        {idx === i && (
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "0%" }}
                                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                className="h-full bg-white"
                                            />
                                        )}
                                        {idx < i && <div className="h-full bg-white" />}
                                    </div>
                                ))}
                            </div>

                            {/* Live Overlay */}
                            <div className="absolute top-10 left-6 z-20 flex items-center gap-2">
                                <div className="px-3 py-1 rounded-md bg-red-600 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    LIVE
                                </div>
                                <div className="px-3 py-1 rounded-md glass text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
                                    <Eye size={12} /> {reel.viewers}
                                </div>
                            </div>

                            {/* Main Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-10 space-y-5">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-brand-purple text-[10px] font-black tracking-widest uppercase text-white shadow-lg shadow-purple-500/40">
                                        {reel.tag}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-purple-300 transition-colors">
                                    {reel.title}
                                </h3>
                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs font-black text-white">
                                            <Heart size={16} className="text-pink-500 fill-pink-500" /> {reel.likes}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                            <Music2 size={12} /> Original Audio
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={hoveredIndex === i ? { rotate: 360 } : {}}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="w-14 h-14 rounded-full glass border-2 border-brand-purple/50 flex items-center justify-center p-1"
                                    >
                                        <div className="w-full h-full rounded-full bg-brand-purple flex items-center justify-center shadow-lg shadow-purple-500/50">
                                            <Play size={20} className="fill-white text-white translate-x-0.5" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}

                {/* Interactive "Add Yours" Reel */}
                <motion.div
                    className="flex-shrink-0 w-[150px] flex flex-col justify-center items-center px-10 text-center space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="w-20 h-20 rounded-full glass border-2 border-brand-purple border-dashed flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all cursor-pointer group shadow-2xl">
                        <Play size={28} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Explore <br />More Stories</p>
                </motion.div>
            </div>
        </div>
    );
}
