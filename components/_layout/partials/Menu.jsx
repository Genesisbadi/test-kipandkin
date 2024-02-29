import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Locales from "@/components/_layout/partials/Locales";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import MainMenu from "./MainMenu";
import { useState, useEffect } from "react";
import MainMenuMobile from "./MainMenuMobile";

export default function Menu() {
  const ready = globalState((state) => state.ready);
  const locale = persistentStore((state) => state.locale);
  const { tenantDetails, menus, locales } = globalData;
  const defaultLocale = locales.find((n) => n.is_default);
  const [isMobile, setIsMobile] = useState();

  const getWindowWidth = () => {
    if (window.innerWidth <= 1199) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.removeEventListener("resize", getWindowWidth);
    // window.removeEventListener("load", getWindowWidth);

    window.addEventListener("resize", getWindowWidth);
    window.addEventListener("load", getWindowWidth);
  }, []);

  const { parentNodes } = menus;

  return (
    <>
      <header>
        <div className="flex items-center py-[10px] xl:py-0 justify-center xl:justify-between">
          <div className="pl-[30px]">
            <Link href="/">
              <Image
                src={tenantDetails?.data?.main?.tenant_logo}
                width={154}
                height={50}
                alt={tenantDetails.name || "Logo"}
              />
            </Link>
          </div>
          {!isMobile ? (
            <MainMenu className="hidden xl:flex" parentNodes={parentNodes} />
          ) : (
            <MainMenuMobile
              className="block xl:hidden"
              parentNodes={parentNodes}
            />
          )}
        </div>
      </header>
    </>
  );
}
