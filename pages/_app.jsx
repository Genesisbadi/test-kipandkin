import "tw-elements/dist/css/tw-elements.min.css";
import "@/styles/globals.css";
import "@/styles/customs.css";
import DefaultLayout from "@/components/_layout/DefaultLayout";
import globalState from "@/lib/store/globalState";
import persistentStore from "@/lib/store/persistentStore";
import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

import { Montserrat } from "next/font/google";

const primary = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
  const { page } = pageProps;
  useEffect(() => {
    const locale = page?.locale;
    if (locale) persistentStore.setState({ locale });
  }, [page]);

  useEffect(() => {
    globalState.setState({ ready: true });
    const handleInteraction = () => {
      globalState.setState({
        showLazy: true,
      });
    };
    document.addEventListener("scroll", handleInteraction, { passive: true });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });
  }, []);
  return (
    <div
      className={`text-dim-black ${primary.className} text-[16px] flex flex-col min-h-[100vh]`}
    >
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
      <NextTopLoader
        color="#691A31"
        initialPosition={0.08}
        crawlSpeed={100}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={100}
        shadow="0 0 10px #691A31,0 0 5px #691A31"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
    </div>
  );
}
