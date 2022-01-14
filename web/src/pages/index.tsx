import React from "react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import Layout from "../components/Layout/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLeaguesQuery } from "../generated/graphql";

const Index = () => {
  const [{ data, fetching }] = useLeaguesQuery({
    variables: {
      limit: 10,
    },
  });

  if (!fetching && !data) {
    return (
      <div>
        You have no leagues! Create one
        <NextLink href="/create-league">
          <span className="link">here</span>
        </NextLink>
      </div>
    );
  }

  console.log(data);

  return (
    <Layout>
      <NextLink href="/create-league">Create League</NextLink>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <div className="leagueList">
          {data!.leagues.map((league) => (
            <div className="leagueItem" key={league.id}>
              <p>{league.name}</p>
              <p>{league.descriptionSnippet}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
