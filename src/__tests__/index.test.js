import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { TranslationProvider } from "../context/TranslationContext";
import store from "../store";
import App from "../App";

// Mock the root element to prevent errors when rendering in test environment
document.body.innerHTML = "<div id='root'></div>";

describe("index.js", () => {
  test("should render App component with necessary providers", () => {
    // Render the App component inside the necessary providers (Redux, TranslationProvider)
    render(
      <Provider store={store}>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </Provider>
    );

    // Check if the main App component renders and displays content correctly
    // For example, check if the title is rendered correctly
    expect(screen.getByText("Book Library")).toBeInTheDocument();
  });
});
