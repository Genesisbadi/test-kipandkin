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
      className={`${
        className ? "" : ""
      } relative min-h-[calc(100vh-61px)] text-white flex items-center justify-center`}
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
      <span className="bg-[#000] bg-opacity-[.3] absolute top-0 left-0 w-full h-full"></span>
      {title && <div className="relative text-[42px] font-tenor">{title}</div>}
    </div>
  );
}
