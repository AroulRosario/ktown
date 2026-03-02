"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    glow?: boolean;
}

export default function NeonButton({
    children,
    className,
    variant = "primary",
    size = "md",
    glow = true,
    ...props
}: NeonButtonProps) {
    const variants = {
        primary: "bg-gradient-to-r from-brand-purple to-brand-violet text-white border-transparent",
        outline: "bg-white/5 text-white border-white/10 hover:bg-white/10",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-transparent",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm font-semibold",
        lg: "px-8 py-4 text-base font-bold",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group",
                variants[variant],
                sizes[size],
                glow && variant === "primary" && "shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
                className
            )}
            {...props}
        >
            {/* Gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
