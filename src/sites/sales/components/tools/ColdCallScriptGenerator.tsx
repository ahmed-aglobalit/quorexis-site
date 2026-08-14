"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CONTEXTS = [
  { value: "first-call", label: "Premier appel" },
  { value: "follow-up", label: "Suivi email" },
  { value: "referral", label: "Recommandation" },
  { value: "event", label: "Post-événement" },
];

const OBJECTIVES = [
  { value: "meeting", label: "Obtenir un RDV" },
  { value: "qualify", label: "Qualifier le besoin" },
  { value: "demo", label: "Proposer une démo" },
  { value: "decision-maker", label: "Identifier le décideur" },
];

const SCRIPTS: Record<string, Record<string, { opening: string; pitch: string; transition: string; close: string }>> = {
  "first-call": {
    meeting: {
      opening: "Bonjour {prénom}, c'est [Votre nom] de [Entreprise]. Je vous appelle suite à une recherche sur les entreprises {industrie} en croissance. Avez-vous 2 minutes ?",
      pitch: "En fait, on accompagne des entreprises comme {entreprise} à structurer leur acquisition client. Nos clients génèrent en moyenne 15 RDV qualifiés par mois.",
      transition: "Je ne sais pas si c'est pertinent pour vous, mais est-ce que la génération de leads est un sujet actuellement ?",
      close: "Ce que je vous propose : un échange de 20 minutes pour voir si on peut vous aider. Êtes-vous disponible mardi ou mercredi prochain ?",
    },
    qualify: {
      opening: "Bonjour {prénom}, [Votre nom] de [Entreprise]. Je fais une étude sur les pratiques de prospection dans le secteur {industrie}. Accepteriez-vous de répondre à 3 questions rapides ?",
      pitch: "Merci ! Première question : comment générez-vous actuellement vos nouveaux clients ? [Écouter] Et quel est votre plus grand défi dans ce domaine ?",
      transition: "C'est intéressant. On entend ça souvent. La dernière question : si vous pouviez améliorer une chose dans votre prospection, ce serait quoi ?",
      close: "Merci pour ces insights. Si ça vous intéresse, je peux vous partager les résultats de notre étude et quelques best practices. Je vous envoie ça par email ?",
    },
    demo: {
      opening: "Bonjour {prénom}, c'est [Votre nom]. J'appelle parce que j'ai vu que {entreprise} se développe rapidement. Félicitations ! Avez-vous une minute ?",
      pitch: "En fait, on a développé un outil qui aide les entreprises comme la vôtre à automatiser leur prospection tout en gardant une approche personnalisée.",
      transition: "Je ne sais pas si vous avez déjà une solution en place, mais on a des résultats assez impressionnants avec des entreprises similaires.",
      close: "Ce que je propose : une démo de 15 minutes pour vous montrer concrètement comment ça fonctionne. Aucun engagement. Ça vous dit ?",
    },
    "decision-maker": {
      opening: "Bonjour, c'est [Votre nom] de [Entreprise]. Je cherche à joindre la personne en charge du développement commercial chez {entreprise}. Pourriez-vous m'aider ?",
      pitch: "En fait, on travaille avec plusieurs entreprises {industrie} sur leur stratégie d'acquisition client, et je voulais proposer un échange.",
      transition: "Qui serait la bonne personne à contacter pour ce type de sujet ?",
      close: "Parfait. Pourriez-vous me donner son nom et son contact direct ? Ou préférez-vous lui transmettre mon message ?",
    },
  },
  "follow-up": {
    meeting: {
      opening: "Bonjour {prénom}, c'est [Votre nom] de [Entreprise]. Je vous ai envoyé un email la semaine dernière concernant [sujet]. Avez-vous eu l'occasion de le consulter ?",
      pitch: "[Si oui] Super ! Qu'en avez-vous pensé ? [Si non] Pas de souci. En résumé, on aide les entreprises comme {entreprise} à générer plus de RDV qualifiés.",
      transition: "Je voulais voir si c'est un sujet qui vous parle en ce moment.",
      close: "Est-ce qu'un rapide échange de 15 minutes vous conviendrait pour en discuter ?",
    },
    qualify: {
      opening: "Bonjour {prénom}, [Votre nom]. Je fais suite à mon email de mardi. Je me demandais si vous aviez des questions ?",
      pitch: "Mon email parlait de [résumé]. L'idée était de voir si on pourrait vous aider sur [problème spécifique].",
      transition: "Est-ce que c'est quelque chose que vous rencontrez actuellement ?",
      close: "Si oui, on pourrait échanger rapidement pour que je comprenne mieux votre situation. Ça vous dit ?",
    },
    demo: {
      opening: "Bonjour {prénom}, c'est [Votre nom]. Je reviens vers vous suite à mon email avec la vidéo de démo. L'avez-vous regardée ?",
      pitch: "[Si oui] Qu'avez-vous pensé ? [Si non] Pas de souci, elle fait 3 minutes. Vous voulez que je vous la résume ?",
      transition: "En gros, c'est un outil qui permet de [bénéfice clé]. Nos clients voient des résultats en [délai].",
      close: "Est-ce qu'une démo personnalisée en live vous intéresserait ?",
    },
    "decision-maker": {
      opening: "Bonjour, c'est [Votre nom]. Je rappelle suite à un email envoyé à {prénom}. Il/elle m'a suggéré de vous contacter directement.",
      pitch: "On travaille avec des entreprises {industrie} sur l'optimisation de leur prospection B2B.",
      transition: "Est-ce que c'est un sujet sur lequel vous avez de la visibilité ?",
      close: "Si oui, je serais ravi d'échanger 15 minutes avec vous. Quel créneau vous conviendrait ?",
    },
  },
  referral: {
    meeting: {
      opening: "Bonjour {prénom}, c'est [Votre nom]. {Référent} m'a suggéré de vous appeler. Il/elle m'a dit que vous pourriez être intéressé par ce qu'on fait.",
      pitch: "En fait, on a travaillé avec {Référent} sur [résultat obtenu]. Il/elle a pensé que ça pourrait aussi vous aider.",
      transition: "Est-ce que [problème spécifique] est quelque chose que vous rencontrez aussi ?",
      close: "Ce que je propose : un échange rapide pour voir si on pourrait faire la même chose pour vous. Mardi ou jeudi, qu'est-ce qui marche ?",
    },
    qualify: {
      opening: "Bonjour {prénom}, [Votre nom]. {Référent} m'a parlé de vous en termes très positifs. J'ai pensé que ça valait le coup d'échanger.",
      pitch: "En discutant avec {Référent}, il/elle m'a dit que vous étiez confronté à [défi]. C'est bien le cas ?",
      transition: "Comment gérez-vous ça actuellement ?",
      close: "Intéressant. On a peut-être des idées à partager. Un café virtuel de 20 minutes, ça vous dit ?",
    },
    demo: {
      opening: "Bonjour {prénom}, c'est [Votre nom] de [Entreprise]. {Référent} m'a dit que vous seriez la bonne personne à qui montrer notre solution.",
      pitch: "{Référent} utilise notre outil depuis [durée] et a obtenu [résultat]. Il/elle pense que ça pourrait aussi vous intéresser.",
      transition: "Vous avez 15 minutes pour une démo rapide ?",
      close: "Je peux vous montrer exactement comment ça fonctionne et comment l'adapter à votre contexte.",
    },
    "decision-maker": {
      opening: "Bonjour, c'est [Votre nom]. {Référent} m'a recommandé de contacter {prénom} concernant [sujet]. Serait-il/elle disponible ?",
      pitch: "On a travaillé ensemble sur [projet] et il/elle a pensé que {entreprise} pourrait aussi bénéficier de notre approche.",
      transition: "Pourriez-vous me mettre en relation ?",
      close: "Alternativement, quel serait le meilleur moyen de le/la joindre ?",
    },
  },
  event: {
    meeting: {
      opening: "Bonjour {prénom}, c'est [Votre nom]. On s'est croisés à [événement] la semaine dernière. Vous vous souvenez ?",
      pitch: "On avait brièvement parlé de [sujet]. Vous m'aviez dit que [problème] était un défi pour vous.",
      transition: "J'ai réfléchi à notre conversation et je pense qu'on pourrait vous aider concrètement.",
      close: "On se fait un call de 20 minutes pour approfondir ?",
    },
    qualify: {
      opening: "Bonjour {prénom}, [Votre nom] de [Entreprise]. On était au même [événement]. Comment s'est passée la suite pour vous ?",
      pitch: "Je me souviens qu'on avait parlé de [sujet]. Où en êtes-vous sur ce projet ?",
      transition: "Est-ce que c'est toujours d'actualité ?",
      close: "Si oui, je serais curieux d'en savoir plus. On peut en parler 15 minutes ?",
    },
    demo: {
      opening: "Bonjour {prénom}, c'est [Votre nom]. Suite à notre échange à [événement], je voulais vous montrer concrètement notre solution.",
      pitch: "Vous m'aviez dit être intéressé par [aspect spécifique]. J'ai préparé une démo courte focalisée là-dessus.",
      transition: "Ça prend 15 minutes et c'est très visuel.",
      close: "Quand seriez-vous disponible cette semaine ?",
    },
    "decision-maker": {
      opening: "Bonjour, c'est [Votre nom]. J'ai rencontré quelqu'un de {entreprise} à [événement] qui m'a suggéré de contacter {prénom}.",
      pitch: "On a discuté de [sujet] et il/elle pensait que {prénom} serait la bonne personne.",
      transition: "Pourriez-vous me transférer ou me donner son contact direct ?",
      close: "Merci ! Je le/la rappellerai demain matin.",
    },
  },
};

