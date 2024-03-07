import Image from "next/image";

export default function Block({ block, mediaHandler }) {
  const { title, image } = block.main;
  return (
    <section className="relative w-full flex justify-center items-center">
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
        {title && <h1 className="text-[42px] text-white">{title}</h1>}
      </div>
    </section>
  );
}
