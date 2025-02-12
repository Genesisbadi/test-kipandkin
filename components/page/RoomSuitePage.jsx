import Image from "next/image";
import roomsSuitesEntriesData from "@/lib/preBuildScripts/static/rooms-suites.json";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
export default function RoomSuitePage({ page }) {
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );

  const { mediaHandler, title, route_url } = page;
  const { button_links, description, features, gallery, image, main_features } =
    page.data.main;

  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState(route_url);

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

  return (
    <div>
      <section className="page-banner relative flex items-center justify-center min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <Image
          alt={title}
          src={
            page.mediaHandler?.[`main.image`]?.[0]?.conversions.desktop ||
            page.mediaHandler?.[`main.image`]?.[0]?.original
          }
          width={1920}
          height={1080}
          className="w-full h-full  object-cover absolute top-0 left-0"
          priority={true}
        />
        <div
          className={`relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] ${
            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
              ? "font-effra"
              : "font-tenor"
          } text-[30px] sm:text-[35px] md:text-[42px]  px-5 text-center text-white z-[3] leading-[50px]`}
        >
          {title}
        </div>
      </section>

      <article>
        <div className="container py-[50px]">
          <div
            className={`flex flex-wrap px-[15px] justify-center items-center pb-[40px]`}
          >
            {process.env.NEXT_PUBLIC_TEMPLATE !== "2" && (
              <span className="text-center px-[15px] mb-[10px] xs:mb-0">
                Check out other rooms
              </span>
            )}
            <div className="px-[15px]">
              {process.env.NEXT_PUBLIC_TEMPLATE == "2" && (
                <span className="text-[16px] text-center tracking-[1px] mb-[15px] block">
                  Select Room Type
                </span>
              )}
              <CustomSelect
                className={`max-w-[350px] react-select w-full cursor-pointer ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "min-w-[350px]" : ""
                }`}
                id="roomsuites-select"
                instanceId="roomsuites-select"
                value={getDefaultValue()}
                defaultValue={getDefaultValue()}
                onChange={handleSelectChange}
                isSearchable={false}
                options={roomsSuitesEntriesData
                  ?.map((item) => ({
                    label: item?.title,
                    value: item?.route_url,
                    order: item?.order,
                  }))
                  .sort((a, b) => (a.order || 0) - (b.order || 0))}
              />
            </div>
          </div>

          {description && (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="text-[14px] leading-[25px] mb-[50px]"
            />
          )}
        </div>
        <CarouselGallery
          images={gallery}
          title={"Gallery"}
          alt_title={title || "Thumbnail"}
        />
        <div className="container py-[50px]">
          {main_features && main_features?.length > 0 && (
            <>
              {main_features?.map((item, index) => (
                <div key={index} className="mb-[30px]">
                  {item?.title && (
                    <h2
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } text-[25px] uppercase  text-primary mb-[15px] ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 2
                          ? "text-left"
                          : "text-center"
                      }  ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "font-effra"
                          : " "
                      }`}
                    >
                      {item?.title}
                    </h2>
                  )}
                  {item?.features_information &&
                    item?.features_information.length > 0 && (
                      <div
                        className={`grid ${
                          item?.layout === "2_column"
                            ? "sm:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {item?.features_information?.map(
                          (itemInformation, indexIndex) => (
                            <div
                              key={indexIndex}
                              className="flex items-center gap-x-[10px] mb-[15px]"
                            >
                              {!item?.hide_icons && (
                                <Image
                                  src={
                                    itemInformation?.icon?.attributes?.data
                                      ?.main?.icon
                                  }
                                  height={15}
                                  width={15}
                                  alt="icon"
                                />
                              )}
                              {item?.hide_icons && (
                                <span className="flex w-[6px] h-[6px] bg-secondary rounded-full"></span>
                              )}
                              <div className="text-[14px] leading-[21px]">
                                {itemInformation?.information}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              ))}
            </>
          )}
          {features && (
            <>
              <h2
                className={`${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                } text-[25px] uppercase text-primary mb-[15px] ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 2
                    ? "text-left"
                    : "text-center"
                }  ${
                  process.env.NEXT_PUBLIC_MICROSITE_ID == 7 ? "font-effra" : " "
                }`}
              >
                Features
              </h2>
              <div className={`mb-[50px] ${styles.description}`}>
                <div
                  className={`text-[14px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 2 ? styles.col2 : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: features }}
                />
              </div>
            </>
          )}
          {button_links?.length > 0 && (
            <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center">
              <div className="flex flex-wrap justify-center ">
                {button_links?.map((item, index) => (
                  <ButtonLink
                    key={index}
                    href={item?.button_link || item?.file || "#"}
                    className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                      item?.variant === "filled"
                        ? "text-white bg-primary"
                        : "border-secondary"
                    } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                  >
                    {item?.button_label || ""}
                  </ButtonLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* <CarouselGallery
          images={gallery}
          title={"Gallery"}
          alt_title={title || "Thumbnail"}
        /> */}
      </article>
    </div>
  );
}
