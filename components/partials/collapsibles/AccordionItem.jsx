import styles from "@/styles/description.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import CarouselAccordion from "./CarouselAccordion";
export default function AccordionItem({ ...props }) {
  const { item, index, bg_white } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    // if (index === 0) setIsOpen(true);
    setIsOpen(true);
  }, [item]);

  return (
    <>
      <div key={index} className="accordion-item mb-[30px]">
        <div
          className={`bg-secondary text-white p-[15px] cursor-pointer ${
            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
              ? "font-effra"
              : "font-tenor"
          } text-[20px] relative select-none`}
          onClick={toggleAccordion}
        >
          {item.title}
          <span className="absolute right-[15px] top-[50%] translate-y-[-50%]">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            )}
          </span>
        </div>
        {isOpen && (
          <>
            <div
              className={`accordion-content px-[15px] py-[20px] ${
                bg_white ? "bg-[#F1F1F1]" : "bg-white"
              }`}
            >
              <div
                className={`${styles.description}`}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {item?.gallery && item?.gallery?.length > 0 && (
                <CarouselAccordion gallery={item.gallery} />
              )}
              {item?.button_links && item?.button_links.length > 0 && (
                <div className="flex justify-center flex-wrap mt-[30px]">
                  {item.button_links.map((item, index) => (
                    <Link
                      key={index}
                      href={item?.button_link || item?.file || "#"}
                      target="_blank"
                      className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                        item.variant == "filled"
                          ? "text-white bg-primary"
                          : "border-secondary"
                      } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                    >
                      {item.button_label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
