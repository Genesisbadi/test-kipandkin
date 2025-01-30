import Image from "next/image";
import Link from "next/link";

export default function OurCollection({ block, mediaHandler }) {
  const destinations = block?.main?.destination;
  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item, index) => (
            <div key={index} className="flex relative">
              <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
              <Image
                src={
                  mediaHandler[`main.destination.${index}.image_icon`]?.[0]
                    .conversions.thumbnail ||
                  mediaHandler[`main.destination.${index}.image_icon`]?.[0]
                    .original
                }
                alt={item?.title}
                height={1000}
                width={1000}
                quality={100}
                className="w-full h-[400px] object-cover"
              />
              <div className="flex flex-col absolute w-full h-full items-center justify-center z-[2]">
                <h2 className="text-white font-[700] text-[20px] pb-[20px] px-[15px] text-center">
                  {item?.title}
                </h2>
                <div className="flex flex-col xl:flex-row gap-3 gap-x-5 px-3 w-full justify-center">
                  {item?.url_link && (
                    <Link
                      href={item?.url_link}
                      target={
                        item?.url_link?.startsWith("http") ? "_blank" : "_self"
                      }
                      className={`w-full h-full tracking-[1px] 2sm:w-auto text-center text-[14px] border border-white py-[20px] px-[30px] text-secondary lg:text-white bg-[#fff] bg-opacity-80 lg:bg-transparent hover:bg-[#fff] hover:text-secondary uppercase`}
                    >
                      More Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
