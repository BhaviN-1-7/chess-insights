import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Openings from "@/pages/Openings";
import TimeControl from "@/pages/TimeControl";
import GameLength from "@/pages/GameLength";
import RatingImpact from "@/pages/RatingImpact";
import AdvancedAnalytics from "@/pages/AdvancedAnalytics";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/openings" element={<Openings />} />
            <Route path="/time-control" element={<TimeControl />} />
            <Route path="/game-length" element={<GameLength />} />
            <Route path="/rating-impact" element={<RatingImpact />} />
            <Route path="/advanced" element={<AdvancedAnalytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;