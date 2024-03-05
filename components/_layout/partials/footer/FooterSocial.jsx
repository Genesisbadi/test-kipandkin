import Link from "next/link";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import Youtube from "@/components/icons/Youtube";
import TripAdvisor from "@/components/icons/TripAdvisor";
import LinkedIn from "@/components/icons/LinkedIn";
export default function FooterSocial({ social_media }) {
  return (
    <>
      {social_media?.media_links && (
        <>
          <div className="social-media mt-[15px] flex items-center ">
            {social_media?.media_links?.map((item, index) => (
              <div key={index} className="px-[10px]">
                <Link
                  href={item.link}
                  target="_blank"
                  className="hover:opacity-[.5] transition border border-[1px] flex items-center justify-center border-[#fff] rounded-full min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[5px]"
                >
                  {item.platform === "facebook" && (
                    <Facebook width={10} height={18} color="#fff" />
                  )}
                  {item.platform === "instagram" && (
                    <Instagram width={25} height={25} color="#fff" />
                  )}
                  {item.platform === "youtube" && (
                    <Youtube width={25} height={25} color="#fff" />
                  )}
                  {item.platform === "tripadvisor" && (
                    <TripAdvisor width={25} height={25} color="#fff" />
                  )}
                  {item.platform === "linkedin" && (
                    <LinkedIn width={25} height={25} color="#fff" />
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
