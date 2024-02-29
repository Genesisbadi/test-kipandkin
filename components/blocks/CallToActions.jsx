import Link from "next/link";
import Image from "next/image";
export default function CallToActions({ block }) {
  const { block_title, items } = block.main;
  return (
    <section className="#F1F1F1 py-[30px]">
      <div className="container">
        <h2 className="text-center text-primary text-[30px] mb-[30px]">
          {block_title}
        </h2>
        {items?.length > 0 && (
          <div className="flex flex-wrap mx-[-15px]">
            {items?.map((item, index) => (
              <div
                className="w-full px-[15px] mb-[40px] md:max-w-[33.33%]"
                key={index}
              >
                <Link
                  href={item?.link}
                  target={item?.link.includes("http") ? "_blank" : "_self"}
                  className="flex items-center group hover:text-primary text-[#999] text-[18px]"
                >
                  <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-[#ddd7cc] group-hover:bg-primary ">
                    <Image
                      src={item.icon}
                      width={35}
                      height={35}
                      alt={item?.title}
                      className="w-[35px] h-[35px] object-contain transition group-hover:!invert-[100%] group-hover:!brightness-[100%] group-hover:!contrast-[100%]   "
                      style={{
                        filter:
                          "invert(55%) sepia(11%) saturate(819%) hue-rotate(4deg) brightness(97%) contrast(92%)",
                      }}
                    />
                  </span>
                  <h3>{item.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
