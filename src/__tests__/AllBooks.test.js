import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AllBooks from "../pages/AllBooks";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { MockTranslationProvider } from "../context/TestTranslatationContext";

const mockStore = configureStore([]);
const initialState = {};

// Mock useSelector from react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock useSearchParams from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("AllBooks Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all books by default", () => {
    useSelector.mockReturnValue({
      books: [
        { id: 1, title: "Book 1", read: false },
        { id: 2, title: "Book 2", read: true },
      ],
    });
    useSearchParams.mockReturnValue([new URLSearchParams()]);

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <MockTranslationProvider>
            <AllBooks />
          </MockTranslationProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Book 1")).toBeInTheDocument();
  });

  test("renders read books when filter is 'read'", () => {
    useSelector.mockReturnValue({
      books: [
        { id: 1, title: "Book 1", read: false },
        { id: 2, title: "Book 2", read: true },
      ],
    });
    useSearchParams.mockReturnValue([new URLSearchParams("filter=read")]);

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <MockTranslationProvider>
            <AllBooks />
          </MockTranslationProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Read Books")).toBeInTheDocument();
    expect(screen.queryByText("Book 1")).not.toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  test("renders unread books when filter is 'unread'", () => {
    useSelector.mockReturnValue({
      books: [
        { id: 1, title: "Book 1", read: false },
        { id: 2, title: "Book 2", read: true },
      ],
    });
    useSearchParams.mockReturnValue([new URLSearchParams("filter=unread")]);

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <MockTranslationProvider>
            <AllBooks />
          </MockTranslationProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Unread Books")).toBeInTheDocument();
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.queryByText("Book 2")).not.toBeInTheDocument();
  });

  test("shows 'No books found' when there are no filtered books", () => {
    useSelector.mockReturnValue({
      books: [
        { id: 1, title: "Book 1", read: true },
        { id: 2, title: "Book 2", read: true },
      ],
    });
    useSearchParams.mockReturnValue([new URLSearchParams("filter=unread")]);

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <MockTranslationProvider>
            <AllBooks />
          </MockTranslationProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("No books found")).toBeInTheDocument();
  });
});
