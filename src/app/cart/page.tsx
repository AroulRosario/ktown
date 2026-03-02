"use client";

import { useCart } from "@/hooks/useCart";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, total } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (!session) {
            router.push("/auth/signin?callbackUrl=/cart");
            return;
        }

        setIsCheckingOut(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(i => {
                        const isFood = i.id.startsWith('f');
                        return {
                            productId: isFood ? null : i.id,
                            foodId: isFood ? i.id : null,
                            quantity: i.quantity,
                            price: i.price
                        };
                    }),
                    totalAmount: total
                }),
            });

            if (res.ok) {
                clearCart();
                router.push("/profile");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-white/20 mb-4">
                        <ShoppingBag size={48} />
                    </div>
                    <h1 className="text-4xl font-black italic uppercase">YOUR BAG IS <span className="text-purple-500">EMPTY</span></h1>
                    <p className="text-white/40 max-w-md mx-auto">Looks like you haven&apos;t added any items to your bag yet. Let&apos;s find some K-culture essentials!</p>
                    <Link href="/shop">
                        <NeonButton size="lg" className="mt-4">
                            Go Shopping <ArrowRight size={20} />
                        </NeonButton>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-black tracking-tight mb-12 italic uppercase">YOUR <span className="text-purple-500">BAG</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <GlassCard className="p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                        <p className="text-brand-purple font-black">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4 glass rounded-xl p-1 px-3">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-brand-purple transition-colors">
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-black">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-brand-purple transition-colors">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="text-lg font-black w-24 text-right">
                                        ₹{item.price * item.quantity}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <GlassCard className="p-8 sticky top-32 border-brand-purple/20">
                        <h2 className="text-xl font-black italic uppercase mb-8 pb-4 border-b border-white/5">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-white/60">
                                <span>Subtotal</span>
                                <span className="font-bold text-white">₹{total}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Shipping</span>
                                <span className="text-green-400 font-bold uppercase tracking-widest text-[10px] self-center">Free Pulse Delivery</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black italic pt-4 border-t border-white/5">
                                <span>Total</span>
                                <span className="text-brand-purple">₹{total}</span>
                            </div>
                        </div>
                        <NeonButton
                            size="lg"
                            className="w-full h-14"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? "Processing..." : session ? "Checkout Now" : "Sign in to Checkout"}
                        </NeonButton>
                        <p className="text-[10px] text-center text-white/20 mt-6 uppercase font-black tracking-widest leading-loose">
                            Secure payment & anonymous <br /> night-drop available.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
