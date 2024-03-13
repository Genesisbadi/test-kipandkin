import Image from "next/image";
import Link from "next/link";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
import { Fragment } from "react";

const BookingForm = dynamic(() => import("../partials/forms/BookingForm"), {
  loading: () => <p>Loading...</p>,
});

export default function Slider({ block, mediaHandler }) {
  let { slider_items } = block.main;
  const showLazy = globalState((state) => state.showLazy);

  const initialSlides = 1;
  if (showLazy === true) {
    slider_items = slider_items.slice(0, slider_items.length);
  } else {
    slider_items = slider_items.slice(0, initialSlides);
  }

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
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
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
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
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="slider relative">
      <BookingForm />
      <Slick {...settings}>
        {slider_items.map((item, index) => (
          <div className="w-full relative" key={index}>
            <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>

            {mediaHandler?.[`main.slider_items.${index}.image`]?.[0]
              ?.conversions.desktop && (
              <Image
                className="absolute z-[-1] top-0 left-0 h-full w-full object-cover"
                src={
                  mediaHandler?.[`main.slider_items.${index}.image`]?.[0]
                    ?.conversions.desktop
                }
                width={1920}
                height={750}
                alt={item.title}
              />
            )}

            <div className="py-[50px] min-h-[calc(100vh-67px)] px-[30px] md:px-[100px] lg:px-[150px] w-full flex flex-col justify-center items-center text-white relative z-[3]">
              <h2 className="text-[42px] mb-[40px] font-bold">{item.title}</h2>
              <div
                className="mb-[15px]"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <Link
                className="border px-[30px] py-[10px] inline-block border-[1px] border-[#fff] hover:text-primary hover:bg-[#fff] transition-all duration-300 ease-in-out "
                href={item.link}
              >
                Discovery More
              </Link>
            </div>
          </div>
        ))}
      </Slick>
    </section>
  );
}
