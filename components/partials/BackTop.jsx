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
    <div className={`${styles.backTop} back-to-top`}>
      <button
        className={`flex items-center justify-center !p-0 md:!p-[10px_15px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] hover:opacity-[.9] ${
          process.env.NEXT_PUBLIC_TEMPLATE == 2
            ? "bg-primary border-white border-solid border-[1px]"
            : "bg-[#a79378]"
        } ${isVisible ? styles.visible : styles.invisible}`}
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 md:w-10 md:h-10"
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
