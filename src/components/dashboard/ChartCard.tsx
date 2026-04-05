"use client";

import { motion } from "framer-motion";
import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-card border border-border rounded-lg p-4 ${className}`}
    >
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}