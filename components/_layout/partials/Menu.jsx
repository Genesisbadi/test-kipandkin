"use client";

import globalData from "@/lib/preBuildScripts/static/globalData.json";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import MainMenu from "./MainMenu";
import { useState, useEffect } from "react";
import MainMenuMobile from "./MainMenuMobile";

export default function Menu() {
  const ready = globalState((state) => state.ready);
  const { tenantDetails, menus, locales } = globalData;
  const [isMobile, setIsMobile] = useState();
  const { parentNodes } = menus;

  const getWindowWidth = () => {
    if (window.innerWidth <= 1199) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.removeEventListener("resize", getWindowWidth);
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);
  }, []);

  return (
    <>
      <header
        id="header"
        className="sticky top-0 z-[100] bg-white shadow-[0_2px_2px_-2px_rgba(0,0,0,.15)]"
      >
        <div className="flex items-center py-[10px] xl:py-0 justify-center xl:justify-between">
          <div className="xl:pl-[30px] relative z-[1]">
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
