import styles from "@/styles/description.module.css";

export default function Description({ block }) {
  const { description } = block.main;
  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:pt-[30px] pb-[35px]">
      <div
        className={`${styles.description} container`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </section>
  );
}
