import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import BookForm from "../components/BookForm";
import { addBook } from "../store";

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
          <BookForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Book Title/i), {
      target: { value: "Test Booknnnnnnnnnnnnnnnnnnnnnnnnn" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Authornnnnnnnnnnnnnnnnnn" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText(/Add Book/i));
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
