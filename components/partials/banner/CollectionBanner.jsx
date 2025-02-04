import Image from "next/image";
export default function CollectionBanner({ ...props }) {
  const {
    title,
    image_desktop,
    image_laptop,
    image_mobile,
    image_original,
    className,
  } = props;
  return (
    <div
      className={`page-banner relative flex items-center justify-center min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] w-full bg-[#f1f1f1]`}
    >
      <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
      <Image
        alt={title}
        src={
          image_desktop || image_original || "../images/image_makati-large.jpg"
        }
        width={1920}
        height={1080}
        className="w-full h-full  object-cover absolute top-0 left-0"
        priority={true}
      />
      {title && (
        <div className="relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] font-tenor text-[30px] sm:text-[35px] md:text-[42px]  px-5 text-center text-white z-[3] leading-[50px]">
          {title}
        </div>
      )}
    </div>
  );
}
