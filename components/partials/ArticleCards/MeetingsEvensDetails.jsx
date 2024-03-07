import Image from "next/image";

import meetingsEventsEntriesData from "@/lib/preBuildScripts/static/meetings-events-article.json";
import Link from "next/link";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import CustomSelect from "@/components/forms/CustomSelect";
import { useEffect, useState, useRef } from "react";
import VenueDescription from "@/components/nodes/meetings-events/VenueDescription";
import ModalImage from "@/components/partials/Modals/ModalImage";

export default function MeetingsEvensDetails({ block, page }) {
  const meetingsEvents = meetingsEventsEntriesData.meetingsEventsEntriesData;
  const { title } = block;
  const { mediaHandler, description, venues } = page.data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  const getDefaultValue = () => {
    let defaultVenue = venues[0]?.title || "";
    return { label: defaultVenue, value: defaultVenue };
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
      handleCloseModal();
    }
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
      <article>
        <div className="relative min-h-[100vh] text-white flex items-center justify-center">
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
          <h1 className="relative text-[42px]">{title}</h1>
        </div>

        <div className="container py-[30px]">
          {title && (
            <h2 className="text-primary text-[20px] tracking-[1px]">
              {page.data.main.title}
            </h2>
          )}
          {description && (
            <div
              className="text-[14px] text-[#555] leading-[21px] my-[30px]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          {venues.length > 0 && (
            <>
              <div className="text-primary text-[20px] tracking-[1px] mb-[10px]">
                Select Venue:
              </div>
              <CustomSelect
                // value={selectedValue}
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
        </div>

        {currentVenue && (
          <div className="container pb-[50px]">
            <div onClick={handleOpenModal}>
              {currentVenue.image && (
                <Image
                  src={currentVenue.image}
                  width={1200}
                  height={500}
                  alt={currentVenue.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <ModalImage
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title={currentVenue.title}
              content={currentVenue.image}
            />
            {/* <VenueDescription description={currentVenue.description} /> */}
            <div
              className="text-[14px] text-[#555] leading-[21px] my-[30px]"
              dangerouslySetInnerHTML={{
                __html: currentVenue.description,
              }}
            />
            {currentVenue.buttons.length > 0 && (
              <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center">
                <div className="flex flex-wrap justify-center ">
                  {currentVenue.buttons.map((item, index) => (
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
            )}
          </div>
        )}
      </article>
    </>
  );
}
