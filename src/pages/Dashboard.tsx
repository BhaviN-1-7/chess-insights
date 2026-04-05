import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
  CartesianGrid, Area, AreaChart
} from "recharts";

const GOLD = "hsl(45, 80%, 65%)";
const AMBER = "hsl(38, 90%, 55%)";
const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const DRAW_CLR = "hsl(220, 50%, 55%)";
const MUTED = "hsl(240, 10%, 40%)";

function StatCard({ label, value, suffix = "" }: { label: string; value: number; suffix?: string; decimals?: number }) {
  const { count, ref } = useCountUp(value, 2000, suffix === "%" ? 1 : 0);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 text-center glow-gold"
    >
      <p className="text-2xl md:text-3xl font-bold text-gradient-gold font-display">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}

function ChartCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-card border border-border rounded-lg p-4 ${className}`}
    >
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

const ratingDistData = Array.from({ length: 20 }, (_, i) => {
  const rating = 800 + i * 100;
  const whiteNorm = Math.exp(-0.5 * Math.pow((rating - 1550) / 350, 2));
  const blackNorm = Math.exp(-0.5 * Math.pow((rating - 1600) / 380, 2));
  return { rating: `${rating}`, white: Math.round(whiteNorm * 1200), black: Math.round(blackNorm * 1100) };
});

const outcomeData = [
  { name: "White", value: 49.9, color: WHITE_WIN },
  { name: "Black", value: 45.4, color: BLACK_WIN },
  { name: "Draw", value: 4.7, color: DRAW_CLR },
];

const topOpenings = [
  { name: "French Defense", games: 844 },
  { name: "Queen's Gambit", games: 739 },
  { name: "Sicilian Defense", games: 567 },
  { name: "Italian Game", games: 538 },
  { name: "King's Pawn", games: 498 },
  { name: "Scotch Game", games: 375 },
  { name: "Caro-Kann", games: 342 },
  { name: "English Opening", games: 310 },
  { name: "Pirc Defense", games: 285 },
  { name: "Ruy Lopez", games: 260 },
];

const timeControlData = [
  { name: "Blitz", value: 66.5, color: GOLD },
  { name: "Rapid", value: 29.9, color: AMBER },
  { name: "Classical", value: 2.7, color: DRAW_CLR },
  { name: "Bullet", value: 0.9, color: MUTED },
];

const gameLengthData = Array.from({ length: 25 }, (_, i) => {
  const moves = 10 + i * 5;
  const freq = Math.exp(-0.5 * Math.pow((moves - 60) / 25, 2));
  return { moves: `${moves}`, count: Math.round(freq * 800) };
});

const victoryData = [
  { name: "Resign", pct: 55.6 },
  { name: "Mate", pct: 31.5 },
  { name: "Out of Time", pct: 8.4 },
  { name: "Draw", pct: 4.5 },
];

const ratingAdvData = Array.from({ length: 11 }, (_, i) => {
  const diff = -500 + i * 100;
  const whiteWin = 50 + diff * 0.04 + Math.random() * 3;
  const blackWin = 50 - diff * 0.04 + Math.random() * 3;
  const draw = 100 - whiteWin - blackWin;
  return { diff: `${diff > 0 ? '+' : ''}${diff}`, white: +whiteWin.toFixed(1), black: +blackWin.toFixed(1), draw: +Math.max(draw, 2).toFixed(1) };
});

const correlationData = [
  { row: "White Rating", "White Rating": 1.0, "Black Rating": 0.85, Turns: 0.12, "Opening Ply": 0.08 },
  { row: "Black Rating", "White Rating": 0.85, "Black Rating": 1.0, Turns: 0.15, "Opening Ply": 0.07 },
  { row: "Turns", "White Rating": 0.12, "Black Rating": 0.15, Turns: 1.0, "Opening Ply": 0.35 },
  { row: "Opening Ply", "White Rating": 0.08, "Black Rating": 0.07, Turns: 0.35, "Opening Ply": 1.0 },
];

function HeatmapCell({ value }: { value: number }) {
  const intensity = Math.abs(value);
  const bg = `hsl(45, 80%, ${65 - intensity * 40}%)`;
  return (
    <div
      className="w-full aspect-square flex items-center justify-center text-xs font-mono rounded"
      style={{ backgroundColor: bg, color: intensity > 0.5 ? "hsl(240,20%,4%)" : "hsl(38,45%,90%)" }}
    >
      {value.toFixed(2)}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}
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
        <StatCard label="Total Games" value={20058} />
        <StatCard label="Players" value={15635} />
        <StatCard label="Openings" value={365} />
        <StatCard label="Avg Rating" value={1590} />
        <StatCard label="White Win" value={49.9} suffix="%" />
        <StatCard label="Draw Rate" value={4.7} suffix="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Rating Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ratingDistData}>
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

        <ChartCard title="Game Outcomes">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {outcomeData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 10 Openings">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topOpenings} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis dataKey="name" type="category" width={110} tick={{ fill: MUTED, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="games" fill={GOLD} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Time Control Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={timeControlData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {timeControlData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Game Length Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gameLengthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="moves" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={AMBER} radius={[4, 4, 0, 0]} name="Games" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2 text-center">Mean: 60.5 moves · Median: 55 moves</p>
        </ChartCard>

        <ChartCard title="Victory Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={victoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fill: MUTED, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pct" fill={WHITE_WIN} radius={[0, 4, 4, 0]} name="%" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Rating Advantage vs Win Rate">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingAdvData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
              <XAxis dataKey="diff" tick={{ fill: MUTED, fontSize: 10 }} />
              <YAxis tick={{ fill: MUTED, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="white" stroke={WHITE_WIN} name="White Win%" dot={false} />
              <Line type="monotone" dataKey="black" stroke={BLACK_WIN} name="Black Win%" dot={false} />
              <Line type="monotone" dataKey="draw" stroke={DRAW_CLR} name="Draw%" dot={false} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Correlation Heatmap">
          <div className="grid grid-cols-5 gap-1 text-xs">
            <div />
            {["W.Rating", "B.Rating", "Turns", "Op.Ply"].map(h => (
              <div key={h} className="text-center text-muted-foreground font-medium truncate">{h}</div>
            ))}
            {correlationData.map(row => (
              <>
                <div key={row.row} className="flex items-center text-muted-foreground font-medium truncate pr-1">{row.row.replace("Rating", "Rtg")}</div>
                <HeatmapCell value={row["White Rating"]} />
                <HeatmapCell value={row["Black Rating"]} />
                <HeatmapCell value={row["Turns"]} />
                <HeatmapCell value={row["Opening Ply"]} />
              </>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
