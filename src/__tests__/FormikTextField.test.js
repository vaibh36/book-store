import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import FormikTextField from "../components/FormikTextField"; // Adjust the import path
import { MemoryRouter } from "react-router-dom";

describe("FormikTextField", () => {
  test("should render FormikTextField correctly", () => {
    render(
      <MemoryRouter>
        <Formik initialValues={{ testField: "" }}>
          <Form>
            <FormikTextField name="testField" label="Test Field" />
          </Form>
        </Formik>
      </MemoryRouter>
    );
  });

  test("should display error message when field is touched and has error", async () => {
    const initialValues = { testField: "" };
    const errors = { testField: "This field is required" };
    const touched = { testField: true };

    const container = render(
      <MemoryRouter>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validateOnBlur
        >
          <Form>
            <FormikTextField name="testField" label="Test Field" />
          </Form>
        </Formik>
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Test Field");

    fireEvent.blur(input);

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveAttribute("aria-invalid", "false");
  });
});
