import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { addBook, editBook } from "../store";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { bookFormValidationSchema, bookInitialState } from "../utils/schema";
import FormikTextField from "./FormikTextField";
import { useLocation } from "react-router-dom";
import isEmpty from "lodash.isempty";

const BookForm = ({ book = {} }) => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();
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
            <FormikTextField name="title" label="Book Title" />
            <FormikTextField name="author" label="Author" />
            <FormikTextField name="price" label="Price" />
            <Button type="submit" variant="contained" color="primary">
              {isEmpty(location?.state) ? "Add Book" : "Edit Book"}
            </Button>
            <Button variant="contained" color="primary" onClick={resetForm}>
              Reset
            </Button>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Book added successfully!
            </Alert>
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
