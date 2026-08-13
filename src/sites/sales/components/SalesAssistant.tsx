"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "intro" | "sector" | "offer" | "market" | "companySize" | "personas" | "dealSize" | "team" | "diagnostic" | "calendly";

interface Answers {
  sector: string;
  offer: string;
  market: string;
  companySize: string;
  personas: string;
  dealSize: string;
  team: string;
}

const SECTORS = [
  { value: "it-esn", label: "IT / ESN / Consulting" },
  { value: "saas", label: "SaaS B2B" },
  { value: "cybersecurity", label: "Cybersécurité" },
  { value: "recruitment", label: "Recrutement / Staffing" },
  { value: "professional-services", label: "Services Professionnels" },
  { value: "other", label: "Autre" },
];

const COMPANY_SIZES = [
  { value: "1-50", label: "1-50 employés" },
  { value: "51-200", label: "51-200 employés" },
  { value: "201-1000", label: "201-1000 employés" },
  { value: "1000+", label: "1000+ employés" },
];

const DEAL_SIZES = [
  { value: "5k-15k", label: "5K - 15K €" },
  { value: "15k-50k", label: "15K - 50K €" },
  { value: "50k-150k", label: "50K - 150K €" },
  { value: "150k+", label: "150K+ €" },
];

const TEAM_SIZES = [
  { value: "no-sdr", label: "Pas de SDR / Prospection" },
  { value: "1-2", label: "1-2 commerciaux" },
  { value: "3-5", label: "3-5 commerciaux" },
  { value: "5+", label: "5+ commerciaux" },
];

function generateDiagnostic(answers: Answers) {
  const sectorLabel = SECTORS.find(s => s.value === answers.sector)?.label || answers.sector;

  const channels = [];
  if (answers.personas.toLowerCase().includes("cto") || answers.personas.toLowerCase().includes("tech")) {
    channels.push("LinkedIn (profils tech très actifs)");
  }
  channels.push("Cold Email (séquences personnalisées)");
  if (answers.dealSize === "50k-150k" || answers.dealSize === "150k+") {
    channels.push("Cold Calling (deals complexes)");
  }

  const personas = answers.personas.split(",").map(p => p.trim()).filter(Boolean);

  return {
    icp: `${sectorLabel} · ${COMPANY_SIZES.find(s => s.value === answers.companySize)?.label} · ${answers.market}`,
    channels,
    personas: personas.length > 0 ? personas : ["Décideurs identifiés selon votre secteur"],
    strategy: answers.team === "no-sdr"
      ? "Externalisation complète recommandée — nous gérons tout le cycle outbound"
      : "Renforcement de votre équipe existante avec notre infrastructure",
    fit: true,
  };
}

