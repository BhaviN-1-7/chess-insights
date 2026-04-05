"use client";

import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import stats from "@/data/chess_statistics.json";

const COLORS = ["#FFD700", "#FFA500", "#FF4500", "#8B0000", "#4682B4"];
const MUTED = "hsl(240, 10%, 40%)";

export default function TimeControl() {
  const distData = Object.entries(stats.time_control_analysis.distribution).map(([name, value]) => ({
    name, value
  }));

  const winRates = Object.entries(stats.time_control_analysis.win_rates_by_category).map(([name, rates]: [string, any]) => ({
    name,
    white: rates.white,
    black: rates.black,
    draw: rates.draw
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        ⏱️ Time Control Analysis
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="6. Time Control Distribution">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={distData} cx="50%" cy="50%" outerRadius={120} dataKey="value" label>
                {distData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="7. Win Rates by Time Control (Stacked)">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={winRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 12 }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="white" stackId="a" fill="hsl(142, 50%, 45%)" name="White Win %" />
              <Bar dataKey="black" stackId="a" fill="hsl(0, 60%, 50%)" name="Black Win %" />
              <Bar dataKey="draw" stackId="a" fill="hsl(220, 50%, 55%)" name="Draw %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}