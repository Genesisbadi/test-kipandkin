import globalData from "@/lib/preBuildScripts/static/globalData.json";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import { useRouter } from "next/router";
export default function CallToActions() {
  const router = useRouter();
  const { block_title, items } = globalData.tenantDetails.data.call_to_actions;
  const showLazy = globalState((state) => state.showLazy);
  return (
    <>
      {router.asPath !== "/" && (
        <section className="text-primary py-[30px] border-y-[3px] border-primary">
          <div className="container">
            {!showLazy ? (
              <>
                <div className="w-full max-w-[350px] bg-[#ccc] h-[30px] mb-[30px]" />
                <div className="flex flex-wrap">  
                  {Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="w-full flex flex-wrap items-center">
                      {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="w-full flex gap-x-[15px] md:max-w-[33.33%] mb-[15px]">
                          <div className="bg-[#ccc] rounded-full min-w-[80px] min-h-[80px]" />
                          <div className="w-full flex flex-col justify-center">
                            <div className="w-full bg-[#ccc] max-w-[70%] h-[10px] mb-[10px]" />
                            <div className="w-full bg-[#ccc] max-w-[50%] h-[10px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2
              className={`tracking-[1px] text-primary text-[22px] mb-[30px] mb-[15px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : " "
              }`}
            >
              {`${block_title}` || "Why Book Direct?"}
            </h2>
            {items && (
              <div className="flex flex-wrap">
                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-[15px] md:max-w-[50%] lg:max-w-[33.33%] w-full items-center"
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
                    <div>
                      <h3
                        className={`font-medium ${
                          process.env.NEXT_PUBLIC_TEMPLATE == 1
                            ? "font-tenor"
                            : " "
                        }`}
                      >
                        {item?.title}
                      </h3>
                      {item?.description && (
                        <div className="text-[14px]">{item?.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
