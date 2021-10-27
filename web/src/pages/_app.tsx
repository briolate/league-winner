import "../styles/globals.css";
import "../components/Wrapper/Wrapper.scss";
import "../components/Navbar/Navbar.scss";
import "../components/Layout/Layout.scss";

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
