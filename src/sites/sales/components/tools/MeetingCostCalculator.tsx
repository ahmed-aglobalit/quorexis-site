"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export function MeetingCostCalculator() {
  const [salesReps, setSalesReps] = useState(3);
  const [avgSalary, setAvgSalary] = useState(50000);
  const [meetingsPerWeek, setMeetingsPerWeek] = useState(10);
  const [noShowRate, setNoShowRate] = useState(25);
  const [avgMeetingDuration, setAvgMeetingDuration] = useState(45);
  const [prepTime, setPrepTime] = useState(15);

  const result = useMemo(() => {
    const hourlyRate = avgSalary / (52 * 40);
    const totalMeetingTime = (avgMeetingDuration + prepTime) / 60;
    const costPerMeeting = hourlyRate * totalMeetingTime;

    const weeklyMeetings = meetingsPerWeek * salesReps;
    const noShowsPerWeek = Math.round(weeklyMeetings * (noShowRate / 100));
    const weeklyCostNoShows = noShowsPerWeek * costPerMeeting;
    const annualCostNoShows = weeklyCostNoShows * 52;

    const hoursLostPerWeek = noShowsPerWeek * totalMeetingTime;
    const hoursLostPerYear = hoursLostPerWeek * 52;

    return {
      costPerMeeting: Math.round(costPerMeeting),
      noShowsPerWeek,
      weeklyCostNoShows: Math.round(weeklyCostNoShows),
      annualCostNoShows: Math.round(annualCostNoShows),
      hoursLostPerWeek: Math.round(hoursLostPerWeek * 10) / 10,
      hoursLostPerYear: Math.round(hoursLostPerYear),
    };
  }, [salesReps, avgSalary, meetingsPerWeek, noShowRate, avgMeetingDuration, prepTime]);

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Meeting Cost Calculator</h3>
      <p className="text-sm text-muted mb-6">Calculez le coût réel des rendez-vous manqués (no-shows).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Nombre de commerciaux</label>
              <span className="text-sm font-semibold">{salesReps}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={salesReps}
              onChange={(e) => setSalesReps(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Salaire annuel moyen</label>
              <span className="text-sm font-semibold">{avgSalary.toLocaleString()} €</span>
            </div>
            <input
              type="range"
              min={30000}
              max={100000}
              step={5000}
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">RDV par semaine (par commercial)</label>
              <span className="text-sm font-semibold">{meetingsPerWeek}</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={meetingsPerWeek}
              onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Taux de no-show</label>
              <span className="text-sm font-semibold">{noShowRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={noShowRate}
              onChange={(e) => setNoShowRate(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Durée moyenne RDV</label>
              <span className="text-sm font-semibold">{avgMeetingDuration} min</span>
            </div>
            <input
              type="range"
              min={15}
              max={90}
              step={15}
              value={avgMeetingDuration}
              onChange={(e) => setAvgMeetingDuration(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Temps de préparation</label>
              <span className="text-sm font-semibold">{prepTime} min</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={prepTime}
              onChange={(e) => setPrepTime(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <p className="text-sm text-muted mb-1">Coût par rendez-vous</p>
            <p className="text-3xl font-bold">{result.costPerMeeting} €</p>
          </div>

          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <p className="text-sm text-muted mb-1">No-shows par semaine</p>
            <p className="text-3xl font-bold text-red-500">{result.noShowsPerWeek}</p>
          </div>

          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-muted mb-1">Coût hebdomadaire des no-shows</p>
            <p className="text-3xl font-bold text-red-500">{result.weeklyCostNoShows.toLocaleString()} €</p>
          </div>

          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-muted mb-1">Coût annuel des no-shows</p>
            <p className="text-4xl font-bold text-red-500">{result.annualCostNoShows.toLocaleString()} €</p>
            <p className="text-sm text-muted mt-2">
              = {result.hoursLostPerYear} heures perdues / an
            </p>
          </div>
        </motion.div>
      </div>

      <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-sm">
          <span className="font-semibold">Conseil :</span> Réduire le taux de no-show de 25% à 10% pourrait vous faire économiser{" "}
          <span className="font-semibold text-accent">
            {Math.round(result.annualCostNoShows * 0.6).toLocaleString()} € / an
          </span>
          . Des rappels SMS et une meilleure qualification en amont peuvent y contribuer.
        </p>
      </div>
    </div>
  );
}
