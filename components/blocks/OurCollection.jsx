import Image from "next/image";
import Link from "next/link";

export default function OurCollection({ block, mediaHandler }) {
  const collection = block?.main?.collection;
  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-3">
          {collection.contents.map((item, i) => (
            <>
              <div key={i} className="flex relative">
                <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
                <Image
                  src={
                    item.mediaHandler["main.thumbnail"]?.[0].conversions
                      .thumbnail ||
                    item.mediaHandler["main.thumbnail"]?.[0].original
                  }
                  alt={item.title}
                  height={1000}
                  width={1000}
                  quality={100}
                  className="w-full h-full sm:max-h-[630px] sm:min-h-[630px] object-cover"
                />
                <div className="flex flex-col absolute w-full h-full items-center justify-center z-[2]">
                  <span className="text-white font-[700] text-[20px] pb-[20px]">
                    {item.title}
                  </span>
                  <div className="flex gap-x-5">
                    {item.data.main.book_now_button_link && (
                      <Link
                        href={item.data.main.book_now_button_link}
                        className={`text-white text-sm bg-primary hover:bg-secondary py-5 px-8 uppercase`}
                      >
                        Book Now
                      </Link>
                    )}
                    <Link
                      href={item.route_url || []}
                      className={`text-sm text-white border border-white py-5 px-8 hover:bg-white hover:text-secondary uppercase`}
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}
