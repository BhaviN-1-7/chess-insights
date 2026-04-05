"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import stats from "@/data/chess_statistics.json";
import openings from "@/data/chess_openings.json";

const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const DRAW_CLR = "hsl(220, 50%, 55%)";
const MUTED = "hsl(240, 10%, 40%)";

export default function Openings() {
  const top15 = Object.entries(stats.top_15_openings).map(([name, count]) => ({
    name: name.length > 30 ? name.substring(0, 30) + "..." : name,
    count
  })).sort((a, b) => b.count - a.count);

  const winRates = openings.slice(0, 10).map(o => ({
    name: o.opening_name.length > 20 ? o.opening_name.substring(0, 20) + "..." : o.opening_name,
    white: o.white_win_rate,
    black: o.black_win_rate,
    draw: o.draw_rate
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        📖 Openings Analysis
      </motion.h1>

      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="4. Top 15 Most Popular Openings">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={top15} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis type="number" tick={{ fill: MUTED }} />
              <YAxis dataKey="name" type="category" tick={{ fill: MUTED, fontSize: 11 }} width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(45, 80%, 65%)" radius={[0, 4, 4, 0]} name="Games Played" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="5. Win Rates by Opening (Top 10)">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={winRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="white" fill={WHITE_WIN} name="White Win %" />
              <Bar dataKey="black" fill={BLACK_WIN} name="Black Win %" />
              <Bar dataKey="draw" fill={DRAW_CLR} name="Draw %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}