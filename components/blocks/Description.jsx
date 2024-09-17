import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";

export default function Description({ block }) {
  const { description } = block.main;
  const showLazy = globalState((state) => state.showLazy);
  const getRandomWidth = () => {
    // Generate a random width between 100px and 300px
    return Math.floor(Math.random() * (1200 - 100 + 1)) + 100;
  };

  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:pt-[30px] pb-[30px]">
      {!showLazy ? (
        <div className="container">
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className="bg-[#ccc] animate-pulse w-full h-[20px] mb-[20px]"
              style={{
                maxWidth: `${getRandomWidth()}px`,
                marginBottom: "10px",
              }}
            ></div>
          ))}
        </div>
      ) : (
        <div
          className={`${styles.description} container`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </section>
  );
}
