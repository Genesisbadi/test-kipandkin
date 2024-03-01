import Image from "next/image";
import { Tenor_Sans } from "next/font/google";
import Link from "next/link";

// const primary = Tenor_Sans({
//   weight: ["400"],
//   subsets: ["latin"],
// });
export default function footerConnections({ connections }) {
  const checkOddEven = (number) => {
    if (number % 2 !== 0) {
      return "odd";
    }
  };

  return (
    <>
      {connections.connection_items && (
        <div className="connections">
          {connections?.connection_items?.map((item, index) => (
            <div
              key={index}
              className={`${
                checkOddEven(index + 1) ? "odd" : "even"
              } border-b border-b-[1px] border-[#666] flex flex-wrap items-center pb-[30px] mb-[15px] `}
            >
              <h2
                className={`uppercase text-[18px] w-full lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
              >
                {item?.title}
              </h2>
              {item?.images && (
                <div className="flex flex-wrap w-full lg:max-w-[calc(100%-180px)] items-center mx-[-15px]">
                  {item.images.map((item, index) => (
                    <span
                      className="inline-block mb-[15px] lg:mb-0 px-[15px]"
                      key={index}
                    >
                      <Link
                        href={item.link}
                        target={item.link.includes("http") ? "_blank" : "_self"}
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
      )}
    </>
  );
}
