"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentGames = [
  { id: 1, white: "MagnusC", black: "HikaruN", result: "1-0", opening: "Ruy Lopez", date: "2024-05-20" },
  { id: 2, white: "FabianoC", black: "IanN", result: "1/2-1/2", opening: "Sicilian Defense", date: "2024-05-19" },
  { id: 3, white: "AlirezaF", black: "DingL", result: "0-1", opening: "Italian Game", date: "2024-05-19" },
  { id: 4, white: "AnishG", black: "WesleyS", result: "1/2-1/2", opening: "English Opening", date: "2024-05-18" },
  { id: 5, white: "LevonA", black: "RichardR", result: "1-0", opening: "French Defense", date: "2024-05-18" },
];

export function RecentGames() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-display text-sm font-semibold text-foreground">Recent High-Level Games</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Players</TableHead>
            <TableHead className="text-xs">Result</TableHead>
            <TableHead className="text-xs hidden md:table-cell">Opening</TableHead>
            <TableHead className="text-xs text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentGames.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{game.white}</span>
                  <span className="text-xs text-muted-foreground">vs {game.black}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={game.result === "1-0" ? "default" : game.result === "0-1" ? "destructive" : "secondary"} className="text-[10px] px-1.5 py-0">
                  {game.result}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                {game.opening}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground text-right">
                {game.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}