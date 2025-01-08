import * as Yup from "yup";

export const bookFormValidationSchema = Yup.object({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .required("Title is required"),
  author: Yup.string().required("Author is required"),
  price: Yup.number()
    .typeError("Price must be a valid number")
    .positive("Price must be a positive number")
    .required("Price is required"),
});

export const bookInitialState = (book = {}) => {
  return {
    title: book?.title || "",
    author: book?.author || "",
    price: book?.price || "",
  };
};
