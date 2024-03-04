import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
export default function CallToActions() {
  const { block_title, items } = globalData.tenantDetails.data.call_to_actions;
  return (
    <section className="text-primary py-[30px] border-y-[3px] border-primary">
      <div className="container">
        <h2 className="text-primary text-[22px] mb-[30px] mb-[15px]">
          {block_title || "Hello World"}
        </h2>
        {items && (
          <div className="flex flex-wrap">
            {items?.map((item, index) => (
              <div
                key={index}
                className="flex mb-[30px] md:max-w-[50%] lg:max-w-[33.33%] w-full"
              >
                <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-primary ">
                  <Image
                    src={item?.icon}
                    width={40}
                    height={40}
                    alt={item?.title}
                    className="!invert-[100%] !brightness-[100%] !contrast-[100%]"
                  />
                </span>
                <h3>{item?.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
