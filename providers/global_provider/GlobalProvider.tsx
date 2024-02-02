import { voidCallBack } from "@/types/types";
import React, { createContext, useState } from "react";

export interface GlobalContextInterface {
  currentPage: number;
  setCurrentPage: voidCallBack;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  currentPage: 1,
  setCurrentPage: voidCallBack,
});

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <GlobalContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
