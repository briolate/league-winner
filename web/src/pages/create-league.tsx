import React from "react";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreateLeagueMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { useIsAuth } from "../utils/useIsAuth";
import Layout from "../components/Layout/Layout";

const CreateLeague: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createLeague] = useCreateLeagueMutation();

  return (
    <Layout>
      <Formik
        initialValues={{ name: "", memberCount: 0 }}
        onSubmit={async (values) => {
          // Add validation here
          const { error } = await createLeague({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="name"
              placeholder="League name"
              label="League name"
            />
            <InputField
              name="memberCount"
              placeholder="Ex: 10 or 12"
              label="Number of members"
              type="number"
            />
            {isSubmitting ? (
              <p>Submitting</p>
            ) : (
              <button type="submit">Create League</button>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateLeague);
