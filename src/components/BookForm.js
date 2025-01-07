import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { addBook, editBook } from "../store";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { bookFormValidationSchema, bookInitialState } from "../utils/schema";
import FormikTextField from "./FormikTextField";
import { useLocation } from "react-router-dom";
import isEmpty from "lodash.isempty";
import { useTranslationContext } from "../context/TranslationContext";

const BookForm = ({ book = {} }) => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();
  const { t } = useTranslationContext();
  const {
    id = "",
    title = "",
    author = "",
    price = "",
  } = location?.state || {};

  const initialState = {
    author,
    title,
    price,
  };

  const validationSchema = bookFormValidationSchema;

  const handleSubmit = (values, { resetForm }) => {
    if (isEmpty(location?.state)) {
      dispatch(
        addBook({
          id: Date.now(),
          title: values?.title,
          author: values?.author,
          read: false,
          price: values?.price,
        })
      );
      resetForm();
      setOpenSnackbar(true);
    }

    if (!isEmpty(location?.state)) {
      dispatch(
        editBook({
          id,
          title: values?.title,
          author: values?.author,
          price: values?.price,
        })
      );
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={bookInitialState(initialState)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <FormikTextField
              name="title"
              label={t.bookTitle}
              data-testid="title"
            />
            <FormikTextField
              name="author"
              label={t.authLabel}
              data-testid="author"
            />
            <FormikTextField
              name="price"
              label={t.priceLable}
              data-testid="price"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add_book"
            >
              {isEmpty(location?.state) ? t.addBook : t.editBook}
            </Button>
            <Button variant="contained" color="primary" onClick={resetForm}>
              {t.reset}
            </Button>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {t.bookAdded}
            </Alert>
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
