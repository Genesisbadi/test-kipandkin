"use client";

import globalData from "@/lib/preBuildScripts/static/globalData.json";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import MainMenu from "./MainMenu";
import { useState, useEffect } from "react";
import MainMenuMobile from "./MainMenuMobile";
import dynamic from "next/dynamic";

export default function Menu({ ...props }) {
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

  const Email = dynamic(() =>
    import("@/components/icons/Email").then((module) => module.default)
  );
  const Phone = dynamic(() =>
    import("@/components/icons/Phone").then((module) => module.default)
  );

  return (
    <>
      <header
        id="header"
        className="sticky top-0 z-[100] bg-white shadow-[0_2px_2px_-2px_rgba(0,0,0,.15)] min-h-[61px]"
      >
        <div className="header-strip overflow-hidden py-[10px] text-[14px]">
          <div className="flex justify-end">
            {tenantDetails?.data?.main?.email && (
              <span className="px-[5px]">
                <Link
                  className="flex items-center hover:opacity-[.5]"
                  href={`mailto:${tenantDetails?.data?.main?.email}`}
                >
                  <Email className="mr-[5px]" />

                  {tenantDetails?.data?.main?.email}
                </Link>
              </span>
            )}
            {tenantDetails?.data?.main?.phone && (
              <span className="px-[5px]">
                <Link
                  className="flex items-center hover:opacity-[.5]"
                  href={`mailto:${tenantDetails?.data?.main?.phone}`}
                >
                  <Phone className="mr-[5px]" />

                  {tenantDetails?.data?.main?.phone}
                </Link>
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center py-[10px] xl:py-0 justify-center xl:justify-end">
          <div className="xl:pl-[30px] z-[1] absolute top-0 left-0 h-full flex items-center">
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
            <MainMenu
              className="hidden xl:flex"
              tenantDetails={tenantDetails}
              parentNodes={parentNodes}
            />
          ) : (
            <MainMenuMobile
              className="block xl:hidden"
              parentNodes={parentNodes}
              tenantDetails={tenantDetails}
            />
          )}
        </div>
      </header>
    </>
  );
}
