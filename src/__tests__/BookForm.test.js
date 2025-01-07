import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import BookForm from "../components/BookForm";
import { addBook } from "../store";
import { MockTranslationProvider } from "../context/TestTranslatationContext";

jest.mock("../store", () => ({
  addBook: jest.fn(),
  editBook: jest.fn(),
}));

const mockStore = createStore((state) => state);

describe("BookForm Component", () => {
  test("renders form for adding a book and dispatches addBook action on submit", async () => {
    const container = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MockTranslationProvider>
            <BookForm />
          </MockTranslationProvider>
        </MemoryRouter>
      </Provider>
    );

    const titleContainer = await screen.findByTestId("title");
    const titleInput = within(titleContainer).getByRole("textbox");

    fireEvent.change(titleInput, {
      target: { value: "Test Booknnnnnnnnnnnnnnnnnnnnnnnnn" },
    });

    const authorContainer = await screen.findByTestId("author");
    const authorInput = within(authorContainer).getByRole("textbox");
    fireEvent.change(authorInput, {
      target: { value: "Test Authornnnnnnnnnnnnnnnnnn" },
    });

    const priceContainer = await screen.findByTestId("price");
    const priceInput = within(priceContainer).getByRole("textbox");
    fireEvent.change(priceInput, {
      target: { value: 10 },
    });

    fireEvent.click(await screen.findByTestId("add_book"));
    console.log(container.container.innerHTML);

    await waitFor(() => {
      expect(addBook).toHaveBeenCalledWith({
        id: expect.any(Number),
        title: "Test Booknnnnnnnnnnnnnnnnnnnnnnnnn",
        author: "Test Authornnnnnnnnnnnnnnnnnn",
        price: "10",
        read: false,
      });
    });
  });
});
