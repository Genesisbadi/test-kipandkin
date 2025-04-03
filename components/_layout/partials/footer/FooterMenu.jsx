import Link from "next/link";
import menuData from "../../../../lib/preBuildScripts/static/footerMenu.json";

export default function FooterMenu() {
  const nodes = menuData.footerMenuData;
  return (
    <div className="footer-menu pb-[65px]">
      {nodes && (
        <>
          <div className="block columns-1 md:columns-2 xl:columns-4">
            {nodes.map((item, index) => (
              <div className="w-full uppercase mb-[20px]" key={index}>
                <Link
                  className={`text-[14px] inline-block ${
                    process.env.NEXT_PUBLIC_MICROSITE_ID == 7
                      ? "!text-[#3F395F] hover:!text-[#d51a69]"
                      : "text-[#cfcfcf] hover:opacity-[.6]"
                  }`}
                  href={item?.attributes?.url}
                >
                  {item?.attributes?.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
