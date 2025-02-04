import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import menus from "@/lib/preBuildScripts/static/headerMenu.json";
import { useMobileDetector } from "@/lib/services/isMobileDetector";
import tenantDetails from "@/lib/preBuildScripts/static/tenantDetailsMain.json";
export default function Menu({ ...props }) {
  const ready = globalState((state) => state.ready);

  const { parentNodes, nodes } = menus;

  const isMobile = useMobileDetector();
  const [scrolled, setScrolled] = useState(false);

  const Email = dynamic(() =>
    import("@/components/icons/Email").then((module) => module.default)
  );
  const Phone = dynamic(() =>
    import("@/components/icons/Phone").then((module) => module.default)
  );
  const LangEn = dynamic(() =>
    import("@/components/icons/LangEn").then((module) => module.default)
  );

  const Menu = dynamic(() =>
    isMobile ? import("./MainMenuMobile") : import("./MainMenu")
  );
  const DropdownArrow = dynamic(() =>
    import("@/components/icons/DropdownArrow")
  );

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ready]);

  return (
    <>
      <header
        id="header"
        className={`sticky top-0 z-[100] shadow-[0_2px_2px_-2px_rgba(0,0,0,.15)] min-h-[61px] flex flex-col justify-center items-end
          ${
            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
              ? "!bg-[#413A60]"
              : "bg-white"
          }
          ${process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "xl:pr-[15px]" : ""} `}
      >
        {!isMobile && (
          <>
            {tenantDetails?.data?.main?.email ||
            tenantDetails?.data?.main?.phone ? (
              <div className="hidden xl:block header-strip overflow-hidden pt-[10px] text-[14px]">
                <div className="flex justify-end">
                  {tenantDetails?.data?.main?.email && (
                    <span className="px-[5px]">
                      <Link
                        prefetch={false}
                        className="flex items-center hover:opacity-[.5]"
                        aria-label={`Email ${tenantDetails?.data?.main?.email}`}
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
                        prefetch={false}
                        className="flex items-center hover:opacity-[.5]"
                        aria-label={`Call ${tenantDetails?.data?.main?.phone}`}
                        href={`mailto:${tenantDetails?.data?.main?.phone}`}
                      >
                        <Phone className="mr-[5px]" />

                        {tenantDetails?.data?.main?.phone}
                      </Link>
                    </span>
                  )}
                  {/* {process.env.NEXT_PUBLIC_TEMPLATE == 2 && (
                    <div className="px-5 flex items-center">
                      <LangEn />{" "}
                      <span>
                        EN
                        <DropdownArrow
                          className={`ml-[5px] top-[-2px] ${
                            process.env.NEXT_PUBLIC_TEMPLATE == 1
                              ? "border-white"
                              : "border-primary"
                          } relative`}
                          width={7}
                          height={7}
                        />
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        <div
          className={`flex w-full items-center justify-between ${
            process.env.NEXT_PUBLIC_TEMPLATE != 1 ? "py-[10px] pr-[2px]" : ""
          }`}
        >
          <div
            className={`xl:pl-[25px] z-[1]  ${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "w-full max-w-[154px] mx-auto"
                : "mx-0"
            } xl:mx-0 xl:w-auto xl:max-w-[100%] relative top-0 left-0  xl:right-auto h-full flex justify-center items-center ${
              process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "" : "pl-[15px]"
            }`}
          >
            <Link
              prefetch={false}
              href="/"
              className={`h-full block ${
                process.env.NEXT_PUBLIC_TEMPLATE != 1
                  ? "py-[5px]"
                  : process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "bg-white p-1"
                  : ""
              }`}
            >
              <Image
                src={tenantDetails?.tenant_logo}
                width={154}
                height={50}
                className={`h-full w-full transition-[all] ease-[ease] duration-[300ms] object-contain w-full   ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 2
                    ? scrolled
                      ? "!max-w-[80px] !md:max-w-[100px]"
                      : "!max-w-[100px] !md:max-w-[134px]"
                    : process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? scrolled
                      ? "!md:max-w-[134px]"
                      : "!md:max-w-[154px]"
                    : "md:max-w-[112px]"
                } max-w-[124px]`}
                priority={true}
                alt={tenantDetails.name || "Logo"}
                title={tenantDetails.name || "Logo"}
              />
            </Link>
          </div>

          <Menu
            className={`header-menu ${
              isMobile ? "block xl:hidden" : "hidden xl:flex"
            }`}
            parentNodes={parentNodes}
            nodes={nodes}
          />
        </div>
      </header>
    </>
  );
}
