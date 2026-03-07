import { BlogSection } from "./types";

export const sections1: BlogSection[] = [
  {
    heading: "Pourquoi externaliser le QA ?",
    content: `Construire une expertise QA interne demande du temps, des ressources spécialisées et des processus structurés. Avec Quorexis, vous y accédez immédiatement.

Mise en œuvre rapide — Équipes opérationnelles dès le premier sprint, sans temps de montée en compétence.
Expertise avancée — Méthodologies éprouvées et consultants certifiés sur tous les types de tests.
Extension de vos équipes — Nous devenons une extension naturelle de vos équipes produit et engineering.`,
  },
  {
    heading: "Notre approche QA",
    content: `Nos consultants QA certifiés ISTQB apportent une expertise technique éprouvée, des méthodologies structurées et une gouvernance qualité mesurable — avec un objectif clair : atteindre un niveau de qualité proche du zéro défaut en production.

Expertise technique — Consultants certifiés, méthodes éprouvées sur des projets complexes.
Gouvernance qualité — Indicateurs, dashboards et suivi continu de la maturité QA.
Orienté résultats — Approche KPI-driven alignée sur vos objectifs business.`,
  },
  {
    heading: "Core Testing Services",
    content: `Nos services couvrent l'ensemble du spectre fonctionnel et technique pour sécuriser chaque dimension de votre produit.

Functional Testing — Validation complète des fonctionnalités selon les exigences métier et attentes utilisateurs.
Test Automation — Automatisation intelligente des scénarios critiques pour accélérer les livraisons.
API Testing — Validation des APIs et intégrations pour garantir la stabilité des échanges entre systèmes.
Performance Testing — Analyse de charge et de scalabilité en conditions réelles d'utilisation.
Accessibility Testing — Conformité aux standards d'accessibilité pour des produits utilisables par tous.`,
  },
  {
    heading: "Advanced Testing Expertise",
    content: `Exploratory Testing — Exploration intelligente pour détecter les défauts que les tests traditionnels ne voient pas.
Regression Testing — Validation systématique des nouvelles releases — aucune fonctionnalité existante n'est impactée.
UAT & System Testing — Accompagnement des phases de validation utilisateur et validation globale des systèmes.
Compatibility Testing — Tests multi-plateformes sur différents navigateurs, systèmes et appareils.`,
  },
  {
    heading: "QA Governance & Consulting",
    content: `La qualité ne repose pas uniquement sur les tests. Elle repose aussi sur la gouvernance et la stratégie QA.

QA Governance & KPIs — Métriques qualité, dashboards et indicateurs de performance.
QA Audit — Évaluation de la maturité QA et recommandations d'amélioration.
Test Strategy & Operating Model — Stratégies de test et modèles opérationnels QA efficaces.`,
  },
  {
    heading: "Notre engagement",
    content: `Chez Quorexis, nous croyons que la qualité est un avantage stratégique, pas une contrainte. Chaque release est une opportunité de renforcer la confiance.

Test with Precision — Des tests rigoureux, méthodiques et orientés impact à chaque étape.
Deliver with Confidence — Des releases sécurisées, prévisibles et alignées sur vos objectifs.
Build Trust Every Release — La qualité comme fondation durable de votre réputation produit.

Engineering confidence in every release.`,
  },
];

