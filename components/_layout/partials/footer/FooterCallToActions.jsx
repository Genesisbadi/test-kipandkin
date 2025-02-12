import globalState from "@/lib/store/globalState";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import tenantDetailsCallToActions from "@/lib/preBuildScripts/static/tenantDetailsCallToActions.json";
export default function CallToActions() {
  const router = useRouter();

  const showLazy = globalState((state) => state.showLazy);

  if (!showLazy) {
    return (
      <>
        <div className="py-[30px] border-y-[3px] border-primary">
          <div className="container">
            <div className="w-full max-w-[350px] bg-[#ccc] h-[30px] mb-[30px]" />
            <div className="flex flex-wrap">
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index} className="w-full flex flex-wrap items-center">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div
                      key={index}
                      className="w-full flex gap-x-[15px] md:max-w-[33.33%] mb-[15px]"
                    >
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
          </div>
        </div>
      </>
    );
  }
  const Image = dynamic(() =>
    import("next/image").then((module) => module.default)
  );
  const { block_title, items } = tenantDetailsCallToActions;

  return (
    <>
      {router.asPath !== "/" && (
        <section
          className={`text-primary py-[30px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 2
              ? ""
              : "border-y-[3px] border-primary"
          }`}
        >
          <div className="container">
            <h2
              className={`text-primary text-[22px] mb-[30px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
              } ${
                process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "" : "tracking-[1px]"
              }${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7 ? "font-effra" : ""
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
                        }${
                          process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                            ? "font-effra"
                            : ""
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
          </div>
        </section>
      )}
    </>
  );
}
