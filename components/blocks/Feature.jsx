import Link from "next/link";

export default function Feature({ block }) {
  const { description, link, position, title, video_link, image } = block.main;
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
    <section className="flex flex-wrap mb-[10px]">
      <div className="w-full flex items-center justify-center md:max-w-[50%] bg-secondary1">
        {video_link || image ? (
          <>
            {video_link && !image && (
              <div className="relative h-full w-full pb-[75%]">
                <iframe
                  src={videoUrl}
                  width={900}
                  height={500}
                  loading="lazy"
                  className="w-full absolute h-full top-0 left-0 object-cover"
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-primary1 text-[25px] p-[15px]">
            No data to show.
          </div>
        )}
      </div>
      <div className="bg-primary py-[20px] lg:py-[30px] flex flex-col justify-center px-[20px] md:px-[30px] lg:px-[60px] w-full md:max-w-[50%] md:min-h-[400px]">
        <h2 className="text-secondary1 text-[20px] tracking-[2px] mb-[10px] tracking-[2px]">
          {title}
        </h2>
        <hr className="w-[80px] border border-secondary1 mb-[20px]" />
        <div
          className="text-secondary1 mb-[30px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div>
          <Link
            className="inline-block text-center text-secondary1 min-w-[200px] border border-secondary1 py-[15px] px-[30px] transition hover:text-primary hover:bg-white"
            href={link}
            target={link.includes("http") ? "_blank" : "_self"}
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
}
