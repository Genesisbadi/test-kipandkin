import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import diningEntriesData from "@/lib/preBuildScripts/static/dining.json";
import NProgress from "nprogress";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
export default function DiningPage({ page }) {
 
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );
  const CustomSelect = dynamic(() =>
    import("../forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title } = page;
  const {
    subtitle,
    banner_desktop,
    banner_mobile,
    description,
    award_images,
    button_links,
    schedules,
    gallery_images,
  } = page.data.main;

  const router = useRouter();

  const handleSelectChange = (option) => {
    const selectedRoute = option?.value;

    NProgress.start();

    router
      .push(selectedRoute)
      .then(() => {
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  };

  const getDefaultValue = () => {
    return {
      label: title,
    };
  };

  return (
    <>
      <section className="page-banner relative flex items-center justify-center min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <picture>
          <source media="(min-width:415px)" srcSet={banner_desktop} />
          <source
            media="(max-width:414px)"
            srcSet={banner_mobile || banner_desktop}
          />
          <Image
            src={banner_desktop}
            width={1920}
            height={1080}
            className="w-full h-full  object-cover absolute top-0 left-0"
            alt="Page Banner"
            priority={true}
          />
        </picture>
        {title && (
          <h2
            className={`relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] font-tenor text-[35px] md:text-[42px]  text-white z-[3]`}
          >
            {title}
          </h2>
        )}
      </section>
      {showLazy && (
        <article>
          <div className="container py-[50px]">
            {process.env.NEXT_PUBLIC_TEMPLATE == 2 && (
              <div className="flex text-[14px] mb-[30px] flex-wrap px-[15px] justify-center items-center pb-[30px] border-b-[1px] border-b-[#ccc] container">
                <div className="px-[15px]">
                  <CustomSelect
                    className="react-select w-full min-w-[400px] cursor-pointer"
                    id="dining-select"
                    instanceId="dining-select"
                    isSearchable={false}
                    value={getDefaultValue()}
                    defaultValue={getDefaultValue()}
                    onChange={handleSelectChange}
                    options={diningEntriesData?.map((item, index) => {
                      return {
                        label: item?.title,
                        value: item?.route_url,
                      };
                    })}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row w-full sm:gap-x-[70px] lg:gap-x-100">
              <div className="flex flex-col w-full md:w-3/4">
                <div className="flex flex-col pb-[20px]">
                  {subtitle && (
                    <div
                      dangerouslySetInnerHTML={{ __html: subtitle }}
                      className={`text-[22px] text-primary leading-[25px] mb-[15px] ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      }`}
                    />
                  )}
                  {description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                      className="text-[14px] leading-[25px]"
                    />
                  )}
                </div>
                {award_images && award_images.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-[25px] text-primary uppercase leading-[25px] pb-[20px] font-tenor">
                      Awards / Recognitions
                    </span>
                    <div className="flex flex-wrap gap-x-10">
                      {award_images?.map((item, i) => {
                        return (
                          <div key={i} className="flex flex-wrap max-w-[100px]">
                            <Image
                              alt={"Banner"}
                              src={item}
                              width={160}
                              height={160}
                              className="w-full object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:w-1/4 mt-[40px] lg:mt-0">
                <div className="pb-7">
                  {schedules.map((item, index) => { 
                    return (
                      <div key={index} className="pb-[10px]">
                        <span
                          className={`flex pb-1 ${
                            index > 0 ? "text-[14px]" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.time,
                          }}
                        />
                      </div>
                    );
                  })} 
                </div>
                {button_links && button_links.length > 0 && (
                  <div className={`flex flex-col w-full gap-y-3`}>
                    {button_links.map((item, index) => {
                      if (item?.button_link || item?.file) {
                        return (
                          <Link
                            key={index}
                            href={item?.button_link || item?.file || "#"}
                            target={
                              item?.button_link?.includes("https") ||
                              item?.file?.includes("https")
                                ? "_blank"
                                : "_self"
                            }
                            className={`px-[30px] py-[15px] text-center tracking-[1px] text-[14px] ${
                              item?.variant === "filled"
                                ? "bg-primary text-white"
                                : "border border-secondary text-secondary"
                            } uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
                          >
                            {item?.button_label}
                          </Link>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {gallery_images && gallery_images?.length > 0 && (
            <CarouselGallery
              alt_title={page?.title || "Thumbnail"}
              images={gallery_images} 
              title="Gallery"
            />
          )}
          
          {page?.data?.featured_offers?.offer_items && page?.data?.featured_offers?.offer_items.length > 0 && (
                      
          <div className="w-full bg-[#f1f1f1]">
            <div className="container pb-[20px] !max-w-[980px] mx-auto">
              <div className="flex flex-col w-full">
                <h2
                  className={`text-primary text-[25px] uppercase text-center pb-[30px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1
                      ? "font-tenor"
                      : " "
                  }`}
                >
                  Dining Offer
                </h2>
                  {page?.data?.featured_offers.offer_items.map((item, index) => {
                    const { dining_offer_title, dining_offer_description, dining_offer_image, dining_offer } = item;

                    const { description } = dining_offer.attributes.data?.main;
                    const { title, route_url } = dining_offer.attributes; 
                    return(
                      <div className="flex mb-[30px] flex-col md:flex-row w-full bg-white shadow-md" key={index}>
                        <div className="w-full md:max-w-[500px]">

                          <Link href={route_url || "#"}>
                            <Image
                              alt={dining_offer_title || diningOfferTitle}
                              src={dining_offer_image || dining_offer?.attributes?.mediaHandler["main.image"][0].conversions.desktop || dining_offer?.attributes?.mediaHandler["main.image"][0].original} 
                              width={628}
                              height={280}
                              className="w-full h-[300px] object-cover" 
                            />
                          </Link> 
                        </div>
                        <div className="flex flex-col justify-between w-full md:w-1/2 p-5">
                          <div className="flex flex-col flex-grow justify-center">
                            <h3
                              className={`text-primary text-[20px] text-center ${
                                process.env.NEXT_PUBLIC_TEMPLATE == 1
                                  ? "font-tenor"
                                  : " "
                              }`}
                            >
                              <Link href={route_url || "#"}>
                                {item.dining_offer_title || title}
                              </Link>
                            </h3>
                            <div className="w-full flex justify-center pt-[15px] pb-[10px]">
                              <span className="border- border-[#aaa] h-[2px] block bg-[#aaa] tracking-[1px] w-[22px]" />
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                dining_offer_description ||
                                  description,
                              }}
                              className="text-[14px] text-center leading-[25px] line-clamp-4 "
                            />
                          </div>
                          <Link
                            href={route_url || "#"}
                            className={`w-full mt-5 py-[15px] px-[30px] 2sm:w-auto text-center text-[14px] border border-secondary text-secondary hover:bg-secondary hover:text-white uppercase`}
                          >
                            View Offer
                          </Link>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div> 
          )} 
        </article>
      )}
    </>
  );
} 
