import Image from "next/image";

export default function Awards({ block }) {
  const { title, images, collection_award } = block.main;
  return (
    <section
      className={`flex ${collection_award ? "" : "bg-[#f1f1f1] pt-[20px]"}`}
    >
      <div className={`container ${collection_award ? "" : "mb-[30px]"}`}>
        <div
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 2 &&
            process.env.NEXT_PUBLIC_MICROSITE_ID != 8
              ? "flex flex-wrap md:flex-nowrap justify-center md:justify-normal items-center"
              : collection_award
              ? "w-full justify-center pt-10 pb-[50px]"
              : ""
          }`}
        >
          <h2
            className={`text-[20px] text-primary text-center tracking-[1px]  font-tenor  pb-[10px] ${
              process.env.NEXT_PUBLIC_TEMPLATE == 2 &&
              process.env.NEXT_PUBLIC_MICROSITE_ID != 8
                ? "border-b border-solid border-[#ccc] md:pb-0 md:mb-0 md:border-none w-full md:w-auto mb-[30px]"
                : collection_award
                ? "font-tenor text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]"
                : "border-b border-[#ccc] mb-[30px]"
            } ${process.env.NEXT_PUBLIC_MICROSITE_ID == 7 ? "font-effra" : ""}`}
          >
            {title}
          </h2>
          <div
            className={`flex justify-center items-center flex-wrap ${
              process.env.NEXT_PUBLIC_TEMPLATE == 2 &&
              process.env.NEXT_PUBLIC_MICROSITE_ID != 8
                ? "md:flex-nowrap md:ml-[50px] relative md:before:absolute md:before:w-[2px] md:before:h-[50px] md:before:bg-[#ccc] md:before:left-[-5px]"
                : collection_award
                ? "flex flex-wrap lg:flex-nowrap gap-x-[50px] items-center gap-y-[50px] justify-center"
                : ""
            }`}
          >
            {images?.map((item, index) => (
              <div
                key={index}
                className={`max-w-[120px] w-full ${
                  collection_award ? "my-[1px]" : "m-[15px]"
                }`}
              >
                <Image
                  alt={title || "#"}
                  src={item}
                  width={140}
                  height={139}
                  className="w-full object-cover mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
