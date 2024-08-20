import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
const DefaultForm = dynamic(() =>
  import("../partials/forms/DefaultForm").then((module) => module.default)
);
export default function Block({ block }) {
  const showLazy = globalState((state) => state.showLazy);

  return (
    <div className="py-[30px] bg-[#F1F1F1]">
      <div className="container">
        <div className="bg-white shadow-md py-[50px] px-[30px]">
          <DefaultForm form={block?.main?.form} />
        </div>
      </div>
    </div>
  );
}
