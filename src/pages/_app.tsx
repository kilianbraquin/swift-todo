import "@/styles/globals.css";
import * as Fathom from "fathom-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load("HCAHLFVJ", {
      includedDomains: ["yourdomain.com"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
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
