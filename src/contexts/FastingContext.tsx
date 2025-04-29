
import { createContext, useContext } from "react";
import { FastingContextType } from "../types/fasting.types";

const FastingContext = createContext<FastingContextType | undefined>(undefined);

export const useFasting = (): FastingContextType => {
  const context = useContext(FastingContext);
  if (context === undefined) {
    throw new Error("useFasting must be used within a FastingProvider");
  }
  return context;
};

export { FastingContext };
