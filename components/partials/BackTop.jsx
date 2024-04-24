import { useEffect, useState } from "react";
import styles from "@/styles/backtop.module.css";

const BackTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      setTimeout(() => {
        window.removeEventListener("scroll", toggleVisibility);
      }, 100);
    };
  }, []);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      console.log("scrolled top");
    }, 200);
  };

  return (
    <div className={styles.backTop}>
      <button
        className={`hover:opacity-[.9] ${styles.backTopButton} ${
          isVisible ? styles.visible : styles.invisible
        }`}
        onClick={scrollToTop}
      >
        ^
      </button>
    </div>
  );
};

export default BackTop;
