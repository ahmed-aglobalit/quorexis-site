"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { NavLink } from "@/config/navigation";

type Props = {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
};

export default function DropdownMenu({ links, isOpen, onClose }: Props) {
  const t = useTranslations("nav");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="menu"
      className="menu-panel-enter absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-white border border-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          role="menuitem"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-muted hover:text-accent hover:bg-foreground/[0.02] transition-colors break-words"
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </div>
  );
}
