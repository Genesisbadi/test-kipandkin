import CustomSelect from "@/components/forms/CustomSelect";
import { useState } from "react";

export default function AccordionsOffer({ accordions }) {
  const [activeTab, setActiveTab] = useState(accordions[0]);
  const [selectedValue, setSelectedValue] = useState(null);

  const getDefaultValue = () => {
    return {
      label: activeTab?.title,
      value: activeTab?.title,
    };
  };
  return (
    <div className="container pb-[50px]">
      <CustomSelect
        value={getDefaultValue()}
        isSearchable={false}
        className="react-select mb-[15px]"
        defaultValue={getDefaultValue()}
        onChange={(e) =>
          setSelectedValue(() => {
            const currentTab = accordions?.find((obj) => obj.title === e.value);
            setActiveTab(currentTab);
          })
        }
        options={accordions?.map((item, index) => {
          return {
            label: item?.title,
            value: item?.title,
          };
        })}
      />

      {activeTab && (
        <div
          className="w-full block text-[14px] mb-[30px] bg-white shadow-md px-[40px] py-[30px] mb-[50px]"
          dangerouslySetInnerHTML={{ __html: activeTab?.description }}
        />
      )}
    </div>
  );
}

// export default function AccordionsOffer({ accordions }) {
//   const [accordionStates, setAccordionStates] = useState(
//     Array(accordions.length).fill(false)
//   );

//   const toggleAccordion = (index) => {
//     setAccordionStates((prevStates) => {
//       const newStates = [...prevStates];
//       newStates[index] = !newStates[index];
//       return newStates;
//     });
//   };

//   return (
//     <div className="container pb-[50px]">
//       {accordions.map((item, index) => (
//         <div key={index}>
//           <div
//             className={`accordion-header select-none flex justify-between cursor-pointer items-center py-[15px] px-[15px] border-b-[1px] border-[#ccc] border-t-[1px] border-[#ccc] ${
//               accordionStates[index] ? "bg-white" : ""
//             }`}
//             onClick={() => toggleAccordion(index)}
//           >
//             <h2 className="text-primary font-bold text-[20px] font-tenor">
//               {item?.title}
//             </h2>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className={`w-5 h-5 transition ${
//                 accordionStates[index] ? "rotate-180" : "rotate-0"
//               }`}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m19.5 8.25-7.5 7.5-7.5-7.5"
//               />
//             </svg>
//           </div>
//           {accordionStates[index] && (
//             <div className="content py-[15px] bg-[#fff] py-[30px] px-[15px]">
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: item?.description,
//                 }}
//               ></div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
