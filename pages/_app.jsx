import "@/styles/globals.css";
import "@/styles/customs.css";
import DefaultLayout from "@/components/_layout/DefaultLayout";
import globalState from "@/lib/store/globalState";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import ShowLazy from "@/lib/services/showLazy";
import Header from "@/layout/partials/Header";

export default function App({ Component, pageProps }) {
  const TenantScripts = dynamic(() =>
    import("@/layout/partials/TenantScripts")
  );
  const showLazy = globalState((state) => state.showLazy);
  const { page, blocks } = pageProps;
  ShowLazy();

  useEffect(() => {
    globalState.setState({ ready: true });

    const micrositeId = process.env.NEXT_PUBLIC_MICROSITE_ID;
    if (micrositeId == 7) {
      document.body.style.fontFamily = `"Circular", sans-serif`;
    } else {
      document.body.style.fontFamily = `"Gotham", sans-serif`;
    }
  }, []);

  return (
    <>
      <Header page={page} meta={page?.metaData} />
      <div className={`text-[#555] text-[16px] flex flex-col min-h-[102vh]`}>
        <DefaultLayout page={page} blocks={blocks}>
          <Component {...pageProps} />
        </DefaultLayout>
      </div>

      <TenantScripts />
    </>
  );
}
