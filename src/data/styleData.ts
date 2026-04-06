/**
 * This file contains the processed clustering data for player styles and openings.
 */

export const styleClusterSummary = {
  clusters: [
    { id: 0, name: "Beginner", size: 133, percentage: 19.3, avg_rating: 1322, win_rate: 26.1, draw_rate: 2.4, avg_turns: 45, resign_rate: 66.2 },
    { id: 1, name: "Balanced Player", size: 155, percentage: 22.5, avg_rating: 1352, win_rate: 36.3, draw_rate: 3.9, avg_turns: 61, resign_rate: 34.0 },
    { id: 2, name: "Defensive Specialist", size: 94, percentage: 13.7, avg_rating: 1781, win_rate: 47.3, draw_rate: 16.2, avg_turns: 75, resign_rate: 50.6 },
    { id: 3, name: "Aggressive Expert", size: 306, percentage: 44.5, avg_rating: 1769, win_rate: 60.6, draw_rate: 3.2, avg_turns: 62, resign_rate: 62.1 },
  ]
};

export const openingClusterProfiles = {
  clusters: [
    { id: 0, name: "Scotch Game Players", size: 232, avg_rating: 1513, win_rate: 44.1, top: [{n: "Scotch", p: 11.2}, {n: "Italian", p: 11.0}, {n: "Queen's Gambit", p: 10.5}] },
    { id: 1, name: "Queen's Gambit Players", size: 119, avg_rating: 1755, win_rate: 51.4, top: [{n: "Queen's Gambit", p: 29.9}, {n: "French", p: 7.8}, {n: "Sicilian", p: 7.7}] },
    { id: 2, name: "Unusual Opening Players", size: 150, avg_rating: 1421, win_rate: 38.7, top: [{n: "Unusual", p: 19.3}, {n: "Queen's Gambit", p: 9.2}, {n: "Scandinavian", p: 8.7}] },
    { id: 3, name: "Sicilian Specialists", size: 187, avg_rating: 1716, win_rate: 53.0, top: [{n: "Sicilian", p: 28.9}, {n: "Queen's Gambit", p: 9.3}, {n: "English", p: 7.7}] },
  ]
};

export const elbowData = {
  k_values: [2, 3, 4, 5, 6, 7, 8],
  inertias: [2629, 2231, 1966, 1762, 1620, 1495, 1412],
  silhouette_scores: [0.219, 0.214, 0.203, 0.186, 0.183, 0.183, 0.184]
};

// Sample of PCA coordinates for the scatter plot
export const pcaData = [
  { x: -0.27, y: 2.76, cluster: 2, name: "Unusual" },
  { x: 0.05, y: -0.34, cluster: 3, name: "Sicilian" },
  { x: -1.51, y: 0.70, cluster: 3, name: "Sicilian" },
  { x: -1.85, y: -0.00, cluster: 1, name: "Queen's Gambit" },
  { x: 0.31, y: -0.11, cluster: 0, name: "Scotch" },
  { x: 1.73, y: -0.57, cluster: 0, name: "Scotch" },
  { x: -0.93, y: -1.80, cluster: 3, name: "Sicilian" },
  { x: 0.28, y: 2.05, cluster: 2, name: "Unusual" },
  { x: -0.72, y: -0.21, cluster: 1, name: "Queen's Gambit" },
  { x: 2.60, y: 0.84, cluster: 0, name: "Scotch" },
  { x: -1.23, y: 2.04, cluster: 2, name: "Unusual" },
  { x: -1.75, y: -0.45, cluster: 1, name: "Queen's Gambit" },
  { x: 0.89, y: 2.13, cluster: 2, name: "Unusual" },
  { x: -0.98, y: -1.45, cluster: 3, name: "Sicilian" },
  { x: 2.33, y: -0.25, cluster: 0, name: "Scotch" },
];