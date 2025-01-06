import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import BookCard from "../components/BookCard"; // Adjust the import path
import rootReducer from "../store";
import { configureStore } from "@reduxjs/toolkit"; // Add this import
import thunk from "redux-thunk";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));

const store = configureStore({
  reducer: rootReducer, // Use the actual rootReducer or a mock one
  preloadedState: {
    // Optionally define initial state if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware,
});

describe("BookCard Component", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    price: "$10.00",
    read: false,
  };

  test("renders book details", () => {
    render(<BookCard book={mockBook} />);

    expect(wrapper).toMatchSnapshot();
  });
});
