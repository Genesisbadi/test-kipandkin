import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
const FormGenericNotification = dynamic(() =>
  import("../partials/notifications/FormGenericNotification")
);

const NextTopLoader = dynamic(() =>
  import("nextjs-toploader").then((module) => module.default)
);
export default function DefaultLayout(props) {
  const { page, blocks } = props;
  const showLazy = globalState((state) => state.showLazy);
  const Menu = () => {
    const Component = dynamic(() => import("@/layout/partials/Menu"));
    return <Component />;
  };

  const BookingForm = dynamic(() =>
    import("@/components/partials/forms/BookingForm")
  );

  const BackTop = dynamic(() => import("@/components/partials/BackTop"));

  const Footer = dynamic(() => import("@/layout/partials/Footer"));

  const CookieBot = dynamic(() => import("../partials/consent/CookieBot"));
  const InstallButton = dynamic(() => import("../partials/InstallButton"));
  const ShareThis = dynamic(() => import("../partials/sharer/ShareThis"));
  return (
    <>
      <Menu page={page} blocks={blocks} />

      {showLazy && process.env.NEXT_PUBLIC_TEMPLATE == 2 && (
        <BookingForm page={page} blocks={blocks} />
      )}
      <main id="main-content" className="main-content">
        {props.children}
      </main>

      {blocks && blocks?.length <= 2 ? (
        <Footer />
      ) : (
        <>{showLazy && <Footer />}</>
      )}

      {showLazy && <CookieBot />}

      {showLazy && <ShareThis page={page} />}
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
          template='<div class="bar bg-primary" role="bar"><div class="peg"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
      )}

      {showLazy && <FormGenericNotification />}
      {showLazy && <InstallButton />}

      {showLazy && <BackTop />}
    </>
  );
}
