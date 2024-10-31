import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { use, useState } from "react";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function MeetingsEvensDetails({ page }) {
  const router = useRouter();
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );

  const ButtonsRepeater = dynamic(() =>
    import("../partials/buttons/ButtonsRepeater").then(
      (module) => module.default
    )
  );
  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);

  const { title } = page;
  const { description, venues, buttons, gallery } = page.data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues?.[0]);

  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );

  useEffect(() => {
    setCurrentVenue(venues?.[0]);
  }, [venues]);

  const getDefaultValue = () => {
    let defaultVenue = currentVenue?.title || title;
    return { label: defaultVenue, value: defaultVenue };
  };
  return (
    <article className="bg-[#f1f1f1]">
      <div className="relative min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] text-white flex text-center items-center justify-center">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <picture>
          <source
            srcSet={
              page.mediaHandler["main.image"]?.[0].conversions.mobile ||
              page.mediaHandler["main.image"]?.[0].original
            }
            media="(max-width: 414px)"
          />
          <source
            srcSet={
              page.mediaHandler["main.image"]?.[0].conversions.laptop ||
              page.mediaHandler["main.image"]?.[0].original
            }
            media="(min-width: 415px)"
          />
          <source
            srcSet={
              page.mediaHandler["main.image"]?.[0].conversions.desktop ||
              page.mediaHandler["main.image"]?.[0].original
            }
            media="(min-width: 1366px)"
          />
          <Image
            src={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
            srcSet={`${page.mediaHandler["main.image"]?.[0].conversions.mobile} 414w, ${page.mediaHandler["main.image"]?.[0].conversions.laptop} 1365w, ${page.mediaHandler["main.image"]?.[0].conversions.desktop} 1920w`}
            size="(max-width: 414px) 414px, (min-width: 415px) 1365px, (min-width: 1366px) 1920px"
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute top-0 left-0"
            priority={true}
          />
        </picture>
        {title && (
          <div
            className={`relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] font-tenor text-[35px] md:text-[42px]  text-white z-[3]`}
          >
            {title}
          </div>
        )}
      </div>

      {!showLazy ? (
        <>
          <div className="container py-[20px] sm:py-[30px]">
            <div className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[300px] mb-[30px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full mb-[10px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full mb-[40px] max-w-[30%]" />
            <div className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[35%] mb-[20px]" />
            <div className="animate-pulse bg-[#ccc] h-[50px] w-full mb-[50px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full mb-[10px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] max-w-[50%] w-full mb-[10px]" />
          </div>
        </>
      ) : (
        <>
          <div className="container py-[20px] sm:py-[30px]">
            {description && (
              <div
                className={`${styles.description}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {venues?.length > 0 && (
              <>
                <label
                  htmlFor="select-property"
                  className={`${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  } block text-primary text-[20px] tracking-[1px] mt-[30px] mb-[10px]`}
                >
                  Select Property:
                </label>

                <CustomSelect
                  // value={selectedValue}
                  isSearchable={false}
                  className="react-select"
                  name="select-property"
                  defaultValue={getDefaultValue()}
                  onChange={(e) => {
                    const curVenue = venues.find(
                      (obj) => obj.title === e.value
                    );
                    setSelectedValue(e.value);
                    setCurrentVenue(curVenue);
                  }}
                  options={venues?.map((item, index) => {
                    return {
                      label: item?.title,
                      value: item?.title,
                    };
                  })}
                />
              </>
            )}
          </div>
          {currentVenue && (
            <div className="container mt-[30px]">
              {currentVenue.image && (
                <ModalImage
                  className="w-full h-full object-cover"
                  title={currentVenue?.title || "#"}
                  content={currentVenue?.image}
                  image={currentVenue?.image}
                />
              )}
              <div
                className={`${styles.description} my-[30px]`}
                dangerouslySetInnerHTML={{
                  __html: currentVenue?.description,
                }}
              />

              {currentVenue?.buttons?.length > 0 && (
                <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center">
                  {currentVenue?.buttons?.map((item, index) => (
                    <ButtonLink
                      key={index}
                      href={item?.button_link}
                      className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[10px] md:m-[15px] ${
                        item.button_variant === "dark"
                          ? "text-white bg-primary"
                          : "border-secondary"
                      } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                    >
                      {item?.button_label}
                    </ButtonLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentVenue?.images && (
            <CarouselGallery
              alt_title={currentVenue?.title || "Thumbnail"}
              images={currentVenue?.images}
            />
          )}

          {buttons && showLazy && (
            <div className="container">
              <ButtonsRepeater className="pb-[50px]" buttons={buttons} />
            </div>
          )}

          {/* {buttons?.length > 0 && (
            <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center pb-[30px]">
              <div className="flex flex-wrap justify-center ">
                {buttons?.map((item, index) => (
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
          )} */}

          {gallery && gallery.length > 0 && (
            <CarouselGallery alt_title={"Thumbnail"} images={gallery} />
          )}
        </>
      )}
    </article>
  );
}
