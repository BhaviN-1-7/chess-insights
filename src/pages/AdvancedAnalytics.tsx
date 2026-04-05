"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import stats from "@/data/chess_statistics.json";
import correlations from "@/data/chess_correlations.json";
import playerCats from "@/data/chess_player_categories.json";

const MUTED = "hsl(240, 10%, 40%)";

export default function AdvancedAnalytics() {
  const ratedData = [
    { name: 'Rated', white: stats.rated_vs_unrated.win_rates.rated.white, black: stats.rated_vs_unrated.win_rates.rated.black, draw: stats.rated_vs_unrated.win_rates.rated.draw },
    { name: 'Unrated', white: stats.rated_vs_unrated.win_rates.unrated.white, black: stats.rated_vs_unrated.win_rates.unrated.black, draw: stats.rated_vs_unrated.win_rates.unrated.draw }
  ];

  const corrData = [];
  const features = Object.keys(correlations.correlation_matrix);
  features.forEach((f1, i) => {
    features.forEach((f2, j) => {
      corrData.push({
        x: i,
        y: j,
        f1,
        f2,
        value: correlations.correlation_matrix[f1][f2]
      });
    });
  });

  const skillDist = Object.entries(playerCats.white_categories).map(([name, count]) => ({
    name: name.split(' ')[0],
    white: count,
    black: playerCats.black_categories[name]
  }));

  const paretoData = [
    { name: 'Played Once', value: stats.openings_analysis.rare_openings_count },
    { name: 'Played Multiple', value: stats.openings_analysis.unique_openings_count - stats.openings_analysis.rare_openings_count }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        ⚡ Advanced Analytics
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="12. Rated vs Unrated Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="white" fill="hsl(142, 50%, 45%)" name="White Win %" />
              <Bar dataKey="black" fill="hsl(0, 60%, 50%)" name="Black Win %" />
              <Bar dataKey="draw" fill="hsl(220, 50%, 55%)" name="Draw %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="13. Feature Correlation Matrix (Heatmap)">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <XAxis type="number" dataKey="x" hide />
              <YAxis type="number" dataKey="y" hide />
              <ZAxis type="number" dataKey="value" range={[50, 300]} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover p-2 border border-border rounded shadow">
                      <p className="text-[10px]">{data.f1} vs {data.f2}</p>
                      <p className="text-xs font-bold">Corr: {data.value.toFixed(3)}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Scatter data={corrData}>
                {corrData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 0 ? `rgba(70, 130, 180, ${Math.abs(entry.value)})` : `rgba(220, 20, 60, ${Math.abs(entry.value)})`} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="14. Player Skill Level Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="white" fill="hsl(45, 80%, 65%)" name="White Players" />
              <Bar dataKey="black" fill="hsl(38, 90%, 55%)" name="Black Players" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="15. Opening Popularity Distribution (Pareto)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={paretoData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label>
                <Cell fill="hsl(45, 80%, 65%)" />
                <Cell fill="hsl(240, 10%, 20%)" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}