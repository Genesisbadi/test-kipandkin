import Link from "next/link";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Quote from "../icons/Quote";
import Fancybox from "../partials/popups/FancyPhotos";
import CarouselGallery from "../partials/gallery/CarouselGallery";
export default function MeetingsEventsSuitesPage({ page }) {
  const ModalImage1 = dynamic(() =>
    import("@/components/partials/Modals/ModalImage1").then(
      (module) => module.default
    )
  );

  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title, data } = page;
  const { image, description, buttons, images, gallery_title, testimonials } =
    data.main;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/30 h-full hover:bg-black/70 transition-all duration-300`}
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
        } absolute top-[50%] translate-y-[-50%] left-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/30 h-full hover:bg-black/70 transition-all duration-300`}
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
    slidesToShow: images.length < 3 ? 2 : 3,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: images.length > 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length < 3 ? 2 : 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: images.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
          arrows: images.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          arrows: images.length > 1,
        },
      },
    ],
  };

  const testimonialsSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 1000,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => <div className="ft-slick__dots--custom"></div>,
  };

  return (
    <>
      <article className="bg-[#f1f1f1]">
        <div className="relative min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] text-white flex text-center items-center justify-center">
          <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
          <picture>
            <source srcSet={image} media="(max-width: 414px)" />
            <source srcSet={image} media="(min-width: 415px)" />
            <source srcSet={image} media="(min-width: 1366px)" />
            <Image
              src={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
              srcSet={`${image} 414w, ${image} 1920w`}
              size="(max-width: 414px) 414px, (min-width: 415px) 1365px, (min-width: 1366px) 1920px"
              alt={title}
              width={1920}
              height={1080}
              className={`w-full h-full object-cover absolute top-0 left-0  ${
                process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "object-top" : ""
              }`}
              priority={true}
            />
          </picture>
          {title && (
            <div
              className={`relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              } text-[30px] sm:text-[35px] md:text-[42px]  text-white z-[3]`}
            >
              {title}
            </div>
          )}
        </div>
        <div className="container overflow-hidden mt-[20px]">
          {showLazy && (
            <>
              {/* {image && (
              // <ModalImage1
              //   className="w-full h-full object-cover mb-[20px]"
              //   title={title}
              //   content={image}
              //   image={image}
              // />
              <Image src={image} alt={title} width={1920} height={1080} className="w-full h-full object-cover mb-[20px]" />
            )} */}

              <div className="md:px-[40px]">
                {description && (
                  <div
                    className={`text-[14px] p-[10px] md:p-[15px] ${styles.description}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                <div className="flex flex-wrap justify-center pb-[30px] md:pb-[60px]">
                  {buttons.length > 0 && (
                    <>
                      {buttons?.map((item, index) => (
                        <ButtonLink
                          key={index}
                          href={item?.button_link || item?.file}
                          className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[10px] ${
                            item.button_variant === "dark"
                              ? "text-white bg-primary"
                              : "border-secondary"
                          } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                        >
                          {item?.button_label}
                        </ButtonLink>
                      ))}
                    </>
                  )}
                </div>
              </div>
              {testimonials && testimonials.length > 0 && (
                <div className={`pt-[40px] pb-[80px] slickdots relative`}>
                  <div className="w-[60px] absolute left-0 top-[20px] text-[#DDDDDD]">
                    <Quote />
                  </div>
                  <Slick {...testimonialsSettings}>
                    {testimonials?.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col mb-[100px] text-center"
                      >
                        <div
                          className="italic text-[16px] relative z-[10] font-[500] 
              "
                          dangerouslySetInnerHTML={{ __html: item?.quote }}
                        ></div>
                        <div className="font-bold text-[20px] mt-[10px] italic">
                          {"-" + item?.author}
                        </div>
                      </div>
                    ))}
                  </Slick>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full bg-[#f1f1f1] pt-[10px] pb-[30px]">
          {showLazy && (
            <>
              {images.length > 0 && (
                <>
                  <h2
                    className={` text-[25px] text-center tracking-[1px] mb-[20px] ${
                      process.env.NEXT_PUBLIC_TEMPLATE == 2
                        ? "text-primary"
                        : "font-tenor"
                    } ${
                      process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                        ? "font-effra"
                        : ""
                    }`}
                  >
                    {gallery_title || "GALLERY"}
                  </h2>
                  <CarouselGallery
                    // className="w-full h-[330px] lg:h-[530px] object-cover"
                    images={images}
                    className="!py-0"
                  />
                </>
              )}
            </>
          )}
        </div>
      </article>
    </>
  );
}
