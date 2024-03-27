import Image from "next/image";
import { Tenor_Sans } from "next/font/google";
import Link from "next/link";

import tenantDetailsConnections from "@/lib/preBuildScripts/static/tenantDetailsConnections.json";

// const primary = Tenor_Sans({
//   weight: ["400"],
//   subsets: ["latin"],
// });
export default function footerConnections() {
  const connections = tenantDetailsConnections;
  const checkOddEven = (number) => {
    if (number % 2 !== 0) {
      return "odd";
    }
  };

  return (
    <>
      {connections.connection_items && (
        <>
          {process.env.NEXT_PUBLIC_TEMPLATE == 1 ? (
            <div className="connections">
              {connections?.connection_items?.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    checkOddEven(index + 1) ? "odd" : "even"
                  } border-b border-b-[1px] border-[#666] flex flex-wrap items-center pb-[30px] mb-[15px] `}
                >
                  {item?.title && (
                    <h2
                      className={`uppercase text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {item?.images && (
                    <div className="flex flex-wrap w-full lg:max-w-[calc(100%-180px)] items-center mx-[-15px]">
                      {item.images.map((item, index) => (
                        <span
                          className="inline-block mb-[15px] lg:mb-0 px-[15px]"
                          key={index}
                        >
                          <Link
                            href={item.link}
                            target={
                              item.link.includes("http") ? "_blank" : "_self"
                            }
                          >
                            <Image
                              src={item.image}
                              width={322}
                              height={160}
                              alt="Logo"
                              className="w-auto max-w-[100px]"
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
                <div key={index} className="[&:not(:last-of-type)]:mb-[15px]">
                  {item?.title && (
                    <h2
                      className={`uppercase text-center text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {item?.images && (
                    <div className="mt-[15px] flex flex-wrap justify-center items-center">
                      {item.images.map((item, index) => (
                        <div key={index}>
                          <Link href={item?.link || "#"} target="_blank">
                            <Image
                              src={item?.image}
                              width={250}
                              height={150}
                              alt={item?.title || "Connection"}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
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
