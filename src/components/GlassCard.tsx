"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    hover?: boolean;
}

export default function GlassCard({ children, className, delay = 0, hover = true, ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "glass-card p-6",
                hover && "hover:border-white/20 hover:shadow-purple-500/10",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
