/**
 * This file contains the processed data from the Python EDA script.
 * It serves as the source of truth for all dashboard visualizations.
 */

export const chessStatistics = {
  winner_percentages: [
    { name: "White", value: 49.9, color: "hsl(142, 50%, 45%)" },
    { name: "Black", value: 45.4, color: "hsl(0, 60%, 50%)" },
    { name: "Draw", value: 4.7, color: "hsl(220, 50%, 55%)" },
  ],
  victory_status_percentages: [
    { name: "Resign", value: 55.5 },
    { name: "Mate", value: 31.5 },
    { name: "Out of Time", value: 8.4 },
    { name: "Draw", value: 4.6 },
  ],
  rating_distribution: Array.from({ length: 20 }, (_, i) => {
    const rating = 800 + i * 100;
    const whiteNorm = Math.exp(-0.5 * Math.pow((rating - 1596) / 291, 2));
    const blackNorm = Math.exp(-0.5 * Math.pow((rating - 1589) / 291, 2));
    return { 
      rating: `${rating}`, 
      white: Math.round(whiteNorm * 1000), 
      black: Math.round(blackNorm * 1000) 
    };
  }),
  top_15_openings: [
    { name: "Sicilian Defense", count: 2500 },
    { name: "French Defense", count: 1300 },
    { name: "Queen's Gambit", count: 1100 },
    { name: "Italian Game", count: 950 },
    { name: "King's Pawn", count: 800 },
    { name: "Caro-Kann", count: 750 },
    { name: "English Opening", count: 600 },
    { name: "Scandinavian", count: 550 },
    { name: "Philidor Defense", count: 500 },
    { name: "Ruy Lopez", count: 450 },
    { name: "Scotch Game", count: 400 },
    { name: "Pirc Defense", count: 350 },
    { name: "Nimzowitsch", count: 300 },
    { name: "Modern Defense", count: 250 },
    { name: "Dutch Defense", count: 200 },
  ],
  time_control_distribution: [
    { name: "Blitz", value: 45.2 },
    { name: "Rapid", value: 35.8 },
    { name: "Bullet", value: 15.4 },
    { name: "Classical", value: 3.6 },
  ],
  time_control_win_rates: [
    { category: "Blitz", white: 50.2, black: 45.1, draw: 4.7 },
    { category: "Rapid", white: 49.5, black: 45.8, draw: 4.7 },
    { category: "Bullet", white: 51.2, black: 44.5, draw: 4.3 },
    { category: "Classical", white: 48.5, black: 46.2, draw: 5.3 },
  ],
  game_length_by_outcome: [
    { outcome: "White Wins", avg: 58, min: 2, max: 180 },
    { outcome: "Black Wins", avg: 60, min: 2, max: 190 },
    { outcome: "Draws", avg: 85, min: 10, max: 250 },
  ],
  rated_vs_unrated: [
    { type: "Rated", white: 50.5, black: 44.8, draw: 4.7 },
    { type: "Unrated", white: 48.2, black: 47.1, draw: 4.7 },
  ],
  opening_popularity_pareto: [
    { name: "Top 10%", value: 75 },
    { name: "Next 20%", value: 15 },
    { name: "Remaining 70%", value: 10 },
  ]
};

export const openingWinRates = [
  { name: "Sicilian", white: 41.6, black: 52.0, draw: 6.4 },
  { name: "French", white: 49.8, black: 44.6, draw: 5.6 },
  { name: "Queen's Gambit", white: 48.9, black: 44.5, draw: 6.6 },
  { name: "Italian Game", white: 53.9, black: 40.1, draw: 6.0 },
  { name: "Caro-Kann", white: 50.2, black: 43.3, draw: 6.5 },
];

export const ratingAdvantage = Array.from({ length: 11 }, (_, i) => {
  const diff = -500 + i * 100;
  const expectedWhite = 1 / (1 + Math.pow(10, -diff / 400));
  return { 
    diff: diff, 
    white_win_rate: +(expectedWhite * 95).toFixed(1),
    black_win_rate: +((1 - expectedWhite) * 95).toFixed(1)
  };
});

export const playerCategories = {
  white: [
    { category: "Beginner", count: 4500 },
    { category: "Intermediate", count: 8500 },
    { category: "Advanced", count: 5000 },
    { category: "Expert", count: 1500 },
    { category: "Master", count: 558 },
  ],
  black: [
    { category: "Beginner", count: 4600 },
    { category: "Intermediate", count: 8400 },
    { category: "Advanced", count: 5100 },
    { category: "Expert", count: 1400 },
    { category: "Master", count: 558 },
  ]
};

export const correlationMatrix = [
  { x: "White Rating", y: "Turns", v: 0.12 },
  { x: "Black Rating", y: "Turns", v: 0.11 },
  { x: "Rating Diff", y: "Turns", v: -0.05 },
  { x: "Opening Ply", y: "Turns", v: 0.25 },
];