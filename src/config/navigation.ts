// Navigation configuration for Header mega-menu and dropdowns.
// All labels are i18n keys resolved via useTranslations("nav") in components.

export type NavLink = {
  labelKey: string;
  href: string;
};

export type ColumnGroup = {
  titleKey: string;
  links: NavLink[];
};

export type MegaTab = {
  key: string;
  labelKey: string;
  columns: ColumnGroup[];
};

export type MegaMenuConfig = {
  tabs: MegaTab[];
  otherLinks: NavLink[];
};

export type DropdownConfig = {
  links: NavLink[];
};

export type NavItemMega = {
  type: "mega";
  key: string;
  labelKey: string;
  mega: MegaMenuConfig;
};

export type NavItemDropdown = {
  type: "dropdown";
  key: string;
  labelKey: string;
  dropdown: DropdownConfig;
};

export type NavItemLink = {
  type: "link";
  key: string;
  labelKey: string;
  href: string;
};

export type NavItem = NavItemMega | NavItemDropdown | NavItemLink;

// ── Services mega-menu ──

const servicesMega: MegaMenuConfig = {
  tabs: [
    {
      key: "services",
      labelKey: "servicesTab",
      columns: [
        {
          titleKey: "coreTestingTitle",
          links: [
            { labelKey: "functionalTesting", href: "/services/functional-testing" },
            { labelKey: "testAutomation", href: "/services/test-automation" },
            { labelKey: "apiTesting", href: "/services/api-testing" },
            { labelKey: "performanceTesting", href: "/services/performance-testing" },
            { labelKey: "accessibilityTesting", href: "/services/accessibility-testing" },
          ],
        },
        {
          titleKey: "advancedTitle",
          links: [
            { labelKey: "exploratoryTesting", href: "/services/exploratory-testing" },
            { labelKey: "regressionTesting", href: "/services/regression-testing" },
            { labelKey: "uatSystemTesting", href: "/services/uat-system-testing" },
            { labelKey: "compatibilityTesting", href: "/services/compatibility-testing" },
          ],
        },
        {
          titleKey: "governanceTitle",
          links: [
            { labelKey: "qaGovernance", href: "/services/qa-governance" },
            { labelKey: "qaAudit", href: "/services/qa-audit" },
            { labelKey: "testStrategy", href: "/services/test-strategy" },
          ],
        },
      ],
    },
    {
      key: "testingLevels",
      labelKey: "testingLevelsTab",
      columns: [
        {
          titleKey: "testingLevelsTab",
          links: [
            { labelKey: "smokeTesting", href: "/services/smoke-testing" },
            { labelKey: "systemTesting", href: "/services/system-testing" },
            { labelKey: "integrationTesting", href: "/services/integration-testing" },
            { labelKey: "uat", href: "/services/uat" },
            { labelKey: "regressionTesting", href: "/services/regression-testing" },
          ],
        },
      ],
    },
    {
      key: "platforms",
      labelKey: "platformsTab",
      columns: [
        {
          titleKey: "platformsTab",
          links: [
            { labelKey: "webApps", href: "/services/web-testing" },
            { labelKey: "mobileApps", href: "/services/mobile-testing" },
            { labelKey: "desktopApps", href: "/services/desktop-testing" },
            { labelKey: "apiTesting", href: "/services/api-testing" },
          ],
        },
      ],
    },
    {
      key: "governance",
      labelKey: "governanceTab",
      columns: [
        {
          titleKey: "governanceTab",
          links: [
            { labelKey: "qaGovernance", href: "/services/qa-governance" },
            { labelKey: "qualityGates", href: "/services/quality-gates" },
            { labelKey: "defectTriage", href: "/services/defect-triage" },
          ],
        },
      ],
    },
  ],
  otherLinks: [
    { labelKey: "training", href: "/training" },
    { labelKey: "blog", href: "/blog" },
  ],
};

// ── Navigation items ──

export const navigationItems: NavItem[] = [
  {
    type: "mega",
    key: "services",
    labelKey: "services",
    mega: servicesMega,
  },
  {
    type: "dropdown",
    key: "knowledgeBase",
    labelKey: "knowledgeBase",
    dropdown: {
      links: [
        { labelKey: "blog", href: "/blog" },
        { labelKey: "whitepapers", href: "/whitepapers" },
        { labelKey: "webinars", href: "/webinars" },
        { labelKey: "training", href: "/training" },
      ],
    },
  },
  {
    type: "link",
    key: "clients",
    labelKey: "clients",
    href: "/#clients",
  },
  {
    type: "link",
    key: "training",
    labelKey: "training",
    href: "/training",
  },
];
