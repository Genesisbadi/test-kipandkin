export default function Block({ block }) {
  const { title, description } = block?.main;
  return (
    <section className="py-[50px] xl:py-[100px] px-[50px]">
      <div className="text-[65px]">{title}</div>
      <div
        className="lg:pl-[30%] xl:pl-[50%] text-[20px] mt-[30px] leading-[35px] pr-[30px]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
}
