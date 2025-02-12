import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import selectEntries from "@/lib/preBuildScripts/static/experiences.json";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
export default function ExperiencePage({ page }) {
  const CustomSelect = dynamic(() =>
    import("../forms/CustomSelect").then((module) => module.default)
  );
  const CollectionBanner = dynamic(() =>
    import("../partials/banner/CollectionBanner").then(
      (module) => module.default
    )
  );
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );

  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );
  const { route_url, title } = page;
  const { button_items, description, gallery, body_layout } = page?.data?.main;

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
    setSelectedValue(route_url);
  }, [route_url]);

  const getDefaultValue = () => {
    return {
      label: title,
      value: route_url,
      categoryList:
        selectEntries
          .find((item) => item.route_url === route_url)
          ?.taxonomyTerms.map((term) => term.name)
          .join(", ") || "",
    };
  };

  const CustomSingleValue = ({ data }) => (
    <div
      className="p-[10px] cursor-pointer max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
      style={{
        gridArea: "1 / 1 / 2 / 3",
      }}
    >
      {data.categoryList && (
        <div className="text-[12px]">{"(" + data.categoryList + ")"}</div>
      )}
      <div className="truncate">{data.label}</div>
    </div>
  );

  const CustomOption = (props) => {
    const { data, innerRef, innerProps, isSelected, isFocused } = props;
    return (
      <div
        className={`p-[10px] ${isFocused ? "bg-[#f1f1f1]" : "bg-white"} ${
          isSelected
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "cursor-pointer pointer-events-auto"
        } ${isFocused || isSelected ? "hover:bg-[#f1f1f1]" : ""}`}
        ref={innerRef}
        {...innerProps}
      >
        {data.categoryList && (
          <div className="text-[12px]">{"(" + data.categoryList + ")"}</div>
        )}
        <div>{data.label}</div>
      </div>
    );
  };

  const options = selectEntries?.map((item) => {
    const categoryList = item?.taxonomyTerms
      .map((term) => term.name)
      .join(", ");
    return {
      label: item?.title,
      value: item?.route_url,
      categoryList: categoryList,
    };
  });

  return (
    <>
      <CollectionBanner
        className=""
        title={page.title}
        image_desktop={
          page?.mediaHandler?.["main.banner"]?.[0]?.conversions?.desktop
        }
        image_laptop={
          page?.mediaHandler?.["main.banner"]?.[0]?.conversions?.laptop
        }
        image_mobile={
          page?.mediaHandler?.["main.banner"]?.[0]?.conversions?.mobile
        }
        image_original={page?.mediaHandler?.["main.banner"]?.[0]?.original}
      />
      <div className="container">
        <div className="flex text-[14px] flex-wrap px-[15px] justify-center items-center py-[30px] border-b-[1px] border-b-[#ccc] container">
          <span className="text-center px-[15px] mb-[10px]">
            Choose your experience
          </span>
          <div className="px-[15px]">
            <CustomSelect
              className="react-select w-full max-w-[350px] min-w-[280px] sm:min-w-[350px] cursor-pointer"
              id="experiences-select"
              isSearchable={false}
              instanceId="experiences-select"
              value={getDefaultValue()}
              defaultValue={getDefaultValue()}
              onChange={handleSelectChange}
              options={options}
              components={{
                Option: CustomOption,
                SingleValue: CustomSingleValue,
              }}
            />
          </div>
        </div>
        {description && (
          <div
            className={`${styles.descriptionExperience}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {body_layout && body_layout.length > 0 && (
          <div className="py-[40px]">
            {body_layout?.map((item, index) => (
              <div
                key={index}
                className="pb-[40px] custom-counter flex flex-col"
              >
                {item?.title && (
                  <h2 className="text-primary text-[30px] text-center font-bold mb-[20px]">
                    {item?.title}
                  </h2>
                )}
                {item?.subtitle && (
                  <h3 className="font-bold text-[20px] mb-[20px]">
                    {item?.subtitle}
                  </h3>
                )}
                <div
                  className={`flex flex-wrap gap-x-[20px] ${
                    item?.counter_number || item?.show_icon
                      ? "mt-[150px] gap-y-[120px]"
                      : "gap-y-[50px]"
                  }`}
                >
                  {item?.layout?.map((itemLayout, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`max-w-full w-full border border-gray-300 rounded-[22px] relative text-center 
                        ${
                          item?.layout?.length <= 5
                            ? item?.layout?.length % 2
                              ? "sm:max-w-[47%] lg:max-w-[32%]"
                              : "sm:max-w-[47%]"
                            : "sm:max-w-[47%] lg:max-w-[32%]"
                        }
                        ${
                          item?.counter_number || item?.show_icon
                            ? "pt-[65px] pb-[50px] px-[20px]"
                            : "pb-[40px]"
                        }`}
                    >
                      {item?.show_icon ? (
                        <div className="absolute top-[-100px] left-0 right-0">
                          <Image
                            className="max-w-[150px] w-full mx-auto h-full"
                            src={itemLayout?.image_icon}
                            height={150}
                            width={250}
                            alt={item?.title || "Thumbnails"}
                          />
                        </div>
                      ) : (
                        <Image
                          className="w-full mx-auto h-auto sm:h-[250px] lg:h-[300px] rounded-t-[22px] object-cover"
                          src={itemLayout?.image_icon}
                          height={150}
                          width={250}
                          alt={item?.title || "Thumbnails"}
                        />
                      )}
                      {item?.counter_number ? (
                        <div className="custom-counter-number text-white h-[80px] w-[80px] rounded-full text-[30px] font-bold flex mx-auto justify-center items-center bg-[var(--primary)] mb-[20px]"></div>
                      ) : (
                        <h2 className="text-[23px] font-bold text-primary my-[20px] px-[20px]">
                          {itemLayout?.title}
                        </h2>
                      )}

                      <div
                        className={`${
                          item?.counter_number || item?.show_icon
                            ? ""
                            : "px-[20px] "
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: itemLayout?.description,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                {item?.description && (
                  <div
                    className={`${styles.descriptionExperience}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {page?.data?.main?.button_items?.length > 0 && (
          <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center mb-[30px]">
            <div className="flex flex-wrap justify-center ">
              {page?.data?.main?.button_items?.map((item, index) => (
                <ButtonLink
                  key={index}
                  href={item?.button_link}
                  className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                    item.button_variant === "filled"
                      ? "text-white bg-primary"
                      : "border-secondary"
                  } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                >
                  {item?.button_label}
                </ButtonLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {gallery && (
        <CarouselGallery
          alt_title={page?.title || "Thumbnail"}
          images={gallery}
          title="Gallery"
          className=""
        />
      )}
      {page?.data?.featured_offers?.items &&
        page?.data?.featured_offers?.items.length > 0 && (
          <div
            className={`w-full bg-[#f1f1f1] lg:pb-[20px] ${
              gallery.length === 0 ? "pt-[20px] lg:pt-[50px]" : ""
            }`}
          >
            <div className="container pb-[20px] !max-w-[980px] mx-auto">
              <div className="flex flex-col w-full">
                <h2
                  className={`text-primary text-[25px] uppercase text-center pb-[30px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  } ${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "font-effra"
                      : " "
                  }`}
                >
                  Dining Offer
                </h2>
                {page?.data?.featured_offers.items.map((item, index) => {
                  const description =
                    item.description ||
                    item?.select_offer?.attributes?.data?.main?.description;
                  const title =
                    item.title || item?.select_offer?.attributes?.title;
                  const route_url =
                    item?.link ||
                    item?.select_offer?.attributes?.route_url ||
                    "#";

                  const image =
                    page?.mediaHandler[
                      `featured_offers.items.${index}.image`
                    ][0]?.conversions?.thumbnail ||
                    page?.mediaHandler[
                      `featured_offers.items.${index}.image`
                    ][0]?.original ||
                    null;

                  const button_label = item?.button_label || "View Offer";
                  return (
                    <div
                      className="flex mb-[30px] flex-col md:flex-row w-full bg-white shadow-md"
                      key={index}
                    >
                      {image && (
                        <div className="w-full md:max-w-[500px]">
                          <Link href={route_url || "#"}>
                            <Image
                              alt={title || "image"}
                              src={image}
                              width={628}
                              height={280}
                              className="w-full h-[300px] object-cover rounded-tl-sm rounded-bl-sm"
                            />
                          </Link>
                        </div>
                      )}

                      <div
                        className={`flex flex-col justify-between w-full ${
                          image ? "md:w-1/2" : ""
                        } p-5`}
                      >
                        <div className="flex flex-col flex-grow justify-center">
                          <h3
                            className={`text-primary text-[20px] text-center ${
                              process.env.NEXT_PUBLIC_TEMPLATE == 1
                                ? "font-tenor"
                                : " "
                            } ${
                              process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                                ? "font-effra"
                                : " "
                            }`}
                          >
                            <Link href={route_url}>{title}</Link>
                          </h3>
                          <div className="w-full flex justify-center pt-[15px] pb-[10px]">
                            <span className="border- border-[#aaa] h-[2px] block bg-[#aaa] tracking-[1px] w-[22px]" />
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: description,
                            }}
                            className="text-[14px] text-center leading-[25px] line-clamp-4 "
                          />
                        </div>
                        <Link
                          href={route_url}
                          className={`w-full mt-5 py-[15px] px-[30px] 2sm:w-auto text-center text-[14px] border border-secondary text-secondary hover:bg-secondary hover:text-white uppercase`}
                        >
                          {button_label}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
    </>
  );
}
