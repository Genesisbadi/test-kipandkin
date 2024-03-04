import Image from "next/image";
import Link from "next/link";

export default function HeroGridRepeater({ block, mediaHandler }) {
  const { items } = block.main;
  return (
    <section className="overflow-hidden">
      <div className="mx-[-3px] flex flex-wrap ">
        {items.map((item, index) => (
          <div
            className="flex flex-col max-w-[33.33%] w-full px-[3px]"
            key={index}
          >
            <Image
              src={
                mediaHandler?.[`main.items.${index}.image`]?.[0]?.conversions
                  .desktop ||
                mediaHandler?.[`main.items.${index}.image`]?.[0]?.original
              }
              width={500}
              height={500}
              alt={item.title}
              className="w-full lg:h-[550px] object-cover"
            />
            <div className="px-[60px] flex flex-col grow py-[30px] bg-primary1 text-white">
              <h2 className="text-center mb-[30px] text-[25px]">
                {item.title}
              </h2>
              {item.description && (
                <div
                  className="text-[14px] mb-[30px] grow"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              <div className="text-center">
                <Link
                  className="inline-block border border-[#fff] py-[15px] px-[30px] transition hover:text-primary1 hover:bg-white"
                  href={item.link}
                  target={item.link.includes("http:") ? "_blank" : "_self"}
                >
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
