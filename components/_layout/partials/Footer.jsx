import Link from "next/link";
import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import FooterDestinations from "@/components/_layout/partials/footer/FooterDestinations";
import FooterConnections from "@/components/_layout/partials/footer/FooterConnections";
import FooterSocial from "@/components/_layout/partials/footer/FooterSocial";
import FooterJuicer from "@/components/_layout/partials/footer/FooterJuicer";
import FooterMenu from "@/components/_layout/partials/footer/FooterMenu";
import FooterNewsletter from "@/components/_layout/partials/footer/FooterNewsletter";
import FooterReviews from "@/components/_layout/partials/footer/FooterReviews";
import FooterCallToActions from "@/components/_layout/partials/footer/FooterCallToActions";
export default function Footer() {
  const { connections, destinations, main, social_media } =
    globalData.tenantDetails.data;

  return (
    <footer className="">
      {main.juicer_id && <FooterJuicer juicer_id={main.juicer_id} />}
      <FooterCallToActions />
      <FooterReviews />
      <FooterNewsletter />
      <FooterDestinations />
      <div className="footer-content text-white bg-[#555555] py-[30px]">
        <div className="container">
          <FooterConnections connections={connections} />
          <FooterMenu />
          <div className="footer-bottom flex flex-wrap justify-between items-center mt-[60px]">
            <div className="copy-right">
              <p className="text-[12px] uppercase">
                &copy; {new Date().getFullYear()}{" "}
                {globalData.tenantDetails.name}. All rights reserved
              </p>
            </div>
            <FooterSocial social_media={social_media} />
          </div>
        </div>
      </div>
    </footer>
  );
}
