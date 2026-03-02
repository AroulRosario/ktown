"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";

interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    contentEncoded: string;
    contentSnippet: string;
    source: string;
    image: string | null;
}

export default function NewsArticlePage() {
    const { id } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we'd fetch a single article by ID. 
        // For this RSS demo, we fetch all and find the match (Base64 ID).
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => {
                const match = data.find((item: any) => item.id === id);
                setArticle(match);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h2 className="text-3xl font-black mb-4">Article Not Found</h2>
                <p className="text-white/40 mb-8 text-lg">The story you looking for has moved or expired.</p>
                <Link href="/news">
                    <NeonButton>Back to News</NeonButton>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Feed
                </Link>

                {article.image && (
                    <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12 glass border-white/5">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass border-white/10 text-xs font-black uppercase tracking-widest">
                            {article.source}
                        </div>
                    </div>
                )}

                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-xs font-bold text-brand-purple uppercase tracking-[0.2em]">
                        <Calendar size={14} />
                        {new Date(article.pubDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight italic">
                        {article.title}
                    </h1>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/5 text-xs font-bold hover:bg-white/5 transition-all">
                            <Share2 size={14} /> Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/5 text-xs font-bold hover:bg-white/5 transition-all">
                            <Bookmark size={14} /> Save
                        </button>
                    </div>
                </div>

                <GlassCard className="p-8 md:p-12 mb-12 prose prose-invert prose-purple max-w-none">
                    {article.contentEncoded ? (
                        <div
                            className="text-white/70 leading-relaxed text-lg space-y-6 news-content"
                            dangerouslySetInnerHTML={{ __html: article.contentEncoded }}
                        />
                    ) : (
                        <div className="text-white/70 leading-relaxed text-lg space-y-6">
                            <p>{article.contentSnippet}</p>
                            <div className="p-8 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 text-center space-y-4">
                                <p className="font-bold">This is a preview. Read the full story on {article.source}.</p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-purple font-black uppercase tracking-widest hover:text-white"
                                >
                                    View Full Discovery <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    )}
                </GlassCard>

                <div className="flex justify-center pt-8 border-t border-white/5">
                    <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors text-xs font-medium italic"
                    >
                        Original Source: {article.link}
                    </a>
                </div>
            </motion.div>

            <style jsx global>{`
        .news-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .news-content p {
          margin-bottom: 1.5rem;
        }
        .news-content a {
          color: #8b5cf6;
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
}
