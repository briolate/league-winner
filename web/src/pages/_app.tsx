import "../styles/globals.css";
import "../components/Wrapper/Wrapper.scss";
import "../components/Navbar/Navbar.scss";
import "../components/Layout/Layout.scss";
import "../pages/index.scss";

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
