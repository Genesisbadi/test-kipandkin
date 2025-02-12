import Link from "next/link";
import Image from "next/image";
// import discoverBlogEntriesData from "@/lib/preBuildScripts/static/discoverBlog.json";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, React } from "react";
import discoverBlogEntriesData from "@/lib/preBuildScripts/static/discover-blog-entries.json";
import SectionAccordion from "../partials/collapsibles/SectionAccordion";
import { getMediaConvertions } from "@/lib/services/propService";
export default function DiscoverBlog({ block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const { title, description, button_label, link, blog_button_label, image } =
    block.main;

  const [currentLink, setCurrentLink] = useState("");
  const blogEntries = discoverBlogEntriesData.discoverBlogEntriesData;

  useEffect(() => {
    const currentSlideTitle = document.querySelector(".current-slide-title");
    currentSlideTitle.innerHTML = blogEntries?.[0]?.title;
    setCurrentLink(blogEntries?.[0]?.route_url);
  }, [blogEntries]);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] md:top-[calc(50%)] translate-y-[-50%] right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="54"
          viewBox="0 0 19.349 30"
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
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] md:top-[calc(50%)] translate-y-[-50%] left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          className="!fill-white"
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
    infinite: blogEntries.length > 1 ? true : false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => {
      const currentSlideTitle = document.querySelector(".current-slide-title");
      const currentSlideLink = document.querySelector(
        ".current-slide-readmore"
      );
      currentSlideTitle.innerHTML = blogEntries[index].title;
      currentSlideLink.outerHTML = `<a href="${blogEntries[index].route_url}" class="current-slide-readmore inline-block text-[14px] tracking-[1px] uppercase border border-[#fff] py-[15px] px-[30px] transition hover:text-primary hover:bg-white">Explore Now</a>`;
    },
  };

  return (
    <section className="overflow-hidden py-[5px]">
      <div className="flex flex-wrap mx-[-3px] relative">
        <SectionAccordion
          className="px-[3px] w-full md:max-w-[50%]"
          title={title}
          childrenClassname=""
        >
          <div className="flex justify-between items-start md:items-end h-full relative bg-[#f1f1f1] min-h-[350px] p-[15px]">
            <div className="h-full absolute top-0 object-fit object-top opacity-[.2] sm:opacity-[1] md:opacity-[.3] xl:opacity-[1] sm:relative w-full md:max-w-[120px] xl:max-w-[unset]">
              <Image
                src={image}
                width={300}
                height={300}
                alt="Discover"
                className="object-contain h-full md:h-[480px]"
              />
            </div>
            <div className="relative md:absolute top-0 right-0  justify-center h-full max-w-[100%] sm:max-w-[70%] md:max-w-[100%] lg:max-w-[70%] xl:max-w-[55%] flex flex-col py-[30px] px-[30px] w-full">
              {description && (
                <div
                  className=" text-[14px] text-[#654E43]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-[5px] justify-center md:justify-between items-center flex-wrap md:flex-nowrap px-[10px] lg:px-[30px] py-[15px] bg-secondary text-white">
            <span
              className={`w-full ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              } md:w-auto block text-center mb-[20px] md:mb-0 pr-[15px] md:text-[clamp(16px,2vw,25px)] text-[20px]`}
            >
              {title || "Discover Our Location"}
            </span>
            <Link
              href={link}
              className="inline-block text-[12px] lg:text-[14px] tracking-[1px] uppercase border border-[#fff] py-[15px] px-[30px] transition hover:text-secondary hover:bg-white"
            >
              {button_label ? button_label : "Explore Now"}
            </Link>
          </div>
        </SectionAccordion>

        <SectionAccordion
          className="w-full relative px-[3px] md:max-w-[50%]"
          title="Discovery Blog"
          childrenClassname="md:h-full flex flex-col overflow-hidden md:!flex"
        >
          {blogEntries && blogEntries.length > 0 && (
            <>
              <Slick
                className="carousel-gallery !grow slide-fill "
                {...settings}
              >
                {blogEntries.map((item, index) => {
                  const { featured_image, description, title } = item.data.main;

                  const mediaHandler = getMediaConvertions(item?.blueprintData);

                  return (
                    <div key={index} className="relative bg-primary">
                      <Link href={item?.route_url || "#"}>
                        {featured_image ||
                        mediaHandler["main.image"]?.[0]?.conversions
                          ?.blog_show ||
                        mediaHandler["main.image"]?.[0]?.original ? (
                          <Image
                            src={
                              featured_image ||
                              mediaHandler["main.image"]?.[0]?.conversions
                                ?.blog_show ||
                              mediaHandler["main.image"]?.[0]?.original
                            }
                            width={500}
                            height={300}
                            alt={item.title || "Image"}
                            className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
                          />
                        ) : null}

                        <span className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-[.5] z-[1]"></span>
                        <div
                          className={`w-full max-w-[540px] hidden md:flex mx-auto px-[50px] ${
                            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                              ? "font-effra"
                              : "font-tenor"
                          } text-center text-[20px] md:text-[25px] min-h-[150px] relative z-[2] justify-center items-center text-white`}
                        >
                          <h3 className="!leading-[37px] ">{item.title}</h3>
                        </div>
                        <div className="pb-[75%] min-h-[100px] block md:hidden" />
                      </Link>
                    </div>
                  );
                })}
              </Slick>
            </>
          )}
          <div className="block md:hidden bg-secondary text-white text-center p-[20px]">
            <div
              className={`current-slide-title ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              } text-[20px] mb-[12px]`}
            ></div>
            <Link
              href={currentLink}
              className="current-slide-readmore inline-block text-[14px] tracking-[1px] uppercase border border-[#fff] py-[15px] px-[30px] transition hover:text-primary hover:bg-white"
            >
              {blog_button_label ? blog_button_label : "Explore Now"}
            </Link>
          </div>
          <div className="hidden md:flex mt-[5px] justify-center flex-wrap 2sm:flex-nowrap 2sm:justify-between items-center px-[10px] lg:px-[30px] py-[15px] bg-secondary text-white">
            <span
              className={`w-full hidden md:block ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              } 2sm:w-auto text-center mb-[20px] 2sm:mb-0 pr-[15px] md:text-[clamp(16px,2vw,25px)] text-[20px]`}
            >
              Discovery Blog
            </span>
            <Link
              href="/blog"
              className="inline-block text-[12px] lg:text-[14px] tracking-[1px] uppercase border border-[#fff] py-[15px] px-[30px] transition hover:text-secondary hover:bg-white"
            >
              {blog_button_label ? blog_button_label : "Explore Now"}
            </Link>
          </div>
        </SectionAccordion>
      </div>
    </section>
  );
}
