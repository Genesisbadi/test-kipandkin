import Link from "next/link";
import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import FooterDestinations from "./footer/FooterDestinations";
import FooterConnections from "./footer/FooterConnections";
import FooterSocial from "./footer/FooterSocial";
import FooterJuicer from "./footer/FooterJuicer";
import FooterMenu from "./footer/FooterMenu";
export default function Footer() {
  const { connections, destinations, main, social_media } =
    globalData.tenantDetails.data;

  return (
    <footer className="text-white">
      <FooterJuicer juicer_id={main.juicer_id} />
      <FooterDestinations destinations={destinations} />
      <div className="footer-content bg-[#555555] py-[30px]">
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
