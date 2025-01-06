import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import BookCard from "../components/BookCard";

import configureStore from "redux-mock-store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));
const initialState = {};

const mockStore = configureStore([]);

describe("BookCard Component", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    price: "$10.00",
    read: false,
  };

  test("snapshot test case", () => {
    const wrapper = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <BookCard book={mockBook} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
  test("open dialog test", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <BookCard book={mockBook} />
        </MemoryRouter>
      </Provider>
    );
    const infoIcon = await screen.findByTestId("info__icon");
    fireEvent.click(infoIcon);
  });
  test("close btn click", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <BookCard book={mockBook} />
        </MemoryRouter>
      </Provider>
    );
    const infoIcon = await screen.findByTestId("info__icon");
    fireEvent.click(infoIcon);
    const closeBtn = await screen.findByTestId("close__btn");
    fireEvent.click(closeBtn);
  });
  test("read unread toggle click", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <BookCard book={mockBook} />
        </MemoryRouter>
      </Provider>
    );
    const readToggler = await screen.findByTestId("read__btn");
    fireEvent.click(readToggler);
  });
});
