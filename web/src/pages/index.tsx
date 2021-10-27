import React from "react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import Layout from "../components/Layout/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLeaguesQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useLeaguesQuery();

  console.log(data);

  return (
    <Layout>
      <NextLink href="/create-league">Create League</NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.leagues.map((league) => <div key={league.id}>{league.name}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
