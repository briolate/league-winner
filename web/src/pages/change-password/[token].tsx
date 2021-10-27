import React, { useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { useChangePasswordMutation } from "../../generated/graphql";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Formik
      initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          newPassword: values.newPassword,
          token:
            typeof router.query.token === "string" ? router.query.token : "",
        });
        if (response.data?.changePassword.errors) {
          const errorMap = toErrorMap(response.data.changePassword.errors);
          if ("token" in errorMap) {
            setTokenError(errorMap.token);
          }
          setErrors(toErrorMap(response.data.changePassword.errors));
        } else if (response.data?.changePassword.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="newPassword"
            placeholder="New Password"
            label="New Password"
            type="password"
          />

          {isSubmitting ? (
            <p>Submitting</p>
          ) : (
            <button type="submit">Change password</button>
          )}
          {tokenError ? (
            <>
              <p>{tokenError}</p>
              <NextLink href="/forgot-password">
                Click here for new one
              </NextLink>
            </>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
