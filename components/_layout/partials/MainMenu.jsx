import Link from "next/link";

import DropdownArrow from "@/components/icons/DropdownArrow";
import { useRouter } from "next/router";

export default function MainMenu({ parentNodes, ...props }) {
  const router = useRouter();
  const { tenantDetails } = props;
  const { phone, email } = tenantDetails.data.main;
  const DropdownMenu = ({ ...props }) => {
    const { parent, itemChildren } = props;
    return (
      <div
        className={`${
          parent.label.toLowerCase() === "reservations"
            ? "right-[0]"
            : "left-[0]"
        } dropdown-menu absolute z-[1] w-full min-w-[150px] max-w-[150px] pt-[10px] top-[calc(100%-20px)] transition opacity-[0] invisible`}
      >
        <div className="w-full bg-secondary2 transition translate-y-[10px] relative">
          <span
            className={`caret absolute top-[-10px]  z-[20] w-[0] h-[0] border-r-[10px] border-b-[10px] 
              border-l-[10px] border-solid border-r-transparent
              border-l-transparent border-b-secondary2  ${
                parent.label.toLowerCase() !== "reservations"
                  ? "left-[10px]"
                  : "right-[10px]"
              }`}
          ></span>
          {itemChildren?.map((item, index) => (
            <div className={`${item.children ? "dropdown" : ""}`} key={index}>
              {item?.url?.includes("nolink") ? (
                <>{item.label}</>
              ) : (
                <>
                  <Link
                    className="text-primary hover:text-[#fff] transition hover:bg-[#99656a] block py-[10px] px-[10px]"
                    href={item.url}
                    target={item.target}
                  >
                    {item.label}
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
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className={`${props.className}`}>
      {parentNodes?.map((item, index) => (
        <div
          className={`item relative  ${
            item.label.toLowerCase() !== "reservations"
              ? "px-[10px] xxl:px-[15px]"
              : ""
          } ${item.children ? "dropdown" : ""} `}
          key={index}
        >
          <div
            className={`${process.env.NEXT_PUBLIC_TEMPLATE == 2 ? 'py-[8px]' : ''} ${
              item.label.toLowerCase() !== "reservations" && parseInt(process.env.NEXT_PUBLIC_TEMPLATE) !== 2 ? "py-[20px]" : ""
            } relative xl:text-[12px] flex items-center xxl:text-[14px]`}
          >
            {item.label.toLowerCase() === "reservations" ? (
              <>
                <div className={`${process.env.NEXT_PUBLIC_TEMPLATE == 1 ? 'py-[20px] px-[30px] text-white bg-primary' : ''}`}>
                  {item?.url?.includes("nolink") ? (
                    <>
                      <span className="uppercase flex items-center cursor-default">
                        {item.label}
                        <DropdownArrow
                          className="ml-[5px] top-[-2px] xxl:top-[-4px] border-white relative"
                          width={7}
                          height={7}
                          item={item}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        className={`text-primary flex items-center uppercase ${
                          item?.url?.includes(router.asPath) ? "active" : ""
                        }`}
                        href={item?.url}
                        target={item.target}
                      >
                        {item.label}
                        <DropdownArrow
                          className="ml-[5px] top-[-2px] xxl:top-[-4px] border-white relative"
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
                    <span className="flex items-center uppercase text-primary cursor-default">
                      {item.label}
                      <DropdownArrow
                        className="ml-[5px] top-[-2px] xxl:top-[-4px] border-primary relative"
                        width={7}
                        height={7}
                        item={item}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <Link
                      className={`text-primary flex items-center uppercase hover:text-[#000] ${
                        item?.url?.includes(router.asPath) ? "active" : ""
                      }`}
                      href={item?.url || "#"}
                      target={item.target}
                    >
                      {item.label}
                      <DropdownArrow
                        className="ml-[5px] top-[-2px] xxl:top-[-4px] border-primary relative"
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
