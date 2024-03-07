import Image from "next/image";
import { useEffect, useState } from "react";
import Select from "react-select";
import Jsona from "jsona";
const dataFormatter = new Jsona();
import CONTENTAPI from "@/lib/api/content/request";
import CustomSelect from "@/components/forms/CustomSelect";
import { useRouter } from "next/router";

import destinationEntriesData from "@/lib/preBuildScripts/static/destinations.json";
import Link from "next/link";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function DestinationDetails({ block, page }) {
  const destinations = destinationEntriesData.destinationEntriesData;
  const [destination, setDestination] = useState();
  const { title } = block;
  const feature = block.data.main.items;
  const links = block.data.main.button_items;
  const router = useRouter();

  const route_url = page.route_url;
  const [selectedValue, setSelectedValue] = useState(page.route_url);

  const handleSelectChange = (option) => {
    const selectedRoute = option?.value;

    NProgress.start();

    router
      .push(selectedRoute)
      .then(() => {
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  };

  useEffect(() => {
    setSelectedValue(page.route_url);
  }, [page.route_url]);

  const getDefaultValue = () => {
    // setSelectedValue(router?.asPath);
    let destinationName = router.asPath.split("/").pop();
    let formattedName =
      destinationName.charAt(0).toUpperCase() + destinationName.slice(1);
    return { label: formattedName, value: router.asPath };
  };

  return (
    <>
      <section className="relative flex items-center justify-center min-h-[100vh] h-[100vh] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <Image
          alt={"Banner"}
          src={
            page.mediaHandler?.[`main.banner`]?.[0]?.conversions.desktop ||
            page.mediaHandler?.[`main.banner`]?.[0]?.original
          }
          width={1920}
          height={1080}
          className="w-full h-full  object-cover absolute top-0 left-0"
        />
        {title && (
          <h1 className="text-[42px] text-white relative z-[3]">{title}</h1>
        )}
      </section>

      <article>
        <div className="container py-[50px]">
          <div className="flex flex-col pb-[40px]">
            <span className="text-center pb-3">Other Destination</span>
            <CustomSelect
              className="react-select"
              id="destinationSelect"
              instanceId="destinationSelect"
              // value={getDefaultValue()}
              defaultValue={getDefaultValue()}
              onChange={handleSelectChange}
              options={destinations?.map((d, index) => {
                return {
                  label: d?.title,
                  value: d?.route_url,
                };
              })}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: block.data.main.description }}
            className="text-[14px] leading-[25px] "
          />
        </div>
        <div className="py-5">
          {feature.map((item, index) => {
            const isOdd = index % 2 !== 0;
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row w-full ${
                  isOdd && "flex-col md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  <Image
                    src={
                      block.mediaHandler[`main.items.${index}.image`][0]
                        .conversions?.image ||
                      block.mediaHandler[`main.items.${index}.image`][0]
                        .original
                    }
                    alt={item.title}
                    height={1000}
                    width={1000}
                    quality={100}
                    className="w-full h-full sm:max-h-[630px] sm:min-h-[630px] object-cover"
                  />
                </div>

                <div className="flex w-full md:w-1/2 bg-primary items-center">
                  <div className="flex flex-col px-5 md:px-[50px] py-[50px] md:py-0">
                    <span className="text-secondary1 text-[20px] tracking-[2px]">
                      {item.title}
                    </span>
                    <hr className="w-[80px] border border-secondary1" />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: block.data.main.description,
                      }}
                      className="text-secondary1 pt-5"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {links && links.length > 0 && (
          <div
            className={`flex flex-col sm:flex-row w-full gap-y-3 sm:gap-y-0 justify-center px-5 2xl:px-0 gap-x-3 bg-white`}
          >
            {links.map((item, i) => {
              return (
                <Link
                  key={i}
                  href={item.button_url || "#"}
                  className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                    !item.button_label || !links
                      ? "border-none"
                      : "border border-secondary my-[50px]"
                  } text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
                >
                  {item.button_label}
                </Link>
              );
            })}
          </div>
        )}
      </article>
    </>
  );
}
