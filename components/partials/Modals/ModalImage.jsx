import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";

const ModalImage = ({ isOpen, onClose, title, content, images }) => {
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (
        modalOverlayRef.current &&
        modalOverlayRef.current.contains(e.target) &&
        e.target.tagName !== "IMG" &&
        e.target.dataset.tag !== "NextArrow" &&
        e.target.dataset.tag !== "PrevArrow"
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [onClose]);

  const selectedImageIndex = images.findIndex((image) => image === content);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        data-tag="NextArrow"
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-5 z-[20] cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            data-tag="NextArrow"
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
        data-tag="PrevArrow"
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-0 px-5 z-[20] cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            data-tag="PrevArrow"
            width={25}
            height={54}
            xmlns="http://www.w3.org/2000/svg"
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: selectedImageIndex,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      {isOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[100] transition-opacity duration-700 ease-in-out opacity-100"
        >
          <span
            className="absolute top-[20px] right-[20px] cursor-pointer text-[30px] font-semibold text-[#ccc] hover:text-white"
            onClick={onClose}
          >
            X
          </span>
          {images && images.length > 1 ? (
            <div className="w-full md:w-[730px] px-[15px]">
              <Slick {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <Image
                      alt={title || "#"}
                      src={image || "/images/Banner-Safe-Space-Desktop.jpg"}
                      width={630}
                      height={530}
                      className="w-full h-full object-cover rounded-[3px]"
                    />
                  </div>
                ))}
              </Slick>
            </div>
          ) : (
            <div>
              <Image
                alt={title || "#"}
                src={content || "/images/Banner-Safe-Space-Desktop.jpg"}
                width={1920}
                height={1080}
                className="w-full h-full object-cover rounded-[3px]"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModalImage;
