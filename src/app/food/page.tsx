"use client";

import { motion } from "framer-motion";
import { Plus, ShoppingCart, Timer, Flame, Star } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { useCart } from "@/hooks/useCart";

const foodItems = [
    {
        id: "f1",
        name: "Classic Tteokbokki",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800",
        description: "Spicy rice cakes in a rich gochujang sauce with fish cakes and a boiled egg.",
        category: "Street Food",
        spicy: true,
        rating: 4.8,
    },
    {
        id: "f2",
        name: "K-Fried Chicken",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
        description: "Ultra-crispy double-fried chicken glazed in soy garlic or honey spicy sauce.",
        category: "Main Dishes",
        spicy: false,
        rating: 4.9,
    },
    {
        id: "f3",
        name: "Bibimbap Bowl",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800",
        description: "Mixed rice bowl with seasoned vegetables, beef, and a sunny-side-up egg.",
        category: "Healthy",
        spicy: false,
        rating: 4.7,
    },
    {
        id: "f4",
        name: "Kimchi Jigae",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1583032015879-e50d2320c022?auto=format&fit=crop&q=80&w=800",
        description: "A steaming hot, comforting stew made with aged kimchi and silken tofu.",
        category: "Stews",
        spicy: true,
        rating: 4.6,
    },
];

export default function FoodPage() {
    const { addItem } = useCart();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-black tracking-tight mb-4 italic">K-CAFE <span className="text-purple-500">MENU</span></h1>
                    <p className="text-white/50 text-lg">Authentic Korean flavors crafted with premium ingredients and a modern neon twist.</p>
                </div>

                <div className="flex gap-2 p-1 rounded-xl glass">
                    {["All", "Street Food", "Main Dishes", "Drinks"].map((cat) => (
                        <button key={cat} className="px-5 py-2 rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {foodItems.map((item, idx) => (
                    <GlassCard key={item.id} delay={idx * 0.1} className="p-0 overflow-hidden flex flex-col group h-full">
                        <div className="relative h-56">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <Star size={10} className="fill-yellow-500 text-yellow-500" /> {item.rating}
                            </div>
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
                                    <Timer size={14} /> 15-20 MIN
                                </div>
                                <NeonButton
                                    size="sm"
                                    className="rounded-lg h-9 w-9 p-0"
                                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })}
                                >
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
