"use client";

import { motion } from "framer-motion";
import { Plus, ShoppingBag, Flame, Sparkles, Heart } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { useCart } from "@/hooks/useCart";

const merchItems = [
    {
        id: "m1",
        name: "Blackpink Neon Hoodie",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
        description: "Premium cotton hoodie with reflective neon pink branding.",
        category: "Apparel",
        exclusive: true,
    },
    {
        id: "m2",
        name: "BT21 Plush Set (7pcs)",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800",
        description: "Official limited edition plush set of all seven members.",
        category: "Collectibles",
        exclusive: false,
    },
    {
        id: "m3",
        name: "K-Town Logo Cap",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
        description: "Embroidered glassmorphic gradient logo on premium structured cap.",
        category: "Accessories",
        exclusive: false,
    },
    {
        id: "m4",
        name: "Seoul Night Vinyl",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800",
        description: "High-fidelity citypop compilation featuring Seoul's top indie artists.",
        category: "Music",
        exclusive: true,
    },
];

export default function ShopPage() {
    const { addItem } = useCart();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-black tracking-tight mb-4 italic">K-MERCH <span className="text-purple-500">SHOP</span></h1>
                    <p className="text-white/50 text-lg">Exclusive drops, official albums, and premium K-Town lifestyle essentials.</p>
                </div>

                <div className="flex gap-2 p-1 rounded-xl glass">
                    <button className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-white/10">Recent</button>
                    <button className="px-5 py-2 rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all">Albums</button>
                    <button className="px-5 py-2 rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all">Lifestyle</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {merchItems.map((item, idx) => (
                    <GlassCard key={item.id} delay={idx * 0.1} className="p-0 overflow-hidden flex flex-col group h-full">
                        <div className="relative h-64 bg-white/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />

                            {item.exclusive && (
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass border-purple-500/20 text-purple-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} className="fill-current" /> Exclusive Drop
                                </div>
                            )}

                            <button className="absolute top-4 right-4 p-2.5 rounded-xl glass text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                <Heart size={16} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex flex-col mb-4">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{item.category}</span>
                                <h3 className="text-xl font-bold group-hover:text-purple-200 transition-colors">{item.name}</h3>
                            </div>

                            <p className="text-white/40 text-sm mb-6 flex-1 italic leading-relaxed">"{item.description}"</p>

                            <div className="flex items-center justify-between gap-4 mt-auto">
                                <span className="text-2xl font-black text-white">${item.price}</span>
                                <NeonButton
                                    size="md"
                                    className="rounded-xl flex-1"
                                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })}
                                >
                                    <Plus size={18} /> Add to Bag
                                </NeonButton>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
