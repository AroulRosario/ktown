"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";

interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
    image: string | null;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setNews(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching news:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                            <Newspaper size={14} /> K-Town Daily
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight italic uppercase">
                            K-CULTURE <span className="text-purple-500 font-black">FEED</span>
                        </h1>
                    </div>
                    <p className="text-white/40 max-w-sm">
                        Your aggregated source for K-pop, K-drama, and Korean culture news.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-40">
                    <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <GlassCard className="p-0 overflow-hidden h-full flex flex-col group hover:border-brand-purple/50 transition-all duration-500">
                                {item.image && (
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                            {item.source}
                                        </div>
                                    </div>
                                )}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-white/30 font-bold uppercase tracking-widest mb-4">
                                        <Calendar size={14} />
                                        {item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        }) : "Recently"}
                                    </div>
                                    <h2 className="text-xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-white/40 text-sm mb-8 line-clamp-4 leading-relaxed flex-1">
                                        {item.contentSnippet}
                                    </p>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl glass border-white/10 text-xs font-black uppercase tracking-[0.2em] group/btn hover:bg-brand-purple hover:border-brand-purple transition-all"
                                    >
                                        Read Full Article <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
