import { configureStore } from "@reduxjs/toolkit";
import booksSlice, {
  addBook,
  toggleReadStatus,
  setFilter,
  editBook,
} from "../store";

describe("booksSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        books: booksSlice.getState().books,
      },
    });
  });

  test("should return the initial state", () => {
    const state = booksSlice.getState().books;
    expect(state).toEqual({
      books: [],
      filter: "all",
    });
  });

  test("should add a book", () => {
    const newBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      price: "$10.00",
      read: false,
    };

    booksSlice.dispatch(addBook(newBook));

    expect(booksSlice.getState().books.books).toContainEqual(newBook);
  });

  test("should toggle the read status of a book", () => {
    const newBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      price: "$10.00",
      read: false,
    };

    booksSlice.dispatch(toggleReadStatus(newBook.id));

    expect(booksSlice.getState().books.books[0].read).toBe(true);
  });

  test("should edit a book", () => {
    const newBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      price: "$10.00",
      read: false,
    };

    booksSlice.dispatch(addBook(newBook));

    const updatedBook = {
      id: 1,
      title: "Updated Book",
      author: "Updated Author",
      price: "$12.00",
      read: false,
    };

    booksSlice.dispatch(editBook(updatedBook));

    expect(booksSlice.getState().books.books[0].read).toEqual(updatedBook.read);
  });
});
