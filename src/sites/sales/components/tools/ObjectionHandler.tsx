"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Objection = {
  id: string;
  category: string;
  objection: string;
  responses: string[];
  tips: string;
};

const OBJECTIONS: Objection[] = [
  {
    id: "no-time",
    category: "Timing",
    objection: "Je n'ai pas le temps",
    responses: [
      "Je comprends, c'est justement parce que vous êtes occupé que je vous contacte. En 15 minutes, je peux vous montrer comment nous faisons gagner 10h/semaine à nos clients. Quel jour vous conviendrait ?",
      "Pas de souci. Est-ce que je peux vous envoyer un résumé de 2 minutes par email ? Vous pourrez le lire quand vous aurez un moment.",
      "Quand serait le meilleur moment pour vous ? Je peux m'adapter à votre agenda.",
    ],
    tips: "Ne jamais insister. Proposer une alternative moins engageante.",
  },
  {
    id: "no-budget",
    category: "Budget",
    objection: "On n'a pas le budget",
    responses: [
      "Je comprends. Justement, nos clients récupèrent en moyenne 3x leur investissement en 6 mois. Quel serait le coût de ne rien changer ?",
      "C'est normal de surveiller les dépenses. Si je pouvais vous montrer un ROI de 300%, est-ce que ça mériterait 15 minutes de discussion ?",
      "Quand démarrez-vous votre prochain cycle budgétaire ? Je peux vous recontacter à ce moment.",
    ],
    tips: "Reframer le coût en investissement. Quantifier le coût de l'inaction.",
  },
  {
    id: "not-interested",
    category: "Intérêt",
    objection: "Ça ne m'intéresse pas",
    responses: [
      "Je comprends. Juste par curiosité, comment gérez-vous actuellement [problème spécifique] ?",
      "Pas de problème. Est-ce parce que vous avez déjà une solution en place, ou parce que ce n'est pas une priorité actuellement ?",
      "D'accord. Si la situation changeait, qu'est-ce qui devrait se passer pour que ça devienne pertinent ?",
    ],
    tips: "Chercher à comprendre le vrai blocage derrière le 'non'.",
  },
  {
    id: "already-have",
    category: "Concurrence",
    objection: "On a déjà un fournisseur",
    responses: [
      "Super, c'est que le sujet est important pour vous. Comment évaluez-vous leur performance ? Nos clients comparent souvent avant de décider.",
      "Parfait. On ne cherche pas à remplacer, mais à compléter. Seriez-vous ouvert à voir ce qu'on fait différemment ?",
      "Je comprends. Sur une échelle de 1 à 10, quelle est votre satisfaction ? Si c'est moins de 8, ça vaut peut-être le coup d'en parler.",
    ],
    tips: "Ne pas critiquer le concurrent. Chercher les points faibles subtilement.",
  },
  {
    id: "send-email",
    category: "Évitement",
    objection: "Envoyez-moi un email",
    responses: [
      "Bien sûr. Pour être sûr de vous envoyer quelque chose de pertinent, pouvez-vous me dire quel est votre principal défi actuellement en [domaine] ?",
      "Je peux faire ça. Mais pour éviter que ça finisse dans les spams, que diriez-vous de 5 minutes maintenant pour que je comprenne votre contexte ?",
      "D'accord. Je vous envoie ça. Quel serait le meilleur moment pour un suivi rapide de 10 minutes ?",
    ],
    tips: "Toujours qualifier avant d'envoyer. Obtenir un engagement de suivi.",
  },
  {
    id: "call-back",
    category: "Timing",
    objection: "Rappelez-moi plus tard",
    responses: [
      "Avec plaisir. Quand exactement ? Mardi 10h ou jeudi 14h, qu'est-ce qui fonctionne le mieux ?",
      "OK. Juste pour ne pas vous faire perdre de temps au prochain appel : est-ce que [problème] est effectivement un sujet pour vous ?",
      "Bien sûr. Pour être efficace lors du prochain échange, pouvez-vous me dire en 30 secondes votre situation actuelle sur [sujet] ?",
    ],
    tips: "Toujours fixer une date précise. Qualifier maintenant.",
  },
  {
    id: "too-expensive",
    category: "Budget",
    objection: "C'est trop cher",
    responses: [
      "Par rapport à quoi exactement ? Je veux être sûr de comparer des pommes avec des pommes.",
      "Je comprends. Si on pouvait prouver un ROI de X en Y mois, est-ce que ça changerait la perspective ?",
      "Qu'est-ce qui serait un prix acceptable pour vous ? Peut-être qu'on peut trouver une formule adaptée.",
    ],
    tips: "Comprendre l'ancrage de prix. Recentrer sur la valeur.",
  },
  {
    id: "need-approval",
    category: "Décision",
    objection: "Je dois en parler à mon responsable",
    responses: [
      "Bien sûr. Que devrait contenir le dossier pour qu'il soit convaincu ?",
      "Je comprends. Est-ce que ça vous aiderait si je préparais une présentation pour votre responsable ?",
      "OK. Serait-il possible de l'inclure dans notre prochain échange pour qu'il puisse poser ses questions directement ?",
    ],
    tips: "Faciliter le travail de conviction. Proposer d'être présent.",
  },
];

const CATEGORIES = [...new Set(OBJECTIONS.map((o) => o.category))];

export function ObjectionHandler() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredObjections = selectedCategory
    ? OBJECTIONS.filter((o) => o.category === selectedCategory)
    : OBJECTIONS;

  const copyResponse = (response: string, id: string) => {
    navigator.clipboard.writeText(response);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Objection Handler</h3>
      <p className="text-sm text-muted mb-6">
        Réponses aux objections courantes en prospection B2B.
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            !selectedCategory ? "bg-accent text-white" : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          Toutes
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedCategory === cat ? "bg-accent text-white" : "bg-foreground/5 hover:bg-foreground/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Objections list */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredObjections.map((obj) => (
            <motion.div
              key={obj.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === obj.id ? null : obj.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-foreground/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-xs bg-foreground/10 rounded">{obj.category}</span>
                  <span className="font-medium">&ldquo;{obj.objection}&rdquo;</span>
                </div>
                <svg
                  className={`w-5 h-5 text-muted transition-transform ${expandedId === obj.id ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {expandedId === obj.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-4 space-y-3">
                      {obj.responses.map((response, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-foreground/[0.02] border border-border relative group"
                        >
                          <p className="text-sm pr-16">{response}</p>
                          <button
                            type="button"
                            onClick={() => copyResponse(response, `${obj.id}-${i}`)}
                            className="absolute top-2 right-2 px-2 py-1 text-xs bg-accent text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === `${obj.id}-${i}` ? "Copié !" : "Copier"}
                          </button>
                        </div>
                      ))}
                      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                        <p className="text-xs">
                          <span className="font-semibold">Conseil :</span> {obj.tips}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
