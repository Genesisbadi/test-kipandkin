import Image from "next/image";
import { useState, useEffect } from "react";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";

import filteredOffersCategory from "@/lib/services/filteredOffersCategory";
import NProgress from "nprogress";
import { useRouter } from "next/router";

const StickyShareButtons = dynamic(() => import('sharethis-reactjs').then(mod => mod.StickyShareButtons), {
  ssr: false,  // This line ensures that the component is only loaded on the client side.
}); 

export default function OfferDetails({ page }) {
  const offersCategories = filteredOffersCategory();

  const [currentUrl, setCurrentUrl] = useState("");

  const router = useRouter();

  const VenueDescription = dynamic(() =>
    import("../nodes/meetings-events/VenueDescription").then(
      (module) => module.default
    )
  );

  const ButtonsRepeater = dynamic(() =>
    import("../partials/buttons/ButtonsRepeater").then(
      (module) => module.default
    )
  );

  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );

  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title, id, data, metaData, published_at, mediaHandler } = page;
  const { description, image, venues } = data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  useEffect(() => {
    setCurrentVenue(venues[0]);
    setCurrentUrl(window.location.href);
  }, [venues]);

  const getDefaultValue = () => {
    return { label: currentVenue.title, value: currentVenue.title };
  };

  const handleCategoryChange = (selectedOption) => {
    NProgress.start();

    router
      .push(`/offers?category=${selectedOption.value}`)
      .then(() => {
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  };

  return (
    <article className="bg-[#F1F1F1]">
      <div className="container mx-auto">
        <h2
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          } text-primary text-[25px] tracking-[1px] text-center pt-[35px] pb-[25px] border-b-[1px] border-[#ccc] mb-[20px]`}
        >
          {title}
        </h2>

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

        {mediaHandler["main.image"]?.[0] && (
          <Image
            className="mb-[30px]"
            src={
              mediaHandler["main.image"]?.[0].conversions.desktop ||
              mediaHandler["main.image"]?.[0].original
            }
            width={1200}
            height={450}
            alt={title || "Thumbnail"}
          />
        )}
        {description && (
          <div
            className="text-[14px] mb-[30px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {showLazy && (
          <>
            {venues.length > 0 && (
              <>
                {process.env.NEXT_PUBLIC_TEMPLATE == 1 && (
                  <div
                    className={`${
                      process.env.NEXT_PUBLIC_TEMPLATE == 1
                        ? "font-tenor"
                        : "font-domine"
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
        )}
      </div>

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
        config={{
          alignment: 'left',    // alignment of buttons (left, right)
          color: 'social',      // set the color of buttons (social, white)
          enabled: true,        // show/hide buttons (true, false)
          font_size: 16,        // font size for the buttons
          hide_desktop: false,  // hide buttons on desktop (true, false)
          labels: 'counts',     // button labels (cta, counts, null)
          language: 'en',       // which language to use (see LANGUAGES)
          min_count: 0,         // hide react counts less than min_count (INTEGER)
          networks: [           // which networks to include (see SHARING NETWORKS)
            'linkedin',
            'facebook',
            'twitter',
            'pinterest',
            'email'
          ],
          padding: 12,          // padding within buttons (INTEGER)
          radius: 4,            // the corner radius on each button (INTEGER)
          show_total: true,     // show/hide the total share count (true, false)
          show_mobile: true,    // show/hide the buttons on mobile (true, false)
          show_toggle: true,    // show/hide the toggle buttons (true, false)
          size: 48,             // the size of each button (INTEGER)
          top: 160,             // offset in pixels from the top of the page


          // OPTIONAL PARAMETERS

          min_count: 10,                    // (threshold for total share count to be displayed)
          url: currentUrl, // (defaults to current url)
          image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
          description: 'custom text',       // (defaults to og:description or twitter:description)
          title: 'custom title',            // (defaults to og:title or twitter:title)
          message: 'custom email text',     // (only for email sharing)
          subject: 'custom email subject',  // (only for email sharing)
          username: 'custom twitter handle' // (only for twitter sharing)

        }}
      /> 
      )}
 

    </article>
  );
}
