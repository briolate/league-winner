import React from "react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { useRegisterMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

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
          {isSubmitting ? (
            <p>Submitting</p>
          ) : (
            <button type="submit">Register</button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
