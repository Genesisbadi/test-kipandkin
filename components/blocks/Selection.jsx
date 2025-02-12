import CustomSelect from "../forms/CustomSelect";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
import ButtonsRepeater from "../partials/buttons/ButtonsRepeater";
export default function Selection({ block }) {
  const CustomSelect = dynamic(() =>
    import("../forms/CustomSelect").then((module) => module.default)
  );
  const showLazy = globalState((state) => state.showLazy);

  const { title, description, selection_label, selections, buttons } =
    block.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentSelection, setCurrentSelection] = useState(selections[0]);

  useEffect(() => {
    setCurrentSelection(selections[0]);
  }, [selections]);

  const getDefaultValue = () => {
    let defaultSelection = currentSelection?.title;
    return { label: defaultSelection, value: defaultSelection };
  };

  return (
    <section className="bg-[#f1f1f1] pt-[20px] sm:py-[30px]">
      <div className="container pb-[30px]">
        {!showLazy ? (
          <>
            <div className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[300px] mb-[20px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full mb-[10px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full max-w-[80%] mb-[30px]" />
            <div className="animate-pulse bg-[#ccc] h-[30px] w-full max-w-[150px] mb-[20px]" />
            <div className="animate-pulse bg-[#ccc] h-[50px] w-full mb-[20px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full max-w-[90%] mb-[10px]" />
            <div className="animate-pulse bg-[#ccc] h-[10px] w-full max-w-[50%] mb-[40px]" />
            <div className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[100px] mb-[20px]" />
            {Array.from({ length: 8 }, (_, index) => (
              <div
                className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[300px] mb-[20px]"
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            {title ||
              (description && (
                <div className="my-[15px]">
                  {title && (
                    <h2
                      className={`text-primary text-[18px] font-bold tracking-[1px] mb-[20px] ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : " "
                      } ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "font-effra"
                          : " "
                      }`}
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <div
                      className={`${styles.description} mb-[20px]`}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </div>
              ))}
            {selections.length > 0 && (
              <>
                <div
                  className={`${
                    title || description ? "mt-[30px]" : ""
                  } text-primary text-[20px] tracking-[1px] mb-[10px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  } ${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "font-effra"
                      : " "
                  }`}
                >
                  {selection_label}:
                </div>
                <CustomSelect
                  // value={selectedValue}
                  className="react-select"
                  defaultValue={getDefaultValue()}
                  isSearchable={false}
                  onChange={(e) =>
                    setSelectedValue(() => {
                      Number(e.value);
                      const curSelection = selections.find(
                        (obj) => obj.title === e.value
                      );
                      setCurrentSelection(curSelection);
                    })
                  }
                  options={selections?.map((item, index) => {
                    return {
                      label: item?.title,
                      value: item?.title,
                    };
                  })}
                />
              </>
            )}
            <div
              className={`${styles.description} my-[30px]`}
              dangerouslySetInnerHTML={{
                __html: currentSelection.description,
              }}
            />

            {currentSelection?.buttons && (
              <ButtonsRepeater buttons={currentSelection?.buttons} />
            )}

            {buttons && buttons?.length > 0 && (
              <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center my-[30px]">
                <div className="flex flex-wrap justify-center ">
                  {buttons?.map((item, index) => (
                    <Link
                      key={index}
                      href={item?.button_link || "#"}
                      className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                        item.button_variant === "dark"
                          ? "text-white bg-primary"
                          : "border-secondary"
                      } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                    >
                      {item?.button_label || "Read More"}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
