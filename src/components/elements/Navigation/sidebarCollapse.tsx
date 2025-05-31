'use client';

import { createContext, useContext, useState } from 'react';

type SidebarCollapseContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarCollapseContext = createContext<SidebarCollapseContextType | undefined>(undefined);

export function SidebarCollapseProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <SidebarCollapseContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarCollapseContext.Provider>
  );
}

export function useSidebarCollapse() {
  const ctx = useContext(SidebarCollapseContext);
  if (!ctx) throw new Error('useSidebarCollapse must be used within SidebarCollapseProvider');
  return ctx;
}
