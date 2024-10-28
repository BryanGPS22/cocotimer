"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Membuat Context untuk Font
interface FontContextType {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

// Komponen FontProvider
export const FontProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFont, setSelectedFont] = useState<string>("font-alarm-clock"); // Font default

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      {children}
    </FontContext.Provider>
  );
};

// Custom Hook untuk menggunakan FontContext
export const useFont = () => {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }

  return context;
};
