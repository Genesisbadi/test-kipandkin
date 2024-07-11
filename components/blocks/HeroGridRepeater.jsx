import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function HeroGridRepeater({ block, mediaHandler }) {
  const { items } = block.main;
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  return (
    <section className="overflow-hidden md:mb-[5px]">
      <div className="mx-[-3px] flex flex-wrap ">
        {items.map((item, index) => (
          <SectionAccordion
            childrenClassname={`bg-[#f5f5f5] pb-0 h-full flex flex-col md:!flex`}
            key={index}
            title={item.title}
            className="flex flex-col md:max-w-[33.33%] w-full px-[3px]"
          >
            <Image
              src={item?.image_file}
              width={500}
              height={500}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />

            <div
              className={`px-[20px] lg:px-[60px] flex flex-col grow py-[30px] text-secondary`}
            >
              <h2
                className={`${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : ""
                } hidden md:block text-center mb-[30px] text-[18px] sm:text-[20px] lg:text-[25px]`}
              >
                {item.title}
              </h2>
              {item.description && (
                <div
                  className="text-[14px] mb-[30px] grow leading-[21px]  "
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              <div className="text-center">
                <Link
                  className={`border-secondary hover:bg-secondary hover:text-white text-[14px] uppercase inline-block border py-[15px] px-[30px] transition `}
                  href={item.link}
                  target={item.link.includes("http:") ? "_blank" : "_self"}
                >
                  Discover More
                </Link>
              </div>
            </div>
          </SectionAccordion>
        ))}
      </div>
    </section>
  );
}
