import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import selectEntries from "@/lib/preBuildScripts/static/experiences.json";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  const { route_url, title } = page;
  const { button_items, description, gallery } = page?.data?.main;
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
    };
  };

  return (
    <>
      <CollectionBanner
        className=""
        title={page.title}
        image_desktop={
          page?.mediaHandler["main.banner"]?.[0]?.conversions?.desktop
        }
        image_laptop={
          page?.mediaHandler["main.banner"]?.[0]?.conversions?.laptop
        }
        image_mobile={
          page?.mediaHandler["main.banner"]?.[0]?.conversions?.mobile
        }
        image_original={page?.mediaHandler["main.banner"]?.[0]?.original}
      />

      <div className="flex text-[14px] flex-wrap px-[15px] justify-center items-center py-[30px] border-b-[1px] border-b-[#ccc] container">
        <span className="text-center px-[15px] mb-[10px] xs:mb-0">
          Choose your experience
        </span>
        <div className="px-[15px]">
          <CustomSelect
            className="react-select w-full max-w-[350px] min-w-[350px] cursor-pointer"
            id="experiences-select"
            isSearchable={false}
            instanceId="experiences-select"
            value={getDefaultValue()}
            defaultValue={getDefaultValue()}
            onChange={handleSelectChange}
            options={selectEntries?.map((item, index) => {
              return {
                label: item?.title,
                value: item?.route_url,
              };
            })}
          />
        </div>
      </div>
      {description && (
        <div
          className={`${styles.descriptionExperience} container`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {page?.data?.main?.button_items?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center mb-[30px]">
          <div className="flex flex-wrap justify-center ">
            {page?.data?.main?.button_items?.map((item, index) => (
              <Link
                key={index}
                href={item?.button_link}
                className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                  item.button_variant === "dark"
                    ? "text-white bg-primary"
                    : "border-secondary"
                } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
              >
                {item?.button_label}
              </Link>
            ))}
          </div>
        </div>
      )}

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
