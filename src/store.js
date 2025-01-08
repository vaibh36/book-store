import { configureStore, createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    filter: "all",
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    toggleReadStatus: (state, action) => {
      const book = state.books.find((b) => b.id === action.payload);
      if (book) {
        book.read = !book.read;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    editBook: (state, action) => {
      const updatedBook = action.payload;

      const index = state.books.findIndex((b) => b?.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = { ...updatedBook };
      }
    },
  },
});

export const { addBook, toggleReadStatus, setFilter, editBook } =
  booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export default store;
