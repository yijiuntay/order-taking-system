import "@/styles/globals.css";
import { Comic_Neue } from "next/font/google";

const comicNeue = Comic_Neue({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={comicNeue.className}>
      <Component {...pageProps} />
    </main>
  );
}
