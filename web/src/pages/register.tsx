import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ options: values });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="username" placeholder="username" label="Username" />
          <InputField name="email" placeholder="email" label="email" />
          <InputField
            name="password"
            placeholder="password"
            label="Password"
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
