"use client";

import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import ratingAdv from "@/data/chess_rating_advantage.json";
import playerCats from "@/data/chess_player_categories.json";

const MUTED = "hsl(240, 10%, 40%)";

export default function RatingImpact() {
  const lineData = ratingAdv.map(r => ({
    diff: r.rating_diff_mid,
    white: r.white_win_rate,
    black: r.black_win_rate,
    draw: r.draw_rate
  }));

  // Heatmap data for player categories
  const categories = Object.keys(playerCats.cross_tabulation);
  const heatmapData = [];
  categories.forEach((whiteCat, i) => {
    categories.forEach((blackCat, j) => {
      heatmapData.push({
        x: i,
        y: j,
        whiteCat,
        blackCat,
        value: playerCats.cross_tabulation[whiteCat][blackCat] || 0
      });
    });
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        📈 Rating Impact
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="10. Win Probability vs Rating Advantage">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="diff" tick={{ fill: MUTED }} label={{ value: 'Rating Diff (W-B)', position: 'insideBottom', offset: -5 }} />
              <YAxis tick={{ fill: MUTED }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="white" stroke="hsl(142, 50%, 45%)" name="White Win %" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="black" stroke="hsl(0, 60%, 50%)" name="Black Win %" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="11. Player Rating Category Correlation (Heatmap)">
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" hide />
              <YAxis type="number" dataKey="y" hide />
              <ZAxis type="number" dataKey="value" range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover p-2 border border-border rounded shadow">
                      <p className="text-xs">White: {data.whiteCat}</p>
                      <p className="text-xs">Black: {data.blackCat}</p>
                      <p className="text-xs font-bold">Games: {data.value}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Scatter data={heatmapData}>
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(45, 80%, ${Math.max(30, 100 - entry.value / 10)}%)`} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-[10px] text-muted-foreground px-4">
            <span>Beginner → Master</span>
            <span>Beginner → Master</span>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}