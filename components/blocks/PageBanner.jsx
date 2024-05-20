import Image from "next/image";

export default function Block({ page, block, mediaHandler }) {
  const { title, banner } = block.main;
  return (
    <div className="page-banner relative flex items-center justify-center w-full bg-[#f1f1f1]">
      {/* <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span> */}
      <Image
        alt={title || "Discover"}
        src={banner || mediaHandler["main.image"]?.[0].original}
        width={1920}
        height={1080}
        className="w-full object-cover absolute top-0 left-0 h-full"
      />
      <div className="w-full flex relative items-center justify-center h-[560px] 3xl:h-[812px]">
        {/* <span className="absolute top-0 left-0 w-full h-full bg-black opacity-[.2]"></span> */}
        <div
          className={`text-[35px] md:text-[42px] [text-shadow:_2px_5px_5px_rgb(0_0_0_/_100%)] text-white relative z-[3] font-tenor ${
            title ? "" : "hidden"
          }`}
        >
          {title || page.name}
        </div>
      </div>
    </div>
  );
}
