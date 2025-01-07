import React from "react";
import { TranslationContext } from "./TranslationContext";

export const MockTranslationProvider = ({ children }) => {
  const mockTranslations = {
    bookInformation: "Book Information",
    title: "Title",
    author: "Author",
    price: "Price",
    status: "Status",
    close: "Close",
    unreadBooks: "Unread Books",
    noBooksFound: "No books found",
  };

  const mockContextValue = {
    t: (key) => mockTranslations[key] || key,
  };

  return (
    <TranslationContext.Provider value={mockContextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
