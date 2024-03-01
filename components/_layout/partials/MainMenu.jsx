import Link from "next/link";

import DropdownArrow from "@/components/icons/DropdownArrow";

export default function MainMenu({ parentNodes, ...props }) {
  const DropdownMenu = ({ ...props }) => {
    const { parent, itemChildren } = props;

    return (
      <div
        className={`${
          parent.label.toLowerCase() === "reservations"
            ? "right-[0]"
            : "left-[0]"
        } dropdown-menu absolute z-[1] w-full min-w-[150px] max-w-[150px] pt-[10px] top-[calc(100%)] transition opacity-[0] invisible group-hover:visible	group-hover:opacity-[1]`}
      >
        <div className="w-full bg-[#d4bebe] transition translate-y-[10px] relative group-hover:translate-y-[0]">
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
                    target={item.target}
                  >
                    {item.label}
                  </Link>
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
            item.label.toLowerCase() !== "reservations" ? "px-[15px]" : ""
          } ${item.children ? "dropdown group" : ""} `}
          key={index}
        >
          <div
            className={`${
              item.label.toLowerCase() !== "reservations" ? "py-[20px]" : ""
            } relative xl:text-[12px] flex items-center xxl:text-[14px]`}
          >
            {item.label.toLowerCase() === "reservations" ? (
              <>
                <div className="bg-primary text-white py-[20px] px-[30px]">
                  {item.url.includes("nolink") ? (
                    <>
                      <span className="uppercase flex items-center cursor-default">
                        {item.label}{" "}
                        <DropdownArrow
                          className="ml-[5px] top-[-4px] border-white relative"
                          width={7}
                          height={7}
                          item={item}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        className="text-primary flex items-center uppercase"
                        href={item.url}
                        target={item.target}
                      >
                        {item.label}
                        <DropdownArrow
                          className="ml-[5px] top-[-4px] border-white relative"
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
                {item.url.includes("nolink") ? (
                  <>
                    <span className="flex items-center uppercase text-primary cursor-default">
                      {item.label}
                      <DropdownArrow
                        className="ml-[5px] top-[-4px] border-primary relative"
                        width={7}
                        height={7}
                        item={item}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-primary flex items-center uppercase hover:text-[#000]"
                      href={item.url}
                      target={item.target}
                    >
                      {item.label}
                      <DropdownArrow
                        className="ml-[5px] top-[-4px] border-primary relative"
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