export function ColdCallScriptGenerator() {
  const [context, setContext] = useState("");
  const [objective, setObjective] = useState("");
  const [copied, setCopied] = useState(false);

  const script = context && objective ? SCRIPTS[context]?.[objective] : null;

  const fullScript = script
    ? `OUVERTURE:\n${script.opening}\n\nPITCH:\n${script.pitch}\n\nTRANSITION:\n${script.transition}\n\nCLOSE:\n${script.close}`
    : null;

  const copyScript = () => {
    if (fullScript) {
      navigator.clipboard.writeText(fullScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Cold Call Script Generator</h3>
      <p className="text-sm text-muted mb-6">Générez des scripts d&apos;appel adaptés à votre contexte.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Contexte de l&apos;appel</label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {CONTEXTS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Objectif</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {OBJECTIVES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {script && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {[
            { label: "Ouverture", content: script.opening, color: "bg-blue-500" },
            { label: "Pitch", content: script.pitch, color: "bg-green-500" },
            { label: "Transition", content: script.transition, color: "bg-yellow-500" },
            { label: "Close", content: script.close, color: "bg-accent" },
          ].map((section) => (
            <div key={section.label} className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${section.color}`} />
                <span className="text-sm font-semibold">{section.label}</span>
              </div>
              <p className="text-sm">{section.content}</p>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={copyScript}
              className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              {copied ? "Copié !" : "Copier le script complet"}
            </button>
          </div>

          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm font-semibold mb-2">Variables à personnaliser</p>
            <div className="flex flex-wrap gap-2">
              {["{prénom}", "{entreprise}", "{industrie}", "[Votre nom]", "[Entreprise]", "{Référent}", "[événement]"].map((v) => (
                <span key={v} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
