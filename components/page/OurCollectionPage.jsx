import Image from "next/image";

import ourCollectionEntriesData from "@/lib/preBuildScripts/static/our-collection.json";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
import styles from "@/styles/description.module.css";
export default function OurCollectionPage({ page }) {
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );
  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );

  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);

  let ourCollection = [];

  if (page?.data?.contents?.filtered_dropdown) {
    ourCollection =
      ourCollectionEntriesData?.ourCollectionEntriesData?.filter(
        (item) => item?.data?.contents.hide_dropdown !== true
      ) || [];
  } else {
    ourCollection = ourCollectionEntriesData?.ourCollectionEntriesData;
  }

  const { title } = page;
  const {
    subtitle,
    inner_banner,
    mobile_banner,
    button_links,
    images,
    images_title,
    virtual_url,
    award_images,
    button_file_label,
    link_file,
  } = page.data.main;

  const { content_title, description, image } = page.data.contents;
  const router = useRouter();

  const route_url = page.route_url;
  const [selectedValue, setSelectedValue] = useState(page.route_url);

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

  useEffect(() => {
    setSelectedValue(page.route_url);
  }, [page.route_url]);

  const getDefaultValue = () => {
    return {
      label: page.title,
      value: page.route_url,
    };
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
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
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
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
      </div>
    );
  };

  var settings = {
    dots: false,
    // infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="page-banner relative flex items-center justify-center min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <picture>
          <source srcSet={mobile_banner} media="(max-width: 414px)" />
          <source srcSet={inner_banner} media="(min-width: 415px)" />
          <Image
            src={inner_banner}
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute top-0 left-0"
            priority={true}
          />
        </picture>
        {title && (
          <div
            className={`relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] sm:absolute sm:top-[50%] sm:translate-y-[-50%] font-tenor text-[30px] sm:text-[35px] md:text-[42px]  px-5 text-center text-white  z-[3] leading-[50px]`}
          >
            {title}
          </div>
        )}
      </section>

      <article>
        <div className="w-full bg-[#f1f1f1]">
          <div className="container px-5 2xl:px-0 py-[50px] ">
            {!showLazy ? (
              <>
                <div className="animate-pulse w-full max-w-[200px] h-[20px] mx-auto bg-[#ccc] mb-[20px]" />
                <div className="animate-pulse w-full h-[50px] bg-[#ccc] mb-[50px]" />
                <div className="animate-pulse w-full max-w-[400px] h-[30px] mx-auto bg-[#ccc] mb-[30px]" />
                <div className="animate-pulse w-full h-[20px] bg-[#ccc] mb-[10px]" />
                <div className="animate-pulse w-full h-[20px] bg-[#ccc] mb-[10px]" />
                <div className="animate-pulse w-full h-[20px] max-w-[80%] bg-[#ccc] mb-[20px]" />
                <div className="animate-pulse w-full h-[20px] bg-[#ccc] mb-[10px]" />
                <div className="animate-pulse w-full h-[20px] max-w-[80%] bg-[#ccc] mb-[20px]" />
              </>
            ) : (
              <>
                <div className="flex flex-col pb-[40px]">
                  <span className="text-center text-sm pb-3">
                    More from our collection
                  </span>
                  <label htmlFor="ourCollectionSelect" className="hidden">
                    Our Collection
                  </label>
                  <CustomSelect
                    className="react-select"
                    id="ourCollectionSelect"
                    name="ourCollectionSelect"
                    instanceId="ourCollectionSelect"
                    isSearchable={false}
                    // value={getDefaultValue()}
                    defaultValue={getDefaultValue()}
                    onChange={handleSelectChange}
                    options={ourCollection
                      ?.sort((a, b) => a?.order - b?.order)
                      .map((d, index) => {
                        return {
                          label: d?.title,
                          value: d?.route_url,
                        };
                      })}
                  />
                </div>

                <div className="flex flex-col py-5">
                  {page?.data.contents?.content_title && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: page?.data.contents?.content_title,
                      }}
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } text-primary text-[22px] leading-[25px] text-center pb-[30px]`}
                    />
                  )}

                  <div
                    dangerouslySetInnerHTML={{ __html: description }}
                    className={`${styles.description} text-[14px] mb-[40px] leading-[25px]`}
                  />
                </div>
                {button_links && button_links.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 md:gap-y-0 w-full justify-center">
                    {button_links.map((item, index) => {
                      return (
                        <ButtonLink
                          key={index}
                          href={item.btn_link || item?.file || "#"}
                          target={
                            item?.btn_link?.includes("http") ||
                            item?.file?.includes("http")
                              ? "_blank"
                              : "_self"
                          }
                          className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                            item.variant === "filled"
                              ? "text-white bg-primary"
                              : "border-secondary"
                          } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                        >
                          {item.btn_label}
                        </ButtonLink>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {showLazy && (
          <>
            {images && images?.length > 0 && (
              <CarouselGallery
                alt_title={page?.title || "Thumbnail"}
                images={images}
                title="Gallery"
                className="bg-white"
              />
            )}

            <div className="container px-5 2xl:px-0">
              {award_images && award_images?.length > 0 && (
                <div className="flex w-full justify-center pt-10 pb-[50px]">
                  <div className="flex flex-col">
                    <span
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]`}
                    >
                      Awards
                    </span>
                    <div className="flex flex-wrap lg:flex-nowrap gap-x-[50px] items-center gap-y-[50px] justify-center">
                      {award_images?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full max-w-[120px] justify-center"
                          >
                            <Image
                              alt={"awards"}
                              src={item}
                              width={160}
                              height={194}
                              className="max-w-[120px] w-full h-full"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </article>
    </>
  );
}
