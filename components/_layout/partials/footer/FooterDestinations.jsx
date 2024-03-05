import Image from "next/image";
import Link from "next/link";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
export default function FooterDestinations({ destinations }) {
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
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      {destinations?.destination_items && (
        <section className="footer-strip text-white pt-[30px]">
          <h2 className="text-center text-primary text-[25px] mb-[30px]">
            {destinations?.block_title || "Our Destinations"}
          </h2>
          <Slick {...settings}>
            {destinations?.destination_items?.map((item, index) => (
              <div key={index}>
                <Link
                  href={item?.link || "#"}
                  className="flex justify-center bg-[#333] items-center min-h-[250px] relative"
                  target="_blank"
                >
                  <Image
                    src={item?.image || `/static/destination1.jpg`}
                    width={350}
                    height={350}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <h3 className="relative uppercase font-bold leading-[2px] text-[18px]">
                    {item.title}
                  </h3>
                </Link>
              </div>
            ))}
          </Slick>
        </section>
      )}
    </>
  );
}
