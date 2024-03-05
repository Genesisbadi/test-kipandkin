import Image from "next/image";

export default function Block({ block, mediaHandler }) {
  const { title } = block.main;

  return (
    <section className="relative flex items-center justify-center h-[100vh] w-full bg-[#f1f1f1]">
      <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
      <Image
        alt={title || "#"}
        src={
          mediaHandler["main.image"]?.[0].conversions.desktop ||
          "/Banner-Safe-Space-Desktop.jpg"
        }
        width={1920}
        height={1080}
        className="w-full h-full  object-cover absolute top-0 left-0"
      />
      {title && (
        <h1 className="text-[42px] text-white relative z-[3]">{title}</h1>
      )}
    </section>
  );
}
