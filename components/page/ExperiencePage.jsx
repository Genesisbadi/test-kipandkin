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
                    item.button_variant === "dark"
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
    </>
  );
}
