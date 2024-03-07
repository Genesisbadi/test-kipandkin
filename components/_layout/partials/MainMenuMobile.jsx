import Booking from "@/components/icons/Booking";
import { useEffect, useState } from "react";
import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainMenuMobile({ ...props }) {
  const router = useRouter();
  const { parentNodes } = props;
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isBookToggled, setIsBookToggled] = useState(false);
  const [bookingLinks, setIsBookingLinks] = useState({});
  const { tenantDetails } = globalData;
  const closeMenu = () => {
    document.querySelector("body").classList.remove("mobile-menu-opened");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-closed");
      setIsMenuToggled(false);
    }, 300);
  };
  const openMenu = () => {
    setIsMenuToggled(true);
    document.querySelector("body").classList.remove("mobile-menu-closed");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-opened");
    }, 300);
  };

  const bookingOpen = () => {
    const reservation = parentNodes.find(
      (obj) => obj.label.toLowerCase() === "reservations"
    );
    setIsBookingLinks(reservation?.children);

    setIsBookToggled(true);
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-opened");
    }, 300);

    document.querySelector("body").classList.add("mobile-menu-opened");
  };
  const closeBooking = () => {
    document.querySelector("body").classList.remove("mobile-menu-opened");
    // setTimeout(() => {
    document.querySelector("body").classList.add("mobile-menu-closed");
    setIsBookToggled(false);
    // }, 300);
  };

  useEffect(() => {
    closeMenu();
    closeBooking();
  }, []);

  return (
    <>
      <div className="remove-highlight select-none absolute left-0 flex justify-between right-0 px-[15px]">
        <span
          className="w-[20px] select-none block cursor-pointer"
          onClick={openMenu}
        >
          {Array.from({ length: 3 }, (_, index) => (
            <span
              key={index}
              className="w-full block h-[3px] bg-primary mb-[3px] last-of-type:mb-0"
            ></span>
          ))}
        </span>
        <span className="cursor-pointer" onClick={bookingOpen}>
          <Booking className="select-none cursor-pointer" />
        </span>
      </div>

      <>
        {isBookToggled && (
          <>
            <div className="p-[15px] book-modal flex items-center justify-center fixed top-0 left-0 w-full h-full z-[200]">
              <span
                className="bg-gray-900 w-full h-full absolute top-0 left-0 bg-opacity-[.3]"
                onClick={closeBooking}
              ></span>
              <div class="modal-content select-none bg-white max-w-[480px] overflow-y-auto max-h-[90vh] mx-auto px-8 pb-8 w-full rounded-lg shadow-md transform transition-all scale-100 opacity-100">
                <div className="sticky flex justify-between top-0 bg-white text-primary pt-[20px] pb-[15px] font-bold text-[20px]">
                  <span>Choose a destination:</span>

                  <button
                    onClick={closeBooking}
                    className="hover:opacity-[.5] relative right-[-10px]"
                  >
                    <svg
                      class="w-[30px] h-[30px] fill-primary"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Close</title>
                      <path
                        fill-rule="evenodd"
                        d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  {bookingLinks.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item.url}
                        target={item.url.includes("http") ? "_blank" : "_self"}
                        onClick={closeBooking}
                        className="inline-flex items-center gap-x-[5px] py-2 text-gray-800 hover:text-primary"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {isMenuToggled && (
          <>
            <div
              id="header-mobile"
              className="fixed transition p-[30px] bg-[#F1F1F1] max-w-[calc(100%-50px)] lg:max-w-[420px] z-[999] w-full h-full left-0 top-0"
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
              <div>
                {parentNodes?.map((item, index) => (
                  <div
                    className={`item relative  ${
                      item.label.toLowerCase() !== "reservations"
                        ? "px-[15px]"
                        : ""
                    } ${item.children ? "dropdown group" : ""} `}
                    key={index}
                  >
                    <div
                      className={`${
                        item.label.toLowerCase() !== "reservations"
                          ? "py-[20px]"
                          : ""
                      } relative xl:text-[12px] flex items-center xxl:text-[14px]`}
                    >
                      {item.label.toLowerCase() === "reservations" ? (
                        <>
                          <div className="bg-primary text-white py-[20px] px-[30px]">
                            {item?.url?.includes("nolink") ? (
                              <>
                                <span className="uppercase flex items-center cursor-default">
                                  {item.label}{" "}
                                </span>
                              </>
                            ) : (
                              <>
                                <Link
                                  className={`text-primary flex items-center uppercase ${
                                    item?.url?.includes(router.asPath)
                                      ? "active"
                                      : ""
                                  }`}
                                  href={item?.url}
                                  target={item.target}
                                >
                                  {item.label}
                                </Link>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {item?.url?.includes("nolink") ? (
                            <>
                              <span className="flex items-center uppercase text-primary cursor-default">
                                {item.label}
                              </span>
                            </>
                          ) : (
                            <>
                              <Link
                                className={`text-primary flex items-center uppercase hover:text-[#000] ${
                                  item?.url?.includes(router.asPath)
                                    ? "active"
                                    : ""
                                }`}
                                href={item?.url || "#"}
                                target={item.target}
                              >
                                {item.label}
                              </Link>
                            </>
                          )}
                        </>
                      )}
                      {item?.children && item?.children?.length > 0 && <></>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
