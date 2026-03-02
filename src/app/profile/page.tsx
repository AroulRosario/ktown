"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, ShoppingBag, Music, Star, Settings, ExternalLink, Calendar, Package, LogIn } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import LiveTimeline from "@/components/LiveTimeline";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/components/LiveTimeline";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (session?.user) {
            fetch("/api/profile").then(r => r.json()).then(d => setProfile(d)).catch(() => { });
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <GlassCard className="p-12 text-center max-w-md">
                    <LogIn size={48} className="text-white/10 mx-auto mb-6" />
                    <h2 className="text-2xl font-black mb-2">Sign In Required</h2>
                    <p className="text-white/40 mb-8">Log in to access your K-Town dashboard.</p>
                    <NeonButton onClick={() => signIn("google")} className="w-full h-14">Sign In with Google</NeonButton>
                </GlassCard>
            </div>
        );
    }

    const stats = [
        { label: "Food Orders", value: profile?.stats?.totalOrders ?? 0, icon: ShoppingBag, color: "text-orange-400" },
        { label: "Karaoke Hours", value: profile?.stats?.karaokeHours ?? 0, icon: Music, color: "text-purple-400" },
        { label: "Rep Points", value: profile?.stats?.repPoints ?? 0, icon: Star, color: "text-yellow-400" },
    ];

    const activeOrders = (profile?.user?.orders || []).filter((o: any) => ["PENDING", "COOKING", "OUT_FOR_DELIVERY"].includes(o.status));

    const statusMap: Record<string, OrderStatus> = {
        COOKING: "cooking",
        OUT_FOR_DELIVERY: "out-for-delivery",
        ARRIVED: "arrived",
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-80 space-y-8">
                    <GlassCard className="text-center p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-purple/20 to-transparent -z-10" />
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-violet p-1">
                                <div className="w-full h-full rounded-[20px] bg-[#0a0118] overflow-hidden flex items-center justify-center border border-white/10">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-white/20" />
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-green-500 border-4 border-[#0a0118]" />
                        </div>
                        <h2 className="text-2xl font-black italic">{session.user.name || "K-TOWN USER"}</h2>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{session.user.email}</p>
                    </GlassCard>
                    <div className="space-y-2">
                        {[
                            { id: "overview", label: "Overview", icon: Calendar },
                            { id: "orders", label: "Active Orders", icon: Package, count: activeOrders.length },
                        ].map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={cn("w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold transition-all",
                                    activeTab === tab.id ? "bg-white/10 text-white border border-white/10" : "text-white/40 hover:bg-white/5")}>
                                <div className="flex items-center gap-3"><tab.icon size={18} /> {tab.label}</div>
                                {tab.count ? <span className="w-5 h-5 rounded-md bg-brand-purple flex items-center justify-center text-[10px]">{tab.count}</span> : null}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 space-y-12">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((s) => (
                                <GlassCard key={s.label} className="flex items-center gap-6 p-6">
                                    <div className={cn("p-4 rounded-2xl glass", s.color)}><s.icon size={24} /></div>
                                    <div>
                                        <h4 className="text-3xl font-black italic">{s.value}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.label}</p>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                        {activeOrders.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-black italic uppercase">ACTIVE <span className="text-purple-500">ORDERS</span></h3>
                                {activeOrders.map((order: any) => (
                                    <GlassCard key={order.id} className="p-8">
                                        <div className="flex justify-between mb-8">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">ORDER {order.id.slice(0, 8)}</span>
                                                <h4 className="text-xl font-bold mt-1">${order.totalAmount}</h4>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple">LIVE</span>
                                            </div>
                                        </div>
                                        <LiveTimeline status={statusMap[order.status] || "cooking"} />
                                    </GlassCard>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
