"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

export function StatCard({ label, value, suffix = "" }: StatCardProps) {
  const { count, ref } = useCountUp(value, 2000, suffix === "%" ? 1 : 0);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 text-center glow-gold"
    >
      <p className="text-2xl md:text-3xl font-bold text-gradient-gold font-display">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}