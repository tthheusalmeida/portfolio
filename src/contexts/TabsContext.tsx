"use client";

import { createContext, useContext, useState } from "react";

export type TabsContextType = {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType>({
  activeTab: null,
  setActiveTab: () => {},
});

export function useTabs() {
  return useContext(TabsContext);
}

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
