import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { Field, ErrorMessage } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <Field
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? (
        <ErrorMessage
          name={props.name}
          component="div"
          render={() => <div>{error}</div>}
        />
      ) : null}
    </>
  );
};
