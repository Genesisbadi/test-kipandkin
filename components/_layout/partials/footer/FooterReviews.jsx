import reviewsData from "../../../../lib/preBuildScripts/static/reviews.json";
import "slick-carousel/slick/slick.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
export default function FooterReviews() {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const Star = dynamic(() =>
    import("@/components/icons/Star").then((module) => module.default)
  );

  const router = useRouter();
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
          className="!fill-primary"
          width={25}
          height={54}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 44"
        >
          <path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" />
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
          className="!fill-primary"
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
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {router.asPath !== "/" && (
        <section className="py-[40px]">
          <div className="container">
            <h2 className="text-center text-primary text-[25px] mb-[30px]">
              Reviews
            </h2>
            {reviewsData && (
              <>
                <Slick className="lg:px-[70px]" {...settings}>
                  {reviewsData.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-[14px] uppercase">
                        {item.title}
                      </h3>

                      {item.data.main.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.data.main.description,
                          }}
                        />
                      )}

                      <div className="flex flex-wrap mt-[30px]">
                        {item.data.main.name && (
                          <span>{item.data.main.name},</span>
                        )}
                        {item.data.main.link && (
                          <span>
                            <Link
                              className="text-primary ml-[5px]"
                              href={item.data.main.link}
                            >
                              {item.data.main.link_label || "View Review"}
                            </Link>
                          </span>
                        )}
                      </div>
                      {item.data.main.stars && (
                        <div className="flex mt-[30px]">
                          {Array.from(
                            { length: parseInt(item.data.main.stars) },
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
                    </div>
                  ))}
                </Slick>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