export const sections2: BlogSection[] = [
  {
    heading: "La vitesse sans qualité, c'est une illusion",
    content: `Livrer vite des bugs, c'est livrer de la dette. Pourtant, la qualité reste souvent invisible dans les tableaux de bord des équipes techniques. Ce qui n'est pas mesuré ne s'améliore pas.

Sans métriques QA — Les bugs arrivent en production. L'équipe réagit en urgence. La confiance s'érode.
Avec métriques QA — Les problèmes sont détectés tôt. Les décisions sont fondées sur des données. La qualité progresse.`,
  },
  {
    heading: "KPI 1 : Couverture de tests",
    content: `Le pourcentage de code exécuté par vos tests automatisés. Une couverture faible signifie que des pans entiers de votre application ne sont jamais vérifiés avant la mise en production.

Ce que ça révèle : les zones sans filet de sécurité, les modules à fort risque non testés, la maturité de la culture de test.

Objectif cible : viser 70 à 85 % de couverture sur les chemins critiques. Au-delà, le rendement marginal diminue.

Une couverture élevée ne garantit pas des tests pertinents. La qualité des assertions compte autant que le chiffre.`,
  },
  {
    heading: "KPI 2 : Taux de réussite des tests",
    content: `Le pourcentage de tests qui passent avec succès sur un cycle de CI/CD donné. Un taux qui baisse est un signal d'alarme précoce.

95 % — Seuil minimal. En dessous, votre pipeline est instable et ralentit les livraisons.
99 % — Objectif sain. Un taux proche de 99 % indique une base de code stable et des tests fiables.
80 % — Zone critique. En dessous, les équipes ignorent souvent les échecs — ce qui est encore plus dangereux.

Surveillez aussi les tests flaky : ces tests qui échouent de façon aléatoire érodent la confiance de l'équipe dans le pipeline entier.`,
  },
  {
    heading: "KPI 3 : Bugs arrivant en production",
    content: `Le nombre de défauts découverts par les utilisateurs finaux — et non par vos tests. C'est la métrique la plus visible, et souvent la plus douloureuse.

Comment le mesurer : comptabilisez les tickets ouverts en production par sprint ou par release. Distinguez les bugs critiques des incidents mineurs.

Ce qu'il faut analyser : la tendance sur le temps est plus révélatrice que le chiffre absolu. Un ratio bugs/features livré permet une comparaison équitable entre équipes.

L'objectif : réduire ce chiffre de façon continue. Zéro défaut en prod est rare, mais une tendance à la baisse est un indicateur de maturité QA.`,
  },
  {
    heading: "KPI 4 : Temps moyen pour détecter un bug (MTTD)",
    content: `Combien de temps s'écoule entre l'introduction d'un bug dans le code et sa détection ? Plus ce délai est court, moins le bug a de chances d'atteindre la production.

Un MTTD long indique souvent un manque de tests automatisés, une couverture insuffisante ou des cycles de feedback trop lents dans le pipeline CI/CD.

Pour réduire le MTTD : automatiser les tests de régression, intégrer des linters et analyses statiques, raccourcir les cycles de CI, mettre en place des alertes en temps réel, pratiquer le shift-left testing.`,
  },
  {
    heading: "KPI 5 : Temps d'exécution des tests dans le CI/CD",
    content: `Un pipeline lent est un pipeline ignoré. Si vos tests prennent 45 minutes, les développeurs cherchent des raccourcis — et la qualité en souffre.

Seuils recommandés : tests unitaires sous 5 minutes, tests d'intégration sous 15 minutes, suite complète sous 30 minutes.

Leviers d'optimisation : parallélisation des tests, cache des dépendances, exécution sélective selon les changements.`,
  },
  {
    heading: "Ce qui se mesure s'améliore",
    content: `Ces 5 KPI ne sont pas des métriques de reporting. Ce sont des outils de pilotage. Ils permettent aux CTO d'anticiper les crises, d'aligner les équipes et de prendre des décisions fondées sur des faits — pas sur des intuitions.

Commencez par un seul KPI. Mettez-le en place, créez l'habitude, puis ajoutez les suivants progressivement.`,
  },
];

export const sections3: BlogSection[] = [
  {
    heading: "Les outils d'IA transforment le développement",
    content: `Les modèles de génération de code comme GitHub Copilot, Cursor ou GPT-4 ont fondamentalement changé la façon dont les équipes produisent du logiciel. Ce qui prenait des jours se réalise en heures. Ce qui prenait des semaines se réalise en jours.

Génération de code — L'IA produit des centaines de lignes en quelques secondes, réduisant le temps de développement de 30 à 50 %.
Livraison accélérée — Les fonctionnalités atteignent la production plus vite, compressant les cycles sprint et les délais de mise sur le marché.
Cycles de release courts — Les équipes déploient plusieurs fois par jour, là où elles déployaient une fois par semaine il y a encore deux ans.`,
  },
  {
    heading: "La vitesse crée de nouveaux risques",
    content: `Plus de code généré signifie plus de surface d'erreur. L'IA ne comprend pas le contexte métier, les contraintes d'architecture ni les effets de bord en production. Elle produit du code plausible — pas nécessairement correct.

Plus de code — Le volume de code produit explose, rendant la revue manuelle exhaustive impossible. Les équipes QA sont dépassées si elles ne s'adaptent pas.
Plus de complexité — Le code généré par l'IA peut introduire des patterns non standards, difficiles à maintenir, à déboguer et à tester de façon systématique.
Plus de dépendances — Les suggestions de l'IA tirent souvent des librairies externes supplémentaires, augmentant la surface d'attaque et les risques de compatibilité.`,
  },
  {
    heading: "On mesure la vitesse. Rarement la qualité.",
    content: `Ce que la plupart des équipes mesurent : vélocité de sprint, fréquence de déploiement, lead time.

Ce que très peu d'équipes mesurent : taux de défauts en production, couverture de tests effective, coût de la non-qualité.

Les entreprises qui ne mesurent que la vitesse optimisent pour livrer — pas pour fiabiliser.`,
  },
  {
    heading: "Le QA devient une couche de gouvernance",
    content: `Dans un monde où l'IA génère du code à grande vitesse, le Quality Assurance évolue vers un rôle stratégique. Il ne s'agit plus de chercher des bugs après le développement — il s'agit d'intégrer des garde-fous structurels tout au long du cycle de vie du logiciel.

Gouvernance de la qualité — Définir des standards, des seuils de qualité et des politiques de validation qui s'appliquent à tout le code, qu'il soit écrit par un humain ou généré par l'IA.
Intégration continue — Le QA s'intègre dans chaque étape du pipeline CI/CD, automatisant les vérifications pour maintenir le rythme de livraison sans sacrifier la fiabilité.
Observabilité de la qualité — Créer une visibilité complète sur l'état de santé du logiciel à travers des tableaux de bord, des métriques et des alertes en temps réel.`,
  },
  {
    heading: "Les indicateurs QA essentiels à suivre",
    content: `Un programme QA mature se mesure. Voici les quatre dimensions clés que toute équipe engineering sérieuse doit instrumenter et monitorer en continu.

Couverture de tests — Pourcentage du code couvert par des tests automatisés. L'objectif minimal recommandé est de 80 % pour les composants critiques.
Taux de réussite des tests — Proportion de tests qui passent à chaque build. Un taux dégradé signale une instabilité systémique avant qu'elle n'atteigne la production.
Defect leakage — Taux de défauts qui échappent aux phases de test et atteignent les utilisateurs finaux. L'indicateur le plus direct de la maturité QA.
Indicateurs de performance — Temps de réponse, disponibilité, charge — la qualité ne se limite pas à l'absence de bugs mais englobe l'expérience utilisateur globale.`,
  },
  {
    heading: "L'IA va continuer d'accélérer",
    content: `Les équipes qui adoptent l'IA dans leur workflow de développement gagnent un avantage concurrentiel réel : plus de fonctionnalités, plus vite, avec moins d'effectifs. Cette tendance est irréversible.

Productivité x2 à x5 — Les développeurs augmentés par l'IA livrent significativement plus de valeur par sprint.
Time-to-market réduit — Les cycles de développement s'accélèrent, permettant d'itérer plus vite sur le produit.

Mais sans discipline de testing, l'accélération devient un multiplicateur de risques — pas de valeur. La fiabilité dépendra toujours de la discipline de testing. L'IA ne remplace pas la rigueur — elle en amplifie l'importance.`,
  },
];

