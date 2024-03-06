import Image from "next/image";

import meetingsEventsEntriesData from "@/lib/preBuildScripts/static/meetings-events-article.json";
import Link from "next/link";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import CustomSelect from "@/components/forms/CustomSelect";
import { useEffect, useState, useRef } from "react";

export default function MeetingsEvensDetails({ block, page }) {
  const meetingsEvents = meetingsEventsEntriesData.meetingsEventsEntriesData;
  const { title } = block;
  const { mediaHandler, description, venue } = page.data.main;

  console.log(page, "events");

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venue[0]);

  const getDefaultValue = () => {
    let article = venue[0]?.title || "";
    return { label: article, value: article };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOverlayRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleOverlayClick = (e) => {
    if (modalOverlayRef.current && modalOverlayRef.current.contains(e.target)) {
      return;
    }

    handleCloseModal();
    let defaultVenue = venue[0]?.title || "";
    return { label: defaultVenue, value: defaultVenue };
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            width={25}
            height={54}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 44"
          >
            <path
              d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-0 px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={54}
            viewBox="0 0 19.349 30"
          >
            <path
              id="_002-right-arrow"
              data-name="002-right-arrow"
              d="M105.745,30,86.981,15,105.745,0l.585.732L88.482,15,106.33,29.268Z"
              transform="translate(-86.981)"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className={isModalOpen ? "modal-open" : ""}>
        <section className="relative flex items-center justify-center h-[100vh] w-full bg-[#f1f1f1]">
          <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
          <Image
            alt={title}
            src={
              mediaHandler?.main?.meda.conversions.image ||
              "../images/image_makati-large.jpg"
            }
            width={1920}
            height={1080}
            className="w-full h-full  object-cover absolute top-0 left-0"
          />
          {title && (
            <h4 className="text-[42px] text-white relative z-[3]">{title}</h4>
          )}
        </section>
        <article>
          <div className="container py-[30px]">
            {title && (
              <h3 className="text-primary text-[20px] tracking-[1px]">
                {page.data.main.title}
              </h3>
            )}
            <div
              className="text-[14px] text-[#555] leading-[21px] my-[30px]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <div className="text-primary text-[20px] tracking-[1px] mb-[10px]">
              Select Venue:
            </div>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(Number(e.target.value))}
              className="w-full px-[10px] py-[20px] border-2 border-primary bg-white text-[20px] text-primary outline-0"
            >
              {venue?.map((item, index) => (
                <option key={index} value={index}>
                  {item.title}
                </option>
              ))}
            </select>
            {/* <CustomSelect
            // value={selectedValue}
            defaultValue={getDefaultValue()}
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            options={venue?.map((item, index) => {
            onChange={(e) =>
              setSelectedValue(() => {
                Number(e.value);
                const curVenue = venue.find((obj) => obj.title === e.value);
                setCurrentVenue(curVenue);
              })
            }
            options={venue?.map((item, index) => {
              return {
                label: item?.title,
                value: item?.title,
              };
            })}
          /> */}
            <div>
              <div onClick={handleOpenModal} className="w-full mt-20">
                {venue[selectedValue].image && (
                  <Image
                    alt={venue[selectedValue].title || "#"}
                    src={
                      venue[selectedValue].image ||
                      "/images/Banner-Safe-Space-Desktop.jpg"
                    }
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {isModalOpen && (
                <div
                  className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[99999] transition-opacity duration-700 ease-in-out ${
                    isModalOpen ? "opacity-100 " : "opacity-0 "
                  }`}
                  //  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[99999]"
                >
                  <span
                    className="absolute top-[20px] right-[20px] cursor-pointer text-[30px] text-[#ccc] hover:text-white"
                    onClick={handleCloseModal}
                  >
                    X
                  </span>
                  <div ref={modalOverlayRef}>
                    <Image
                      alt={venue[selectedValue].title || "#"}
                      src={
                        venue[selectedValue].image ||
                        "/images/Banner-Safe-Space-Desktop.jpg"
                      }
                      width={1920}
                      height={1080}
                      className="w-full h-full object-cover rounded-[3px]"
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              className="text-[14px] text-[#555] leading-[21px] my-[30px]"
              dangerouslySetInnerHTML={{
                __html: venue[selectedValue].description,
              }}
            ></div>
            <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center">
              <div className="flex flex-wrap justify-center ">
                {venue[selectedValue].button.map((item, index) => (
                  <Link
                    key={index}
                    href={item.button_link}
                    className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                      item.button_variant === "dark"
                        ? "text-white bg-primary"
                        : "border-secondary"
                    } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                  >
                    {item.button_label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
