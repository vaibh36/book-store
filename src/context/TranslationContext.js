import React, { createContext, useContext, useState } from "react";
import { translations } from "../constants/translations";

export const TranslationContext = createContext();

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <TranslationContext.Provider value={{ t, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
