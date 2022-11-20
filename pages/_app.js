import Navbar from "../src/components/Navbar";
import "../styles/globals.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div class="bg">
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </div>
    </>
  );
}

export default MyApp;
