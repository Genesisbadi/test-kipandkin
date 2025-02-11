import Image from "next/image";
import Link from "next/link";

import tenantDetailsConnections from "@/lib/preBuildScripts/static/tenantDetailsConnections.json";
import Slider from "react-slick";
import { useMobileDetector } from "@/lib/services/isMobileDetector";
import { useEffect } from "react";
export default function FooterConnections() {
  const isMobile = useMobileDetector();
  const connections = tenantDetailsConnections;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled")
            ? "opacity-0 visibility-hidden"
            : ""
        } absolute top-[50%] translate-y-[-50%] right-[5px] md:right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          width={25}
          height={54}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 44"
        >
          <path
            d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"
            fill="#fff"
          />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled")
            ? "opacity-0 visibility-hidden"
            : ""
        } absolute top-[50%] translate-y-[-50%] left-[5px] md:left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={54}
          viewBox="0 0 19.349 30"
        >
          <path
            id="_002-right-arrow"
            data-name="002-right-arrow"
            d="M105.745,30,86.981,15,105.745,0l.585.732L88.482,15,106.33,29.268Z"
            transform="translate(-86.981)"
            fill="#fff"
          />
        </svg>
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <>
      {connections.connection_items && (
        <>
          {process.env.NEXT_PUBLIC_TEMPLATE == 1 ||
          process.env.NEXT_PUBLIC_TEMPLATE == 2 ? (
            <div className="connections order-1 md:order-[-2]">
              {connections?.connection_items?.map((item, index) => (
                <div
                  key={index}
                  className={`border-b-[1px] border-[#666] flex flex-wrap items-center pb-[20px] mb-[30px] `}
                >
                  {item?.title && (
                    <h2
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } uppercase text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px] ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "!text-[#D41367] font-effra"
                          : ""
                      }`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {item?.images && (
                    <div className="flex flex-wrap w-full lg:max-w-[calc(100%-180px)] items-center mx-[-15px]">
                      {item.images.map((item, index) => (
                        <span
                          className="inline-block mb-[15px] max-w-[33.33%] md:max-w-[auto] lg:mb-0 px-[15px] md:grow-0"
                          key={index}
                        >
                          <Link
                            href={item?.link || "#"}
                            target={
                              item?.link?.includes("http") ? "_blank" : "_self"
                            }
                          >
                            <Image
                              src={item?.image}
                              width={322}
                              height={160}
                              alt="Logo"
                              className={`w-auto object-contain ${
                                process.env.NEXT_PUBLIC_TEMPLATE == 2
                                  ? "md:max-w-[150px] h-full md:h-[100px]"
                                  : "md:max-w-[100px] h-[60px]"
                              }`}
                            />
                          </Link>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {connections?.connection_items?.map((item, index) => (
                <div
                  key={index}
                  className="border-b-[1px] pb-[30px] border-[#666] mb-[30px]"
                >
                  {item?.title && (
                    <h2
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      }  ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "font-effra"
                          : ""
                      } uppercase text-center text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {isMobile ? (
                    <>
                      {item?.images.length > 0 && (
                        <div className="mt-[15px]  gap-x-[15px] ">
                          <Slider {...settings}>
                            {item.images.map((item, index) => (
                              <div
                                key={index}
                                className="!flex items-center justify-center "
                              >
                                <Link
                                  href={item?.link || "#"}
                                  target="_blank"
                                  className={
                                    !item?.link ? "pointer-events-none" : ""
                                  }
                                >
                                  <Image
                                    src={item?.image}
                                    width={250}
                                    height={150}
                                    className="max-w-[200px]"
                                    alt={item?.title || "Connection"}
                                  />
                                </Link>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.images.length > 0 && (
                        <div className="mt-[15px]  gap-x-[15px] flex flex-wrap justify-center items-center">
                          {item.images.map((item, index) => (
                            <div key={index} className="">
                              <Link
                                href={item?.link || "#"}
                                target="_blank"
                                className={
                                  !item?.link ? "pointer-events-none" : ""
                                }
                              >
                                <Image
                                  src={item?.image}
                                  width={250}
                                  height={150}
                                  className="max-w-[200px]"
                                  alt={item?.title || "Connection"}
                                />
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
