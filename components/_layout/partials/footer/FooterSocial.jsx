import Link from "next/link";
import tenantDetailsSocialMedia from "@/lib/preBuildScripts/static/tenantDetailsSocialMedia.json";
import dynamic from "next/dynamic";

export default function FooterSocial() {
  const Facebook = dynamic(() =>
    import("@/components/icons/Facebook").then((module) => module.default)
  );
  const Instagram = dynamic(() =>
    import("@/components/icons/Instagram").then((module) => module.default)
  );
  const Youtube = dynamic(() =>
    import("@/components/icons/Youtube").then((module) => module.default)
  );
  const TripAdvisor = dynamic(() =>
    import("@/components/icons/TripAdvisor").then((module) => module.default)
  );
  const LinkedIn = dynamic(() =>
    import("@/components/icons/LinkedIn").then((module) => module.default)
  );
  const Tiktok = dynamic(() =>
    import("@/components/icons/Tiktok").then((module) => module.default)
  );
  const Twitter = dynamic(() =>
    import("@/components/icons/Twitter").then((module) => module.default)
  );
  const social_media = tenantDetailsSocialMedia;
  const messages = [];

  messages["tiktok"] = "Follow Us on Tiktok.";
  messages["twitter"] = "Follow Us on Twitter.";
  messages["facebook"] = "Like us on Facebook.";
  messages["instagram"] = "Follow Us on Instagram.";
  messages["youtube"] = "Subscribe to our youtube channel.";
  messages["tripadvisor"] = "See our Trip Advisor reviews.";
  messages["linkedin"] = "Follow Us on LinkedIn.";

  return (
    <>
      {social_media?.media_links && (
        <>
          <div className="social-media mt-[15px] flex flex-wrap items-center ">
            {social_media?.media_links?.map((item, index) => (
              <div key={index} className="px-[10px] mb-[5px]">
                <Link
                  href={item.link}
                  title={messages[item.platform] || "Follow Us"}
                  target="_blank"
                  className="hover:opacity-[.5] transition border border-[1px] flex items-center justify-center border-[#fff] rounded-full min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[5px]"
                >
                  {item.platform === "facebook" && (
                    <Facebook
                      width={10}
                      title="Like us on Facebook."
                      height={18}
                      color="#fff"
                    />
                  )}
                  {item.platform === "instagram" && (
                    <Instagram
                      width={25}
                      title="Follow Us on Instagram."
                      height={25}
                      color="#fff"
                    />
                  )}
                  {item.platform === "youtube" && (
                    <Youtube
                      width={25}
                      title="Subscribe to our youtube channel."
                      height={25}
                      color="#fff"
                    />
                  )}
                  {item.platform === "tripadvisor" && (
                    <TripAdvisor
                      width={25}
                      title="See our Trip Advisor reviews"
                      height={25}
                      color="#fff"
                    />
                  )}
                  {item.platform === "linkedin" && (
                    <LinkedIn
                      width={25}
                      title="Follow Us on LinkedIn."
                      height={25}
                      color="#fff"
                    />
                  )}
                  {item.platform === "tiktok" && (
                    <Tiktok
                      width={25}
                      title="Follow Us on Tiktok."
                      height={25}
                      color="#fff"
                    />
                  )}
                  {item.platform === "twitter" && (
                    <Twitter
                      width={25}
                      title="Follow Us on Twitter."
                      height={25}
                      color="#fff"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
