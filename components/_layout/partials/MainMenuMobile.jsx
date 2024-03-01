import Booking from "@/components/icons/Booking";
import { useEffect, useState } from "react";
import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";

export default function MainMenuMobile() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const { tenantDetails } = globalData;
  const closeMenu = () => {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").classList.remove("mobile-menu-opened");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-closed");
      setIsMenuToggled(false);
    }, 500);
  };
  const openMenu = () => {
    document.querySelector("body").style.overflow = "hidden";
    setIsMenuToggled(true);
    document.querySelector("body").classList.remove("mobile-menu-closed");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-opened");
    }, 500);
  };
  useEffect(() => {
    closeMenu();
  }, []);
  return (
    <>
      <div className="absolute left-0 flex justify-between right-0 px-[15px] cursor-pointer">
        <span className="w-[20px]" onClick={openMenu}>
          {Array.from({ length: 3 }, (_, index) => (
            <span
              key={index}
              className="w-full block h-[3px] bg-primary mb-[3px] last-of-type:mb-0"
            ></span>
          ))}
        </span>
        <Booking />
      </div>

      <>
        {isMenuToggled && (
          <>
            <header
              id="header-mobile"
              className="fixed bg-[#F1F1F1] max-w-[420px] z-[999] w-full h-full left-0 top-0"
            >
              <Image
                src={tenantDetails.data.main.tenant_logo}
                width={200}
                height={54}
                alt="Site Logo"
                className="w-auto h-auto"
              />
              <span className="cursor-pointer" onClick={closeMenu}>
                Closeeee
              </span>
            </header>
            <span
              className="cursor-pointer bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed z-[22] w-full h-full top-0 left-0"
              onClick={closeMenu}
            ></span>
          </>
        )}
      </>
    </>
  );
}
