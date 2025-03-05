import Link from "next/link";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export default function MainMenu({ parentNodes, ...props }) {
  const router = useRouter();

  const DropdownArrow = dynamic(() =>
    import("@/components/icons/DropdownArrow")
  );

  const DropdownMenu = ({ ...props }) => {
    const { parent, itemChildren } = props;
    return (
      <div
        className={`${
          parent.label.toLowerCase() === "reservations"
            ? "right-[0]"
            : "left-[0]"
        } dropdown-menu absolute z-[1] w-full max-w-[150px] pt-[10px] top-[calc(100%-20px)] transition opacity-[0] invisible`}
      >
        <div
          className={`w-full  transition translate-y-[10px] relative ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1
              ? "bg-secondary2"
              : "bg-[#f5f5f5]"
          }`}
        >
          <span
            className={`caret absolute top-[-10px]  z-[20] w-[0] h-[0] border-r-[10px] border-b-[10px] 
              border-l-[10px] border-solid border-r-transparent
              border-l-transparent ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "border-b-secondary2"
                  : "border-b-[#f5f5f5]"
              }  ${
              parent.label.toLowerCase() !== "reservations"
                ? "left-[10px]"
                : "right-[10px]"
            }`}
          ></span>
          {itemChildren?.map((item, index) => {
            if (
              item?.url == router.asPath ||
              item?.url?.includes(router.query["id"])
            ) {
              setTimeout(() => {
                const parentElem = document.getElementById(
                  `nav-link-${parent?.id}`
                );

                if (parentElem) {
                  parentElem.classList.add("active");
                }
              }, 100);
            }
            return (
              <div
                className={`${item.children ? "dropdown relative" : ""}`}
                key={index}
              >
                {item?.url?.includes("nolink") ? (
                  <>{item.label}</>
                ) : (
                  <>
                    <Link
                      prefetch={false}
                      className={`${
                        item?.url.includes(router.asPath) &&
                        router.asPath != "/" &&
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "!bg-secondary3 !text-[#fff]"
                          : ""
                      } ${
                        item?.url.includes(router.asPath) &&
                        router.asPath != "/" &&
                        process.env.NEXT_PUBLIC_TEMPLATE == 2
                          ? "!bg-[#e4e3e3] !text-primary"
                          : ""
                      } ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "text-primary hover:text-[#fff] hover:bg-secondary3"
                          : "hover:!bg-[#e4e3e3] hover:!text-primary"
                      }  text-primary transition block py-[10px] px-[10px]`}
                      href={item?.url}
                      target={item?.target}
                    >
                      {item?.label}
                    </Link>
                    {item?.children && item?.children?.length > 0 && (
                      <>
                        <DropdownMenu
                          parent={item}
                          itemChildren={item.children}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className={`${props.className}`}>
      {parentNodes?.map((item, index) => (
        <div
          id={`menu-item-${item?.id}`}
          className={`item relative text-[14px] ${
            item.label.toLowerCase() !== "reservations"
              ? "px-[10px] xxl:px-[11px]"
              : ""
          } ${item.children ? "dropdown relative" : ""} `}
          key={index}
        >
          <div
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "py-[8px]" : ""
            } ${
              item.label.toLowerCase() !== "reservations" &&
              parseInt(process.env.NEXT_PUBLIC_TEMPLATE) !== 2
                ? "py-[25px]"
                : ""
            } relative xl:text-[12px] flex items-center xxl:text-[14px]`}
          >
            {item.label.toLowerCase() === "reservations" ? (
              <>
                <div
                  className={`${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1
                      ? "py-[25px] px-[30px] text-white bg-primary"
                      : ""
                  }`}
                >
                  {item?.url?.includes("nolink") ? (
                    <>
                      <span
                        id={`nav-link-${item?.id}`}
                        className={`relative nav-link uppercase flex items-center cursor-default ${
                          process.env.NEXT_PUBLIC_TEMPLATE == 1
                            ? "text-white"
                            : "text-primary"
                        }`}
                      >
                        {item.label}
                        <DropdownArrow
                          className={`ml-[5px] top-[-2px] ${
                            process.env.NEXT_PUBLIC_TEMPLATE == 1
                              ? "border-white"
                              : "border-primary"
                          } relative`}
                          width={7}
                          height={7}
                          item={item}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        prefetch={false}
                        id={`nav-link-${item?.id}`}
                        className={`relative nav-link text-primary flex items-center uppercase ${
                          item?.url?.includes(router.query["id"])
                            ? "active"
                            : ""
                        }`}
                        href={item?.url || "#"}
                        target={item.target}
                      >
                        {item.label}
                        <DropdownArrow
                          className={`ml-[5px] top-[-2px] ${
                            process.env.NEXT_PUBLIC_TEMPLATE == 1
                              ? "border-white"
                              : "border-primary"
                          } relative`}
                          width={7}
                          height={7}
                          item={item}
                        />
                      </Link>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {item?.url?.includes("nolink") ? (
                  <>
                    <span
                      id={`nav-link-${item?.id}`}
                      className={`nav-link relative flex items-center uppercase ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "text-white"
                          : "text-primary"
                      } cursor-default`}
                    >
                      {item.label}
                      <DropdownArrow
                        className={`ml-[5px] top-[-2px] ${
                          process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                            ? "border-white"
                            : "border-primary"
                        } relative`}
                        width={7}
                        height={7}
                        item={item}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <Link
                      prefetch={false}
                      id={`nav-link-${item?.id}`}
                      className={`nav-link ${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "text-white"
                          : "text-primary hover:text-[#000]"
                      } relative flex flex-wrap items-center uppercase hover:text-[#000] ${
                        item?.url?.includes(router.query["id"]) ? "active" : ""
                      }`}
                      href={item?.url || "#"}
                      target={item.target}
                    >
                      {item.label}
                      <DropdownArrow
                        className="ml-[5px] top-[-2px] border-primary relative"
                        width={7}
                        height={7}
                        item={item}
                      />
                    </Link>
                  </>
                )}
              </>
            )}
            {item?.children && item?.children?.length > 0 && (
              <>
                <DropdownMenu parent={item} itemChildren={item.children} />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
