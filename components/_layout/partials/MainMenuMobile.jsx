import Booking from "@/components/icons/Booking";
import { useEffect, useState } from "react";
import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import NProgress from "nprogress";

export default function MainMenuMobile({ ...props }) {
  const router = useRouter();
  const { parentNodes, nodes } = props;
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isBookToggled, setIsBookToggled] = useState(false);
  const [bookingLinks, setIsBookingLinks] = useState({});
  const [children, setChildren] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const [topLevel, setTopLevel] = useState(true);

  const { tenantDetails } = globalData;
  const closeMenu = () => {
    setChildren([]);
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

  const showChildren = (id) => {
    const prev = document.querySelector(".current");
    prev.classList.remove("current");
    prev.classList.add("prev");
    const current = document.createElement("div");
    current.classList.add("current-class");
    current.innerHTML = children.map((item, index) => {
      <div>{item.label}</div>;
    });

    setTimeout(() => {}, 1000);
  };

  const hasChildrenNotInParent = nodes.filter((obj) => {
    const idExistsInParent = parentNodes.some((parent) => parent.id === obj.id);

    if (!idExistsInParent && obj.children.length > 0) {
      return obj;
    }
  });

  const DropdownMenu = ({ ...props }) => {
    if (children && children.length > 0) {
      setTimeout(() => {
        const childs = document.querySelector(".children");
        if (childs) {
          childs.classList.remove("current");
          childs.classList.add("animating");
        }
      }, 150);

      setTimeout(() => {
        const childs = document.querySelector(".children");
        if (childs) {
          childs.classList.add("current");
          childs.classList.remove("animating");
        }
      }, 250);
    } else {
      console.log("no children");
    }
    return (
      <>
        <div className="children">
          {children.map((item, index) => (
            <div
              className="flex"
              key={index}
              onClick={() => {
                if (item?.children && item?.children.length > 0) {
                  setCurrentItem(item);
                  setChildren(item?.children);
                } else {
                  console.log("item.url", item.target);
                  NProgress.start();
                  router
                    .push(item.url)
                    .then(() => {
                      NProgress.done();
                    })
                    .catch(() => {
                      NProgress.done();
                    });
                  closeMenu();
                }
              }}
            >
              {item.label}
              {item?.children && item?.children.length > 0 && (
                <div className="flex flex-col justify-center items-center relative mr-[10px] w-0 h-[17px]">
                  <div className="w-full border-[#555] h-[50%] skew-x-[45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-t-[1.8px] border-main-black group-hover:border-main-red"></div>
                  <div className="w-full border-[#555] h-[50%] skew-x-[-45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-b-[1.8px] border-main-black group-hover:border-main-red"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
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
        {/* BOOK MOBILE POPUP */}
        {isBookToggled && (
          <>
            <div className="p-[15px] book-modal flex items-center justify-center fixed top-0 left-0 w-full h-full z-[200]">
              <span
                className="bg-gray-900 backdrop-blur w-full h-full absolute top-0 left-0 bg-opacity-[.3]"
                onClick={closeBooking}
              ></span>
              <div className="modal-content select-none bg-white max-w-[480px] overflow-y-auto max-h-[90vh] mx-auto px-8 pb-8 w-full rounded-lg shadow-md transform transition-all scale-100 opacity-100">
                <div className="sticky flex justify-between top-0 bg-white text-primary pt-[20px] pb-[15px] font-bold text-[20px]">
                  <span>Choose an option:</span>

                  <button
                    onClick={closeBooking}
                    className="hover:opacity-[.5] relative right-[-10px]"
                  >
                    <svg
                      className="w-[30px] h-[30px] fill-primary"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Close</title>
                      <path
                        fillRule="evenodd"
                        d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z"
                        clipRule="evenodd"
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
                        className="inline-flex items-center gap-x-[5px] py-2 text-gray-800 transition hover:font-bold hover:text-primary"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
        {/* END BOOKING MOBILE POPUP */}

        {/* HEADER MOBILE MENU */}
        {isMenuToggled && (
          <>
            <div
              id="header-mobile"
              className="fixed max-h-[100vh] overflow-hidden transition pt-0 p-[15px] bg-[#F1F1F1] max-w-[calc(100%-50px)] sm:max-w-[420px] z-[999] w-full h-full left-0 top-0"
            >
              <div className="sticky flex items-center justify-between top-0 py-[15px] bg-[#F1F1F1] z-[1]">
                <Image
                  src={tenantDetails.data.main.tenant_logo}
                  width={200}
                  height={54}
                  alt="Site Logo"
                  className="w-auto h-auto"
                />
                <span
                  className="cursor-pointer relative top-[5px]"
                  onClick={closeMenu}
                >
                  <svg
                    className="w-[30px] h-[30px] fill-primary"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Close</title>
                    <path
                      fillRule="evenodd"
                      d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="menu-links">
                <div className="current top-level max-h-[calc(100vh-80px)] overflow-y-auto">
                  {parentNodes?.map((item, index) => {
                    if (item.label.toLowerCase() !== "reservations") {
                      return (
                        <div
                          className="flex justify-between"
                          key={index}
                          onClick={() => {
                            if (item?.children && item?.children.length > 0) {
                              setChildren(item.children);
                              setCurrentItem(item);
                              const topLevel =
                                document.querySelector(".top-level");
                              topLevel.classList.remove("current");
                              topLevel.classList.add("prev");
                            } else {
                              router.push(item.url);
                              closeMenu();
                            }
                          }}
                        >
                          {item.label}
                          {item?.children && item?.children.length > 0 && (
                            <div className="flex flex-col justify-center items-center relative mr-[10px] w-0 h-[17px]">
                              <div className="w-full border-[#555] h-[50%] skew-x-[45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-t-[1.8px] border-main-black group-hover:border-main-red"></div>
                              <div className="w-full border-[#555] h-[50%] skew-x-[-45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-b-[1.8px] border-main-black group-hover:border-main-red"></div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
                {children && children.length > 0 && (
                  <>
                    <DropdownMenu childs={children} />
                  </>
                )}
              </div>
            </div>

            <span
              className="cursor-pointer bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed z-[22] w-full h-full top-0 left-0"
              onClick={closeMenu}
            ></span>
          </>
        )}

        {/* END MOBILE MENU */}
      </>
    </>
  );
}
