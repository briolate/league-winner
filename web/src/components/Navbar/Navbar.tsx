import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href="/login">Login</NextLink>
        <NextLink href="/register">Register</NextLink>
      </>
    );
  } else {
    body = (
      <>
        {data.me.username}
        {logoutFetching ? (
          <p>Logging out</p>
        ) : (
          <button
            className="btn"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}
      </>
    );
  }

  return (
    <div className="navbar">
      <div className="navbody">{body}</div>
    </div>
  );
};

export default Navbar;
