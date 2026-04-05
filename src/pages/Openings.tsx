import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from "recharts";

const GOLD = "hsl(45, 80%, 65%)";
const WHITE_WIN = "hsl(142, 50%, 45%)";
const BLACK_WIN = "hsl(0, 60%, 50%)";
const DRAW_CLR = "hsl(220, 50%, 55%)";
const MUTED = "hsl(240, 10%, 40%)";

interface Opening {
  eco: string;
  name: string;
  emoji: string;
  games: number;
  whiteWin: number;
  blackWin: number;
  draw: number;
  rank: number;
  ratingPerf: { bracket: string; whiteWin: number }[];
  timePerf: { tc: string; whiteWin: number }[];
  tree: MoveNode;
}

interface MoveNode {
  move: string;
  winRate: number;
  popularity: number;
  children: MoveNode[];
}

const openingsData: Opening[] = [
  {
    eco: "C00", name: "French Defense", emoji: "🇫🇷", games: 844, whiteWin: 49.8, blackWin: 44.6, draw: 5.5, rank: 1,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 52 }, { bracket: "1400-1800", whiteWin: 50 }, { bracket: "1800-2200", whiteWin: 48 }, { bracket: "2200+", whiteWin: 45 }],
    timePerf: [{ tc: "Bullet", whiteWin: 51 }, { tc: "Blitz", whiteWin: 50 }, { tc: "Rapid", whiteWin: 48 }, { tc: "Classical", whiteWin: 46 }],
    tree: { move: "e4", winRate: 50, popularity: 100, children: [
      { move: "e6", winRate: 49, popularity: 85, children: [
        { move: "d4", winRate: 50, popularity: 75, children: [
          { move: "d5", winRate: 48, popularity: 70, children: [
            { move: "Nc3", winRate: 51, popularity: 40, children: [] },
            { move: "Nd2", winRate: 49, popularity: 30, children: [] },
          ]},
        ]},
        { move: "d3", winRate: 47, popularity: 15, children: [] },
      ]},
    ]},
  },
  {
    eco: "D00", name: "Queen's Gambit", emoji: "🏰", games: 739, whiteWin: 48.9, blackWin: 44.5, draw: 6.6, rank: 2,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 50 }, { bracket: "1400-1800", whiteWin: 49 }, { bracket: "1800-2200", whiteWin: 48 }, { bracket: "2200+", whiteWin: 47 }],
    timePerf: [{ tc: "Bullet", whiteWin: 48 }, { tc: "Blitz", whiteWin: 49 }, { tc: "Rapid", whiteWin: 50 }, { tc: "Classical", whiteWin: 51 }],
    tree: { move: "d4", winRate: 49, popularity: 100, children: [
      { move: "d5", winRate: 48, popularity: 70, children: [
        { move: "c4", winRate: 49, popularity: 60, children: [
          { move: "e6", winRate: 47, popularity: 35, children: [] },
          { move: "dxc4", winRate: 50, popularity: 25, children: [] },
        ]},
      ]},
      { move: "Nf6", winRate: 49, popularity: 30, children: [] },
    ]},
  },
  {
    eco: "B20", name: "Sicilian Defense", emoji: "🎯", games: 567, whiteWin: 41.6, blackWin: 52.0, draw: 6.4, rank: 3,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 44 }, { bracket: "1400-1800", whiteWin: 42 }, { bracket: "1800-2200", whiteWin: 40 }, { bracket: "2200+", whiteWin: 38 }],
    timePerf: [{ tc: "Bullet", whiteWin: 43 }, { tc: "Blitz", whiteWin: 42 }, { tc: "Rapid", whiteWin: 40 }, { tc: "Classical", whiteWin: 39 }],
    tree: { move: "e4", winRate: 42, popularity: 100, children: [
      { move: "c5", winRate: 41, popularity: 90, children: [
        { move: "Nf3", winRate: 42, popularity: 70, children: [
          { move: "d6", winRate: 41, popularity: 45, children: [] },
          { move: "Nc6", winRate: 43, popularity: 25, children: [] },
        ]},
        { move: "Nc3", winRate: 40, popularity: 20, children: [] },
      ]},
    ]},
  },
  {
    eco: "C50", name: "Italian Game", emoji: "🇮🇹", games: 538, whiteWin: 53.9, blackWin: 40.1, draw: 6.0, rank: 4,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 56 }, { bracket: "1400-1800", whiteWin: 54 }, { bracket: "1800-2200", whiteWin: 52 }, { bracket: "2200+", whiteWin: 50 }],
    timePerf: [{ tc: "Bullet", whiteWin: 55 }, { tc: "Blitz", whiteWin: 54 }, { tc: "Rapid", whiteWin: 53 }, { tc: "Classical", whiteWin: 51 }],
    tree: { move: "e4", winRate: 54, popularity: 100, children: [
      { move: "e5", winRate: 53, popularity: 85, children: [
        { move: "Nf3", winRate: 54, popularity: 80, children: [
          { move: "Nc6", winRate: 53, popularity: 75, children: [
            { move: "Bc4", winRate: 54, popularity: 60, children: [] },
          ]},
        ]},
      ]},
    ]},
  },
  {
    eco: "C44", name: "Scotch Game", emoji: "🏴", games: 375, whiteWin: 53.5, blackWin: 40.8, draw: 5.7, rank: 5,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 55 }, { bracket: "1400-1800", whiteWin: 53 }, { bracket: "1800-2200", whiteWin: 51 }, { bracket: "2200+", whiteWin: 49 }],
    timePerf: [{ tc: "Bullet", whiteWin: 54 }, { tc: "Blitz", whiteWin: 53 }, { tc: "Rapid", whiteWin: 52 }, { tc: "Classical", whiteWin: 50 }],
    tree: { move: "e4", winRate: 53, popularity: 100, children: [
      { move: "e5", winRate: 53, popularity: 80, children: [
        { move: "Nf3", winRate: 54, popularity: 75, children: [
          { move: "Nc6", winRate: 53, popularity: 70, children: [
            { move: "d4", winRate: 54, popularity: 55, children: [] },
          ]},
        ]},
      ]},
    ]},
  },
  {
    eco: "B10", name: "Caro-Kann Defense", emoji: "🛡️", games: 342, whiteWin: 50.2, blackWin: 43.3, draw: 6.5, rank: 6,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 52 }, { bracket: "1400-1800", whiteWin: 50 }, { bracket: "1800-2200", whiteWin: 49 }, { bracket: "2200+", whiteWin: 47 }],
    timePerf: [{ tc: "Bullet", whiteWin: 51 }, { tc: "Blitz", whiteWin: 50 }, { tc: "Rapid", whiteWin: 49 }, { tc: "Classical", whiteWin: 48 }],
    tree: { move: "e4", winRate: 50, popularity: 100, children: [
      { move: "c6", winRate: 49, popularity: 85, children: [
        { move: "d4", winRate: 50, popularity: 70, children: [
          { move: "d5", winRate: 49, popularity: 65, children: [] },
        ]},
      ]},
    ]},
  },
  {
    eco: "A20", name: "English Opening", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", games: 310, whiteWin: 48.0, blackWin: 45.5, draw: 6.5, rank: 7,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 49 }, { bracket: "1400-1800", whiteWin: 48 }, { bracket: "1800-2200", whiteWin: 47 }, { bracket: "2200+", whiteWin: 46 }],
    timePerf: [{ tc: "Bullet", whiteWin: 48 }, { tc: "Blitz", whiteWin: 48 }, { tc: "Rapid", whiteWin: 47 }, { tc: "Classical", whiteWin: 46 }],
    tree: { move: "c4", winRate: 48, popularity: 100, children: [
      { move: "e5", winRate: 47, popularity: 50, children: [] },
      { move: "Nf6", winRate: 48, popularity: 35, children: [] },
    ]},
  },
  {
    eco: "B07", name: "Pirc Defense", emoji: "🎭", games: 285, whiteWin: 51.0, blackWin: 43.5, draw: 5.5, rank: 8,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 53 }, { bracket: "1400-1800", whiteWin: 51 }, { bracket: "1800-2200", whiteWin: 49 }, { bracket: "2200+", whiteWin: 47 }],
    timePerf: [{ tc: "Bullet", whiteWin: 52 }, { tc: "Blitz", whiteWin: 51 }, { tc: "Rapid", whiteWin: 50 }, { tc: "Classical", whiteWin: 48 }],
    tree: { move: "e4", winRate: 51, popularity: 100, children: [
      { move: "d6", winRate: 50, popularity: 80, children: [
        { move: "d4", winRate: 51, popularity: 70, children: [
          { move: "Nf6", winRate: 50, popularity: 60, children: [] },
        ]},
      ]},
    ]},
  },
  {
    eco: "C60", name: "Ruy Lopez", emoji: "🇪🇸", games: 260, whiteWin: 52.3, blackWin: 41.5, draw: 6.2, rank: 9,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 54 }, { bracket: "1400-1800", whiteWin: 52 }, { bracket: "1800-2200", whiteWin: 51 }, { bracket: "2200+", whiteWin: 49 }],
    timePerf: [{ tc: "Bullet", whiteWin: 53 }, { tc: "Blitz", whiteWin: 52 }, { tc: "Rapid", whiteWin: 51 }, { tc: "Classical", whiteWin: 50 }],
    tree: { move: "e4", winRate: 52, popularity: 100, children: [
      { move: "e5", winRate: 52, popularity: 85, children: [
        { move: "Nf3", winRate: 52, popularity: 80, children: [
          { move: "Nc6", winRate: 52, popularity: 75, children: [
            { move: "Bb5", winRate: 53, popularity: 60, children: [] },
          ]},
        ]},
      ]},
    ]},
  },
  {
    eco: "D30", name: "Queen's Gambit Declined", emoji: "🏰", games: 245, whiteWin: 47.5, blackWin: 45.0, draw: 7.5, rank: 10,
    ratingPerf: [{ bracket: "1000-1400", whiteWin: 49 }, { bracket: "1400-1800", whiteWin: 48 }, { bracket: "1800-2200", whiteWin: 47 }, { bracket: "2200+", whiteWin: 46 }],
    timePerf: [{ tc: "Bullet", whiteWin: 48 }, { tc: "Blitz", whiteWin: 47 }, { tc: "Rapid", whiteWin: 47 }, { tc: "Classical", whiteWin: 46 }],
    tree: { move: "d4", winRate: 48, popularity: 100, children: [
      { move: "d5", winRate: 47, popularity: 75, children: [
        { move: "c4", winRate: 48, popularity: 70, children: [
          { move: "e6", winRate: 47, popularity: 65, children: [] },
        ]},
      ]},
    ]},
  },
];

