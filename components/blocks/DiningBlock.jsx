import globalState from "@/lib/store/globalState";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BaseApi from "@/lib/api/_base.api";
export default function DiningBlock({ block }) {
  const showLazy = globalState((state) => state.showLazy);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState({
    label: "All",
    value: "",
  });
  const [restaurants, setRestaurants] = useState([]);

  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const loadCategories = useCallback(async () => {
    const categories = (
      await import("@/lib/preBuildScripts/static/dining-locations.json")
    ).default;

    setLocations(categories.taxonomyTerms);
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setIsLoading(true);
    setSelectedLocation({
      label: selectedOption.label,
      value: selectedOption.value,
    });
    fetchRestaurants(selectedOption);
  };

  const fetchRestaurants = useCallback(
    async (selectedLoc) => {
      setIsLoading(true);

      if (selectedLoc === undefined) {
        selectedLoc = selectedLocation;
      }
      try {
        const res = await BaseApi.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/dining/entries?filter[sites.id]=${process.env.NEXT_PUBLIC_MICROSITE_ID}&includes=blueprintData,mediaHandler&filter[taxonomies][dining-location-category]=${selectedLoc.value}&sort=title`
        );
        setRestaurants(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants", error);
        setRestaurants([]);
        setIsLoading(false);
      }
    },
    [selectedLocation]
  );
  useEffect(() => {
    loadCategories();
    fetchRestaurants();
  }, [loadCategories]);

  const options = [
    { label: "All", value: "" },
    ...locations?.map((item, index) => ({
      label: item?.name,
      value: item?.id,
    })),
  ];

  return (
    <section className="bg-[#F1F1F1]">
      <div className="container">
        {process.env.NEXT_PUBLIC_TEMPLATE == 1 && (
          <>
            <div className="text-[#555] text-[14px] text-center leading-[21px] tracking-[1px] pb-[10px] mb-[10px]">
              Select your destination
            </div>
            <CustomSelect
              isSearchable={false}
              className="react-select z-30 mx-auto"
              onChange={handleCategoryChange}
              placeholder={"Select Category"}
              options={options}
              defaultValue={selectedLocation}
            />
          </>
        )}
        <div className="flex flex-wrap mx-[-15px] py-[30px]">
          {!showLazy || isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px] flex flex-col"
                >
                  <div className="w-full h-full flex flex-col bg-white pb-0 p-[20px] z-10 min-h-[400px] mb-[30px]">
                    <div className="">
                      <div className="animate-pulse h-[25px] bg-[#ccc]" />
                    </div>
                    <div className="mt-auto h-[300px] p-[50px] bg-[#ccc] mx-[-20px] w-[calc(100%+30px] flex justify-center items-end">
                      <div className="bg-white animate-pulse h-[70px] mx-auto w-[100%]" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {restaurants.length > 0 ? (
                <>
                  {restaurants &&
                    restaurants?.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                      >
                        <div className="w-full bg-white p-[20px] z-10">
                          <h3 className="text-primary text-[20px] truncate mb-[10px]">
                            {item?.attributes?.title
                              ?.split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </h3>
                        </div>
                        <div className="relative flex flex-col items-center justify-end mb-[30px] grow">
                          <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>

                          <Image
                            src={item?.attributes?.data?.main?.banner_desktop}
                            className="w-full h-full min-h-[300px] object-cover"
                            width={500}
                            height={200}
                            alt={item?.attributes?.title}
                          />
                          <Link
                            href={item?.attributes?.route_url}
                            className="absolute bottom-[28px] bg-primary border-[1px] border-primary text-white hover:bg-secondary hover:border-secondary transition uppercase px-[30px] py-[20px] z-20"
                          >
                            Discover
                          </Link>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="px-[15px]">No restaurants found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
