import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import styles from '../src/styles/globals.css';  // Import module CSS

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <div >
      <Header />
    </div>
    <div >

      <Component {...pageProps} />
    </div>
      <Footer />
    </>
  );
}
