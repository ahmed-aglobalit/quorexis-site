"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ChannelType = "email" | "linkedin" | "call" | "sms";

type Step = {
  id: string;
  day: number;
  channel: ChannelType;
  action: string;
};

const CHANNEL_CONFIG: Record<ChannelType, { label: string; color: string; icon: string }> = {
  email: { label: "Email", color: "bg-blue-500", icon: "✉" },
  linkedin: { label: "LinkedIn", color: "bg-sky-600", icon: "in" },
  call: { label: "Appel", color: "bg-green-500", icon: "☎" },
  sms: { label: "SMS", color: "bg-purple-500", icon: "💬" },
};

const DEFAULT_ACTIONS: Record<ChannelType, string[]> = {
  email: ["Email initial", "Relance valeur", "Étude de cas", "Dernier email"],
  linkedin: ["Connexion", "Message intro", "Partage contenu", "Relance"],
  call: ["Appel découverte", "Suivi", "Qualification"],
  sms: ["Rappel RDV", "Suivi rapide"],
};

const TEMPLATES = [
  {
    name: "Standard 10 jours",
    steps: [
      { day: 1, channel: "email" as ChannelType, action: "Email initial" },
      { day: 2, channel: "linkedin" as ChannelType, action: "Connexion" },
      { day: 4, channel: "email" as ChannelType, action: "Relance valeur" },
      { day: 6, channel: "linkedin" as ChannelType, action: "Message intro" },
      { day: 8, channel: "call" as ChannelType, action: "Appel découverte" },
      { day: 10, channel: "email" as ChannelType, action: "Dernier email" },
    ],
  },
  {
    name: "Agressif 7 jours",
    steps: [
      { day: 1, channel: "email" as ChannelType, action: "Email initial" },
      { day: 1, channel: "linkedin" as ChannelType, action: "Connexion" },
      { day: 3, channel: "call" as ChannelType, action: "Appel découverte" },
      { day: 4, channel: "email" as ChannelType, action: "Relance valeur" },
      { day: 5, channel: "linkedin" as ChannelType, action: "Message intro" },
      { day: 7, channel: "email" as ChannelType, action: "Dernier email" },
    ],
  },
  {
    name: "Soft 14 jours",
    steps: [
      { day: 1, channel: "email" as ChannelType, action: "Email initial" },
      { day: 4, channel: "linkedin" as ChannelType, action: "Connexion" },
      { day: 7, channel: "email" as ChannelType, action: "Étude de cas" },
      { day: 10, channel: "linkedin" as ChannelType, action: "Partage contenu" },
      { day: 14, channel: "email" as ChannelType, action: "Dernier email" },
    ],
  },
];

let stepId = 0;

export function SequencePlanner() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>("email");

  const addStep = () => {
    const lastDay = steps.length > 0 ? Math.max(...steps.map((s) => s.day)) : 0;
    const newStep: Step = {
      id: `step-${++stepId}`,
      day: lastDay + 2,
      channel: selectedChannel,
      action: DEFAULT_ACTIONS[selectedChannel][0],
    };
    setSteps([...steps, newStep].sort((a, b) => a.day - b.day));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const updateStep = (id: string, updates: Partial<Step>) => {
    setSteps(
      steps
        .map((s) => (s.id === id ? { ...s, ...updates } : s))
        .sort((a, b) => a.day - b.day)
    );
  };

  const loadTemplate = (template: typeof TEMPLATES[0]) => {
    setSteps(
      template.steps.map((s) => ({
        ...s,
        id: `step-${++stepId}`,
      }))
    );
  };

  const maxDay = steps.length > 0 ? Math.max(...steps.map((s) => s.day)) : 14;
  const timeline = Array.from({ length: maxDay + 2 }, (_, i) => i + 1);

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Sequence Planner</h3>
      <p className="text-sm text-muted mb-6">Construisez votre cadence de prospection multicanale.</p>

      {/* Templates */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Templates</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => loadTemplate(t)}
              className="px-3 py-1.5 text-sm bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Add step */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-foreground/[0.02] border border-border">
        <div className="flex gap-2">
          {(Object.keys(CHANNEL_CONFIG) as ChannelType[]).map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setSelectedChannel(ch)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                selectedChannel === ch
                  ? `${CHANNEL_CONFIG[ch].color} text-white`
                  : "bg-foreground/10 hover:bg-foreground/20"
              }`}
            >
              {CHANNEL_CONFIG[ch].icon}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
        >
          + Ajouter {CHANNEL_CONFIG[selectedChannel].label}
        </button>
      </div>

      {/* Timeline */}
      {steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto pb-4"
        >
          <div className="min-w-[600px]">
            {/* Days header */}
            <div className="flex mb-2">
              {timeline.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center text-xs text-muted min-w-[50px]"
                >
                  J{day}
                </div>
              ))}
            </div>

            {/* Timeline line */}
            <div className="relative h-2 bg-foreground/10 rounded-full mb-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`absolute w-4 h-4 rounded-full -top-1 ${CHANNEL_CONFIG[step.channel].color}`}
                  style={{ left: `${((step.day - 1) / maxDay) * 100}%` }}
                />
              ))}
            </div>

            {/* Steps list */}
            <div className="space-y-2">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-foreground/[0.02] border border-border"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white ${CHANNEL_CONFIG[step.channel].color}`}
                  >
                    {CHANNEL_CONFIG[step.channel].icon}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">Jour</span>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={step.day}
                        onChange={(e) => updateStep(step.id, { day: Number(e.target.value) })}
                        className="w-14 px-2 py-1 text-sm border border-border rounded bg-background"
                      />
                    </div>
                    <select
                      value={step.action}
                      onChange={(e) => updateStep(step.id, { action: e.target.value })}
                      className="flex-1 px-2 py-1 text-sm border border-border rounded bg-background"
                    >
                      {DEFAULT_ACTIONS[step.channel].map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="w-8 h-8 flex items-center justify-center text-muted hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary */}
      {steps.length > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm font-semibold mb-2">Résumé</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{steps.length}</p>
              <p className="text-xs text-muted">touchpoints</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{maxDay}</p>
              <p className="text-xs text-muted">jours</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{steps.filter((s) => s.channel === "email").length}</p>
              <p className="text-xs text-muted">emails</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{new Set(steps.map((s) => s.channel)).size}</p>
              <p className="text-xs text-muted">canaux</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
