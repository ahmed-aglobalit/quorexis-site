# QUOREXIS SALES — JOURNEY MAP AUDIT

## ÉTAT ACTUEL

### PAGES EXISTANTES

| Route | Contenu | CTA Final | Problème |
|-------|---------|-----------|----------|
| `/` | Hero → CommandCenter → TechHuman → OffersPreview → Tools → WhatSdrDoes → First30Days → BrandProtection → WhatIfItFails → Team → FitNotFit → FAQ → FinalCTA → Contact | "Parler de mon marché" | Trop long, offres AVANT méthode, 4 semaines trop bas |
| `/method` | 8 étapes timeline + CTA contact | "Parler à un expert" → /#contact | Pas de "4 semaines", pas de transition vers offres |
| `/offres` | Pricing détaillé + comparaison + FAQ | "Parler de mon marché" | Pas de next step vers calculateur |
| `/tools` | 13 outils (grid) + CTA contact | "Parler à un expert" | Pipeline Calculator pas mis en avant |
| `/solutions` | 6 solutions (cards) | Aucun | Dead end |
| `/about` | Story + founders | "Parler à un expert" | Pas de "Why Quorexis" |
| `/industries` | 5 secteurs (cards) | Aucun | Dead end |
| `/solutions/[slug]` | Page solution détaillée | Aucun | Dead end |
| `/industries/[slug]` | Page industrie détaillée | Aucun | Dead end |
| `/tools/[slug]` | Outil interactif | Variable | Pas de sortie commerciale cohérente |

### NAVIGATION ACTUELLE
```
Nos offres (PREMIER!)
Solutions ▼
Notre méthode
Outils gratuits
[Parler à un expert]
```

### PROBLÈMES IDENTIFIÉS

1. **Ordre du menu illogique** — Offres avant Solutions et Méthode
2. **Homepage surchargée** — 15 sections, trop d'informations
3. **Offres avant Méthode** — Le prospect voit les prix avant de comprendre comment ça marche
4. **4 premières semaines enterrées** — En position 8 sur la homepage, absentes de /method
5. **Pages dead-end** — Solutions et Industries n'ont pas de "next step"
6. **Pas de "Why Quorexis"** — Les sections de confiance sont dispersées sur la homepage
7. **Pipeline Calculator non mis en avant** — Noyé parmi 13 outils
8. **Pas de parcours cohérent** — Le visiteur peut lire une page et ne pas savoir quoi faire ensuite

---

## PARCOURS PSYCHOLOGIQUE CIBLE

```
"Je ne connais pas Quorexis."
         ↓ HOMEPAGE
"Je comprends ce qu'ils font."
         ↓ SOLUTIONS
"Leur méthode semble sérieuse."
         ↓ METHOD
"Je comprends ce que j'achète."
         ↓ OFFERS
"Je vois ce qui va se passer concrètement."
         ↓ 4 WEEKS (dans method)
"Je peux déterminer la formule adaptée."
         ↓ CALCULATOR
"Je comprends pourquoi leur faire confiance."
         ↓ WHY QUOREXIS (nouvelle page)
"Je veux leur parler de mon marché."
         ↓ EXPERT
```

---

## NOUVELLE NAVIGATION PROPOSÉE

### Desktop
```
QUOREXIS

Solutions          ← "Qu'est-ce que vous faites ?"
Notre méthode      ← "Comment faites-vous ?"
Nos offres         ← "Combien et quelle capacité ?"
Outils gratuits    ← "Je ne suis pas encore prêt"
À propos           ← "Qui êtes-vous ?"

[Parler à un expert]
```

### Mobile
```
Solutions
Notre méthode
Nos offres
Outils gratuits
À propos
────────
Parler à un expert
```

---

## NOUVELLE STRUCTURE HOMEPAGE

```
01 HERO
   - Headline: "Vos commerciaux closent. Nous construisons leur pipeline."
   - CTA principal: "Parler de mon marché"
   - CTA secondaire: "Découvrir notre méthode" (PAS "Découvrir nos offres")

02 COMMAND CENTER (Pipeline Visual)
   - Dashboard proof

03 TECH + HUMAN
   - Data + Automation + SDR humains

04 METHOD TEASER (NOUVEAU)
   - 5 étapes visuelles : TARGET → BUILD → ACTIVATE → QUALIFY → OPTIMIZE
   - CTA: "Découvrir notre méthode →"

05 OFFERS TEASER (déplacé APRÈS method)
   - 3 mini-cards : Starter / Growth / Scale
   - CTA: "Comparer les offres →"

06 4 WEEKS TEASER (déplacé APRÈS offers)
   - Timeline compact : W1 Strategy → W2 Build → W3 Activate → W4 Optimize
   - CTA: "Voir mes 4 premières semaines →"

07 CALCULATOR CTA
   - "Pas sûr de la formule ?"
   - CTA: "Trouver ma formule →"

08 FOUNDERS
   - Ahmed + Samy

09 TOOLS CTA
   - "Besoin de préparer ?"
   - CTA: "Découvrir nos outils gratuits →"

10 FINAL CTA
   - "Parlons de votre marché"
   - CTA: "Parler à un expert →"
```

**Sections supprimées de la homepage (déplacées vers /pourquoi-quorexis):**
- WhatSdrDoes
- BrandProtection  
- WhatIfItFails
- FitNotFit
- FAQ détaillé

---

## NOUVELLE PAGE /method

