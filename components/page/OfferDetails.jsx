import Image from "next/image";
import { useState, useEffect } from "react";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";

import filteredOffersCategory from "@/lib/services/filteredOffersCategory";
import NProgress from "nprogress";
import { useRouter } from "next/router";

import tenantDetails from "@/lib/preBuildScripts/static/tenantDetailsMain.json";

import styles from "@/styles/description.module.css";
import AccordionsOffer from "../partials/collapsibles/AccordionsOffer";

const VenueDescription = dynamic(() =>
  import("../nodes/meetings-events/VenueDescription").then(
    (module) => module.default
  )
);

const ButtonsRepeater = dynamic(() =>
  import("../partials/buttons/ButtonsRepeater").then((module) => module.default)
);

const CarouselGallery = dynamic(() =>
  import("../partials/gallery/CarouselGallery").then((module) => module.default)
);
const CarouselGalleryMedia = dynamic(() =>
  import("../partials/gallery/CarouselGalleryMedia").then(
    (module) => module.default
  )
);

const CustomSelect = dynamic(() =>
  import("@/components/forms/CustomSelect").then((module) => module.default)
);

const Slider = dynamic(() =>
  import("react-slick").then((module) => module.default)
);
const StickyShareButtons = dynamic(
  () => import("sharethis-reactjs").then((mod) => mod.StickyShareButtons),
  {
    ssr: false, // This line ensures that the component is only loaded on the client side.
  }
);

