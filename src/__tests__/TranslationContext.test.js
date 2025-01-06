import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TranslationProvider,
  useTranslationContext,
} from "../context/TranslationContext";
import { translations } from "../constants/translations";

// Mocking the translations for simplicity
jest.mock("../constants/translations", () => ({
  translations: {
    en: {
      allBooks: "All Books",
      readBooks: "Read Books",
      unreadBooks: "Unread Books",
      bookLibrary: "Book Library",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      home: "Home",
    },
    fr: {
      allBooks: "Tous les livres",
      readBooks: "Livres lus",
      unreadBooks: "Livres non lus",
      bookLibrary: "Bibliothèque de livres",
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
      home: "Accueil",
    },
  },
}));

// Helper component to test context usage
const TestComponent = () => {
  const { t, setLanguage } = useTranslationContext();

  return (
    <div>
      <p>{t.bookLibrary}</p>
      <button onClick={() => setLanguage("fr")}>Switch to French</button>
    </div>
  );
};

describe("TranslationContext", () => {
  test("should render translations based on default language (en)", () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    // Check that the initial translation is in English
    expect(screen.getByText("Book Library")).toBeInTheDocument();
  });

  test("should switch translations when language is changed", () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    // Check initial language (English)
    expect(screen.getByText("Book Library")).toBeInTheDocument();

    // Change language to French
    fireEvent.click(screen.getByText("Switch to French"));

    // Check that the translation updates to French
    expect(screen.getByText("Bibliothèque de livres")).toBeInTheDocument();
  });

  test("should throw an error if useTranslationContext is used outside TranslationProvider", () => {
    const ErrorComponent = () => {
      useTranslationContext(); // This should throw an error
      return null;
    };

    // Expect the error to be thrown when the context is used outside the provider
    expect(() => render(<ErrorComponent />)).toThrowError(
      "useTranslationContext must be used within a TranslationProvider"
    );
  });
});
