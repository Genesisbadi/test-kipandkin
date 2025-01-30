import Link from "next/link";
import reviewItems from "../../lib/preBuildScripts/static/reviews.json";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionAccordion from "../partials/collapsibles/SectionAccordion";

import { useState } from "react";
export default function AdvocaciesReviews({ block }) {
  const [showPopup, setShowPopup] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const Star = dynamic(() =>
    import("../icons/Star").then((module) => module.default)
  );

  const {
    image_advocacy,
    image_reviews,
    title,
    description,
    button_label,
    link,
  } = block.main;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[calc(50%-20px)] translate-y-[-50%] right-[-40px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="54"
          viewBox="0 0 19.349 30"
          className="!fill-[#654E43]"
        >
          <path
            id="_002-right-arrow"
            data-name="002-right-arrow"
            d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
            transform="translate(-86.981)"
          ></path>
        </svg>
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[calc(50%-20px)] translate-y-[-50%] left-[-40px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          className="!fill-[#654E43]"
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
          />
        </svg>
      </div>
    );
  };

  const PopupNext = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="54"
          viewBox="0 0 19.349 30"
          className="!fill-white h-full"
        >
          <path
            id="_002-right-arrow"
            data-name="002-right-arrow"
            d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
            transform="translate(-86.981)"
            fill="#fff"
          ></path>
        </svg>
      </div>
    );
  };
  const PopupPrev = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        }  z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          className="!fill-white h-full"
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
          />
        </svg>
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    draggable: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  var popupSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <PopupNext />,
    prevArrow: <PopupPrev />,
  };

  const readMore = (index) => {
    setCurrentIndex(index);
    setActiveItem(reviewItems[index]);
    setShowPopup(true);
  };
  return (
    <>
      <section className="overflow-hidden">
        <div className="flex flex-wrap mx-[-3px]">
          <SectionAccordion
            className="flex flex-col lg:max-w-[50%] px-[3px] w-full md:max-w-[50%]"
            title={title}
            childrenClassname="w-full"
          >
            <div className="bg-[#F5F5F5] h-full">
              <Image
                src={image_advocacy || `/images/image_makati-large.jpg`}
                width={900}
                height={500}
                alt={title || "Thumbnail"}
                className="w-full h-[250px] md:h-[330px] object-cover"
              />
              <div className="px-[20px] md:px-[50px] lg:px-[60px] flex flex-col grow py-[30px] text-[#654E43]">
                <h2
                  className={`mb-[25px] text-[25px] hidden md:block ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  }`}
                >
                  {title}
                </h2>
                <div
                  className="grow text-[14px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <div className="mt-[15px]">
                  <Link
                    className="uppercase text-[14px] inline-block text-center border border-[#654E43] min-w-[170px] py-[15px] px-[30px] transition hover:text-white hover:bg-secondary"
                    href={link}
                  >
                    {button_label || "Discover More"}
                  </Link>
                </div>
              </div>
            </div>
          </SectionAccordion>

          <SectionAccordion
            className="px-[3px] flex flex-col w-full md:max-w-[50%]"
            title="Reviews"
            childrenClassname="w-full h-full flex flex-col"
          >
            <Image
              src={image_reviews || `/images/image_makati-large.jpg`}
              width={900}
              height={500}
              alt={title || "Thumbnail"}
              className="w-full h-[250px] md:min-h-[330px] object-cover"
            />
            {reviewItems && reviewItems.length > 0 && (
              <div className="bg-[#f5f5f5] px-[50px] lg:px-[60px] py-[30px] text-[#654E43] grow h-full">
                <h2
                  className={`mb-[25px] hidden md:block text-[25px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  }`}
                >
                  Reviews
                </h2>

                <Slick className="carousel-gallery" {...settings}>
                  {reviewItems.map((item, index) => {
                    const truncatedDescription = item.data.main.description
                      .replace(/<[^>]*>/g, "")
                      .slice(0, 150);
                    const shortDesc = truncatedDescription + "...";
                    return (
                      <div className="!leading-[21px]" key={index}>
                        {item.data.main.description && (
                          <>
                            {item.data.main.description.replace(/<[^>]*>/g, "")
                              .length > 200 ? (
                              <>
                                <p
                                  className="text-[14px]  !leading-[21px] inline"
                                  dangerouslySetInnerHTML={{
                                    __html: `${shortDesc}`,
                                  }}
                                />
                                <span
                                  onClick={() => {
                                    readMore(index);
                                  }}
                                  className="text-[#654E43] cursor-pointer underline"
                                >
                                  Read More
                                </span>
                              </>
                            ) : (
                              <div
                                className="text-[14px] !leading-[21px] "
                                dangerouslySetInnerHTML={{
                                  __html: `${item.data.main.description}`,
                                }}
                              />
                            )}
                          </>
                        )}

                        <div className="!leading-[21px] flex flex-wrap mt-[10px] text-[14px]">
                          {item.data.main.name && (
                            <span>{item.data.main.name},</span>
                          )}
                          <span>
                            <Link
                              className="ml-[5px] text-primary underline font-bold"
                              href="/tripadvisor-reviews"
                              prefetch={false}
                            >
                              {item.data.main.link_label || "View Review"}
                            </Link>
                          </span>
                        </div>
                        {item.data.main.stars && (
                          <div className="!leading-[21px] flex mt-[15px]">
                            {Array.from(
                              { length: parseInt(item.data.main.stars) },
                              (_, index) => (
                                <Star
                                  width={20}
                                  height={20}
                                  key={index}
                                  color="#654E43"
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Slick>
              </div>
            )}
          </SectionAccordion>
        </div>
      </section>

      {showPopup && (
        <div
          className={`fixed inset-0 p-[15px] flex items-center justify-center z-[9999] transition`}
        >
          <span
            className="fixed inset-0 bg-[#000] bg-opacity-50 cursor-pointer"
            onClick={() => {
              setShowPopup(false);
              setActiveItem(null);
            }}
          />

          {activeItem && (
            <div
              className={`bg-white px-[15px] pt-[15px] md:pt-8 md:px-8 rounded-lg shadow-lg max-w-[800px] w-full overflow-y-scroll max-h-[90vh] relative z-[2]`}
            >
              <Slick
                {...popupSettings}
                initialSlide={currentIndex}
                className="popupCarousel"
              >
                {reviewItems.map((item, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold mb-4 mt-[50px] md:mt-0 md:pr-[120px]">
                      {item?.title}
                    </h2>
                    <div className="flex">
                      {item?.data?.main?.name},
                      <Link
                        href={item?.data?.main?.link}
                        target="_blank"
                        className="text-primary ml-1 underline"
                      >
                        {item?.data?.main?.link_label || "View Review"}
                      </Link>
                    </div>
                    {item.data.main.stars && (
                      <div className="flex my-[15px] gap-x-[5px]">
                        {Array.from(
                          { length: parseInt(item?.data?.main?.stars) },
                          (_, index) => (
                            <Star
                              width={20}
                              height={20}
                              key={index}
                              color="fill-primary"
                              className="fill-primary"
                            />
                          )
                        )}
                      </div>
                    )}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.data?.main?.description,
                      }}
                    />
                  </div>
                ))}
              </Slick>
              <div className="sticky bottom-[-1px] bg-white py-[15px] md:py-[30px]">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setActiveItem(null);
                  }}
                  className="select-none min-w-[150px] inline-block py-[8px] px-[20px] bg-primary text-[#fff] rounded-[30px] text-[14px] font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
