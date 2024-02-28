import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Locales from "@/components/_layout/partials/Locales";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
export default function Menu() {
  const ready = globalState((state) => state.ready);
  const locale = persistentStore((state) => state.locale);
  const { tenantDetails, menus, locales } = globalData;
  const defaultLocale = locales.find((n) => n.is_default);

  const { parentNodes } = menus;

  const DropdownMenu = ({ ...props }) => {
    const { parent, itemChildren } = props;

    return (
      <div
        className={`${
          parent.label.toLowerCase() === "reservations"
            ? "right-[0]"
            : "left-[0]"
        } dropdown-menu absolute z-[1] w-full min-w-[150px] max-w-[150px] bg-[#d4bebe] top-[calc(100%+10px)] transition opacity-[0] invisible	translate-y-[10px] group-hover:opacity-[1] group-hover:visible group-hover:translate-y-[0]`}
      >
        <span
          className={`absolute top-[-10px]  z-[20] w-[0] h-[0] border-r-[10px] border-b-[10px] 
          border-l-[10px] border-solid border-r-transparent
          border-l-transparent border-b-[#d4bebe]  ${
            parent.label.toLowerCase() !== "reservations"
              ? "left-[10px]"
              : "right-[10px]"
          }`}
        ></span>
        {itemChildren.map((item, index) => (
          <div className="" key={index}>
            {item.url.includes("nolink") ? (
              <>{item.label}</>
            ) : (
              <>
                <Link
                  className="text-primary hover:text-[#fff] transition hover:bg-[#99656a] block py-[10px] px-[10px]"
                  href={item.url}
                >
                  {item.label}
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <header>
        <div className="flex items-center justify-between">
          <div className="pl-[30px]">
            <Link href="/">
              <Image
                src={tenantDetails?.data?.main?.tenant_logo}
                width={154}
                height={50}
                alt={tenantDetails.name || "Logo"}
              />
            </Link>
          </div>
          <div className="flex">
            {parentNodes?.map((item, index) => (
              <div
                className={`item relative  ${
                  item.label.toLowerCase() !== "reservations" ? "px-[30px]" : ""
                } ${item.children ? "dropdown group" : ""} `}
                key={index}
              >
                <div
                  className={`${
                    item.label.toLowerCase() !== "reservations"
                      ? "py-[20px]"
                      : ""
                  } relative  text-[14px] text-primary`}
                >
                  {item.label.toLowerCase() === "reservations" ? (
                    <>
                      <div className="bg-primary text-white py-[20px] px-[30px]">
                        {item.url.includes("nolink") ? (
                          <>
                            <span className="uppercase">{item.label}</span>
                          </>
                        ) : (
                          <>
                            <Link
                              className="text-primary uppercase"
                              href={item.url}
                            >
                              {item.label}
                            </Link>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {item.url.includes("nolink") ? (
                        <>
                          <span className="uppercase">{item.label}</span>
                        </>
                      ) : (
                        <>
                          <Link
                            className="text-primary uppercase"
                            href={item.url}
                          >
                            {item.label}
                          </Link>
                        </>
                      )}
                    </>
                  )}

                  {item?.children && item?.children?.length > 0 && (
                    <DropdownMenu parent={item} itemChildren={item.children} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