export const sections4: BlogSection[] = [
  {
    heading: "Une minute d'indisponibilité coûte des millions",
    content: `Amazon — 5 millions de dollars perdus par minute d'indisponibilité en 2024, selon les rapports post-mortem des pannes AWS. La fiabilité n'est pas une option à cette échelle.

Netflix — Un seul bug de production au T1 2025 a causé une baisse de revenus de 1,2 million de dollars — due à un cas limite non testé dans le pipeline de streaming.

Chaque problème technique affecte le résultat net. La qualité n'est plus un luxe — elle est existentielle.`,
  },
  {
    heading: "La complexité explose",
    content: `L'entreprise moyenne gère désormais plus de 1 200 microservices — contre seulement 150 en 2015 (Gartner, 2025). Les tests manuels ne peuvent tout simplement pas suivre le rythme.

Le répertoire Android de Google a dépassé les 100 Go en 2024. À cette échelle, les testeurs humains sont un goulot d'étranglement, pas un filet de sécurité.

Les cycles de livraison rapides exigent un feedback plus rapide. La rapidité sans assurance qualité est de l'imprudence. La rapidité avec assurance qualité est une arme stratégique.`,
  },
  {
    heading: "L'automatisation n'est pas une option — c'est obligatoire",
    content: `75 % des entreprises intègreront les tests basés sur l'IA d'ici 2026, selon les prévisions 2025 de Gartner. La fenêtre pour développer cette capacité est maintenant.

La suite de tests automatisés de Stripe couvre déjà 92 % de tous les flux de transactions, réduisant l'effort manuel de QA de 68 % — libérant les ingénieurs pour se concentrer sur des tâches à plus forte valeur ajoutée.`,
  },
  {
    heading: "Le nouveau rôle des ingénieurs QA",
    content: `Les ingénieurs QA ne sont plus la dernière ligne de défense — ils sont intégrés à chaque phase du cycle de vie du produit.

Tests "Shift-Left" — Megan Brown, Responsable QA chez Stripe, a été la pionnière de cette approche — réduisant les bugs post-lancement de 42 %.
Explosion du rôle de SDET — Les rôles d'ingénieur en développement de logiciels en test ont augmenté de 30 % d'une année sur l'autre en 2024 (LinkedIn Insights) — le titre d'ingénieur à la croissance la plus rapide.`,
  },
  {
    heading: "ROI stratégique : les chiffres parlent",
    content: `4,3 M$ de rendement par 1 million de dollars investis en automatisation QA, en coûts de défauts évités (Forrester, 2025).
30 % de mise sur le marché plus rapide pour les entreprises dotées de pratiques QA matures (McKinsey, 2024).
20 % d'augmentation du Net Promoter Score grâce à une culture d'ingénierie axée sur la qualité.

L'assurance qualité n'est pas un poste de dépense à minimiser — c'est un multiplicateur à maximiser.`,
  },
  {
    heading: "Faites de l'AQ votre avantage concurrentiel",
    content: `Les entreprises qui réussissent en 2025 et au-delà partagent un trait commun : elles traitent la qualité comme une stratégie produit, et non comme une réflexion après coup.

Intégrez tôt — Déplacez les tests vers la gauche — détectez les défauts quand ils coûtent des centimes, pas des millions.
Automatisez sans relâche — Construisez des suites de tests qui évoluent avec votre base de code, et non contre elle.
Mesurez tout — Les KPI ne mentent pas. Laissez les données guider votre feuille de route qualité.`,
  },
];
