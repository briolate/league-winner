import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

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
          router.push("/");
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
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
