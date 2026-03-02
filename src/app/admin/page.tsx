"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ShoppingBag, Users, Calendar, BarChart3, Edit, Trash2, ArrowUpRight, Check } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Daily Revenue", value: "$4,285", growth: "+12.5%", icon: BarChart3 },
    { label: "Active Orders", value: "18", growth: "+4", icon: ShoppingBag },
    { label: "New Users", value: "124", growth: "+18%", icon: Users },
    { label: "Bookings Today", value: "9", growth: "Max Capacity", icon: Calendar },
];

const mockOrders = [
    { id: "ORD-9921", user: "Ji-Woo Kim", item: "Neon Fried Chicken", status: "Out for Delivery", time: "25m ago" },
    { id: "ORD-9922", user: "Mark Thompson", item: "Bibimbap Bowl", status: "Cooking", time: "10m ago" },
    { id: "ORD-9923", user: "Sara Lee", item: "Kimchi Jigae", status: "Cooking", time: "5m ago" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div>
                    <div className="flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" /> Restricted Access
                    </div>
                    <h1 className="text-5xl font-black tracking-tight italic">ADMIN <span className="text-purple-500">DASHBOARD</span></h1>
                </div>

                <div className="flex gap-4">
                    <NeonButton variant="outline" size="sm">Export Data</NeonButton>
                    <NeonButton size="sm">New Product</NeonButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="space-y-2">
                    {[
                        { id: "overview", label: "Overview", icon: LayoutDashboard },
                        { id: "orders", label: "Manage Orders", icon: ShoppingBag },
                        { id: "products", label: "Menu & Shop", icon: BarChart3 },
                        { id: "users", label: "Users & Rep", icon: Users },
                        { id: "bookings", label: "Karaoke Slots", icon: Calendar },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all",
                                activeTab === tab.id ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20" : "text-white/40 hover:bg-white/5"
                            )}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Panel */}
                <div className="lg:col-span-3 space-y-12">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.map((stat, idx) => (
                            <GlassCard key={idx} className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl glass border-white/5 text-purple-400">
                                        <stat.icon size={20} />
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-black px-2 py-1 rounded-md glass",
                                        stat.growth.startsWith("+") ? "text-green-400" : "text-purple-300"
                                    )}>{stat.growth}</span>
                                </div>
                                <h4 className="text-3xl font-black italic">{stat.value}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Tables / Management */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black italic uppercase tracking-tight">ACTIVE <span className="text-purple-500">ORDERS</span></h3>
                        </div>

                        <GlassCard className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-white/40">
                                        <tr>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">User</th>
                                            <th className="px-6 py-4">Item</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {mockOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4 font-mono text-xs text-white/50">{order.id}</td>
                                                <td className="px-6 py-4 font-bold">{order.user}</td>
                                                <td className="px-6 py-4 text-white/70 italic">"{order.item}"</td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                                                        order.status === "Cooking" ? "bg-orange-500/10 text-orange-400" : "bg-brand-purple/10 text-brand-purple"
                                                    )}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button className="p-2 rounded-lg glass text-white/20 hover:text-green-400 transition-colors"><Check size={16} /></button>
                                                    <button className="p-2 rounded-lg glass text-white/20 hover:text-purple-400 transition-colors"><Edit size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Section for Menu Management */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black italic uppercase tracking-tight">PLATFORM <span className="text-purple-500">ANALYTICS</span></h3>
                        </div>
                        <GlassCard className="h-48 flex items-center justify-center border-dashed border-white/10 opacity-60">
                            <div className="text-center">
                                <BarChart3 size={32} className="mx-auto mb-4 text-white/20" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Chart Integration Coming Soon</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
