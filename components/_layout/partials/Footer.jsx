import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";

export default function Footer() {
  const showLazy = globalState((state) => state.showLazy);
  const FooterDestinations = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterDestinations")
  );

  const FooterConnections = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterConnections")
  );

  const FooterSocial = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterSocial")
  );

  const FooterJuicer = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterJuicer")
  );

  const FooterMenu = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterMenu")
  );

  const FooterNewsletter = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterNewsletter")
  );

  const FooterReviews = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterReviews")
  );

  const FooterCallToActions = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterCallToActions")
  );

  return (
    <footer className="footer">
      {showLazy &&
        (tenantDetailsMain?.juicer_id || tenantDetailsMain?.social_embed) && (
          <FooterJuicer />
        )}
      <FooterCallToActions />
      <FooterReviews />

      {showLazy && (
        <>
          <FooterNewsletter />
          <FooterDestinations />
          <div
            className={`footer-content pt-[30px] pb-[76px] md:pb-[60px] ${
              process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                ? "!bg-white !text-[#3F395F]"
                : "bg-[#555555] text-white"
            }`}
          >
            <div className="container">
              <FooterConnections />
              <FooterMenu />
              <div className="footer-bottom flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center">
                <div className="copy-right text-center md:text-left order-1 md:order-[-2]">
                  <p className="text-[12px] uppercase m-0">
                    &copy; {new Date().getFullYear()}{" "}
                    {tenantDetailsMain.site_name}. All rights reserved
                  </p>
                </div>

                {showLazy && <FooterSocial />}
              </div>
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
