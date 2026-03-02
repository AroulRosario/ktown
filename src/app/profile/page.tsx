"use client";

import { motion } from "framer-motion";
import { User, ShoppingBag, Music, Star, Settings, ExternalLink, Calendar, Package } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import LiveTimeline from "@/components/LiveTimeline";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Food Orders", value: "24", icon: ShoppingBag, color: "text-orange-400" },
    { label: "Karaoke Hours", value: "12", icon: Music, color: "text-purple-400" },
    { label: "Rep Points", value: "850", icon: Star, color: "text-yellow-400" },
];

const activeOrders = [
    { id: "ORD-9921", status: "out-for-delivery", item: "Neon Fried Chicken + 2 Soju", time: "Ordered 25m ago" },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Profile Sidebar */}
                <div className="w-full lg:w-80 space-y-8">
                    <GlassCard className="text-center p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-purple/20 to-transparent -z-10" />
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-violet p-1">
                                <div className="w-full h-full rounded-[20px] bg-[#0a0118] overflow-hidden flex items-center justify-center border border-white/10">
                                    <User size={48} className="text-white/20" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-green-500 border-4 border-[#0a0118]" />
                        </div>

                        <h2 className="text-2xl font-black italic">JI-WOO <span className="text-purple-500">KIM</span></h2>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">K-TOWN CITIZEN</p>

                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button className="p-2 rounded-xl glass text-white/40 hover:text-white transition-colors">
                                <Settings size={18} />
                            </button>
                            <NeonButton size="sm">Edit Profile</NeonButton>
                        </div>
                    </GlassCard>

                    <div className="space-y-2">
                        {[
                            { id: "overview", label: "Overview", icon: Calendar },
                            { id: "orders", label: "Active Orders", icon: Package, count: 1 },
                            { id: "history", label: "Booking History", icon: Calendar },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold transition-all",
                                    activeTab === tab.id ? "bg-white/10 text-white border border-white/10 shadow-lg" : "text-white/40 hover:bg-white/5"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon size={18} /> {tab.label}
                                </div>
                                {tab.count && <span className="w-5 h-5 rounded-md bg-brand-purple flex items-center justify-center text-[10px]">{tab.count}</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-12">
                    {activeTab === "overview" && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {stats.map((stat) => (
                                    <GlassCard key={stat.label} className="flex items-center gap-6 p-6">
                                        <div className={cn("p-4 rounded-2xl glass", stat.color)}>
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-3xl font-black italic">{stat.value}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>

                            {/* Ongoing Orders */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xl font-black italic uppercase tracking-tight">ACTIVE ORDER <span className="text-purple-500">STATUS</span></h3>
                                    <button className="text-xs font-bold text-white/30 hover:text-white flex items-center gap-2 transition-colors">
                                        View Details <ExternalLink size={12} />
                                    </button>
                                </div>
                                {activeOrders.map(order => (
                                    <GlassCard key={order.id} className="p-8">
                                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">ORDER {order.id}</span>
                                                <h4 className="text-xl font-bold mt-1">{order.item}</h4>
                                                <p className="text-xs text-white/40 mt-1">{order.time}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple">LIVE TRACKING</span>
                                            </div>
                                        </div>
                                        <LiveTimeline status={order.status as any} />
                                    </GlassCard>
                                ))}
                            </div>

                            {/* Achievements */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GlassCard className="p-8 group">
                                    <h3 className="text-lg font-black uppercase tracking-widest mb-6">NEXT REWARD</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-white/40">Loyalty Progress</span>
                                            <span className="text-brand-purple">85%</span>
                                        </div>
                                        <div className="h-2 w-full glass rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "85%" }}
                                                className="h-full bg-gradient-to-r from-brand-purple to-brand-violet"
                                            />
                                        </div>
                                        <p className="text-[10px] text-white/30 font-medium">150 more points for a free Neon Ramen Bowl!</p>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-8">
                                    <h3 className="text-lg font-black uppercase tracking-widest mb-6">QUICK LINKS</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <NeonButton variant="outline" size="sm" className="justify-start px-4">My Bookings</NeonButton>
                                        <NeonButton variant="outline" size="sm" className="justify-start px-4">Saved Merch</NeonButton>
                                        <NeonButton variant="outline" size="sm" className="justify-start px-4">Payment</NeonButton>
                                        <NeonButton variant="outline" size="sm" className="justify-start px-4">Support</NeonButton>
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "orders" && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <h3 className="text-xl font-black italic uppercase tracking-tight">MY <span className="text-purple-500">ORDERS</span></h3>
                            <GlassCard className="flex items-center justify-center p-24">
                                <div className="text-center space-y-4">
                                    <Package size={48} className="text-white/5 mx-auto" />
                                    <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No order history available</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
