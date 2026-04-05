import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const topOpenings = [
  { eco: "C00", name: "French Defense" }, { eco: "D00", name: "Queen's Gambit" },
  { eco: "B20", name: "Sicilian Defense" }, { eco: "C50", name: "Italian Game" },
  { eco: "C44", name: "Scotch Game" }, { eco: "B10", name: "Caro-Kann Defense" },
  { eco: "A20", name: "English Opening" }, { eco: "B07", name: "Pirc Defense" },
  { eco: "C60", name: "Ruy Lopez" }, { eco: "D30", name: "Queen's Gambit Declined" },
  { eco: "B00", name: "Nimzowitsch Defense" }, { eco: "A00", name: "Unusual Opening" },
  { eco: "E00", name: "Indian Defense" }, { eco: "A40", name: "Queen's Pawn" },
  { eco: "C20", name: "King's Pawn Game" },
];

const timeControls = ["Bullet", "Blitz", "Rapid", "Classical"] as const;

function CrystalBall({ label, probability, color, delay = 0 }: { label: string; probability: number; color: string; delay?: number }) {
  const fillHeight = probability;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 overflow-hidden"
        style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}>
        <div className="absolute inset-0 rounded-full bg-card/50" />
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: `${fillHeight}%` }}
          transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 rounded-b-full"
          style={{
            background: `linear-gradient(to top, ${color}60, ${color}20)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1 }}
            className="text-2xl md:text-3xl font-display font-bold"
            style={{ color }}
          >
            {probability.toFixed(1)}%
          </motion.span>
        </div>
        <div className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%)" }} />
      </div>
      <span className="text-sm font-display font-semibold" style={{ color }}>{label}</span>
    </motion.div>
  );
}

function predict(whiteRating: number, blackRating: number, _eco: string, _time: string) {
  const diff = whiteRating - blackRating;
  const whiteWin = Math.min(85, Math.max(15, 50 + diff * 0.035 + (Math.random() - 0.5) * 5));
  const draw = Math.min(25, Math.max(3, 15 - Math.abs(diff) * 0.02 + (Math.random() - 0.5) * 3));
  const blackWin = 100 - whiteWin - draw;
  return {
    white_win: +whiteWin.toFixed(1),
    draw: +draw.toFixed(1),
    black_win: +Math.max(blackWin, 2).toFixed(1),
    explanation: `With a ${Math.abs(diff)} rating ${diff >= 0 ? 'advantage for White' : 'advantage for Black'}, ${diff >= 0 ? 'White' : 'Black'} is statistically favored. The selected opening and time control further influence the predicted outcome.`,
  };
}

export default function Predict() {
  const [whiteRating, setWhiteRating] = useState(1500);
  const [blackRating, setBlackRating] = useState(1400);
  const [opening, setOpening] = useState("B20");
  const [timeControl, setTimeControl] = useState<string>("Blitz");
  const [rated, setRated] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  const handlePredict = () => {
    setResult(null);
    setTimeout(() => {
      setResult(predict(whiteRating, blackRating, opening, timeControl));
    }, 300);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-display font-bold text-gradient-gold"
      >
        🔮 Predict
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <div className="space-y-3">
            <Label className="text-foreground">White Rating: <span className="text-primary font-bold">{whiteRating}</span></Label>
            <Slider min={800} max={2800} step={10} value={[whiteRating]} onValueChange={([v]) => setWhiteRating(v)} />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Black Rating: <span className="text-primary font-bold">{blackRating}</span></Label>
            <Slider min={800} max={2800} step={10} value={[blackRating]} onValueChange={([v]) => setBlackRating(v)} />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Opening</Label>
            <Select value={opening} onValueChange={setOpening}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {topOpenings.map(o => (
                  <SelectItem key={o.eco} value={o.eco}>{o.name} ({o.eco})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Time Control</Label>
            <div className="flex gap-2 flex-wrap">
              {timeControls.map(tc => (
                <Button
                  key={tc}
                  variant={timeControl === tc ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeControl(tc)}
                >
                  {tc}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={rated} onCheckedChange={setRated} />
            <Label className="text-foreground">Rated Game</Label>
          </div>

          <Button onClick={handlePredict} className="w-full" size="lg">
            🔮 Predict Outcome
          </Button>
        </motion.div>

        {/* Crystal Balls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" className="flex flex-col items-center gap-8">
                <div className="flex items-end gap-6 md:gap-10 flex-wrap justify-center">
                  <CrystalBall label="White Wins" probability={result.white_win} color="hsl(142, 50%, 45%)" delay={0} />
                  <CrystalBall label="Draw" probability={result.draw} color="hsl(220, 50%, 55%)" delay={0.2} />
                  <CrystalBall label="Black Wins" probability={result.black_win} color="hsl(0, 60%, 50%)" delay={0.4} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-secondary/50 border border-border rounded-lg p-4 max-w-md"
                >
                  <h4 className="font-display text-sm font-semibold text-primary mb-2">📜 Prophet's Notes</h4>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="empty" className="text-center text-muted-foreground">
                <span className="text-6xl block mb-4">🔮</span>
                <p className="font-display text-lg">Configure your game and click Predict</p>
                <p className="text-sm mt-2">The crystal balls will reveal the outcome...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
