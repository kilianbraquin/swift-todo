import "@/styles/globals.css";
import * as Fathom from "fathom-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("HCAHLFVJ", {
      includedDomains: ["brave-stunning.mreska.com"],
      url: "https://brave-stunning.mreska.com/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>IndieBaie Studio</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
