import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { addBook } from "../store";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { bookFormValidationSchema, bookInitialState } from "../utils/schema";
import FormikTextField from "./FormikTextField";

const BookForm = () => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = bookFormValidationSchema;

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addBook({
        id: Date.now(),
        title: values.title,
        author: values.author,
        read: false,
      })
    );
    resetForm();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Formik
      initialValues={bookInitialState}
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
              Add Book
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
