import Image from "next/image";

export default function Block({ page, block, mediaHandler }) {
  const { title } = block.main;
  return (
    <section className="relative flex items-center justify-center w-full bg-[#f1f1f1]">
      {/* <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span> */}
      <Image
        alt={title || "#"}
        src={
          mediaHandler["main.image"]?.[0].conversions.desktop ||
          mediaHandler["main.image"]?.[0].original
        }
        width={1920}
        height={1080}
        className="w-full object-cover absolute top-0 left-0 h-full"
      />
      <div className="w-full flex relative items-center justify-center h-[calc(100vh-68px)]">
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-[.2]"></span>
        <h1
          className={`text-[42px] text-white relative z-[20] ${
            title ? "" : "hidden"
          }`}
        >
          {title || page.name}
        </h1>
      </div>
    </section>
  );
}
