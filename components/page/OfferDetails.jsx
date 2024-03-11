import Image from "next/image";
import CustomSelect from "@/components/forms/CustomSelect";
import { useState } from "react";
import VenueDescription from "../nodes/meetings-events/VenueDescription";
import ButtonsRepeater from "../partials/buttons/ButtonsRepeater";
import globalState from "@/lib/store/globalState";
export default function OfferDetails({ page }) {
  const showLazy = globalState((state) => state.showLazy);
  const { title, id, data, metaData, published_at, mediaHandler } = page;
  const { description, image, venues } = data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  const getDefaultValue = () => {
    let defaultVenue = venues[0]?.title || "";
    return { label: defaultVenue, value: defaultVenue };
  };
  return (
    <article className="bg-[#F1F1F1]">
      <div className="container">
        <h2 className="text-primary text-[25px] tracking-[1px] text-center py-[30px] border-b-[1px] border-[#ccc] mb-[30px]">
          {title}
        </h2>

        {image && (
          <Image
            className="mb-[30px]"
            src={mediaHandler["main.image"]?.[0].conversions.desktop}
            width={1200}
            height={450}
            alt={title}
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
                <div className="text-primary text-[20px] tracking-[1px] mb-[10px]">
                  Select Venue:
                </div>
                <CustomSelect
                  // value={selectedValue}
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
              <div className="container mt-[30px] pb-[50px]">
                {currentVenue.description && (
                  <VenueDescription
                    className="bg-white shadow-md px-[40px] py-[30px] mb-[50px]"
                    description={currentVenue.description}
                  />
                )}

                {currentVenue.buttons.length > 0 && (
                  <ButtonsRepeater buttons={currentVenue.buttons} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </article>
  );
}
