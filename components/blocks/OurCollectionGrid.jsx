import ourCollectionSelections from "@/lib/preBuildScripts/static/ourCollectionSelections";

import tenantDetailsBlueprintData from "@/lib/preBuildScripts/static/tenantDetailsBlueprintData";

import Image from "next/image";
import Link from "next/link";

export default function OurCollectionGrid({ block }) {
  // Function to find the image by ID
  function createImageFinder(blueprintData) {
    // This function will "remember" the `blueprintData`
    return function findImageById(imageId) {
      return blueprintData.filter((item) => {
        if (item?.value) {
          // Handle case when `value` is a string
          if (typeof item.value === "string") {
            return item.value.includes(imageId); // Check if `value` contains the image ID
          }

          // Handle case when `value` is an array
          if (Array.isArray(item.value)) {
            return item.value.includes(imageId); // Check if `value` array contains the image ID
          }
        }
        return false;
      });
    };
  }

  // Create the image finder function with `tenantDetailsBlueprintData`
  const findImageById = createImageFinder(tenantDetailsBlueprintData);

  // Collect image IDs from `ourCollectionSelections` into `imageIds`
  let imageIds = [];
  ourCollectionSelections?.items?.forEach((item) => {
    if (item?.image?.[0]) {
      imageIds.push(item?.image?.[0]);
    }
  });

  console.log("Image IDs:", imageIds); // Optional: Log image IDs for debugging

  // Find images from `tenantDetailsBlueprintData` based on `imageIds`
  let foundImages = [];

  imageIds.forEach((id) => {
    const images = findImageById(id); // Now you don't need to pass `tenantDetailsBlueprintData`
    if (images.length > 0) {
      foundImages.push(...images); // Add found images to the `foundImages` array
    }
  });

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ourCollectionSelections?.items?.map((item, index) => {
          const itemMediaObj = findImageById(item?.image?.[0]);
          const mediaImage =
            itemMediaObj[0]?.media?.[0]?.attributes?.generated_conversions
              ?.medium || itemMediaObj[0]?.media?.[0]?.attributes?.original_url;
          return (
            <div key={index} className="flex relative">
              <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
              <Image
                src={mediaImage}
                alt={item?.link?.attributes?.name}
                height={1000}
                width={1000}
                quality={100}
                className="w-full h-[400px] object-cover"
              />

              <div className="flex flex-col absolute w-full h-full items-center justify-center z-[2]">
                <span className="text-white font-[700] text-[20px] pb-[20px]">
                  {item?.link?.attributes?.name}
                </span>
                <div className="flex flex-col 2sm:flex-row gap-y-3 2sm:gap-y-0 gap-x-5 px-3 w-full justify-center">
                  {item?.book_link && (
                    <Link
                      href={item?.book_link}
                      className={`w-full h-full 2sm:w-auto text-center text-white text-sm border-[1px] border-primary bg-primary hover:bg-[secondary] hover:border-[secondary] py-[20px] px-[30px] uppercase`}
                    >
                      Book Now
                    </Link>
                  )}
                  <Link
                    href={item?.link?.attributes?.route_url}
                    className={`w-full h-full tracking-[1px] 2sm:w-auto text-center text-[14px] text-white border border-white py-[20px] px-[30px] hover:bg-white hover:text-secondary uppercase`}
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
