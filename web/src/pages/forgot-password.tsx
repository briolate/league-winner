import React, { useState } from "react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { useForgotPasswordMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper/Wrapper";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <p>An email has been sent to this address</p>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />
              {isSubmitting ? (
                <p>Submitting</p>
              ) : (
                <NextLink href="/forgot-password">Forgot password?</NextLink>
              )}
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
