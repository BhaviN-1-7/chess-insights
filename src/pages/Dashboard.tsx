"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
  CartesianGrid, Area, AreaChart
} from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  chessStatistics, 
  openingWinRates, 
  ratingAdvantage, 
  playerCategories 
} from "@/data/chessData";

const GOLD = "hsl(45, 80%, 65%)";
const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const DRAW_CLR = "hsl(220, 50%, 55%)";
const MUTED = "hsl(240, 10%, 40%)";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}{typeof p.value === 'number' && (p.name.includes('%') || p.name.includes('Rate')) ? '%' : ''}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-display font-bold text-gradient-gold"
      >
        ♚ Chess Analytics Dashboard
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Games" value={20058} />
        <StatCard label="Avg Rating" value={1590} />
        <StatCard label="White Win" value={49.9} suffix="%" />
        <StatCard label="Black Win" value={45.4} suffix="%" />
        <StatCard label="Draw Rate" value={4.7} suffix="%" />
        <StatCard label="Openings" value={365} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="openings">Openings</TabsTrigger>
          <TabsTrigger value="time">Time Control</TabsTrigger>
          <TabsTrigger value="length">Game Length</TabsTrigger>
          <TabsTrigger value="rating">Rating Impact</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Page 1: Overview Dashboard */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ChartCard title="1. Game Outcomes (Win/Loss/Draw)">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chessStatistics.winner_percentages} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                    {chessStatistics.winner_percentages.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="2. Victory Status Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chessStatistics.victory_status_percentages}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill={GOLD} radius={[4, 4, 0, 0]} name="Percentage %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="3. Rating Distribution (White vs Black)">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chessStatistics.rating_distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="rating" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="white" fill={WHITE_WIN} fillOpacity={0.3} stroke={WHITE_WIN} name="White" />
                  <Area type="monotone" dataKey="black" fill={BLACK_WIN} fillOpacity={0.3} stroke={BLACK_WIN} name="Black" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* Page 2: Openings Analysis */}
        <TabsContent value="openings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="4. Top 15 Most Popular Openings">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chessStatistics.top_15_openings} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={GOLD} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="5. Win Rates by Opening (Top 5)">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={openingWinRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="white" fill={WHITE_WIN} name="White Win %" />
                  <Bar dataKey="black" fill={BLACK_WIN} name="Black Win %" />
                  <Bar dataKey="draw" fill={DRAW_CLR} name="Draw %" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* Page 3: Time Control Analysis */}
        <TabsContent value="time" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="6. Time Control Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chessStatistics.time_control_distribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                    {chessStatistics.time_control_distribution.map((_, i) => (
                      <Cell key={i} fill={`hsl(45, 80%, ${65 - i * 10}%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="7. Win Rates by Time Control">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chessStatistics.time_control_win_rates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="white" stackId="a" fill={WHITE_WIN} name="White Win %" />
                  <Bar dataKey="black" stackId="a" fill={BLACK_WIN} name="Black Win %" />
                  <Bar dataKey="draw" stackId="a" fill={DRAW_CLR} name="Draw %" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* Page 4: Game Length Analysis */}
        <TabsContent value="length" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="8. Distribution of Game Moves (Turns)">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ turns: i * 10, count: Math.round(Math.exp(-0.5 * Math.pow((i * 10 - 60) / 30, 2)) * 500) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="turns" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="count" fill={GOLD} fillOpacity={0.3} stroke={GOLD} name="Games" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="9. Game Length by Outcome (Avg/Min/Max)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chessStatistics.game_length_by_outcome}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="outcome" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avg" fill={GOLD} name="Avg Moves" />
                  <Bar dataKey="max" fill={MUTED} name="Max Moves" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* Page 5: Rating Impact */}
        <TabsContent value="rating" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="10. Win Probability vs Rating Advantage">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingAdvantage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="diff" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="white_win_rate" stroke={WHITE_WIN} name="White Win %" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="black_win_rate" stroke={BLACK_WIN} name="Black Win %" strokeWidth={2} dot={false} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="11. Player Skill Level Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={playerCategories.white}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={GOLD} name="White Players" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* Page 6: Advanced Analytics */}
        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="12. Rated vs Unrated Win Rates">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chessStatistics.rated_vs_unrated}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="type" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="white" fill={WHITE_WIN} name="White Win %" />
                  <Bar dataKey="black" fill={BLACK_WIN} name="Black Win %" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="13. Opening Popularity Pareto">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chessStatistics.opening_popularity_pareto} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label>
                    {chessStatistics.opening_popularity_pareto.map((_, i) => (
                      <Cell key={i} fill={`hsl(38, 90%, ${55 - i * 15}%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="14. Skill Level Comparison (Black)">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={playerCategories.black}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={BLACK_WIN} name="Black Players" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}