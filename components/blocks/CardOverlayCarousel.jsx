import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/virtual";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Feature({ block }) {
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { video_link, items } = block.main;
  const swiperRef = useRef();
  let videoUrl;

  if (video_link) {
    let videoId = video_link.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  return (
    <section className="bg-[#F1F1F1] py-[30px]">
      <div className="relative">
        <Swiper
          className="swiper-carousel-center"
          modules={[Virtual]}
          spaceBetween={20}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: {
              slidesPerView: 1, // Show only 1 slide on mobile
              centeredSlides: false, // Disable centering on mobile
            },
            640: {
              slidesPerView: 2, // Show 2 slides on larger screens
              centeredSlides: true, // Enable centering on larger screens
            },
          }}
        >
          {items?.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <SectionAccordion
                title={item?.title}
                childrenClassname="pb-0 text-white"
              >
                <section className={`card-overlay`}>
                  <div className="relative shadow-md overflow-hidden h-[390px]">
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={900}
                      height={500}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="relative flex flex-col h-full bg-[#000] p-[30px] bg-opacity-70">
                      <h2
                        className={`text-[35px] ${
                          process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                            ? "font-effra"
                            : "font-tenor"
                        }`}
                      >
                        {item?.title}
                      </h2>
                      <div
                        className="text-shadow-md grow text-[15px] leading-[28px] mt-[20px] overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />

                      {item?.link && (
                        <div>
                          <Link
                            href={item?.link}
                            className="font-bold gap-x-[5px] border border-white hover:bg-[#fff] hover:bg-opacity-50 transition inline-flex items-center py-[10px] px-[20px] mt-[20px] text-white"
                          >
                            {item?.button_label
                              ? item?.button_label
                              : "Discovery More"}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </SectionAccordion>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-[50%] rotate-180 translate-y-[-50%] left-0 sm:px-[10px] lg:px-5 z-[20] cursor-pointer bg-black/50 sm:h-full hover:bg-black/70 transition-all duration-300">
          <div
            className="flex items-center sm:h-full p-1 sm:p-2"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="50"
              viewBox="0 0 19.349 30"
              className="w-[20px] h-[30px] md:w-[30px] md:h-[50px]"
            >
              <path
                id="_002-right-arrow"
                data-name="002-right-arrow"
                d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
                transform="translate(-86.981)"
                fill="#fff"
                stroke="#fff"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="absolute top-[50%] translate-y-[-50%] right-0 sm:px-[10px] lg:px-5 z-[20] cursor-pointer bg-black/50 sm:h-full hover:bg-black/70 transition-all duration-300">
          <div
            className="flex items-center sm:h-full p-1 sm:p-2"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="50"
              viewBox="0 0 19.349 30"
              className="w-[20px] h-[30px] md:w-[30px] md:h-[50px]"
            >
              <path
                id="_002-right-arrow"
                data-name="002-right-arrow"
                d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
                transform="translate(-86.981)"
                fill="#fff"
                stroke="#fff"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
