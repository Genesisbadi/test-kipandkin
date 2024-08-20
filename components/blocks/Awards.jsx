import Image from "next/image";

export default function Awards({ block }) {
  const { title, images } = block.main;

  return (
    <section className="flex bg-[#f1f1f1] pt-[20px]">
      <div className="container mb-[30px]">
        <div
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 2
              ? "flex flex-wrap md:flex-nowrap justify-center md:justify-normal items-center"
              : ""
          }`}
        >
          <h2
            className={`text-[20px] text-primary text-center tracking-[1px] mb-[30px] font-tenor  pb-[10px] ${
              process.env.NEXT_PUBLIC_TEMPLATE == 2
                ? "border-b border-solid border-[#ccc] md:pb-0 md:mb-0 md:border-none w-full md:w-auto"
                : "border-b border-[#ccc]"
            }`}
          >
            {title}
          </h2>
          <div
            className={`flex justify-center items-center flex-wrap ${
              process.env.NEXT_PUBLIC_TEMPLATE == 2
                ? "md:flex-nowrap md:ml-[50px] relative md:before:absolute md:before:w-[2px] md:before:h-[50px] md:before:bg-[#ccc] md:before:left-[-5px]"
                : ""
            }`}
          >
            {images?.map((item, index) => (
              <div key={index} className="m-[15px] max-w-[120px] w-full">
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
