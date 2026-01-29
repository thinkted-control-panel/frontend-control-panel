"use client";

import { createContext, useContext, ReactNode } from "react";

const ExampleContext = createContext(null);

export const ExampleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ExampleContext.Provider value={null}>{children}</ExampleContext.Provider>
  );
};

export const useExampleContext = () => useContext(ExampleContext);
