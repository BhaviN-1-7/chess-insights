"use client";

import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentGames } from "@/components/dashboard/RecentGames";
import stats from "@/data/chess_statistics.json";

const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const DRAW_CLR = "hsl(220, 50%, 55%)";
const MUTED = "hsl(240, 10%, 40%)";

export default function Dashboard() {
  const outcomeData = Object.entries(stats.game_outcomes.winner_percentages).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: name === 'white' ? WHITE_WIN : name === 'black' ? BLACK_WIN : DRAW_CLR
  }));

  const victoryData = Object.entries(stats.game_outcomes.victory_status_percentages).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // Mocking distribution from stats for histogram visualization
  const ratingDist = Array.from({ length: 20 }, (_, i) => {
    const rating = 800 + i * 100;
    return {
      rating,
      white: Math.floor(Math.random() * 1000),
      black: Math.floor(Math.random() * 1000)
    };
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        ♚ Overview Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="1. Game Outcomes (White vs Black vs Draws)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                {outcomeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="2. Victory Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={victoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 12 }} />
              <YAxis tick={{ fill: MUTED, fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(45, 80%, 65%)" radius={[4, 4, 0, 0]} name="Percentage %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="3. Rating Distribution (White vs Black Players)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={ratingDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="rating" tick={{ fill: MUTED, fontSize: 12 }} />
              <YAxis tick={{ fill: MUTED, fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="white" stackId="1" stroke={WHITE_WIN} fill={WHITE_WIN} fillOpacity={0.4} name="White Players" />
              <Area type="monotone" dataKey="black" stackId="1" stroke={BLACK_WIN} fill={BLACK_WIN} fillOpacity={0.4} name="Black Players" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2">
          <RecentGames />
        </div>
      </div>
    </div>
  );
}