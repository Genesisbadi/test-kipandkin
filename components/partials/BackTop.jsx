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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default BackTop;
