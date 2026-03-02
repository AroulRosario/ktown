"use client";

import { motion } from "framer-motion";
import { Play as PlayIcon, TrendingUp } from "lucide-react";

const stories = [
    {
        id: 1,
        title: "BTS Busan Highlights",
        image: "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80&w=400",
        tag: "LIVE",
    },
    {
        id: 2,
        title: "NewJeans Viral Dance",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400",
        tag: "TRENDING",
    },
    {
        id: 3,
        title: "Blackpink Seoul Tour",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
        tag: "NEW",
    },
    {
        id: 4,
        title: "Stray Kids Comeback",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400",
        tag: "TOP",
    },
    {
        id: 5,
        title: "IVE Visual Magic",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400",
        tag: "HOT",
    },
    {
        id: 6,
        title: "Twice Ready To Be",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400",
        tag: "VIBE",
    },
];

export default function Stories() {
    return (
        <div className="w-full relative py-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                    <TrendingUp size={14} /> Global Buzz
                </div>
                <h2 className="text-3xl font-black italic uppercase">K-POP <span className="text-purple-500 font-extrabold">STORIES</span></h2>
            </div>

            <div className="flex gap-6 px-6 overflow-x-auto no-scrollbar pb-8">
                {stories.map((story, i) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex-shrink-0 group cursor-pointer"
                    >
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-brand-purple via-pink-500 to-yellow-500 group-hover:rotate-180 transition-transform duration-700">
                            <div className="w-full h-full rounded-full border-2 border-[#0a0a0a] overflow-hidden relative">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 shadow-2xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                    <PlayIcon size={24} className="text-white fill-white opacity-80 group-hover:scale-125 transition-transform" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-brand-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
                        </div>

                        <div className="mt-4 text-center max-w-[112px] md:max-w-[144px]">
                            <p className="text-[10px] font-black uppercase text-purple-400 mb-1">{story.tag}</p>
                            <p className="text-xs font-bold text-white/50 line-clamp-1 group-hover:text-white transition-colors">{story.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
