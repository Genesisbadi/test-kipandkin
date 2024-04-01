import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import dynamic from "next/dynamic";

export default function Footer() {
  const FooterDestinations = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterDestinations").then(
      (module) => module.default
    )
  );

  const FooterConnections = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterConnections").then(
      (module) => module.default
    )
  );

  const FooterSocial = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterSocial").then(
      (module) => module.default
    )
  );

  const FooterJuicer = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterJuicer").then(
      (module) => module.default
    )
  );

  const FooterMenu = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterMenu").then(
      (module) => module.default
    )
  );

  const FooterNewsletter = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterNewsletter").then(
      (module) => module.default
    )
  );

  const FooterReviews = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterReviews").then(
      (module) => module.default
    )
  );

  const FooterCallToActions = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterCallToActions").then(
      (module) => module.default
    )
  );
  return (
    <footer className="footer">
      <FooterJuicer />
      <FooterCallToActions />
      <FooterReviews />
      <FooterNewsletter />
      <FooterDestinations />
      <div className="footer-content text-white bg-[#555555] py-[30px]">
        <div className="container">
          <FooterConnections />
          <FooterMenu />
          <div className="footer-bottom flex flex-wrap justify-between items-center mt-[60px]">
            <div className="copy-right">
              <p className="text-[12px] uppercase">
                &copy; {new Date().getFullYear()}{" "}
                {globalData.tenantDetails.name}. All rights reserved
              </p>
            </div>
            <FooterSocial />
          </div>
        </div>
      </div>
    </footer>
  );
}
