import Image from "next/image";

export default function Block({ block }) {
  const { caption, description, image, position, title } = block?.main;
  return (
    <section
      className={`mb-[80px] flex flex-col-reverse lg:flex-row flex-wrap ${
        position == "right_content" ? "lg:!flex-row-reverse" : ""
      }`}
    >
      <div className="px-[50px] py-[30px] lg:py-[80px] w-full  lg:max-w-[50%] flex flex-col justify-center">
        <h2 className="mb-[50px] text-[65px] leading-[85px] lg:max-w-[80%]">
          {title}
        </h2>
        <div className="pl-[50px]">
          <div className="text-[25px] mb-[50px]">{caption}</div>
          <div
            className="leading-[27px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      <div className="w-full lg:max-w-[50%]">
        <Image
          className="w-full h-full object-cover"
          src={image}
          width={500}
          height={400}
        />
      </div>
    </section>
  );
}
