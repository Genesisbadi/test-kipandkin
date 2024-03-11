export default function Description({ block }) {
  const { description } = block.main;
  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:py-[30px]">
      <div
        className="description container text-[14px] pt-[10px] pb-[30px]"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </section>
  );
}
