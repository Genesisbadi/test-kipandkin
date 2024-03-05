import Menu from "@/layout/partials/Menu";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
import NextTopLoader from "nextjs-toploader";

export default function DefaultLayout(props) {
  const showLazy = globalState((state) => state.showLazy);
  const Footer = () => {
    const Component = dynamic(() => import("@/layout/partials/Footer"));
    return <Component />;
  };
  return (
    <>
      <Menu />
      <main id="main-content" className="main-content grow">
        {props.children}
      </main>
      {showLazy && <Footer />}

      {showLazy && (
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
          template='<div class="bar" role="bar"><div class="peg"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
      )}
    </>
  );
}
