import Image from "next/image";
import Link from "next/link";
export default function Block({ block }) {
  const { description, link, title, image, button_label, bg_color, position } =
    block.main;
  return (
    <section
      className={`p-[50px] border-b-[2px] border-[rgba(145,145,145,0.2)] ${
        bg_color == "white" ? "bg-white" : "bg-[#F1F1F1]"
      }`}
    >
      <div className="container overflow-hidden">
        <div
          className={`flex flex-wrap items-center mx-[-30px] ${
            position == "right_content" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-full md:max-w-[50%] px-[30px]">
            <Image
              src={image}
              alt="Title"
              width={600}
              height={600}
              className={`min-h-[350px] object-cover`}
            />
          </div>
          <div className="w-full md:max-w-[50%] px-[30px] py-[30px]">
            <h2
              className={`${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              } mb-[30px] text-[23px] text-primary`}
            >
              {title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            {link && (
              <Link
                href={link}
                className={`inline-block mt-[15px] px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm text-white bg-primary border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
              >
                {button_label ? button_label : "Discovery More"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
