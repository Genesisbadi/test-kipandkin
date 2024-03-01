import Image from "next/image";
export default function footerConnections({ connections }) {
  return (
    <>
      {connections.connection_items && (
        <div className="connections">
          {connections?.connection_items?.map((item, index) => (
            <div
              key={index}
              className="border-b border-b-[1px] border-[#666] flex pb-[30px] mb-[15px] last-of-type:border-b-0 last-of-type:mb-0 last-of-type:pb-0"
            >
              <h2 className="font-bold mr-[20px]">{item?.title}</h2>
              {item?.images && (
                <div className="flex">
                  {item.images.map((item, index) => (
                    <span className="inline-block" key={index}>
                      <Image
                        src={`/static/image1.png`}
                        width={322}
                        height={160}
                        alt="Logo"
                        className="w-auto"
                      />
                    </span>
                  ))}
                  {item?.images.map((item, index) => (
                    <span className="inline-block" key={index}>
                      <Image
                        src={`/static/image1.png`}
                        width={322}
                        height={160}
                        alt="Logo"
                        className="w-auto"
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
