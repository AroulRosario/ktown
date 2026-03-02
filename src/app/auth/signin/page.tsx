"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, Mail, Lock, User, Github, Chrome, ArrowRight, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import NeonButton from "@/components/NeonButton";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (isLogin) {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
                setLoading(false);
            } else {
                router.push("/profile");
                router.refresh();
            }
        } else {
            // Signup logic
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Signup failed");
                    setLoading(false);
                } else {
                    // Auto login after signup
                    await signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        callbackUrl: "/profile",
                    });
                }
            } catch (err) {
                setError("Something went wrong");
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/20 blur-[120px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <GlassCard className="p-8 md:p-12 relative overflow-hidden">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black tracking-tighter italic mb-3">
                            K-TOWN <span className="text-purple-500 font-extrabold">AUTH</span>
                        </h1>
                        <p className="text-white/40 text-sm font-medium">
                            Your portal to the Seoul vibes
                        </p>
                    </div>

                    <div className="flex p-1 bg-white/5 rounded-2xl mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${isLogin ? "bg-brand-purple text-white shadow-lg" : "text-white/40 hover:text-white"
                                }`}
                        >
                            <LogIn size={16} /> Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${!isLogin ? "bg-brand-purple text-white shadow-lg" : "text-white/40 hover:text-white"
                                }`}
                        >
                            <UserPlus size={16} /> Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-5 overflow-hidden"
                                >
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            required={!isLogin}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-14 pl-14 pr-6 rounded-2xl glass border-white/5 bg-white/5 focus:bg-white/10 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-white/30"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-14 pl-14 pr-6 rounded-2xl glass border-white/5 bg-white/5 focus:bg-white/10 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-white/30"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full h-14 pl-14 pr-6 rounded-2xl glass border-white/5 bg-white/5 focus:bg-white/10 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-white/30"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                                {error}
                            </p>
                        )}

                        <NeonButton
                            type="submit"
                            disabled={loading}
                            className="w-full h-14"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={20} />
                                </span>
                            )}
                        </NeonButton>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black">
                            <span className="glass px-4 py-1 rounded-full text-white/20">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => {
                                setLoading(true);
                                signIn("google", { callbackUrl: "/profile" });
                            }}
                            disabled={loading}
                            className="w-full h-14 rounded-2xl glass border-white/5 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    <Chrome size={18} className="text-purple-400" />
                                    Sign in with Google
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center mt-10 text-white/30 text-[10px] font-black uppercase tracking-[0.2em] leading-loose">
                        By continuing, you agree to the <br /> K-Town Terms of Vibe & Service.
                    </p>
                </GlassCard>
            </motion.div>
        </div>
    );
}
