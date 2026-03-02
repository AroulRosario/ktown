"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Timer, Flame, Star } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { useCart } from "@/hooks/useCart";

interface FoodItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    spicy: boolean;
    prepTime: number;
}

const fallbackFood = [
    { id: "f1", name: "Classic Tteokbokki", price: 12.99, image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800", description: "Spicy rice cakes in a rich gochujang sauce with fish cakes.", category: "Street Food", spicy: true, prepTime: 15 },
    { id: "f2", name: "K-Fried Chicken", price: 18.99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800", description: "Ultra-crispy double-fried chicken glazed in soy garlic sauce.", category: "Main Dishes", spicy: false, prepTime: 20 },
    { id: "f3", name: "Bibimbap Bowl", price: 15.99, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800", description: "Mixed rice bowl with seasoned vegetables, beef, and egg.", category: "Healthy", spicy: false, prepTime: 15 },
    { id: "f4", name: "Kimchi Jigae", price: 14.99, image: "https://images.unsplash.com/photo-1583032015879-e50d2320c022?auto=format&fit=crop&q=80&w=800", description: "Steaming hot stew made with aged kimchi and silken tofu.", category: "Stews", spicy: true, prepTime: 20 },
];

export default function FoodPage() {
    const { addItem } = useCart();
    const [food, setFood] = useState<FoodItem[]>(fallbackFood);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetch("/api/food").then(r => r.json()).then(data => {
            if (Array.isArray(data) && data.length > 0) setFood(data);
        }).catch(() => { });
    }, []);

    const categories = ["All", ...Array.from(new Set(food.map(f => f.category)))];
    const filtered = activeCategory === "All" ? food : food.filter(f => f.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-black tracking-tight mb-4 italic uppercase">K-CAFE <span className="text-brand-purple font-extrabold">MENU</span></h1>
                    <p className="text-white/50 text-lg">Authentic Korean flavors crafted with premium ingredients and a modern neon twist.</p>
                </div>
                <div className="flex gap-2 p-1 rounded-xl glass">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === cat ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((item, idx) => (
                    <GlassCard key={item.id} delay={idx * 0.1} className="p-0 overflow-hidden flex flex-col group h-full">
                        <div className="relative h-56">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            {item.spicy && (
                                <div className="absolute top-4 left-4 p-2 rounded-lg glass border-red-500/20 text-red-400">
                                    <Flame size={14} className="fill-current" />
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <span className="text-brand-purple font-black">${item.price}</span>
                            </div>
                            <p className="text-white/40 text-sm mb-6 flex-1">{item.description}</p>
                            <div className="flex items-center justify-between gap-4 mt-auto">
                                <div className="flex items-center gap-1.5 text-xs text-white/30 font-bold uppercase tracking-tighter">
                                    <Timer size={14} /> {item.prepTime}-{item.prepTime + 5} MIN
                                </div>
                                <NeonButton size="sm" className="rounded-lg h-9 w-9 p-0"
                                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })}>
                                    <Plus size={18} />
                                </NeonButton>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
