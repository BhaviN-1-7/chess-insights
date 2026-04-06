"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { elbowData } from "@/data/styleData";

export function TechnicalValidation() {
  const combinedData = elbowData.k_values.map((k, i) => ({
    k,
    inertia: elbowData.inertias[i],
    silhouette: elbowData.silhouette_scores[i]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Elbow Curve: Optimal K Selection">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis dataKey="k" label={{ value: 'Number of Clusters (k)', position: 'insideBottom', offset: -5, fill: 'hsl(240,10%,40%)' }} tick={{ fill: "hsl(240,10%,40%)" }} />
            <YAxis label={{ value: 'Inertia', angle: -90, position: 'insideLeft', fill: 'hsl(240,10%,40%)' }} tick={{ fill: "hsl(240,10%,40%)" }} />
            <Tooltip />
            <Line type="monotone" dataKey="inertia" stroke="hsl(45,80%,65%)" strokeWidth={3} dot={{ r: 6, fill: 'hsl(45,80%,65%)' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Silhouette Scores by K">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis dataKey="k" tick={{ fill: "hsl(240,10%,40%)" }} />
            <YAxis domain={[0.15, 0.25]} tick={{ fill: "hsl(240,10%,40%)" }} />
            <Tooltip />
            <Line type="monotone" dataKey="silhouette" stroke="hsl(142,50%,45%)" strokeWidth={3} dot={{ r: 6, fill: 'hsl(142,50%,45%)' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Cluster Quality Metrics" className="lg:col-span-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-4">
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-xs text-muted-foreground">Optimal Clusters</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-2xl font-bold text-primary">0.203</p>
            <p className="text-xs text-muted-foreground">Avg Silhouette Score</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-2xl font-bold text-primary">15.5%</p>
            <p className="text-xs text-muted-foreground">PCA Explained Var</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-2xl font-bold text-primary">688</p>
            <p className="text-xs text-muted-foreground">Total Players Analyzed</p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}