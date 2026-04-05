"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import stats from "@/data/chess_statistics.json";
import sample from "@/data/chess_data_sample.json";

const MUTED = "hsl(240, 10%, 40%)";

export default function GameLength() {
  // Histogram data for turns
  const turns = sample.map(s => s.turns);
  const maxTurns = Math.max(...turns);
  const bins = 20;
  const binSize = Math.ceil(maxTurns / bins);
  const histogramData = Array.from({ length: bins }, (_, i) => {
    const start = i * binSize;
    const end = (i + 1) * binSize;
    return {
      range: `${start}-${end}`,
      count: turns.filter(t => t >= start && t < end).length
    };
  });

  // Box plot data (simulated with bar chart for Recharts)
  const boxData = Object.entries(stats.game_length_analysis.by_outcome).map(([name, data]: [string, any]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    mean: data.mean,
    median: data.median,
    min: data.min,
    max: data.max
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        📏 Game Length Analysis
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="8. Distribution of Game Moves (Histogram)">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="range" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(38, 90%, 55%)" radius={[4, 4, 0, 0]} name="Number of Games" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="9. Game Length by Outcome (Mean/Median)">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={boxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="mean" fill="hsl(45, 80%, 65%)" name="Mean Moves" />
              <Bar dataKey="median" fill="hsl(240, 10%, 30%)" name="Median Moves" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}