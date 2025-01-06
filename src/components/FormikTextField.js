import React from "react";
import { useFormikContext, getIn } from "formik";
import { TextField } from "@mui/material";

const FormikTextField = ({ name, label, ...props }) => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();

  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  return (
    <TextField
      name={name}
      label={label}
      value={getIn(values, name)}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(fieldTouched && fieldError)}
      helperText={fieldTouched && fieldError ? fieldError : ""}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default FormikTextField;
