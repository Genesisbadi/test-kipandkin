import Image from "next/image";
import Link from "next/link";
export default function FooterDestinations({ destinations }) {
  return (
    <>
      {destinations?.destination_items && (
        <div className="footer-strip destinations flex flex-wrap">
          {destinations?.destination_items?.map((item, index) => (
            <div className="max-w-[16.66%] w-full" key={index}>
              <Link
                href={item.link}
                className="flex justify-center bg-[#333] items-center min-h-[250px] relative"
                target="_blank"
              >
                <Image
                  src={`/static/destination1.jpg`}
                  width={350}
                  height={350}
                  alt={item.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <h3 className="relative uppercase font-bold leading-[2px] text-[18px]">
                  {item.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
