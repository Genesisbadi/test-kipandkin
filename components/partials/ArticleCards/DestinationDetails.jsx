import Image from "next/image";
import { useEffect, useState } from "react";
import Select from "react-select";
import Jsona from "jsona";
const dataFormatter = new Jsona();
import CONTENTAPI from "@/lib/api/content/request";
import CustomSelect from "@/components/forms/CustomSelect";
import { useRouter } from "next/router";

export default function DestinationDetails({ block, page }) {
  const [destination, setDestination] = useState();
  const { title } = block;
  const feature = block.data.main.items;
  const router = useRouter();

  const { isValidating, error } = CONTENTAPI.getContentsSwr(
    `/destinations/entries?`,
    {
      render: "destination",
      revalidateOnFocus: false,
      onSuccess: (res) => {
        if (res) {
          setDestination(dataFormatter.deserialize(res.data));
        }
      },
    }
  );

  const route_url = page.route_url;
  const [selectedValue, setSelectedValue] = useState(page.route_url);

  const handleSelectChange = (option) => {
    console.log({ option });
    const selectedRoute = option?.value;

    setSelectedValue(selectedRoute);
    router.push(selectedRoute);
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
      <section className="relative h-full w-full bg-[#f1f1f1]">
        <div className="flex flex-col">
          <div className="relative w-full flex justify-center items-center">
            <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
            <Image
              alt={"#"}
              src={"#"}
              width={1920}
              height={1080}
              className="w-full h-full  object cover"
            />
            <div className="absolute z-[2]">
              {title && <h4 className="text-[42px] text-white">{title}</h4>}
            </div>
          </div>
          <div className="container border-2 border-black py-[50px]">
            <div className="flex flex-col pb-[40px]">
              <span className="text-center pb-3">Other Destination</span>
              <CustomSelect
                // value={getDefaultValue()}
                defaultValue={getDefaultValue()}
                onChange={handleSelectChange}
                options={destination?.map((d) => {
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
            {feature.map((item, idx) => {
              const isOdd = idx % 2 !== 0;
              return (
                <>
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row w-full ${
                      isOdd && "flex-col md:flex-row-reverse"
                    }`}
                  >
                    <div className="w-full md:w-1/2">
                      <Image
                        src={
                          block.mediaHandler[`main.items.${idx}.image`][0]
                            .conversions?.image || "#"
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
                        <span className="text-dark-gold text-[20px] tracking-[2px]">
                          {item.title}
                        </span>
                        <hr className="w-[80px] border border-dark-gold" />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: block.data.main.description,
                          }}
                          className="text-dark-pink pt-5"
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
