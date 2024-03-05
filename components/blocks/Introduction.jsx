export default function Introduction({ block }) {
  const { description, title } = block.main;
  return (
    <>
      <section className="w-full flex justify-center bg-[#691a31] pt-[40px] pb-[80px]">
        <div className="w-full max-w-[957px] ">
          {title ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex w-full border-b border-[#c5baa6] justify-center ">
                <span className="text-[#c5baa6] text-[20px] pb-[35px] text-center px-5 2xl:px-0">
                  {title}
                </span>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="text-white text-[14px] leading-[25px] text-center max-w-[957px] px-5 2xl:px-0 pt-[35px]"
              />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-white text-[14px] leading-[25px] text-center max-w-[957px] px-5 2xl:px-0"
            />
          )}
        </div>
      </section>
    </>
  );
}
