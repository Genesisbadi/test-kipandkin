import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";

export default function HeroGridRepeater({ block, mediaHandler }) {
  const { items, style } = block.main;
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[28%] md:top-[22%] translate-y-[-50%] right-0 px-[10px] lg:px-5 z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
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
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[28%] md:top-[22%] translate-y-[-50%] left-0 px-[10px] lg:px-5 z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="50"
            viewBox="0 0 19.349 30"
            className="w-[20px] h-[40px] md:w-[30px] md:h-[50px]"
          >
            <path
              id="_002-right-arrow"
              data-name="002-right-arrow"
              d="M105.745,30,86.981,15,105.745,0l.585.732L88.482,15,106.33,29.268Z"
              transform="translate(-86.981)"
              fill="#fff"
              stroke="#fff"
              strokeWidth="2"
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
    slidesToShow: 3,
    slidesToScroll: 3,
    cssEase: "linear",
    arrows: items?.length > 3 ? true : false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="overflow-hidden md:mb-[5px]">
      {style?.length !== 0 ? (
        <div className="flex flex-col w-full ">
          <Slick {...settings}>
            {items.map((item, index) => (
              <SectionAccordion
                childrenClassname={`bg-[#f5f5f5] pb-0 h-full flex flex-col md:!flex`}
                key={index}
                title={item.title}
                className="flex flex-col md:flex-1 w-full px-[3px]"
              >
                <Image
                  src={item?.image_file}
                  width={500}
                  height={500}
                  alt={item.title}
                  title={item.title}
                  className="w-full h-[300px] object-cover"
                />

                <div
                  className={`px-[20px] lg:px-[60px] flex flex-col grow py-[30px] text-secondary ${
                    item?.description ? "min-h-[295px]" : ""
                  }`}
                >
                  <h2
                    className={`${
                      process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : ""
                    } ${
                      process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                        ? "font-effra"
                        : ""
                    } hidden md:block text-center mb-[30px] text-[18px] sm:text-[20px] lg:text-[25px]`}
                  >
                    {item.title}
                  </h2>

                  {item?.description && (
                    <div
                      className={`text-[14px] mb-[30px] grow leading-[21px] line-clamp-2`}
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  )}

                  {item?.link && (
                    <div className="text-center">
                      <Link
                        className={`border-secondary hover:text-white text-[14px] uppercase inline-block border py-[15px] px-[30px] transition ${
                          process.env.NEXT_PUBLIC_TEMPLATE == 2
                            ? " hover:bg-primary hover:border-primary"
                            : " hover:bg-secondary"
                        }`}
                        href={item?.link || "#"}
                        target={
                          item?.link?.includes("http:") ? "_blank" : "_self"
                        }
                      >
                        {item?.button_label
                          ? item?.button_label
                          : "Discover More"}
                      </Link>
                    </div>
                  )}
                </div>
              </SectionAccordion>
            ))}
          </Slick>
        </div>
      ) : (
        <div className="mx-[-3px] flex flex-wrap ">
          {items.map((item, index) => (
            <SectionAccordion
              childrenClassname={`bg-[#f5f5f5] pb-0 h-full flex flex-col md:!flex`}
              key={index}
              title={item.title}
              className="flex flex-col md:max-w-[33.33%] w-full px-[3px]"
            >
              <Image
                src={item?.image_file}
                width={500}
                height={500}
                alt={item.title}
                title={item.title}
                className="w-full h-[300px] object-cover"
              />

              <div
                className={`px-[20px] lg:px-[60px] flex flex-col grow py-[30px] text-secondary`}
              >
                <h2
                  className={`${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : ""
                  } ${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "font-effra"
                      : ""
                  } hidden md:block text-center mb-[30px] text-[18px] sm:text-[20px] lg:text-[25px]`}
                >
                  {item.title}
                </h2>

                {item.description && (
                  <div
                    className={`text-[14px] mb-[30px] grow leading-[21px]`}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                {item?.link && (
                  <div className="text-center">
                    <Link
                      className={`border-secondary hover:text-white text-[14px] uppercase inline-block border py-[15px] px-[30px] transition ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 2
                          ? " hover:bg-primary hover:border-primary"
                          : " hover:bg-secondary"
                      }`}
                      href={item?.link || "#"}
                      target={
                        item?.link?.includes("http:") ? "_blank" : "_self"
                      }
                    >
                      {item?.button_label
                        ? item?.button_label
                        : "Discover More"}
                    </Link>
                  </div>
                )}
              </div>
            </SectionAccordion>
          ))}
        </div>
      )}
    </section>
  );
}
