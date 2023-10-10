import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { TextFieldProps } from "@mui/material";

const FMTextField = React.forwardRef((props: TextFieldProps, ref) => {
  return <Field component={TextField} inputProps={{ ref }} {...props} />;
});

export default FMTextField;
