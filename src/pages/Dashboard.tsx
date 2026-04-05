"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
  CartesianGrid, Area, AreaChart
} from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentGames } from "@/components/dashboard/RecentGames";
import { 
  chessStats, 
  ratingDistribution, 
  outcomeData, 
  topOpenings, 
  ratingAdvantageData 
} from "@/data/chessData";

const GOLD = "hsl(45, 80%, 65%)";
const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const MUTED = "hsl(240, 10%, 40%)";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}{typeof p.value === 'number' && p.value < 100 && p.dataKey !== 'games' ? '%' : ''}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-display font-bold text-gradient-gold"
      >
        ♚ Dashboard
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Games" value={chessStats.totalGames} />
        <StatCard label="Players" value={chessStats.uniquePlayers} />
        <StatCard label="Openings" value={chessStats.uniqueOpenings} />
        <StatCard label="Avg Rating" value={chessStats.avgRating} />
        <StatCard label="White Win" value={chessStats.whiteWinRate} suffix="%" />
        <StatCard label="Draw Rate" value={chessStats.drawRate} suffix="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <ChartCard title="Rating Distribution (White vs Black)">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                <XAxis dataKey="rating" tick={{ fill: MUTED, fontSize: 10 }} />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="white" fill={WHITE_WIN} fillOpacity={0.3} stroke={WHITE_WIN} name="White" />
                <Area type="monotone" dataKey="black" fill={BLACK_WIN} fillOpacity={0.3} stroke={BLACK_WIN} name="Black" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard title="Most Popular Openings">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topOpenings} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="games" fill={GOLD} radius={[0, 4, 4, 0]} name="Games" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Win Probability by Rating Advantage">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ratingAdvantageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="diff" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="white" stroke={WHITE_WIN} name="White Win%" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="black" stroke={BLACK_WIN} name="Black Win%" dot={false} strokeWidth={2} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="space-y-4">
          <ChartCard title="Game Outcomes">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie 
                  data={outcomeData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5}
                  dataKey="value"
                >
                  {outcomeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {outcomeData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-muted-foreground">{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <RecentGames />
        </div>
      </div>
    </div>
  );
}