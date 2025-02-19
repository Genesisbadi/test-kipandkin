import { Fancybox } from "@fancyapps/ui";
import dynamic from "next/dynamic";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import FancyPhotos from "@/components/partials/popups/FancyPhotos";

export default function CarouselGallery2({ blockId, block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const { title, carousel_gallery, background } = block?.main;

  const showLazy = globalState((state) => state.showLazy);

  const imagesLength = carousel_gallery?.length ?? 0;
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
      className={`py-[40px] ${background === "gray" ? "bg-[#F1F1F1]" : ""} ${
        background === "white" ? "bg-white" : ""
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
          </div>
        </>
      ) : (
        <>
          {title && (
            <h2
              className={`text-primary text-[25px] text-center tracking-[1px] px-[20px] mb-[20px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
              } ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7 ? "font-effra" : ""
              }`}
            >
              {title}
            </h2>
          )}
          {imagesLength > 0 && (
            <div className={`flex flex-col w-full carousel-gallery`}>
              <FancyPhotos>
                <Slick {...settings}>
                  {carousel_gallery?.map((item, index) => (
                    <div
                      key={index}
                      className="h-[330px] lg:h-[420px] relative cursor-pointer group overflow-hidden"
                    >
                      <div
                        href={item?.image}
                        data-fancybox={`${blockId}`}
                        data-src={item?.image}
                        data-caption={item?.caption}
                        className="h-full"
                      >
                        <Image
                          src={item?.image}
                          height={524}
                          width={420}
                          alt={item?.caption || "thumbnail"}
                          className="w-full h-full object-cover group-hover:scale-[1.2] transition duration-500"
                        />
                        <div
                          class={`absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black p-[50px] pb-[20px] duration-700 transition-all ${
                            item?.uppercase === "uppercase" ? "uppercase" : ""
                          } ${
                            item?.uppercase === "lowercase" ? "lowercase" : ""
                          } text-center font-brandon text-white text-[18px] tracking-[1.44px] leading-[25px] duration-500 transition-all`}
                          dangerouslySetInnerHTML={{ __html: item?.caption }}
                        />
                      </div>
                    </div>
                  ))}
                </Slick>
              </FancyPhotos>
            </div>
          )}
        </>
      )}
    </section>
  );
}
