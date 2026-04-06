"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, ScatterChart, XAxis, YAxis, ZAxis, Scatter, Tooltip, BarChart, Bar, CartesianGrid, Legend } from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { styleClusterSummary } from "@/data/styleData";

const COLORS = ["hsl(45,80%,65%)", "hsl(142,50%,45%)", "hsl(220,50%,55%)", "hsl(0,60%,50%)"];

export function StyleOverview() {
  const radarData = ["Win Rate", "Rating", "Turns", "Resign Rate"].map(metric => {
    const entry: any = { metric };
    styleClusterSummary.clusters.forEach(c => {
      const val = metric === "Win Rate" ? c.win_rate : metric === "Rating" ? c.avg_rating / 20 : metric === "Turns" ? c.avg_turns : c.resign_rate;
      entry[c.name] = val;
    });
    return entry;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Style Cluster Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={styleClusterSummary.clusters} dataKey="size" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {styleClusterSummary.clusters.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Style Profile Comparison (Radar)">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(240,10%,16%)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(240,10%,40%)", fontSize: 11 }} />
            {styleClusterSummary.clusters.map((c, i) => (
              <Radar key={c.id} name={c.name} dataKey={c.name} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.2} />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Rating vs Win Rate by Cluster">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis type="number" dataKey="avg_rating" name="Rating" unit="" domain={[1200, 1900]} tick={{ fill: "hsl(240,10%,40%)" }} />
            <YAxis type="number" dataKey="win_rate" name="Win Rate" unit="%" domain={[20, 70]} tick={{ fill: "hsl(240,10%,40%)" }} />
            <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Size" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Clusters" data={styleClusterSummary.clusters}>
              {styleClusterSummary.clusters.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Cluster Sizes (Player Count)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={styleClusterSummary.clusters}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(240,10%,40%)" }} />
            <Tooltip />
            <Bar dataKey="size" fill="hsl(45,80%,65%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}