"use client";

import { motion } from "framer-motion";
import { Check, ChefHat, Bike, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrderStatus = "cooking" | "out-for-delivery" | "arrived";

interface LiveTimelineProps {
    status: OrderStatus;
    className?: string;
}

export default function LiveTimeline({ status, className }: LiveTimelineProps) {
    const steps = [
        { key: "cooking", label: "Cooking", icon: ChefHat },
        { key: "out-for-delivery", label: "Out for Delivery", icon: Bike },
        { key: "arrived", label: "Arrived", icon: PackageCheck },
    ];

    const currentStepIdx = steps.findIndex((s) => s.key === status);

    return (
        <div className={cn("w-full py-8", className)}>
            <div className="relative flex justify-between">
                {/* Background Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-white/5 rounded-full" />

                {/* Progress Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-brand-purple to-brand-violet rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                />

                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const Icon = step.icon;

                    return (
                        <div key={step.key} className="relative z-10 flex flex-col items-center gap-3">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isCompleted || isCurrent ? "rgba(94, 23, 235, 1)" : "rgba(255, 255, 255, 0.05)",
                                }}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 transition-colors",
                                    (isCompleted || isCurrent) ? "text-white shadow-lg shadow-purple-500/20" : "text-white/30"
                                )}
                            >
                                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                            </motion.div>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                (isCompleted || isCurrent) ? "text-white" : "text-white/20"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
