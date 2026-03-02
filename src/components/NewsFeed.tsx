"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Calendar, ArrowLeft } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
    image: string | null;
}

export default function NewsFeed() {
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (news.length === 0) return null;

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                            <Newspaper size={14} /> Real-time Updates
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">
                            K-CULTURE <span className="text-purple-500">NEWS</span>
                        </h2>
                    </div>
                    <div className="flex flex-col md:items-end gap-4">
                        <p className="text-white/40 text-sm md:max-w-xs md:text-right">
                            Stay updated with the latest trends in K-pop, K-drama, and Korean culture.
                        </p>
                        <Link
                            href="/news"
                            className="text-brand-purple hover:text-white transition-colors flex items-center gap-2 font-black text-xs uppercase tracking-widest"
                        >
                            View All News <ArrowLeft size={14} className="rotate-180" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.slice(0, 6).map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <GlassCard className="p-0 overflow-hidden h-full flex flex-col group border-white/5 hover:border-brand-purple/30 transition-colors">
                                {item.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest">
                                            {item.source}
                                        </div>
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3">
                                        <Calendar size={12} />
                                        {item.pubDate ? new Date(item.pubDate).toLocaleDateString() : "Today"}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/40 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {item.contentSnippet}
                                    </p>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-brand-purple text-xs font-black uppercase tracking-widest hover:text-white transition-colors mt-auto"
                                    >
                                        Read More <ExternalLink size={14} />
                                    </a>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
