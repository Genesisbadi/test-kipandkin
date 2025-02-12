import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
export default function CallToActions({ block }) {
  const showLazy = globalState((state) => state.showLazy);

  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { block_title, items } = block.main;
  return (
    <SectionAccordion
      title={block_title || "What to find out"}
      childrenClassname="pb-0"
    >
      <section className="bg-[#F1F1F1] overflow-hidden py-[30px] lg:py-[40px]">
        <div className="container">
          {showLazy ? (
            <>
              {block_title && (
                <h2
                  className={`${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "font-effra"
                      : "font-tenor"
                  } text-center text-primary hidden md:block text-[22px] mb-[30px]`}
                >
                  {block_title}
                </h2>
              )}
            </>
          ) : (
            <div className="h-[34px] animate-pulse bg-[#ccc] w-[250px] hidden md:block mx-auto mb-[30px]" />
          )}
          {items?.length > 0 && (
            <div
              className={`flex flex-wrap mx-[-15px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 2
                  ? "gap-y-[40px] lg:pl-[calc(100%-1100px)]"
                  : ""
              }`}
            >
              {items?.map((item, index) => (
                <div
                  className={`w-full px-[15px] md:max-w-[33.33%] relative ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "" : "mb-[40px]"
                  }`}
                  key={index}
                >
                  <div className="flex items-center group hover:text-primary text-[#999] text-[18px] relative">
                    {showLazy && (
                      <>
                        {item?.link && (
                          <Link
                            href={item?.link}
                            target={
                              item?.link?.includes("http") ? "_blank" : "_self"
                            }
                            className="absolute top-0 left-0 w-full h-full z-1"
                          />
                        )}
                      </>
                    )}
                    <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-[#ddd7cc] group-hover:bg-primary ">
                      {showLazy && (
                        <Image
                          src={item.icon}
                          width={35}
                          height={35}
                          alt={item.title}
                          title={item.title}
                          className={`w-[35px] h-[35px] object-contain transition ${
                            process.env.NEXT_PUBLIC_TEMPLATE == 1
                              ? "group-hover:!invert-[100%] group-hover:!contrast-[100%] group-hover:!brightness-[100%]"
                              : "group-hover:!brightness-[1000%]"
                          }`}
                          style={{
                            filter: `invert(55%) sepia(11%) saturate(819%) hue-rotate(4deg) brightness(97%) contrast(92%)`,
                          }}
                        />
                      )}
                    </span>
                    <div className="flex flex-col">
                      {showLazy ? (
                        <>
                          <h3>{item.title}</h3>
                          {item?.short_text && (
                            <p className="text-[14px] text-[#555] group-hover:text-primary">
                              {item?.short_text}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="h-[54px] animate-pulse bg-[#ccc] w-[150px] block mb-3" />
                          {item?.short_text && (
                            <p className="h-[20px] animate-pulse bg-[#ccc] w-[150px] block">
                              {item?.short_text}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SectionAccordion>
  );
}
