import Link from "next/link";
import styles from "@/styles/ButtonsRepeater.module.css";
import dynamic from "next/dynamic";
export default function ButtonsRepeater({ ...props }) {
  const { buttons, className } = props;

  const ButtonLink = dynamic(() =>
    import("./ButtonLink").then((module) => module.default)
  );
  return (
    <div
      className={`${styles.buttonRepeater || ""} ${
        className || ""
      } flex flex-wrap justify-center`}
    >
      {buttons?.map((item, index) => (
        <div
          key={index}
          className="item w-full flex flex-col justify-center md:px-[40px] md:max-w-[47.33%]"
        >
          {item?.description && (
            <div
              className="text-center text-[14px]"
              dangerouslySetInnerHTML={{ __html: item?.description }}
            />
          )}

          <div className="text-center mt-[15px]">
            <ButtonLink
              className={`uppercase inline-block text-[14px] text-center px-[30px] py-[15px] w-full md:w-auto min-w-[130px] transition ${
                item.variant === "filled" || item.button_variant === "dark"
                  ? "bg-primary text-white hover:bg-secondary hover:text-white"
                  : "border border-secondary text-secondary hover:bg-secondary hover:text-white"
              }`}
              href={item?.button_link || item?.file}
              target={
                item?.button_link?.includes("http") ||
                item?.file?.includes("http")
                  ? "_blank"
                  : "_self"
              }
            >
              {item?.button_label || "Discover More"}
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  );
}