function MoveTreeNode({ node, depth = 0 }: { node: MoveNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.length > 0;
  const winColor = node.winRate > 52 ? WHITE_WIN : node.winRate < 48 ? BLACK_WIN : MUTED;

  return (
    <div className="ml-4 first:ml-0">
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className="flex items-center gap-2 py-1 px-2 rounded hover:bg-secondary/50 transition-colors group"
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />
        ) : <span className="w-3" />}
        <span className="font-mono font-semibold text-sm" style={{ color: winColor }}>{node.move}</span>
        <span className="text-xs text-muted-foreground">
          {node.winRate}% · {node.popularity}%
        </span>
      </button>
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-l border-border ml-3 pl-1"
          >
            {node.children.map((child, i) => (
              <MoveTreeNode key={i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md p-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }}>{p.name}: {p.value}%</p>
      ))}
    </div>
  );
};

export default function Openings() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Opening>(openingsData[0]);

  const filtered = useMemo(() =>
    openingsData.filter(o =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.eco.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
        📖 Opening Database
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[600px]">
        {/* Left panel */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3 lg:col-span-1 overflow-auto max-h-[80vh]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search openings..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="space-y-1">
            {filtered.map(o => (
              <button
                key={o.eco}
                onClick={() => setSelected(o)}
                className={`w-full text-left p-3 rounded-md transition-colors text-sm ${
                  selected.eco === o.eco ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{o.emoji} {o.name}</span>
                  <span className="text-xs text-muted-foreground">{o.eco}</span>
                </div>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{o.games} games</span>
                  <span>{o.whiteWin}% W</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2 space-y-4 overflow-auto max-h-[80vh]">
          <motion.div key={selected.eco} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Header */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-display text-xl font-bold text-foreground">{selected.emoji} {selected.name}</h2>
              <p className="text-sm text-muted-foreground">ECO: {selected.eco} · {selected.games} games · Rank #{selected.rank}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "White Win", value: selected.whiteWin, color: WHITE_WIN },
                { label: "Black Win", value: selected.blackWin, color: BLACK_WIN },
                { label: "Draw", value: selected.draw, color: DRAW_CLR },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}%</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Rating Performance */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Rating Performance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={selected.ratingPerf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="bracket" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} domain={[35, 60]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="whiteWin" stroke={WHITE_WIN} name="White Win%" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Time Control */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Time Control Performance</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={selected.timePerf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                  <XAxis dataKey="tc" tick={{ fill: MUTED, fontSize: 10 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} domain={[35, 60]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="whiteWin" fill={GOLD} radius={[4, 4, 0, 0]} name="White Win%" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Move Tree */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Opening Move Tree</h3>
              <p className="text-xs text-muted-foreground mb-3">Click moves to expand/collapse. Shows: Win% · Popularity%</p>
              <div className="font-mono text-sm">
                <MoveTreeNode node={selected.tree} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
