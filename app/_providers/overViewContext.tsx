"use client";
// context/OverViewContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context
type OverViewContextType = {
  overView: boolean;
  setOverView: (overView: boolean) => void;
};

// Create the context
const OverViewContext = createContext<OverViewContextType | undefined>(
  undefined
);

// Provider component
export const OverViewProvider = ({ children }: { children: ReactNode }) => {
  const [overView, setOverView] = useState<boolean>(false);

  return (
    <OverViewContext.Provider value={{ overView, setOverView }}>
      {children}
    </OverViewContext.Provider>
  );
};

// Custom hook
export const useOverView = () => {
  const context = useContext(OverViewContext);
  if (!context) {
    throw new Error("useOverView must be used within OverViewProvider");
  }
  return context;
};