```
01 HERO
   - Eyebrow: "THE QUOREXIS METHOD"
   - Headline: "Une méthode structurée. Pas une campagne improvisée."

02 8 ÉTAPES (existantes, améliorées visuellement)
   Discover → Define → Build → Launch → Engage → Qualify → Book → Optimize

03 VOS 4 PREMIÈRES SEMAINES (SECTION VEDETTE - déplacée ici)
   - Week 1: Strategy
   - Week 2: Build
   - Week 3: Activate
   - Week 4: Optimize

04 NEXT STEP
   - "Vous connaissez la méthode. Choisissez maintenant la puissance de votre moteur outbound."
   - Mini preview: Starter / Growth / Scale
   - CTA: "Découvrir nos offres →"
```

---

## NOUVELLE PAGE /offres (améliorée)

```
01 HERO
   - "De la première campagne à une véritable équipe outbound."

02 PRICING CARDS
   - Starter / Growth / Scale (existantes)

03 COMPARISON TABLE
   - (existante)

04 NEXT STEP: Calculator
   - "Quelle formule correspond réellement à votre économie commerciale ?"
   - CTA: "Calculer ma meilleure formule →"

05 SECONDARY: Other tools
   - "Besoin d'aller plus loin ?"
   - CTA: "Découvrir tous nos outils →"
```

---

## NOUVELLE PAGE /pourquoi-quorexis (À CRÉER)

```
01 HERO
   - "Pourquoi nous confier votre prospection ?"

02 NOT A CALL CENTER
   - (déplacé depuis homepage)

03 TECH + HUMAN
   - (version courte)

04 WHAT SDR DOES
   - (déplacé depuis homepage)

05 BRAND PROTECTION
   - (déplacé depuis homepage)

06 WHAT IF IT FAILS
   - (déplacé depuis homepage)

07 FIT / NOT FIT
   - (déplacé depuis homepage)

08 FOUNDERS
   - Ahmed + Samy

09 FINAL CTA
   - "Vous avez les réponses. Parlons de votre marché."
   - CTA: "Parler à un expert →"
```

---

## NOUVELLE PAGE /tools (améliorée)

```
01 HERO
   - "Calculez, planifiez, décidez."

02 FEATURED: Pipeline Calculator
   - Badge: "Recommandé pour commencer"
   - Mise en avant visuelle

03 OTHER TOOLS (par catégorie)
   - Grid existante

04 NEXT STEP
   - "Les calculs sont faits. Discutons de votre stratégie."
   - CTA: "Parler à un expert →"
```

---

## CTA PAR PAGE

| Page | CTA Principal | CTA Secondaire |
|------|---------------|----------------|
| Homepage | Parler de mon marché | Découvrir notre méthode |
| Solutions | Découvrir notre méthode | Parler à un expert |
| Method | Découvrir nos offres | Parler à un expert |
| Offres | Calculer ma meilleure formule | Parler à un expert |
| Calculator | Parler de mon scénario | Pourquoi Quorexis ? |
| Why Quorexis | Parler de mon marché | — |
| Tools | Contextuel selon l'outil | — |
| About | Parler à un expert | — |

---

## COMPOSANT UNIVERSEL: NextStepCTA

```tsx
<NextStepCTA
  eyebrow="NEXT STEP"
  headline="Vous connaissez la méthode."
  subheadline="Choisissez maintenant votre capacité."
  ctaText="Découvrir nos offres"
  ctaHref="/offres"
  secondaryCta={{ text: "Parler à un expert", onClick: openAssistant }}
/>
```

---

## PARCOURS PRINCIPAL

```
HOMEPAGE
    ↓ "Découvrir notre méthode"
SOLUTIONS (optionnel)
    ↓ "Découvrir notre méthode"
METHOD
    ↓ "Découvrir nos offres"
OFFRES
    ↓ "Calculer ma meilleure formule"
CALCULATOR
    ↓ "Pourquoi Quorexis ?"
WHY QUOREXIS
    ↓ "Parler de mon marché"
EXPERT (AI Assistant / Calendly)
```

---

## FICHIERS À MODIFIER

### Navigation
- `src/sites/sales/config/navigation.ts` — Nouvel ordre

### Pages à modifier
- `src/app/[locale]/page.tsx` — Réduire et réorganiser
- `src/app/[locale]/method/page.tsx` — Ajouter 4 semaines + NextStep
- `src/app/[locale]/offres/page.tsx` — Ajouter NextStep vers calculator
- `src/app/[locale]/tools/page.tsx` — Pipeline Calculator en premier + NextStep
- `src/app/[locale]/solutions/page.tsx` — Ajouter NextStep vers method
- `src/app/[locale]/about/page.tsx` — Ajouter NextStep vers expert

### Pages à créer
- `src/app/[locale]/pourquoi-quorexis/page.tsx` — Nouvelle page de confiance

### Composants à créer
- `src/sites/sales/components/NextStepCTA.tsx` — Composant universel
- `src/sites/sales/components/MethodTeaser.tsx` — Teaser pour homepage
- `src/sites/sales/components/First4WeeksSection.tsx` — Version améliorée pour /method

### Composants à modifier
- `src/sites/sales/components/SalesHeroV2.tsx` — CTA secondaire → "Découvrir notre méthode"
- `src/sites/sales/components/OffersPreview.tsx` — Position après MethodTeaser
- `src/sites/sales/components/First30Days.tsx` — Améliorer visuellement

---

## PROCHAINES ÉTAPES

1. ✅ Audit terminé
2. ⬜ Valider la Journey Map avec l'utilisateur
3. ⬜ Créer le composant NextStepCTA
4. ⬜ Modifier la navigation
5. ⬜ Créer la page /pourquoi-quorexis
6. ⬜ Réorganiser la homepage
7. ⬜ Améliorer /method avec 4 semaines
8. ⬜ Ajouter NextStep à toutes les pages
9. ⬜ Améliorer /tools avec Pipeline Calculator en vedette
10. ⬜ Tests et build
