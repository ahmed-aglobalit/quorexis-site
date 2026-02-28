export type FaqCategory =
  | "services"
  | "delivery"
  | "governance"
  | "pricing"
  | "security"
  | "training";

export interface FaqEntry {
  id: string;
  category: FaqCategory;
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
  links: { label: { fr: string; en: string }; href: string }[];
}

export const faqCategories: FaqCategory[] = [
  "services",
  "delivery",
  "governance",
  "pricing",
  "security",
  "training",
];

export const faqEntries: FaqEntry[] = [
  // ── Services ──
  {
    id: "svc-types",
    category: "services",
    question: {
      fr: "Quels types de tests proposez-vous ?",
      en: "What types of testing do you offer?",
    },
    answer: {
      fr: "Nous couvrons l'ensemble du spectre QA : tests fonctionnels, automatisation, tests API, tests de performance, accessibilité, tests exploratoires, régression, compatibilité et gouvernance QA. Chaque mission est adaptée à vos besoins.",
      en: "We cover the full QA spectrum: functional testing, test automation, API testing, performance testing, accessibility, exploratory testing, regression, compatibility and QA governance. Each engagement is tailored to your needs.",
    },
    links: [
      { label: { fr: "Nos services", en: "Our services" }, href: "/services" },
    ],
  },
  {
    id: "svc-automation",
    category: "services",
    question: {
      fr: "Faites-vous de l'automatisation des tests ?",
      en: "Do you do test automation?",
    },
    answer: {
      fr: "Oui, l'automatisation est l'un de nos piliers. Nous concevons des frameworks sur-mesure (Selenium, Cypress, Playwright, Appium) avec une approche maintenable et industrialisée. Nos accélérateurs réduisent le time-to-value.",
      en: "Yes, automation is one of our core pillars. We design custom frameworks (Selenium, Cypress, Playwright, Appium) with a maintainable, industrialized approach. Our accelerators reduce time-to-value.",
    },
    links: [
      {
        label: { fr: "Automatisation", en: "Test automation" },
        href: "/services/test-automation",
      },
    ],
  },
  {
    id: "svc-tools",
    category: "services",
    question: {
      fr: "Quels outils utilisez-vous ?",
      en: "What tools do you use?",
    },
    answer: {
      fr: "Nous travaillons avec les standards du marché : Selenium, Cypress, Playwright, Appium, JMeter, k6, Postman, REST Assured, JIRA, Azure DevOps, TestRail, Xray. Le choix dépend de votre écosystème technique.",
      en: "We work with industry standards: Selenium, Cypress, Playwright, Appium, JMeter, k6, Postman, REST Assured, JIRA, Azure DevOps, TestRail, Xray. Tool selection depends on your technical ecosystem.",
    },
    links: [
      { label: { fr: "Tests API", en: "API testing" }, href: "/services/api-testing" },
      {
        label: { fr: "Tests de performance", en: "Performance testing" },
        href: "/services/performance-testing",
      },
    ],
  },
  {
    id: "svc-manual",
    category: "services",
    question: {
      fr: "Proposez-vous des tests manuels ?",
      en: "Do you offer manual testing?",
    },
    answer: {
      fr: "Absolument. Les tests manuels restent essentiels pour les tests exploratoires, l'UAT, les parcours utilisateurs complexes et la validation UX. Nos testeurs certifiés ISTQB apportent un regard métier structuré.",
      en: "Absolutely. Manual testing remains essential for exploratory testing, UAT, complex user journeys and UX validation. Our ISTQB-certified testers bring a structured business perspective.",
    },
    links: [
      {
        label: { fr: "Tests fonctionnels", en: "Functional testing" },
        href: "/services/functional-testing",
      },
      {
        label: { fr: "Tests exploratoires", en: "Exploratory testing" },
        href: "/services/exploratory-testing",
      },
    ],
  },
  {
    id: "svc-accessibility",
    category: "services",
    question: {
      fr: "Faites-vous des tests d'accessibilité ?",
      en: "Do you do accessibility testing?",
    },
    answer: {
      fr: "Oui, nous auditons la conformité WCAG 2.1 / RGAA et proposons des plans de remédiation. L'accessibilité est devenue une obligation légale dans de nombreux secteurs.",
      en: "Yes, we audit WCAG 2.1 compliance and provide remediation plans. Accessibility has become a legal requirement in many industries.",
    },
    links: [
      {
        label: { fr: "Accessibilité", en: "Accessibility testing" },
        href: "/services/accessibility-testing",
      },
    ],
  },
  {
    id: "svc-platforms",
    category: "services",
    question: {
      fr: "Quelles plateformes couvrez-vous ?",
      en: "Which platforms do you cover?",
    },
    answer: {
      fr: "Web, mobile (iOS/Android natif et cross-platform), desktop et API. Nous adaptons les stratégies de test à chaque plateforme et à ses contraintes spécifiques.",
      en: "Web, mobile (native iOS/Android and cross-platform), desktop and API. We adapt testing strategies to each platform and its specific constraints.",
    },
    links: [
      { label: { fr: "Web", en: "Web testing" }, href: "/services/web-testing" },
      { label: { fr: "Mobile", en: "Mobile testing" }, href: "/services/mobile-testing" },
    ],
  },

  // ── Delivery Model ──
  {
    id: "del-offshore",
    category: "delivery",
    question: {
      fr: "Comment fonctionne votre modèle offshore ?",
      en: "How does your offshore model work?",
    },
    answer: {
      fr: "Nous opérons depuis Tunis (GMT+1), avec un overlap horaire quasi-total avec l'Europe. L'équipe est dédiée, managée par un QA Lead expérimenté, avec reporting quotidien et accès direct via Slack/Teams.",
      en: "We operate from Tunis (GMT+1), with near-complete time overlap with Europe. The team is dedicated, managed by an experienced QA Lead, with daily reporting and direct access via Slack/Teams.",
    },
    links: [
      {
        label: { fr: "Delivery model", en: "Delivery model" },
        href: "/company#delivery",
      },
    ],
  },
  {
    id: "del-engagement",
    category: "delivery",
    question: {
      fr: "Quels sont vos modèles d'engagement ?",
      en: "What are your engagement models?",
    },
    answer: {
      fr: "Trois modèles : équipe dédiée (régie offshore), projet forfaitaire, ou renfort ponctuel. Le modèle est choisi selon votre contexte, votre budget et la durée de la mission.",
      en: "Three models: dedicated team (offshore staff augmentation), fixed-price project, or ad-hoc reinforcement. The model is chosen based on your context, budget and engagement duration.",
    },
    links: [
      {
        label: { fr: "Pourquoi Quorexis", en: "Why Quorexis" },
        href: "/company#why",
      },
    ],
  },
  {
    id: "del-onboarding",
    category: "delivery",
    question: {
      fr: "Quel est le délai de démarrage ?",
      en: "What is the onboarding timeline?",
    },
    answer: {
      fr: "En moyenne 1 à 2 semaines pour constituer et onboarder une équipe. Nous disposons d'un vivier de testeurs pré-qualifiés prêts à démarrer rapidement.",
      en: "On average 1 to 2 weeks to assemble and onboard a team. We maintain a pool of pre-qualified testers ready to start quickly.",
    },
    links: [],
  },
  {
    id: "del-communication",
    category: "delivery",
    question: {
      fr: "Comment communiquez-vous au quotidien ?",
      en: "How do you communicate daily?",
    },
    answer: {
      fr: "Daily standup, reporting JIRA/Azure DevOps, canal Slack ou Teams dédié, et points hebdomadaires avec le QA Lead. Vous avez une visibilité totale sur l'avancement.",
      en: "Daily standup, JIRA/Azure DevOps reporting, dedicated Slack or Teams channel, and weekly check-ins with the QA Lead. You have full visibility on progress.",
    },
    links: [],
  },
  {
    id: "del-timezone",
    category: "delivery",
    question: {
      fr: "Quel fuseau horaire couvrez-vous ?",
      en: "What timezone do you cover?",
    },
    answer: {
      fr: "Tunis est en GMT+1, soit le même fuseau que Paris. Nous pouvons aussi adapter les horaires pour couvrir d'autres zones (UK, EST).",
      en: "Tunis is GMT+1, the same timezone as Paris. We can also adjust schedules to cover other zones (UK, EST).",
    },
    links: [],
  },
  {
    id: "del-language",
    category: "delivery",
    question: {
      fr: "En quelles langues travaillez-vous ?",
      en: "What languages do you work in?",
    },
    answer: {
      fr: "Français et anglais courants. Toute la documentation, les rapports et la communication peuvent être dans l'une ou l'autre langue selon votre préférence.",
      en: "Fluent French and English. All documentation, reports and communication can be in either language based on your preference.",
    },
    links: [],
  },

  // ── Governance & KPIs ──
  {
    id: "gov-measure",
    category: "governance",
    question: {
      fr: "Comment mesurez-vous la qualité ?",
      en: "How do you measure quality?",
    },
    answer: {
      fr: "Via un framework de KPIs structuré : taux de détection de défauts, couverture de tests, densité de défauts, taux de réouverture, temps moyen de résolution. Chaque KPI est tracé et reporté.",
      en: "Through a structured KPI framework: defect detection rate, test coverage, defect density, reopen rate, mean time to resolution. Each KPI is tracked and reported.",
    },
    links: [
      {
        label: { fr: "Gouvernance QA", en: "QA governance" },
        href: "/services/qa-governance",
      },
    ],
  },
  {
    id: "gov-kpis",
    category: "governance",
    question: {
      fr: "Quels KPIs suivez-vous ?",
      en: "What KPIs do you track?",
    },
    answer: {
      fr: "Principaux KPIs : taux d'exécution des tests, pourcentage pass/fail, défauts par sévérité, couverture fonctionnelle, vélocité de correction, taux de régression. Reportés via dashboards JIRA/TestRail.",
      en: "Key KPIs: test execution rate, pass/fail percentage, defects by severity, functional coverage, fix velocity, regression rate. Reported via JIRA/TestRail dashboards.",
    },
    links: [
      {
        label: { fr: "Quality Gates", en: "Quality Gates" },
        href: "/services/quality-gates",
      },
    ],
  },
  {
    id: "gov-audit",
    category: "governance",
    question: {
      fr: "Proposez-vous des audits QA ?",
      en: "Do you offer QA audits?",
    },
    answer: {
      fr: "Oui. Notre audit QA évalue vos processus, outils, couverture de tests et maturité qualité. Nous livrons un rapport avec des recommandations actionnables et un plan de remédiation priorisé.",
      en: "Yes. Our QA audit evaluates your processes, tools, test coverage and quality maturity. We deliver a report with actionable recommendations and a prioritized remediation plan.",
    },
    links: [
      { label: { fr: "Audit QA", en: "QA audit" }, href: "/services/qa-audit" },
    ],
  },
  {
    id: "gov-reporting",
    category: "governance",
    question: {
      fr: "Quel type de reporting fournissez-vous ?",
      en: "What type of reporting do you provide?",
    },
    answer: {
      fr: "Reporting quotidien (exécution), hebdomadaire (tendances et risques) et mensuel (executive summary). Formats : dashboards JIRA, rapports TestRail, ou slides pour comités de pilotage.",
      en: "Daily reporting (execution), weekly (trends and risks) and monthly (executive summary). Formats: JIRA dashboards, TestRail reports, or slides for steering committees.",
    },
    links: [],
  },
  {
    id: "gov-strategy",
    category: "governance",
    question: {
      fr: "Aidez-vous à définir une stratégie de test ?",
      en: "Do you help define a test strategy?",
    },
    answer: {
      fr: "Oui. Nous élaborons des stratégies de test complètes : scope, approche, environnements, critères d'entrée/sortie, matrice de risques et plan de couverture. Document livré et validé avec vos équipes.",
      en: "Yes. We develop comprehensive test strategies: scope, approach, environments, entry/exit criteria, risk matrix and coverage plan. Document delivered and validated with your teams.",
    },
    links: [
      {
        label: { fr: "Stratégie de test", en: "Test strategy" },
        href: "/services/test-strategy",
      },
    ],
  },

  // ── Pricing & Engagement ──
  {
    id: "prc-structure",
    category: "pricing",
    question: {
      fr: "Comment est structuré votre pricing ?",
      en: "How is your pricing structured?",
    },
    answer: {
      fr: "Notre tarification dépend du modèle d'engagement (régie, forfait ou renfort) et de la séniorité des profils. Nous proposons des tarifs compétitifs grâce à notre implantation offshore à Tunis.",
      en: "Our pricing depends on the engagement model (staff augmentation, fixed-price or reinforcement) and profile seniority. We offer competitive rates thanks to our offshore base in Tunis.",
    },
    links: [
      { label: { fr: "Contact", en: "Contact us" }, href: "/#contact" },
    ],
  },
  {
    id: "prc-minimum",
    category: "pricing",
    question: {
      fr: "Quel est l'engagement minimum ?",
      en: "What is the minimum engagement?",
    },
    answer: {
      fr: "Pas d'engagement minimum rigide. Nous pouvons intervenir sur des missions courtes (audit, renfort sprint) comme sur des engagements long-terme. Le minimum courant est de 1 mois.",
      en: "No rigid minimum engagement. We can work on short missions (audit, sprint reinforcement) as well as long-term engagements. The typical minimum is 1 month.",
    },
    links: [],
  },
  {
    id: "prc-quote",
    category: "pricing",
    question: {
      fr: "Comment obtenir un devis ?",
      en: "How do I get a quote?",
    },
    answer: {
      fr: "Contactez-nous via le formulaire ou par email. Après un échange de 30 minutes pour comprendre votre besoin, nous vous envoyons une proposition sous 48h.",
      en: "Contact us via the form or by email. After a 30-minute call to understand your needs, we send a proposal within 48 hours.",
    },
    links: [
      { label: { fr: "Contact", en: "Contact us" }, href: "/#contact" },
    ],
  },
  {
    id: "prc-trial",
    category: "pricing",
    question: {
      fr: "Proposez-vous une période d'essai ?",
      en: "Do you offer a trial period?",
    },
    answer: {
      fr: "Nous proposons un pilote d'1 à 2 semaines sur un périmètre réduit. Cela vous permet d'évaluer la qualité de nos livrables et notre intégration avec vos équipes avant de scaler.",
      en: "We offer a 1-2 week pilot on a reduced scope. This allows you to evaluate the quality of our deliverables and our integration with your teams before scaling.",
    },
    links: [],
  },
  {
    id: "prc-saving",
    category: "pricing",
    question: {
      fr: "Quelles économies peut-on attendre ?",
      en: "What savings can we expect?",
    },
    answer: {
      fr: "En moyenne, nos clients réalisent 40 à 60 % d'économies par rapport à des équipes QA locales en France, à qualité équivalente ou supérieure grâce à nos processus industrialisés.",
      en: "On average, our clients achieve 40-60% savings compared to local QA teams in France, with equivalent or superior quality thanks to our industrialized processes.",
    },
    links: [],
  },

  // ── Security & Confidentiality ──
  {
    id: "sec-data",
    category: "security",
    question: {
      fr: "Comment gérez-vous la confidentialité des données ?",
      en: "How do you handle data confidentiality?",
    },
    answer: {
      fr: "NDA signé systématiquement. Accès VPN dédié, postes de travail sécurisés, pas de données de production en test (anonymisation). Conformité RGPD assurée.",
      en: "NDA signed systematically. Dedicated VPN access, secured workstations, no production data in testing (anonymization). GDPR compliance ensured.",
    },
    links: [],
  },
  {
    id: "sec-gdpr",
    category: "security",
    question: {
      fr: "Êtes-vous conformes au RGPD ?",
      en: "Are you GDPR compliant?",
    },
    answer: {
      fr: "Oui. Nous suivons les exigences RGPD : données anonymisées, consentement documenté, droit à l'effacement respecté, registre des traitements maintenu. La Tunisie dispose d'une loi de protection des données compatible.",
      en: "Yes. We follow GDPR requirements: anonymized data, documented consent, right to erasure respected, processing register maintained. Tunisia has a compatible data protection law.",
    },
    links: [],
  },
  {
    id: "sec-access",
    category: "security",
    question: {
      fr: "Quelles mesures de sécurité appliquez-vous ?",
      en: "What security measures do you apply?",
    },
    answer: {
      fr: "VPN entreprise, authentification 2FA, postes chiffrés, politique de mots de passe stricte, audits de sécurité réguliers, séparation des environnements. NDA et clauses de confidentialité dans tous les contrats.",
      en: "Corporate VPN, 2FA authentication, encrypted workstations, strict password policy, regular security audits, environment separation. NDA and confidentiality clauses in all contracts.",
    },
    links: [],
  },
  {
    id: "sec-ip",
    category: "security",
    question: {
      fr: "La propriété intellectuelle est-elle protégée ?",
      en: "Is intellectual property protected?",
    },
    answer: {
      fr: "Tous nos contrats incluent des clauses de cession de PI. Le code, les scripts de test et les livrables sont votre propriété exclusive. Nos équipes n'ont aucun droit de réutilisation.",
      en: "All our contracts include IP assignment clauses. Code, test scripts and deliverables are your exclusive property. Our teams have no right of reuse.",
    },
    links: [],
  },

  // ── Training ISTQB ──
  {
    id: "trn-certifications",
    category: "training",
    question: {
      fr: "Quelles certifications ISTQB proposez-vous ?",
      en: "What ISTQB certifications do you offer?",
    },
    answer: {
      fr: "Nous proposons des formations préparant aux certifications ISTQB Foundation Level (CTFL), Advanced Level Test Analyst et Advanced Level Test Manager. Sessions inter ou intra-entreprise.",
      en: "We offer training for ISTQB Foundation Level (CTFL), Advanced Level Test Analyst and Advanced Level Test Manager certifications. Inter-company or in-house sessions.",
    },
    links: [
      { label: { fr: "Formations", en: "Training" }, href: "/training" },
    ],
  },
  {
    id: "trn-remote",
    category: "training",
    question: {
      fr: "Les formations sont-elles disponibles à distance ?",
      en: "Is training available remotely?",
    },
    answer: {
      fr: "Oui, toutes nos formations sont disponibles en présentiel et en distanciel. Les sessions en ligne utilisent un format interactif avec exercices pratiques et études de cas.",
      en: "Yes, all our training is available on-site and remotely. Online sessions use an interactive format with practical exercises and case studies.",
    },
    links: [
      { label: { fr: "Formations", en: "Training" }, href: "/training" },
    ],
  },
  {
    id: "trn-custom",
    category: "training",
    question: {
      fr: "Proposez-vous des formations sur-mesure ?",
      en: "Do you offer custom training?",
    },
    answer: {
      fr: "Oui, nous concevons des formations adaptées à votre contexte : outils spécifiques, méthodologies, domaines métier. Le programme est co-construit avec vous.",
      en: "Yes, we design training tailored to your context: specific tools, methodologies, business domains. The program is co-designed with you.",
    },
    links: [
      { label: { fr: "Contact", en: "Contact us" }, href: "/#contact" },
    ],
  },
  {
    id: "trn-team",
    category: "training",
    question: {
      fr: "Vos testeurs sont-ils certifiés ?",
      en: "Are your testers certified?",
    },
    answer: {
      fr: "Oui, tous nos QA Engineers sont certifiés ISTQB Foundation Level minimum. Nos seniors détiennent les certifications Advanced Level. La formation continue est intégrée à notre culture.",
      en: "Yes, all our QA Engineers hold at least ISTQB Foundation Level certification. Our seniors hold Advanced Level certifications. Continuous training is part of our culture.",
    },
    links: [],
  },
  {
    id: "trn-duration",
    category: "training",
    question: {
      fr: "Quelle est la durée des formations ?",
      en: "How long are the training sessions?",
    },
    answer: {
      fr: "ISTQB Foundation : 3 jours. Advanced Test Analyst : 3 jours. Advanced Test Manager : 3 jours. Formations sur-mesure : durée adaptée (1 à 5 jours).",
      en: "ISTQB Foundation: 3 days. Advanced Test Analyst: 3 days. Advanced Test Manager: 3 days. Custom training: adapted duration (1 to 5 days).",
    },
    links: [],
  },
];

export function getFaqByCategory(
  category: FaqCategory,
  locale: "fr" | "en"
): { id: string; question: string; answer: string; links: { label: string; href: string }[] }[] {
  return faqEntries
    .filter((e) => e.category === category)
    .map((e) => ({
      id: e.id,
      question: e.question[locale],
      answer: e.answer[locale],
      links: e.links.map((l) => ({ label: l.label[locale], href: l.href })),
    }));
}
