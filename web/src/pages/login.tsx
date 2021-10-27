import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { useLoginMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterProps {}

const Login: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          if (typeof router.query.next === "string") {
            router.push(router.query.next || "");
          } else {
            router.push("/");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="usernameOrEmail"
            placeholder="Username or Email"
            label="Username or Email"
          />
          <InputField
            name="password"
            placeholder="password"
            label="Password"
            type="password"
          />
          <NextLink href="/forgot-password">Forgot password?</NextLink>
          {isSubmitting ? (
            <p>Submitting</p>
          ) : (
            <button type="submit">Login</button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
