import { useEffect } from "react";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import body from "@/styles/body.module.css";
export default function Description({ block }) {
  const { description } = block.main;
  const showLazy = globalState((state) => state.showLazy);

  useEffect(() => {
    const micrositeId = process.env.NEXT_PUBLIC_MICROSITE_ID;

    document.body.classList.remove(styles.microsite7, styles.micrositeDefault);

    if (micrositeId == 7) {
      document.body.classList.add(styles.microsite7);
    } else {
      document.body.classList.add(styles.micrositeDefault);
    }

    return () => {
      document.body.classList.remove(
        styles.microsite7,
        styles.micrositeDefault
      );
    };
  }, []);

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
          className={`${
            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
              ? body.kipkin
              : styles.description
          } container`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </section>
  );
}
