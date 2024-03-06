import Image from "next/image";

export default function Block({ block, mediaHandler }) {
  const { title } = block.main;
  const image = "/images/Banner-Safe-Space-Desktop.jpg";

  console.log(block.main, "")

  return (
    <section className="w-full">
      {/* <div className="reltive w-full flex justify-center items-center">
        <Image
          alt={title || "#"}
          src={
            mediaHandler["main.image"]?.[0].conversions.desktop ||
            "/Banner-Safe-Space-Desktop.jpg"
          }
          width={1920}
          height={1080}
          className="w-full object cover"
        />
        <div className="absolute">
          {title && <h4 className="text-[42px] text-white">{title}</h4>}
        </div>
      </div> */}
    </section>
  );
}
