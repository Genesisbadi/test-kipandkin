import Menu from "@/layout/partials/Menu";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
// import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const NextTopLoader = dynamic(() =>
  import("nextjs-toploader").then((module) => module.default)
);

const BookingForm = dynamic(
  () => import("@/components/partials/forms/BookingForm"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const BookingFormFake = dynamic(
  () => import("@/components/partials/forms/BookingForm"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function DefaultLayout(props) {
  const { page, blocks } = props;
  const showLazy = globalState((state) => state.showLazy);
  const Footer = () => {
    const Component = dynamic(() => import("@/layout/partials/Footer"));
    return <Component />;
  };
  return (
    <>
      <Menu page={page} blocks={blocks} />

      {!showLazy && <BookingFormFake page={page} blocks={blocks} />}
      {showLazy && <BookingForm page={page} blocks={blocks} />}

      <main id="main-content" className="main-content grow">
        {props.children}
      </main>
      {showLazy && <Footer />}
      {showLazy && (
        <>
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="7054889a-af36-421c-a37f-2093f8f0e978"
            data-blockingmode="auto"
            type="text/javascript"
          />
          <Script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/7054889a-af36-421c-a37f-2093f8f0e978/cd.js"
            type="text/javascript"
          />
        </>
      )}

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
