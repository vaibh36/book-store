import React, { useEffect } from "react";
import { ThemeProvider, Box } from "@mui/material";
import BookForm from "./components/BookForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AllBooks from "./components/AllBooks";
import { theme } from "../src/theme";
import NavButtons from "./components/NavButtons";
import "./App.css";
import {
  TranslationProvider,
  useTranslationContext,
} from "./context/TranslationContext";
import { useSelector } from "react-redux";
import EditPage from "./pages/EditPage";

function App() {
  const { t } = useTranslationContext();
  const books = useSelector((state) => state.books);
  const navigate = useNavigate();

  useEffect(() => {
    if (books?.books?.length === 0) {
      navigate("/");
    }
  }, [books]);

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Box sx={{ textAlign: "center", my: 4 }}>
            <h1>{t.bookLibrary}</h1>
            <NavButtons />
          </Box>
        </div>
        <Routes>
          <Route path="/" element={<BookForm />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<EditPage />} />
        </Routes>
      </ThemeProvider>
    </TranslationProvider>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
