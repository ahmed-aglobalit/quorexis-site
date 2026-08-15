"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import DemoNav from "./DemoNav";
import DemoFloatingCTA from "./DemoFloatingCTA";

interface DemoContextType {
  activeWeek: number;
  setActiveWeek: (week: number) => void;
  scrollToWeek: (week: number) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemoContext() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoContext must be used within DemoContainer");
  return ctx;
}

const WEEK_IDS = ["demo-intro", "demo-week-1", "demo-week-2", "demo-week-3", "demo-week-4", "demo-summary"];

interface DemoContainerProps {
  children: ReactNode;
}

export default function DemoContainer({ children }: DemoContainerProps) {
  const [activeWeek, setActiveWeek] = useState(0);

  const scrollToWeek = useCallback((week: number) => {
    const id = WEEK_IDS[week];
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <DemoContext.Provider value={{ activeWeek, setActiveWeek, scrollToWeek }}>
      <div id="quorexis-demo" className="relative">
        <DemoNav />
        <DemoFloatingCTA />
        {children}
      </div>
    </DemoContext.Provider>
  );
}
