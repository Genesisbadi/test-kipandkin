import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BaseApi from "@/lib/api/_base.api";
import CustomSelect from "../forms/CustomSelect";
import globalState from "@/lib/store/globalState";
export default function Experience({ block }) {
  const showLazy = globalState((state) => state.showLazy);
  const [category, setCategory] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState({
    label: "All",
    value: "",
  });

  const loadCategories = useCallback(async () => {
    const categories = (
      await import("@/lib/preBuildScripts/static/experience-category.json")
    ).default;

    setCategory(categories.taxonomyTerms);
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setIsLoading(true);
    setSelectedExperience({
      label: selectedOption.label,
      value: selectedOption.value,
    });
    fetchExperience(selectedOption);
  };

  const fetchExperience = useCallback(
    async (selectedExp) => {
      setIsLoading(true);

      if (selectedExp === undefined) {
        selectedExp = selectedExperience;
      }
      try {
        const res = await BaseApi.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/experiences/entries?filter[sites.id]=${
              process.env.NEXT_PUBLIC_MICROSITE_ID
            }&sort=${
              block?.main?.sort_by || "order"
            }&includes=blueprintData,mediaHandler&filter[taxonomies][experience-category]=${
              selectedExp.value
            }`
        );
        setExperience(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants", error);
        setExperience([]);
        setIsLoading(false);
      }
    },
    [selectedExperience]
  );

  useEffect(() => {
    loadCategories();
    fetchExperience();
  }, [fetchExperience, loadCategories]);

  const options = [
    { label: "All", value: "" },
    ...category?.map((item) => ({
      label: item?.name,
      value: item?.id,
    })),
  ];

  return (
    <section className="bg-[#F1F1F1]">
      <div className="container">
        <div className="text-[#555] text-[14px] text-center leading-[21px] tracking-[1px] pb-[10px] mb-[10px]">
          Select Category
        </div>
        <CustomSelect
          isSearchable={false}
          className="react-select z-30 mx-auto"
          onChange={handleCategoryChange}
          placeholder={"Select Category"}
          options={options}
          defaultValue={selectedExperience}
        />
        <div className="flex flex-wrap mx-[-15px] py-[30px]">
          {!showLazy || isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                >
                  <div className="w-full flex flex-col bg-white pb-0 p-[20px] z-10 min-h-[400px] mb-[30px]">
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
              {experience.length > 0 ? (
                <>
                  {experience &&
                    experience?.map((item, index) => {
                      const media = {};
                      item?.attributes?.blueprintData?.forEach((e) => {
                        if (e?.attributes?.media?.length) {
                          media[e?.attributes?.state_path] =
                            e?.attributes?.media?.map((e1) => {
                              return {
                                original: e1?.attributes?.original_url,
                                conversions:
                                  e1?.attributes?.generated_conversions,
                              };
                            });
                        }
                      });

                      return (
                        <div
                          key={index}
                          className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
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
                          <div className="relative flex flex-col items-center justify-end mb-[30px]">
                            <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>
                            <Image
                              src={
                                media?.[`main.banner`]?.[0]?.conversions
                                  ?.desktop ||
                                media?.[`main.banner`]?.[0]?.original
                              }
                              className="w-full min-h-[300px] object-cover"
                              width={500}
                              height={200}
                              alt={item?.attributes?.title}
                            />
                            <Link
                              href={item?.attributes?.route_url}
                              className="absolute bottom-[28px] bg-primary border-[1px] border-primary text-white hover:bg-secondary hover:border-secondary transition uppercase px-[30px] py-[20px] z-20"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className="px-[15px]">No Experience found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
