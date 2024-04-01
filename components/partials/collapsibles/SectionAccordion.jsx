import dynamic from "next/dynamic";
import { useState } from "react";
export default function SectionAccordion({ children, ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { title, className } = props;
  const ArrowDown = dynamic(() => import("@/components/icons/ArrowDown"));

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion">
      <div className="w-full h-[1px] md:hidden bg-[#ccc] w-[calc(100%-30px)] mx-auto"></div>
      {title && (
        <div
          className="text-primary flex justify-between items-center md:hidden py-[20px] bg-white px-[15px]"
          onClick={handleCollapse}
        >
          {title}
          <span className={`${!isCollapsed ? "rotate-180" : ""}`}>
            <ArrowDown className="fill-primary" />
          </span>
        </div>
      )}
      <div
        className={`pb-[30px] md:pb-0 ${isCollapsed ? "hidden md:block" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
