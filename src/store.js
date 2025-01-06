import { configureStore, createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
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
  },
});

export const { addBook, toggleReadStatus, setFilter } = booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export default store;
