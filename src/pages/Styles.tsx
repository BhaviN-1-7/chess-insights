"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyleOverview } from "@/components/styles/StyleOverview";
import { OpeningPreferences } from "@/components/styles/OpeningPreferences";
import { TechnicalValidation } from "@/components/styles/TechnicalValidation";

export default function Styles() {
  const [activeTab, setActiveTab] = useState("style");

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-2xl md:text-3xl font-display font-bold text-gradient-gold"
      >
        🌀 Player Style Analytics
      </motion.h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary/50 w-full justify-start overflow-x-auto">
          <TabsTrigger value="style">1. Style Overview</TabsTrigger>
          <TabsTrigger value="opening">2. Opening Preferences</TabsTrigger>
          <TabsTrigger value="technical">3. Technical Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="mt-0">
          <StyleOverview />
        </TabsContent>

        <TabsContent value="opening" className="mt-0">
          <OpeningPreferences />
        </TabsContent>

        <TabsContent value="technical" className="mt-0">
          <TechnicalValidation />
        </TabsContent>
      </Tabs>
    </div>
  );
}