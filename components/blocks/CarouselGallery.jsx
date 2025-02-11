import Image from "next/image";
import "slick-carousel/slick/slick.css";
import { useState } from "react";
import Link from "next/link";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
import FancyPhotos from "@/components/partials/popups/FancyPhotos";
export default function CarouselGallery({ blockId, block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);

  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );
  const ModalImage1 = dynamic(() =>
    import("@/components/partials/Modals/ModalImage1").then(
      (module) => module.default
    )
  );

  const { title, images, button_link, variation, collection_carousel_gallery } =
    block.main;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const imagesLength = images?.length ?? 0;
  let imagesDisplay = imagesLength < 3 ? 2 : 3;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-[10px] lg:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="55"
            viewBox="0 0 19.349 30"
            className="w-[25px] h-[45px] md:w-[35px] md:h-[55px]"
          >
            <path
              id="_002-right-arrow"
              data-name="002-right-arrow"
              d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
              transform="translate(-86.981)"
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
        } absolute top-[50%] translate-y-[-50%] left-0 px-[10px] lg:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="55"
            viewBox="0 0 19.349 30"
            className="w-[25px] h-[45px] md:w-[35px] md:h-[55px]"
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
    slidesToShow: imagesDisplay,
    slidesToScroll: imagesDisplay,
    cssEase: "linear",
    arrows: imagesLength > 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: imagesDisplay,
          slidesToScroll: imagesDisplay,
          infinite: true,
          arrows: imagesLength > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
          arrows: imagesLength > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          arrows: imagesLength > 1,
        },
      },
    ],
  };

  return (
    <section
      className={`${
        variation.length === 0
          ? "bg-[#f1f1f1]"
          : collection_carousel_gallery
          ? "py-10"
          : ""
      }`}
    >
      {!showLazy ? (
        <>
          <div className="mb-[30px] mt-[40px]">
            {title && (
              <div className="animate-pulse bg-[#ccc] h-[30px] w-full max-w-[300px] mx-auto mb-[20px]" />
            )}

            <div className="flex gap-x-[15px] mb-[30px]">
              <div className="w-full animate-pulse bg-[#ccc] sm:max-w-[50%] lg:max-w-[33.33%] h-[330px] lg:h-[420px]" />
              <div className="w-full animate-pulse bg-[#ccc] sm:max-w-[50%] lg:max-w-[33.33%] h-[330px] hidden sm:block lg:h-[420px]" />
              <div className="w-full animate-pulse bg-[#ccc] sm:max-w-[50%] lg:max-w-[33.33%] h-[330px] lg:h-[420px] hidden md:block" />
            </div>

            {button_link && (
              <div className="animate-pulse bg-[#ccc] h-[50px] w-full max-w-[300px] mx-auto md:mt-[40px] mb-[20px]" />
            )}
          </div>
        </>
      ) : (
        <>
          {title && (
            <h2
              className={`text-primary text-[25px] text-center tracking-[1px] px-[20px] uppercase ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
              } ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7 ? "font-effra" : ""
              } ${
                collection_carousel_gallery
                  ? "pb-[30px] "
                  : "pt-[20px] md:pt-[40px] mb-[20px]"
              } `}
            >
              {title}
            </h2>
          )}
          <div
            className={`${
              variation.length === 0 ? "container" : ""
            } flex w-full`}
          >
            {imagesLength > 0 && (
              <div className="flex flex-col w-full slick-gallery">
                <FancyPhotos>
                  <Slick className="carousel-gallery" {...settings}>
                    {images.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer"
                        data-fancybox={`${blockId}`}
                        href={item}
                      >
                        <Image
                          height={420}
                          width={420}
                          src={item}
                          alt="Carousel Image"
                          className={`w-full object-cover ${
                            variation.length === 0
                              ? "h-[260px]"
                              : "h-[330px] lg:h-[420px]"
                          } `}
                        />
                      </div>
                    ))}
                  </Slick>
                </FancyPhotos>
              </div>
            )}
          </div>

          {button_link && (
            <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center mt-[30px] mb-[60px]">
              <div className="flex flex-wrap justify-center ">
                <Link
                  href={button_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-[30px] py-[20px] text-center text-xs 2sm:text-sm border border-secondary text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  View More Photos
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <ModalImage
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
          content={images[selectedImageIndex]}
          images={images || []}
        />
      )}
    </section>
  );
}
