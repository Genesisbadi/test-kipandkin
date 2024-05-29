import Link from "next/link";
import styles from "@/styles/description.module.css";
import AccordionItem from "../partials/collapsibles/AccordionItem";

export default function Accordion({ block }) {
  const { items, bg_white } = block.main;

  return (
    <section className={`py-[30px] ${bg_white ? "bg-white" : "bg-[#f1f1f1]"}`}>
      <div className="container">
        {items.map((item, index) => (
          <AccordionItem
            bg_white={bg_white}
            item={item}
            key={index}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
