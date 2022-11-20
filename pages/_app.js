import Navbar from "../src/components/Navbar";
import "../styles/globals.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
  );
}

export default MyApp;
