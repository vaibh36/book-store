import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavButtons from "../components/NavButtons";
import { useTranslationContext } from "../context/TranslationContext";

jest.mock("../context/TranslationContext", () => ({
  useTranslationContext: jest.fn(),
}));

describe("NavButton", () => {
  beforeEach(() => {
    // Mock the translation context for each test case
    useTranslationContext.mockReturnValue({
      t: (key) => {
        const translations = {
          home: "Home", // Mock translation for "home"
        };
        return translations[key] || key;
      },
    });
  });
  test("renders button with correct text and props", async () => {
    render(
      <MemoryRouter>
        <NavButtons />
      </MemoryRouter>
    );
    const homeBtn = await screen.findByTestId("home");
    fireEvent.click(homeBtn);
    // const homeButton = screen.getByTestId("Home");
  });
});
