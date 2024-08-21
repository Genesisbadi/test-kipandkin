import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function CarouselAccordion({ gallery }) {
  return (
    <div className="pt-[50px]">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index} className="mb-[30px]">
            <Image
              src={item.image}
              className="w-full h-[200px] object-cover"
              width={300}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
