"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Coffee, Music, Users, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const navItems = [
    { name: "Home", href: "/", icon: Coffee },
    { name: "Food", href: "/food", icon: Coffee },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Karaoke", href: "/karaoke", icon: Music },
    { name: "Community", href: "/community", icon: Users },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { items } = useCart();
    const { data: session, status } = useSession();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-violet flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20"
                    >
                        K
                    </motion.div>
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 tracking-tighter">
                        TOWN
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl glass border-white/5 shadow-2xl">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2",
                                    isActive ? "text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                    />
                                )}
                                <item.icon size={16} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {session?.user ? (
                        <>
                            <Link
                                href="/profile"
                                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-colors text-white flex items-center gap-2"
                            >
                                {session.user.image ? (
                                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                                ) : (
                                    <User size={20} />
                                )}
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors text-white flex items-center gap-2 text-sm font-bold"
                        >
                            <LogIn size={16} /> Sign In
                        </button>
                    )}
                    <Link
                        href="/cart"
                        className="p-2.5 rounded-xl glass hover:bg-white/10 transition-colors text-white relative"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center text-[10px] font-bold border-2 border-[#0a0118]">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2.5 rounded-xl glass text-white"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-4 right-4 p-4 rounded-2xl glass border-white/5 shadow-2xl pointer-events-auto"
                >
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                    pathname === item.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                                )}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
