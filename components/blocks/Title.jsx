export default function Title({ block }) {
  const { title } = block.main;
  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:py-[30px]">
      <div className="container">
        <h3 className="border-b border-[#ccc] w-full flex text-center justify-center pt-[10px] pb-[30px] text-[25px] text-primary">
          {title}
        </h3>
      </div>
    </section>
  );
}
