import React from "react";
import Navbar from "../Navbar/Navbar";
import Wrapper from "../Wrapper/Wrapper";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
