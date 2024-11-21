import Image from "next/image";
import utilService from "@/lib/services/util";
export default function Block({ page, block, mediaHandler }) {
  const { title, banner } = block.main;

  const youtubeId = utilService.extractYoutubeId(block?.main?.video_url);

  const YoutubeEmbed = () => {
    return (
      <iframe
        className="w-full h-full absolute top-0 left-0 scale-150"
        width={700}
        height={500}
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };
  return (
    <div className="page-banner overflow-hidden relative flex items-center justify-center min-h-[560px] sm:min-h-full sm:pb-[42.2916666667%] w-full bg-[#f1f1f1]">
      {/* <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span> */}
      {banner && (
        <>
          <Image
            alt={title || "Discover"}
            src={banner || mediaHandler["main.image"]?.[0].original}
            width={1920}
            height={1080}
            className="w-full object-cover absolute top-0 left-0 h-full"
            priority={true}
          />
          <span className="absolute top-0 left-0 w-full h-full bg-black opacity-[.3]"></span>
        </>
      )}

      {block?.main?.video_url && (
        <>
          <span className="opacity-0 absolute top-0 left-0 w-full h-full z-[200]"></span>
          <YoutubeEmbed />
        </>
      )}

      {title && (
        <div
          className={`relative px-[15px] sm:absolute sm:top-[50%] sm:translate-y-[-50%] font-tenor text-[35px] md:text-[42px] text-center text-white relative z-[3] ${
            title ? "" : "hidden"
          }`}
        >
          {title}
        </div>
      )}
    </div>
  );
}