export default function OfferDetails({ page }) {
  const offersCategories = filteredOffersCategory();

  const [currentUrl, setCurrentUrl] = useState("");

  const router = useRouter();

  const showLazy = globalState((state) => state.showLazy);
  const { title, id, data, metaData, published_at, mediaHandler } = page;

  const { description, image, venues, buttons, gallery, accordions } =
    data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues?.[0]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    setCurrentVenue(venues?.[0]);
    setCurrentUrl(window.location.href);
  }, [venues]);

  const getDefaultValue = () => {
    return { label: currentVenue.title, value: currentVenue.title };
  };

  const handleCategoryChange = (selectedOption) => {
    NProgress.start();

    router
      .push(`/special-offers?category=${selectedOption.value}`)
      .then(() => {
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  };

  const accordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  var settings = {
    dots: page?.data?.main?.images?.length < 2 ? false : true,
    infinite: page?.data?.main?.images?.length < 2 ? false : true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          zIndex: "20",
          margin: "0px",
          listStyle: "none",
          padding: "0px",
        }}
      >
        {dots}
      </div>
    ),
    customPaging: (i) => (
      <div className="text-[14px] font-tenor text-primary font-bold cursor-pointer indent-[-9999px] rounded-full w-[10px] h-[10px] bg-white">
        {i + 1}
      </div>
    ),
  };

  return (
    <article className="bg-[#F1F1F1]">
      <div className="container mx-auto">
        <h2
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
          } text-primary text-[25px] tracking-[1px] text-center pt-[35px] pb-[25px] border-b-[1px] border-[#ccc] mb-[20px]`}
        >
          {title}
        </h2>

        {!showLazy ? (
          <>
            <div className="animate-pulse h-[400px] bg-[#ccc] mb-[30px]" />
            <div className="animate-pulse h-[20px] w-full max-w-[400px] bg-[#ccc] mb-[30px]" />
            <div className="animate-pulse h-[40px] w-full max-w-[200px] bg-[#ccc] mb-[30px]" />
            <div className="animate-pulse h-[50px] w-full bg-[#ccc] mb-[30px]" />
            <div className="animate-pulse h-[250px] w-full bg-[#ccc] mb-[30px]" />
          </>
        ) : (
          <>
            {process.env.NEXT_PUBLIC_TEMPLATE == 2 && (
              <div className="pb-[15px]">
                <CustomSelect
                  isSearchable={false}
                  className="react-select z-30 max-w-[300px] mx-auto"
                  onChange={handleCategoryChange}
                  placeholder={"Select Category"}
                  options={offersCategories?.map((item, index) => ({
                    label: item?.name,
                    value: item?.id,
                  }))}
                />
              </div>
            )}

            {page?.data?.main?.images && (
              <>
                <Slider
                  className={`offer-slider relative mb-[30px]`}
                  {...settings}
                >
                  {page?.data?.main?.images.map((item, index) => {
                    return (
                      <div key={index}>
                        <Image
                          src={item}
                          width={1200}
                          height={450}
                          alt={page?.title}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </>
            )}
            {description && (
              <div
                className={`text-[14px] pb-[30px] ${
                  process.env.NEXT_PUBLIC_TEMPLATE != 1 && !venues
                    ? "bg-white shadow-md px-[40px] py-[30px] mb-[50px]"
                    : ""
                } ${styles?.description}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <>
              {venues?.length > 0 && (
                <>
                  {process.env.NEXT_PUBLIC_TEMPLATE == 1 && (
                    <div
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } text-primary text-[20px] tracking-[1px] mb-[10px]`}
                    >
                      Select Property:
                    </div>
                  )}
                  <CustomSelect
                    value={getDefaultValue()}
                    isSearchable={false}
                    className="react-select"
                    defaultValue={getDefaultValue()}
                    onChange={(e) =>
                      setSelectedValue(() => {
                        Number(e.value);
                        const curVenue = venues.find(
                          (obj) => obj.title === e.value
                        );
                        setCurrentVenue(curVenue);
                      })
                    }
                    options={venues?.map((item, index) => {
                      return {
                        label: item?.title,
                        value: item?.title,
                      };
                    })}
                  />
                </>
              )}
            </>
          </>
        )}
      </div>

      {buttons && buttons.length > 0 && (
        <div className="container pb-[50px] mx-auto">
          <ButtonsRepeater buttons={buttons} />
        </div>
      )}

      {gallery && gallery.length > 0 && (
        <CarouselGalleryMedia
          className="py-0"
          gallery={gallery}
          mediaHandler={mediaHandler}
        />
      )}

      {showLazy && (
        <>
          {currentVenue && (
            <>
              <div
                className={`container mx-auto mt-[30px]  ${
                  currentVenue?.buttons && currentVenue?.buttons?.length < 1
                    ? "pb-[50px]"
                    : ""
                }`}
              >
                {currentVenue && (
                  <>
                    {currentVenue?.image && (
                      <Image
                        src={currentVenue?.image}
                        width={1200}
                        height={450}
                        className="w-full h-auto"
                      />
                    )}
                    {currentVenue?.description && (
                      <VenueDescription
                        className={`bg-white shadow-md px-[40px] py-[30px] mb-[50px]`}
                        description={currentVenue.description}
                      />
                    )}
                    {currentVenue?.buttons &&
                      currentVenue?.buttons?.length > 0 && (
                        <ButtonsRepeater
                          className="pb-[50px]"
                          buttons={currentVenue.buttons}
                        />
                      )}
                  </>
                )}
              </div>
              {page?.data?.main?.terms_condition && (
                <div className="py-[15px] container">
                  <div
                    className={`accordion-header select-none flex justify-between cursor-pointer items-center py-[15px] px-[8px] border-b-[1px] border-[#ccc] border-t-[1px] border-[#ccc] ${
                      accordionOpen ? "bg-white" : ""
                    }`}
                    onClick={accordion}
                  >
                    <h2 className="text-primary font-bold text-[20px] font-tenor">
                      Terms & Conditions
                    </h2>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 transition ${
                        accordionOpen ? "rotate-180" : "rotate-0"
                      } `}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg> */}
                    <svg
                      height="20"
                      width="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className={`w-5 h-5 transition ${
                        accordionOpen ? "rotate-180" : "rotate-0"
                      } `}
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  </div>

                  {accordionOpen && (
                    <div className="content py-[15px] bg-[#fff] py-[30px] px-[15px]">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: page?.data?.main?.terms_condition,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
              {accordions && accordions.length > 0 && (
                <AccordionsOffer accordions={accordions} />
              )}

              {currentVenue?.gallery && (
                <CarouselGallery
                  className="py-0"
                  images={currentVenue.gallery}
                />
              )}
            </>
          )}
        </>
      )}

      {currentUrl && showLazy && (
        <StickyShareButtons
          className="!z-[100]"
          config={{
            alignment: "left", // alignment of buttons (left, right)
            color: "social", // set the color of buttons (social, white)
            enabled: true, // show/hide buttons (true, false)
            font_size: 16, // font size for the buttons
            hide_desktop: false, // hide buttons on desktop (true, false)
            labels: "counts", // button labels (cta, counts, null)
            language: "en", // which language to use (see LANGUAGES)
            min_count: 0, // hide react counts less than min_count (INTEGER)
            networks: [
              // which networks to include (see SHARING NETWORKS)
              "linkedin",
              "facebook",
              "twitter",
              "email",
            ],
            padding: 12, // padding within buttons (INTEGER)
            radius: 4, // the corner radius on each button (INTEGER)
            show_total: true, // show/hide the total share count (true, false)
            show_mobile: true, // show/hide the buttons on mobile (true, false)
            show_toggle: true, // show/hide the toggle buttons (true, false)
            size: 48, // the size of each button (INTEGER)
            top: 160, // offset in pixels from the top of the page
            min_count: 1, // (threshold for total share count to be displayed)
            url: currentUrl, // (defaults to current url)
            image: page?.data?.main?.images?.[0], // (defaults to og:image or twitter:image)
            description: page?.data?.main?.description, // (defaults to og:description or twitter:description)
            title: page?.title, // (defaults to og:title or twitter:title)
            message: `New Offer Deal from ${tenantDetails?.site_name}`, // (only for email sharing)
            subject: "New Offer Deal" + page?.title, // (only for email sharing)
            // username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
      )}
    </article>
  );
}
