"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, ShoppingBag, Users, Calendar, BarChart3, Edit, Check, LogIn, RefreshCw, Trash2 } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const { data: session, status: authStatus } = useSession();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    const fetchData = () => {
        setLoading(true);
        fetch("/api/admin/stats").then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { if (session?.user) fetchData(); }, [session]);

    const updateOrderStatus = async (id: string, status: string) => {
        await fetch(`/api/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
        fetchData();
    };

    if (authStatus === "loading" || loading) {
        return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div>;
    }

    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <GlassCard className="p-12 text-center max-w-md">
                    <LogIn size={48} className="text-white/10 mx-auto mb-6" />
                    <h2 className="text-2xl font-black mb-2">Admin Access Required</h2>
                    <p className="text-white/40 mb-8">Sign in with an admin account to continue.</p>
                    <NeonButton onClick={() => signIn("google")} className="w-full h-14">Sign In</NeonButton>
                </GlassCard>
            </div>
        );
    }

    if (data?.error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <GlassCard className="p-12 text-center max-w-md">
                    <h2 className="text-2xl font-black mb-2 text-red-400">Access Denied</h2>
                    <p className="text-white/40">You need ADMIN privileges to view this page.</p>
                </GlassCard>
            </div>
        );
    }

    const stats = [
        { label: "Total Revenue", value: `$${(data?.revenue || 0).toFixed(2)}`, icon: BarChart3 },
        { label: "Active Orders", value: data?.activeOrders?.length || 0, icon: ShoppingBag },
        { label: "Total Users", value: data?.users?.length || 0, icon: Users },
        { label: "Karaoke Bookings", value: data?.bookings?.length || 0, icon: Calendar },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div>
                    <div className="flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" /> Restricted Access
                    </div>
                    <h1 className="text-5xl font-black tracking-tight italic">ADMIN <span className="text-purple-500">DASHBOARD</span></h1>
                </div>
                <NeonButton onClick={fetchData} size="sm"><RefreshCw size={16} /> Refresh</NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((s, i) => (
                    <GlassCard key={i} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl glass text-purple-400"><s.icon size={20} /></div>
                        </div>
                        <h4 className="text-3xl font-black italic">{s.value}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{s.label}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Orders Table */}
            <div className="space-y-6 mb-12">
                <h3 className="text-xl font-black italic uppercase">ALL <span className="text-purple-500">ORDERS</span></h3>
                <GlassCard className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-white/40">
                                <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">User</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {(data?.orders || []).map((o: any) => (
                                    <tr key={o.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-white/50">{o.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4 font-bold">{o.user?.name || o.user?.email || "—"}</td>
                                        <td className="px-6 py-4 text-brand-purple font-black">${o.totalAmount}</td>
                                        <td className="px-6 py-4"><span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase",
                                            o.status === "COOKING" ? "bg-orange-500/10 text-orange-400" :
                                                o.status === "OUT_FOR_DELIVERY" ? "bg-blue-500/10 text-blue-400" :
                                                    o.status === "ARRIVED" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/40"
                                        )}>{o.status}</span></td>
                                        <td className="px-6 py-4 text-right space-x-1">
                                            {o.status === "PENDING" && <button onClick={() => updateOrderStatus(o.id, "COOKING")} className="p-2 rounded-lg glass text-orange-400 hover:bg-orange-500/10 text-xs font-bold">Cook</button>}
                                            {o.status === "COOKING" && <button onClick={() => updateOrderStatus(o.id, "OUT_FOR_DELIVERY")} className="p-2 rounded-lg glass text-blue-400 hover:bg-blue-500/10 text-xs font-bold">Deliver</button>}
                                            {o.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateOrderStatus(o.id, "ARRIVED")} className="p-2 rounded-lg glass text-green-400 hover:bg-green-500/10 text-xs font-bold">Arrived</button>}
                                        </td>
                                    </tr>
                                ))}
                                {(!data?.orders || data.orders.length === 0) && (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-white/20 font-bold">No orders yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>

            {/* Food Items / Products Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-black italic uppercase">FOOD <span className="text-purple-500">INVENTORY</span></h3>
                    <GlassCard className="p-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-white/40">
                                    <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Active</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {(data?.foodItems || []).map((f: any) => (
                                        <tr key={f.id} className="hover:bg-white/5"><td className="px-4 py-3 font-bold">{f.name}</td><td className="px-4 py-3 text-brand-purple">${f.price}</td><td className="px-4 py-3">{f.stock}</td><td className="px-4 py-3">{f.active ? "✓" : "✗"}</td></tr>
                                    ))}
                                    {(!data?.foodItems || data.foodItems.length === 0) && <tr><td colSpan={4} className="px-4 py-8 text-center text-white/20">No food items</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </div>
                <div className="space-y-6">
                    <h3 className="text-xl font-black italic uppercase">MERCH <span className="text-purple-500">INVENTORY</span></h3>
                    <GlassCard className="p-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-white/40">
                                    <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Active</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {(data?.products || []).map((p: any) => (
                                        <tr key={p.id} className="hover:bg-white/5"><td className="px-4 py-3 font-bold">{p.name}</td><td className="px-4 py-3 text-brand-purple">${p.price}</td><td className="px-4 py-3">{p.stock}</td><td className="px-4 py-3">{p.active ? "✓" : "✗"}</td></tr>
                                    ))}
                                    {(!data?.products || data.products.length === 0) && <tr><td colSpan={4} className="px-4 py-8 text-center text-white/20">No products</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
