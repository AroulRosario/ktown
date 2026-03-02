"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, MessageSquare, Share2, TrendingUp, Hash, Globe, Users, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { cn } from "@/lib/utils";

const posts = [
    {
        id: "p1",
        author: "K-Vibe_99",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
        content: "Just tried the new Neon Fried Chicken at K-Town! The glow is real and the spice is perfect. Who's coming with me next weekend? 🍗✨ #KTownVibes #KFood",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
        likes: 124,
        comments: 18,
        time: "2h ago",
    },
    {
        id: "p2",
        author: "SeoulSeeker",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        content: "Managed to snag the Blackpink Limited Edition Hoodie from the shop! The quality is insane. K-Town really has the best merch selection in the city. 🖤💖",
        likes: 89,
        comments: 12,
        time: "5h ago",
    },
];

const chatMessages = [
    { user: "Ji-Woo", text: "Anyone down for Noraebang tonight?", color: "text-purple-400" },
    { user: "Mark_T", text: "Just ordered Bibimbap, so hungry!", color: "text-blue-400" },
    { user: "Emma_V", text: "K-Town is looking amazing today with the new lights.", color: "text-pink-400" },
    { user: "Sora_L", text: "Did you guys see the new merch drop?", color: "text-green-400" },
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState("feed");
    const [message, setMessage] = useState("");

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 space-y-6">
                    <div className="space-y-1">
                        <button
                            onClick={() => setActiveTab("feed")}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                activeTab === "feed" ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20" : "text-white/40 hover:bg-white/5"
                            )}
                        >
                            <Globe size={18} /> Global Feed
                        </button>
                        <button
                            onClick={() => setActiveTab("trending")}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                activeTab === "trending" ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20" : "text-white/40 hover:bg-white/5"
                            )}
                        >
                            <TrendingUp size={18} /> Trending Topics
                        </button>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-4 mb-4">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2 px-2">
                            {["#KFood", "#Noraebang", "#MerchDrop", "#Blackpink", "#SeoulVibes"].map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-lg glass text-[10px] font-bold text-white/60 hover:text-white cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Feed */}
                <div className="flex-1 space-y-8">
                    {/* Post Creator */}
                    <GlassCard className="p-4">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-purple/20">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <textarea
                                    placeholder="Share your K-Vibe..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none min-h-[60px]"
                                />
                                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg glass text-white/40 hover:text-white transition-colors"><MessageSquare size={16} /></button>
                                        <button className="p-2 rounded-lg glass text-white/40 hover:text-white transition-colors"><Hash size={16} /></button>
                                    </div>
                                    <NeonButton size="sm">Post</NeonButton>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Posts */}
                    <div className="space-y-6">
                        {posts.map((post, idx) => (
                            <GlassCard key={post.id} delay={idx * 0.1} className="p-0 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                                <img src={post.avatar} alt={post.author} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{post.author}</h4>
                                                <p className="text-[10px] text-white/30 uppercase font-black">{post.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-white/20 hover:text-white transition-colors"><Share2 size={16} /></button>
                                    </div>
                                    <p className="text-white/70 leading-relaxed mb-6 italic">"{post.content}"</p>
                                    {post.image && (
                                        <div className="rounded-2xl overflow-hidden border border-white/5 mb-6">
                                            <img src={post.image} alt="Post content" className="w-full h-auto" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                        <button className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors">
                                            <Heart size={18} /> <span className="text-xs font-bold">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-white/40 hover:text-purple-400 transition-colors">
                                            <MessageSquare size={18} /> <span className="text-xs font-bold">{post.comments}</span>
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Global Chat Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    <GlassCard className="flex flex-col h-[600px] p-0 overflow-hidden sticky top-32">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <h3 className="font-black text-xs uppercase tracking-widest">Global Chat</h3>
                            </div>
                            <Users size={14} className="text-white/30" />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                            {chatMessages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="space-y-1"
                                >
                                    <span className={cn("text-[10px] font-black uppercase tracking-tighter", msg.color)}>{msg.user}</span>
                                    <div className="glass px-3 py-2 rounded-xl text-xs text-white/80 border-white/5">
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-xs focus:outline-none focus:border-purple-500/50"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-purple hover:text-white transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
