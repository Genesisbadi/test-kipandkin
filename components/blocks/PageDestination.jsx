import Image from "next/image";
import Link from "next/link";

export default function PageDestination({ block, mediaHandler }) {
  const collection = block?.main?.collection;
  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {collection.contents.map((item, index) => (
            <div key={index} className="flex relative">
              <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
              <Image
                src={
                  item?.mediaHandler["main.thumbnail"]?.[0].conversions
                    .thumbnail ||
                  item?.mediaHandler["main.thumbnail"]?.[0].original
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
                  {item?.data.main.book_now_button_link && (
                    <Link
                      target="_blank"
                      href={item?.data.main.book_now_button_link}
                      className={`w-full h-full 2sm:w-auto text-center text-white text-sm border-[1px] border-primary bg-primary hover:bg-secondary hover:border-secondary py-[20px] px-[30px] uppercase`}
                    >
                      Book Now
                    </Link>
                  )}
                  <Link
                    href={item?.route_url}
                    className={`w-full h-full tracking-[1px] 2sm:w-auto text-center text-[14px] border border-white py-[20px] px-[30px] text-secondary lg:text-white bg-[#fff] bg-opacity-80 lg:bg-transparent hover:bg-[#fff] hover:text-secondary uppercase`}
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
