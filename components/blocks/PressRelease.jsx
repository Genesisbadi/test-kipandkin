import Link from "next/link";

export default function PressRelease({ block }) {
  const { releases } = block.main;
  return (
    <section className="bg-[#f1f1f1] sm:pb-[30px]">
      <div className="container py-5 md:py-0">
        <div className="flex flex-col w-full bg-white p-[30px] rounded-md shadow-md">
          {releases.map((item, index) => {
            return (
              <div key={index} className="mb-[15px]">
                <h2 className="text-[23px] text-[#343a40] font-bold">
                  {item.title}
                </h2>
                <div className="flex flex-col w-auto pt-2">
                  {item.pdf_file.map((pdf, index) => (
                    <div key={index}>
                      {pdf?.title && (
                        <h3 className="text-[18px] font-[600]">{pdf?.title}</h3>
                      )}
                      <Link
                        href={pdf.file}
                        target="_blank"
                        title={pdf.name}
                        className="inline-flex flex-col text-primary pb-3 text-[14px] hover:underline"
                      >
                        {pdf.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
