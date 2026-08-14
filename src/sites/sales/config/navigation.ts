export type NavLink = {
  labelKey: string;
  href: string;
};

export type DropdownConfig = {
  links: NavLink[];
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

export type NavItem = NavItemDropdown | NavItemLink;

export const salesNavigationItems: NavItem[] = [
  {
    type: "dropdown",
    key: "solutions",
    labelKey: "solutions",
    dropdown: {
      links: [
        { labelKey: "b2bData", href: "/solutions/b2b-data" },
        { labelKey: "coldEmail", href: "/solutions/cold-email" },
        { labelKey: "linkedinOutreach", href: "/solutions/linkedin-outreach" },
        { labelKey: "coldCalling", href: "/solutions/cold-calling" },
        { labelKey: "sdrOutsourcing", href: "/solutions/sdr-outsourcing" },
        { labelKey: "salesAutomation", href: "/solutions/sales-automation" },
      ],
    },
  },
  {
    type: "link",
    key: "method",
    labelKey: "method",
    href: "/method",
  },
  {
    type: "dropdown",
    key: "industries",
    labelKey: "industries",
    dropdown: {
      links: [
        { labelKey: "esn", href: "/industries/esn" },
        { labelKey: "saas", href: "/industries/saas" },
        { labelKey: "cybersecurity", href: "/industries/cybersecurity" },
        { labelKey: "recruitment", href: "/industries/recruitment" },
        { labelKey: "professionalServices", href: "/industries/professional-services" },
      ],
    },
  },
  {
    type: "link",
    key: "about",
    labelKey: "about",
    href: "/about",
  },
];
