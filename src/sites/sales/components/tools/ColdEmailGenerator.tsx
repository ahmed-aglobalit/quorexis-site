"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const INDUSTRIES = [
  { value: "saas", label: "SaaS / Tech" },
  { value: "services", label: "Services B2B" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "finance", label: "Finance" },
  { value: "industry", label: "Industrie" },
];

const PAIN_POINTS = [
  { value: "growth", label: "Croissance" },
  { value: "efficiency", label: "Efficacité" },
  { value: "cost", label: "Réduction coûts" },
  { value: "quality", label: "Qualité" },
  { value: "time", label: "Gain de temps" },
];

const TONES = [
  { value: "professional", label: "Professionnel" },
  { value: "casual", label: "Décontracté" },
  { value: "direct", label: "Direct" },
  { value: "curious", label: "Curieux" },
];

const TEMPLATES: Record<string, Record<string, string>> = {
  professional: {
    growth: `Bonjour {prénom},

Je me permets de vous contacter car j'ai remarqué que {entreprise} connaît une belle croissance dans le secteur {industrie}.

Chez [Votre entreprise], nous accompagnons des entreprises comme la vôtre à accélérer leur développement commercial en structurant leur prospection outbound.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Bien cordialement`,
    efficiency: `Bonjour {prénom},

En analysant {entreprise}, j'ai identifié des opportunités d'optimisation de vos processus commerciaux.

Nos clients dans le {industrie} gagnent en moyenne 30% d'efficacité sur leur cycle de vente grâce à notre approche structurée.

Avez-vous 15 minutes pour en discuter ?

Cordialement`,
    cost: `Bonjour {prénom},

Les équipes commerciales perdent en moyenne 40% de leur temps sur des tâches non-productives.

Chez [Votre entreprise], nous aidons les entreprises comme {entreprise} à réduire ces coûts cachés tout en augmentant le nombre de rendez-vous qualifiés.

Intéressé(e) par un échange ?`,
    quality: `Bonjour {prénom},

La qualité des leads est le premier défi des équipes commerciales dans le {industrie}.

Nous avons développé une méthode qui permet de qualifier les prospects en amont, pour que vos commerciaux ne parlent qu'aux bonnes personnes.

Un rapide échange pour vous présenter l'approche ?`,
    time: `Bonjour {prénom},

Vos commerciaux passent-ils plus de temps à prospecter qu'à vendre ?

C'est le cas de 70% des équipes que nous rencontrons. Notre solution permet de libérer ce temps tout en générant un flux constant de rendez-vous qualifiés.

15 minutes pour en parler ?`,
  },
  casual: {
    growth: `Hey {prénom} !

Je vois que {entreprise} cartonne en ce moment — bravo !

On bosse avec pas mal de boîtes {industrie} sur leur acquisition client. Je me dis qu'on pourrait peut-être vous aider à accélérer encore plus.

Dispo pour un café virtuel de 15 min ?`,
    efficiency: `{prénom},

Quick question : combien de temps ton équipe passe à chercher des leads vs. à closer ?

On aide les équipes comme la tienne à inverser ce ratio. Ça t'intéresse d'en savoir plus ?`,
    cost: `Hey {prénom},

Je sais que le budget acquisition est toujours un sujet sensible.

On a trouvé un moyen de diviser par 3 le coût par rendez-vous qualifié. Curieux(se) ?`,
    quality: `{prénom},

"80% de nos leads sont pas qualifiés" — ça te parle ?

On a peut-être une solution. Un call rapide ?`,
    time: `Hey {prénom} !

Imagine si ton équipe pouvait closer au lieu de prospecter...

C'est exactement ce qu'on fait pour nos clients. 15 min pour t'expliquer ?`,
  },
  direct: {
    growth: `{prénom},

{entreprise} + prospection structurée = croissance accélérée.

On l'a fait pour [Client similaire]. Résultat : +150% de rendez-vous qualifiés.

Intéressé(e) ?`,
    efficiency: `{prénom},

Votre équipe commerciale pourrait être 30% plus efficace.

Je peux vous montrer comment en 15 minutes.

Disponible ?`,
    cost: `{prénom},

Coût actuel par rendez-vous qualifié : probablement trop élevé.
Notre benchmark : 80-150€.

On compare ?`,
    quality: `{prénom},

Leads non qualifiés = temps perdu = argent perdu.

Solution : qualifier avant de transmettre aux commerciaux.

15 min pour en parler ?`,
    time: `{prénom},

60% du temps commercial perdu en prospection.

On peut récupérer ce temps pour vous.

Call ?`,
  },
  curious: {
    growth: `{prénom},

Question : si vous pouviez doubler vos rendez-vous qualifiés le mois prochain, qu'est-ce que ça changerait pour {entreprise} ?

C'est exactement le type de résultat qu'on obtient. Curieux(se) de savoir comment ?`,
    efficiency: `{prénom},

Je me demandais : combien de rendez-vous qualifiés votre équipe génère par mois actuellement ?

La raison de ma question : on a peut-être une façon d'augmenter ce chiffre significativement.

Qu'en pensez-vous ?`,
    cost: `{prénom},

Savez-vous combien vous coûte réellement un rendez-vous commercial qualifié ?

J'ai des benchmarks intéressants à partager si le sujet vous intéresse.`,
    quality: `{prénom},

Sur 10 rendez-vous commerciaux, combien se transforment réellement ?

Si la réponse est moins de 3, on devrait peut-être discuter...`,
    time: `{prénom},

Si je vous disais qu'on peut libérer 50% du temps de vos commerciaux, qu'en feriez-vous ?

Curieux d'avoir votre réponse !`,
  },
};

export function ColdEmailGenerator() {
  const [industry, setIndustry] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [tone, setTone] = useState("");
  const [copied, setCopied] = useState(false);

  const template = tone && painPoint ? TEMPLATES[tone]?.[painPoint] : null;
  const finalTemplate = template?.replace("{industrie}", INDUSTRIES.find((i) => i.value === industry)?.label || "B2B");

  const copyToClipboard = () => {
    if (finalTemplate) {
      navigator.clipboard.writeText(finalTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Cold Email Generator</h3>
      <p className="text-sm text-muted mb-6">Générez des templates d&apos;emails personnalisés.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Industry */}
        <div>
          <label className="text-sm font-medium mb-2 block">Industrie cible</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>

        {/* Pain Point */}
        <div>
          <label className="text-sm font-medium mb-2 block">Pain point</label>
          <select
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {PAIN_POINTS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="text-sm font-medium mb-2 block">Ton</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generated template */}
      {finalTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <pre className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-sm whitespace-pre-wrap font-sans">
              {finalTemplate}
            </pre>
            <button
              type="button"
              onClick={copyToClipboard}
              className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm font-semibold mb-2">Variables à remplacer</p>
            <div className="flex flex-wrap gap-2">
              {["{prénom}", "{entreprise}", "[Votre entreprise]", "[Client similaire]"].map((v) => (
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
