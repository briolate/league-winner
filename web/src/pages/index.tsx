import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Navbar from "../components/Navbar";

const Index = () => (
  <>
    <Navbar />
    Other stuff
  </>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
