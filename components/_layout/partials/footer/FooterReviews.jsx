import reviewsData from "../../../../lib/preBuildScripts/static/reviews.json";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function FooterReviews() {
  const showLazy = globalState((state) => state.showLazy);
  const router = useRouter();

  if (!showLazy) {
    return (
      <div className="container pt-[40px]">
        <div className="px-[70px]">
          <div className="animate-pulse w-full max-w-[200px] h-[20px] mx-auto bg-[#ccc] mb-[40px]" />
          <div className="animate-pulse w-full max-w-[50%] h-[20px] bg-[#ccc] mb-[20px]" />
          <div className="animate-pulse w-full h-[10px] bg-[#ccc] mb-[10px]" />
          <div className="animate-pulse w-full h-[10px] bg-[#ccc] mb-[10px]" />
          <div className="animate-pulse w-full h-[10px] max-w-[50%] bg-[#ccc] mb-[20px]" />
          <div className="animate-pulse w-full h-[10px] max-w-[90%] bg-[#ccc] mb-[10px]" />
          <div className="animate-pulse w-full h-[10px] max-w-[70%] bg-[#ccc] mb-[10px]" />
          <div className="animate-pulse w-full h-[10px] max-w-[50%] bg-[#ccc] mb-[10px]" />
        </div>
      </div>
    );
  }

  const Star = dynamic(() =>
    import("@/components/icons/Star").then((module) => module.default)
  );

  return (
    <>
      {reviewsData && reviewsData.length > 0 && (
        <>
          {router.asPath !== "/" && (
            <section className="pt-[40px] pb-[12px] footer-reviews">
              <div className="container relative ">
                <h2
                  className={`text-center text-primary text-[25px] mb-[30px] tracking-[1px] ${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
                  }`}
                >
                  Reviews
                </h2>
                {reviewsData && (
                  <>
                    <Swiper
                      modules={[Pagination, Navigation, Autoplay]}
                      pagination={{
                        dynamicBullets: true,
                        clickable: true,
                        el: ".custom-pagination",
                      }}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      loop={true}
                      speed={500}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      slidesPerView={1}
                      slidesPerGroup={1}
                      autoHeight={true}
                      onSwiper={(swiper) => {
                        const swiperContainer = swiper.el;
                        swiperContainer.addEventListener("mouseenter", () => {
                          swiper.autoplay.stop();
                        });
                        swiperContainer.addEventListener("mouseleave", () => {
                          swiper.autoplay.start();
                        });
                      }}
                      className="lg:px-[70px] text-[14px] relative "
                    >
                      {reviewsData.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          className="relative lg:px-[60px]"
                        >
                          <h3 className="font-bold text-[14px] uppercase mb-[15px]">
                            {item.title}
                          </h3>

                          {item.data.main.description && (
                            <div
                              className="text-justify"
                              dangerouslySetInnerHTML={{
                                __html: item.data.main.description || "",
                              }}
                            />
                          )}

                          <div className="flex flex-wrap mt-[30px]">
                            {item.data.main.name && (
                              <span>{item.data.main.name},</span>
                            )}

                            <span>
                              <Link
                                className="text-primary ml-[5px] underline font-bold"
                                href={item.data.main.link || "/default-link"}
                                target="_blank"
                              >
                                {item.data.main.link_label || "View Review"}
                              </Link>
                            </span>
                          </div>

                          {item.data.main.stars && (
                            <div className="flex mt-[30px]">
                              {Array.from(
                                { length: parseInt(item.data.main.stars) || 0 },
                                (_, index) => (
                                  <Star
                                    width={20}
                                    height={20}
                                    key={index}
                                    color="#e6b886"
                                  />
                                )
                              )}
                            </div>
                          )}
                        </SwiperSlide>
                      ))}
                      <div className="mt-[24px] w-full bottom-0">
                        <div className="left-[50%] translate-x-[50%] text-red-500">
                          <div className="custom-pagination " />
                        </div>
                      </div>
                      <div
                        className="!text-[#333] swiper-button-next absolute top-[50%] right-[15px] z-[20]"
                        id="swiper-button-next"
                      ></div>
                      <div
                        className="!text-[#333] swiper-button-prev absolute top-[50%] z-[20]"
                        id="swiper-button-prev"
                      ></div>
                    </Swiper>
                  </>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
