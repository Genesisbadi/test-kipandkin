import "tw-elements/dist/css/tw-elements.min.css";
import "@/styles/globals.css";
import "@/styles/customs.css";
import DefaultLayout from "@/components/_layout/DefaultLayout";
import globalState from "@/lib/store/globalState";
import persistentStore from "@/lib/store/persistentStore";
import { useEffect } from "react";

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
    </div>
  );
}