export default function SalesAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({
    sector: "",
    offer: "",
    market: "",
    companySize: "",
    personas: "",
    dealSize: "",
    team: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleExternalOpen(e: Event) {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.mode === "ai") {
        setIsOpen(true);
        setStep("intro");
      }
    }
    window.addEventListener("quorexis:open-assistant", handleExternalOpen);
    return () => window.removeEventListener("quorexis:open-assistant", handleExternalOpen);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  }

  function handleOpen() {
    setIsOpen(true);
    setStep("intro");
    setAnswers({ sector: "", offer: "", market: "", companySize: "", personas: "", dealSize: "", team: "" });
  }

  function nextStep(currentStep: Step, value?: string) {
    if (value !== undefined) {
      const stepKey = currentStep as keyof Answers;
      if (stepKey in answers) {
        setAnswers(prev => ({ ...prev, [stepKey]: value }));
      }
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const steps: Step[] = ["intro", "sector", "offer", "market", "companySize", "personas", "dealSize", "team", "diagnostic", "calendly"];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1]);
      }
    }, 600);
  }

  const diagnostic = step === "diagnostic" || step === "calendly" ? generateDiagnostic(answers) : null;

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 py-3 px-5 rounded-xl bg-foreground text-background shadow-lg hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          aria-label="Ask Quorexis AI"
        >
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold leading-tight">Ask Quorexis AI</span>
            <span className="text-[11px] text-background/60 leading-tight hidden sm:block">Diagnostic gratuit</span>
          </div>
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 z-[200] flex max-h-[min(640px,calc(100vh-3rem))] w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-background shadow-2xl sm:w-[420px] ${isClosing ? "chatbot-panel-exit" : ""}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Quorexis AI</p>
                  <p className="text-xs text-muted">Diagnostic outbound</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
              {/* Intro */}
              {step === "intro" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm">
                      Bonjour ! Je suis l&apos;assistant Quorexis. En 2 minutes, je vais analyser votre situation
                      et vous donner un premier diagnostic outbound personnalisé.
                    </p>
                  </div>
                  <button
                    onClick={() => nextStep("intro")}
                    className="w-full py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Commencer le diagnostic →
                  </button>
                </motion.div>
              )}

              {/* Sector */}
              {step === "sector" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Dans quel secteur êtes-vous ?</p>
                    <p className="text-xs text-muted">Cela m&apos;aide à adapter mes recommandations.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SECTORS.map(sector => (
                      <button
                        key={sector.value}
                        onClick={() => nextStep("sector", sector.value)}
                        className="p-3 text-left text-sm border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        {sector.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Offer */}
              {step === "offer" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Que vendez-vous ?</p>
                    <p className="text-xs text-muted">Décrivez brièvement votre offre principale.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Ex: Solution de cybersécurité cloud"
                    className="w-full px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:border-accent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        nextStep("offer", e.currentTarget.value);
                      }
                    }}
                  />
                  <p className="text-xs text-muted text-center">Appuyez sur Entrée pour continuer</p>
                </motion.div>
              )}

              {/* Market */}
              {step === "market" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Quel marché ciblez-vous ?</p>
                    <p className="text-xs text-muted">Géographie et type d&apos;entreprises.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Ex: PME tech en France"
                    className="w-full px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:border-accent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        nextStep("market", e.currentTarget.value);
                      }
                    }}
                  />
                </motion.div>
              )}

              {/* Company Size */}
              {step === "companySize" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Quelle taille d&apos;entreprise ciblez-vous ?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {COMPANY_SIZES.map(size => (
                      <button
                        key={size.value}
                        onClick={() => nextStep("companySize", size.value)}
                        className="p-3 text-left text-sm border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Personas */}
              {step === "personas" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Quels décideurs ciblez-vous ?</p>
                    <p className="text-xs text-muted">Titres ou fonctions (séparés par des virgules).</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Ex: CTO, DSI, Head of Engineering"
                    className="w-full px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:border-accent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        nextStep("personas", e.currentTarget.value);
                      }
                    }}
                  />
                </motion.div>
              )}

              {/* Deal Size */}
              {step === "dealSize" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Quel est votre panier moyen ?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {DEAL_SIZES.map(size => (
                      <button
                        key={size.value}
                        onClick={() => nextStep("dealSize", size.value)}
                        className="p-3 text-left text-sm border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Team */}
              {step === "team" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-foreground/[0.03] rounded-xl p-4">
                    <p className="text-sm font-medium mb-1">Quelle est votre équipe commerciale actuelle ?</p>
                  </div>
                  <div className="space-y-2">
                    {TEAM_SIZES.map(size => (
                      <button
                        key={size.value}
                        onClick={() => nextStep("team", size.value)}
                        className="w-full p-3 text-left text-sm border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Diagnostic */}
              {step === "diagnostic" && diagnostic && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="text-sm font-semibold text-accent">Diagnostic terminé</p>
                    </div>
                    <p className="text-sm text-muted">
                      Voici mes recommandations basées sur votre profil.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-2">ICP recommandé</p>
                      <p className="text-sm font-medium">{diagnostic.icp}</p>
                    </div>

                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-2">Canaux à privilégier</p>
                      <div className="space-y-1">
                        {diagnostic.channels.map((channel, i) => (
                          <p key={i} className="text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {channel}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-2">Personas cibles</p>
                      <div className="flex flex-wrap gap-2">
                        {diagnostic.personas.map((persona, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-foreground/5 rounded-full">{persona}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-2">Stratégie recommandée</p>
                      <p className="text-sm">{diagnostic.strategy}</p>
                    </div>
                  </div>

                  <div className="bg-foreground text-background rounded-xl p-4">
                    <p className="text-sm mb-3">
                      Votre cas semble parfaitement adapté à une campagne Quorexis.
                      Souhaitez-vous réserver 30 minutes avec notre équipe pour approfondir ?
                    </p>
                    <button
                      onClick={() => setStep("calendly")}
                      className="w-full py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      Réserver un appel stratégique →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Calendly / Contact fallback */}
              {step === "calendly" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                    <p className="text-sm font-medium">Réservez votre appel stratégique</p>
                    <p className="text-xs text-muted mt-1">30 minutes pour discuter de votre stratégie outbound.</p>
                  </div>

                  <div className="p-6 border border-border rounded-xl text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium mb-2">Calendrier bientôt disponible</p>
                    <p className="text-xs text-muted mb-4">
                      En attendant, laissez-nous vos coordonnées et nous vous recontacterons sous 24h.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "#contact";
                        setIsOpen(false);
                      }}
                      className="w-full py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      Accéder au formulaire →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-muted">Quorexis AI réfléchit...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Progress */}
            {step !== "intro" && step !== "diagnostic" && step !== "calendly" && (
              <div className="px-5 py-3 border-t border-border">
                <div className="flex items-center gap-2">
                  {["sector", "offer", "market", "companySize", "personas", "dealSize", "team"].map((s, i) => (
                    <div
                      key={s}
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        ["sector", "offer", "market", "companySize", "personas", "dealSize", "team"].indexOf(step) >= i
                          ? "bg-accent"
                          : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted text-center mt-2">
                  Question {["sector", "offer", "market", "companySize", "personas", "dealSize", "team"].indexOf(step) + 1} sur 7
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
