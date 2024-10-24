import Image from "next/image";
import styles from "@/styles/blog.module.css";
import Link from "next/link";
import blogEntries from "@/lib/preBuildScripts/static/blog.json";
import dynamic from "next/dynamic";
export default function BlogPage({ page }) {
  const { title, id, data, metaData, published_at, mediaHandler } = page;

  const { gallery_images } = page?.data?.main;

  const blogs = blogEntries.blogsEntriesData;

  const getPrevOrNextObject = (array, id, direction) => {
    const currentIndex = array.findIndex((obj) => obj.id === id);
    if (currentIndex === -1) {
      return null; // If the id is not found in the array
    }

    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= array.length) {
      return null; // If trying to access beyond array boundaries
    }

    return array[nextIndex];
  };

  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );

  const ButtonLink = dynamic(() =>
    import("../partials/buttons/ButtonLink").then((module) => module.default)
  );

  const prevPost = getPrevOrNextObject(blogs, id, -1); // Get previous object
  const nextPost = getPrevOrNextObject(blogs, id, 1); // Get next object

  const date = new Date(published_at);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const post_date = date.toLocaleDateString("en-US", options);

  return (
    <article className="bg-[#F1F1F1]">
      <div className="container overflow-hidden">
        <h2
          className={`text-primary text-[20px] md:text-[25px] tracking-[1px] text-center py-[30px] border-b-[1px] border-[#ccc] mb-[30px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : " "
          }`}
        >
          {title}
        </h2>
        {mediaHandler?.main?.image ||
          (page?.data?.main?.featured_image && (
            <figure
              className={`${
                process.env.NEXT_PUBLIC_TEMPLATE == 2
                  ? "max-w-[800px] mx-auto"
                  : ""
              }`}
            >
              <Image
                className="mb-[30px]"
                src={
                  mediaHandler?.["main.image"]?.[0]?.conversions?.blog_show ||
                  mediaHandler?.["main.image"]?.[0]?.original ||
                  page?.data?.main?.featured_image
                }
                alt={title || "Thumbnail"}
                width={1200}
                height={400}
              />
            </figure>
          ))}
        <div
          className={`px-[15px] md:px-[30px] ${styles.description} text-[14px]`}
          dangerouslySetInnerHTML={{ __html: data.main.description }}
        />

        {data?.main?.button_links && data?.main?.button_links.length > 0 && (
          <div className="flex mt-[30px] flex-col md:flex-row gap-x-3 gap-y-3 md:gap-y-0 w-full justify-center">
            {data?.main?.button_links.map((item, index) => {
              return (
                <ButtonLink
                  key={index}
                  href={item.btn_link || item?.file || "#"}
                  target={
                    item?.btn_link?.includes("http") ||
                    item?.file?.includes("http")
                      ? "_blank"
                      : "_self"
                  }
                  className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                    item.variant === "filled"
                      ? "text-white bg-primary"
                      : "border-secondary"
                  } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                >
                  {item.btn_label || "Learn More"}
                </ButtonLink>
              );
            })}
          </div>
        )}
      </div>
      {gallery_images && gallery_images?.length > 0 && (
        <CarouselGallery
          alt_title={page?.title || "Thumbnail"}
          images={gallery_images}
          title="Gallery"
        />
      )}
      <div className="container overflow-hidden">
        {published_at && (
          <time
            className="text-[#aaa] text-[14px] mt-[50px] block mb-[10px]"
            dateTime={post_date}
          >
            {post_date}
          </time>
        )}

        <span className="h-[1px] w-[50px] bg-[#aaa] block"></span>
        <div className="py-[60px] items-center text-[14px] flex mx-[-10px]">
          {prevPost && (
            <>
              <div className="px-[10px]">
                <Link
                  className="text-primary hover:text-[#aaa] underline"
                  href={prevPost.route_url}
                >
                  Previous Post
                </Link>
              </div>
              <span className="h-[15px] w-[1px] bg-primary block"></span>
            </>
          )}

          {nextPost && (
            <>
              <div className="px-[10px]">
                <Link
                  className="text-primary hover:text-[#aaa] underline"
                  href={nextPost.route_url}
                >
                  Next Post
                </Link>
              </div>
              <span className="h-[15px] w-[1px] bg-primary block"></span>
            </>
          )}

          <div className="px-[10px]">
            <Link
              className="text-primary hover:text-[#aaa] underline"
              href={"/blog"}
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
