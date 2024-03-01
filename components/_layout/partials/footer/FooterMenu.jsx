import Link from "next/link";
import menuData from "../../../../lib/preBuildScripts/static/footerMenu.json";

export default function FooterMenu() {
  const { nodes } = menuData.footerMenuData;
  return (
    <div className="footer-menu py-[30px]">
      {nodes && (
        <>
          <div className="flex flex-wrap mx-[-15px]">
            {nodes.map((item, index) => (
              <div
                className="w-full px-[15px] lg:max-w-[25%] mb-[10px]"
                key={index}
              >
                <Link
                  className="text-[#cfcfcf] text-[14px] inline-block hover:opacity-[.5]"
                  href={item.url}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
