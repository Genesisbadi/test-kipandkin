import Link from "next/link";
import styles from "@/styles/description.module.css";
import AccordionItem from "../partials/collapsibles/AccordionItem";
import globalState from "@/lib/store/globalState";

export default function Accordion({ block }) {
  const { items, bg_white } = block.main;
  const showLazy = globalState((state) => state.showLazy);

  const getRandomWidth = () => {
    // Generate a random width between 100px and 300px
    return Math.floor(Math.random() * (1200 - 100 + 1)) + 100;
  };


   
  return (
    <section className={`py-[30px] ${bg_white ? "bg-white" : "bg-[#f1f1f1]"}`}>
      
      <div className="container">
        {!showLazy ? (
          <>
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="mb-[30px]">
                <div className="bg-secondary text-white min-h-[60px] p-[15px] flex items-center justify-between">
                  <div className="animate-pulse bg-[#ccc] h-[20px] w-full max-w-[150px]" />
                  <div className="animate-pulse bg-[#ccc] h-[3px] w-full max-w-[20px]" />
                </div>
                <div className={`p-[15px] min-h-[300px] w-full ${
                    bg_white ? "bg-[#F1F1F1]" : "bg-white"
                  }`}>
                    {Array.from({ length: 10 }, (_, index) => (
                    <div
                    key={index}
                    className="bg-[#ccc] animate-pulse w-full h-[20px] mb-[20px]"
                    style={{ maxWidth: `${getRandomWidth()}px`, marginBottom: '10px' }}
                  >
                  </div> 
                  ))}

                  </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {items.map((item, index) => (
              <AccordionItem
                bg_white={bg_white}
                item={item}
                key={index}
                index={index}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
