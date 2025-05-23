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
          <div className="social-media mt-[15px] mx-[-5px] md:mx-[-10px] md:mt-0 flex flex-wrap items-center ">
            {social_media?.media_links?.map((item, index) => (
              <div
                key={index}
                className="px-[5px] md:px-[10px] mb-[20px] md:mb-0"
              >
                <Link
                  href={item.link}
                  title={messages[item.platform] || "Follow Us"}
                  target="_blank"
                  className={`transition border-[1px] flex items-center justify-center rounded-full min-w-[46px] min-h-[46px] w-[46px] h-[46px] p-[5px] ${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "border-[#3F395F] hover:border-[#d51a69]"
                      : "border-[#cfcfcf] hover:opacity-[.5]"
                  }`}
                >
                  {item.platform === "facebook" && (
                    <Facebook
                      width={24}
                      title="Like us on Facebook."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                      hoverColor={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#d51a69"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "instagram" && (
                    <Instagram
                      width={24}
                      title="Follow Us on Instagram."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                      hoverColor={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#d51a69"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "youtube" && (
                    <Youtube
                      width={24}
                      title="Subscribe to our youtube channel."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                      hoverColor={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#d51a69"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "tripadvisor" && (
                    <TripAdvisor
                      width={24}
                      title="See our Trip Advisor reviews"
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "linkedin" && (
                    <LinkedIn
                      width={24}
                      title="Follow Us on LinkedIn."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "tiktok" && (
                    <Tiktok
                      width={24}
                      title="Follow Us on Tiktok."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
                      hoverColor={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#d51a69"
                          : "#cfcfcf"
                      }`}
                    />
                  )}
                  {item.platform === "twitter" && (
                    <Twitter
                      width={24}
                      title="Follow Us on Twitter."
                      height={24}
                      color={`${
                        process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                          ? "#3F395F"
                          : "#cfcfcf"
                      }`}
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
