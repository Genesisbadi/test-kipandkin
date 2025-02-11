import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Feature({ block }) {
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { description, link, title, video_link, image, button_label } =
    block.main;
  let videoUrl;

  if (video_link) {
    let videoId = video_link.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  return (
    <SectionAccordion
      title={title}
      childrenClassname="pb-0 bg-[#F1F1F1] text-white"
    >
      <section className={`container card-overlay py-[30px]`}>
        <div className="relative shadow-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={900}
            height={500}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="relative flex flex-col min-h-[350px] bg-[#000] p-[30px] bg-opacity-70">
            <h2
              className={`text-[35px] ${
                process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                  ? "font-effra"
                  : "font-tenor"
              }`}
            >
              {title}
            </h2>
            <div
              className="text-shadow-md grow text-[15px] leading-[28px] mt-[20px] line-clamp-6"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {link && (
              <div>
                <Link
                  href={link}
                  className="font-bold gap-x-[5px] border border-white hover:bg-[#fff] hover:bg-opacity-50 transition inline-flex items-center py-[10px] px-[20px] mt-[20px] text-white"
                >
                  {button_label ? button_label : "Discovery More"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionAccordion>
  );
}
