"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, Legend } from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { openingClusterProfiles, pcaData } from "@/data/styleData";

const COLORS = ["hsl(45,80%,65%)", "hsl(142,50%,45%)", "hsl(220,50%,55%)", "hsl(0,60%,50%)"];

export function OpeningPreferences() {
  const stackedData = openingClusterProfiles.clusters.map(c => ({
    name: c.name,
    ...c.top.reduce((acc, curr, i) => ({ ...acc, [`op${i}`]: curr.p, [`name${i}`]: curr.n }), {})
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Opening Cluster Sizes">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={openingClusterProfiles.clusters} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis type="number" tick={{ fill: "hsl(240,10%,40%)" }} />
            <YAxis dataKey="name" type="category" width={150} tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="size" fill="hsl(38,90%,55%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top Openings per Cluster (%)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stackedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(240,10%,40%)" }} />
            <Tooltip />
            <Bar dataKey="op0" stackId="a" fill="hsl(45,80%,65%)" name="Top 1" />
            <Bar dataKey="op1" stackId="a" fill="hsl(38,90%,55%)" name="Top 2" />
            <Bar dataKey="op2" stackId="a" fill="hsl(240,10%,30%)" name="Top 3" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="PCA Scatter Plot: Cluster Separation" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
            <XAxis type="number" dataKey="x" name="PC1" tick={{ fill: "hsl(240,10%,40%)" }} />
            <YAxis type="number" dataKey="y" name="PC2" tick={{ fill: "hsl(240,10%,40%)" }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Players" data={pcaData}>
              {pcaData.map((entry, i) => <Cell key={i} fill={COLORS[entry.cluster]} />)}
            </Scatter>
            <Legend />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}