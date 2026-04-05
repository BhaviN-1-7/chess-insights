import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  CartesianGrid, Cell
} from "recharts";

const CLUSTER_COLORS = ["hsl(45,80%,65%)", "hsl(142,50%,45%)", "hsl(220,50%,55%)", "hsl(0,60%,50%)"];

const styleClusterInfo = [
  { id: 0, emoji: "📚", label: "Beginner", players: 133, rating: 1322, win: 26.1, draw: 2.4, aggression: 20, defense: 30, complexity: 25, speed: 40 },
  { id: 1, emoji: "⚖️", label: "Balanced", players: 155, rating: 1352, win: 36.3, draw: 3.9, aggression: 50, defense: 50, complexity: 45, speed: 55 },
  { id: 2, emoji: "🛡️", label: "Defensive", players: 94, rating: 1781, win: 47.3, draw: 16.2, aggression: 30, defense: 85, complexity: 70, speed: 35 },
  { id: 3, emoji: "⚡", label: "Aggressive", players: 306, rating: 1769, win: 60.6, draw: 3.2, aggression: 90, defense: 40, complexity: 65, speed: 80 },
];

const openingClusterInfo = [
  { id: 0, emoji: "📚", label: "Versatile", players: 232, rating: 1513, topOpenings: "Scotch, Italian, Queen's Gambit" },
  { id: 1, emoji: "🏰", label: "Queen's Gambit", players: 119, rating: 1755, topOpenings: "Queen's Gambit 30%" },
  { id: 2, emoji: "🎲", label: "Unusual", players: 150, rating: 1421, topOpenings: "Unusual Opening 19%" },
  { id: 3, emoji: "🎯", label: "Sicilian", players: 187, rating: 1716, topOpenings: "Sicilian 29%" },
];

function generateScatterData(clusters: typeof styleClusterInfo) {
  const points: { x: number; y: number; cluster: number; player: string; rating: number }[] = [];
  clusters.forEach(c => {
    for (let i = 0; i < c.players; i++) {
      points.push({
        x: (c.id - 1.5) * 3 + (Math.random() - 0.5) * 4,
        y: (c.id % 2 - 0.5) * 3 + (Math.random() - 0.5) * 4,
        cluster: c.id,
        player: `Player_${c.id}_${i}`,
        rating: c.rating + Math.round((Math.random() - 0.5) * 400),
      });
    }
  });
  return points;
}

const styleScatter = generateScatterData(styleClusterInfo);
const openingScatter = generateScatterData(openingClusterInfo);

const radarData = ["Aggression", "Defense", "Complexity", "Speed"].map(metric => {
  const key = metric.toLowerCase() as "aggression" | "defense" | "complexity" | "speed";
  const entry: any = { metric };
  styleClusterInfo.forEach(c => { entry[c.label] = c[key]; });
  return entry;
});

function ClusterCard({ cluster, type }: { cluster: typeof styleClusterInfo[0] & { topOpenings?: string }; type: "style" | "opening" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-lg p-4"
      style={{ borderLeftColor: CLUSTER_COLORS[cluster.id], borderLeftWidth: 3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{cluster.emoji}</span>
        <h4 className="font-display font-semibold text-foreground">{cluster.label}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <span>Players: <span className="text-foreground">{cluster.players}</span></span>
        <span>Avg Rating: <span className="text-foreground">{cluster.rating}</span></span>
        {type === "style" && "win" in cluster && (
          <>
            <span>Win%: <span className="text-foreground">{(cluster as any).win}%</span></span>
            <span>Draw%: <span className="text-foreground">{(cluster as any).draw}%</span></span>
          </>
        )}
        {type === "opening" && "topOpenings" in cluster && (
          <span className="col-span-2">Top: <span className="text-foreground">{cluster.topOpenings}</span></span>
        )}
      </div>
    </motion.div>
  );
}

const ScatterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
      <p className="text-foreground font-semibold">{d.player}</p>
      <p className="text-muted-foreground">Rating: {d.rating}</p>
    </div>
  );
};

export default function Styles() {
  const [activeTab, setActiveTab] = useState("style");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        🌀 Player Styles
      </motion.h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="style">Playing Style</TabsTrigger>
          <TabsTrigger value="opening">Opening Preference</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {styleClusterInfo.map(c => <ClusterCard key={c.id} cluster={c} type="style" />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">PCA Scatter Plot</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis type="number" dataKey="x" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} name="PC1" />
                  <YAxis type="number" dataKey="y" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} name="PC2" />
                  <Tooltip content={<ScatterTooltip />} />
                  <Scatter data={styleScatter} fillOpacity={0.7}>
                    {styleScatter.map((d, i) => <Cell key={i} fill={CLUSTER_COLORS[d.cluster]} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">Cluster Comparison</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(240,10%,16%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(240,10%,40%)", fontSize: 11 }} />
                  <PolarRadiusAxis tick={false} />
                  {styleClusterInfo.map((c, i) => (
                    <Radar key={c.id} name={c.label} dataKey={c.label} stroke={CLUSTER_COLORS[i]} fill={CLUSTER_COLORS[i]} fillOpacity={0.15} />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opening" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {openingClusterInfo.map(c => <ClusterCard key={c.id} cluster={c as any} type="opening" />)}
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">PCA Scatter Plot – Opening Preferences</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                <XAxis type="number" dataKey="x" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} name="PC1" />
                <YAxis type="number" dataKey="y" tick={{ fill: "hsl(240,10%,40%)", fontSize: 10 }} name="PC2" />
                <Tooltip content={<ScatterTooltip />} />
                <Scatter data={openingScatter} fillOpacity={0.7}>
                  {openingScatter.map((d, i) => <Cell key={i} fill={CLUSTER_COLORS[d.cluster]} />)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
