import dynamic from "next/dynamic";
import GuestFeedbackForm from "../partials/forms/GuestFeedbackForm";
export default function GuestFeedbackBlock({ block }) {
  // const GuestFeedBackForm = dynamic(() =>
  //   import("@/components/partials/forms/GuestFeedbackForm").then(
  //     (module) => module.default
  //   )
  // );

  return (
    <div className="bg-[#F1F1F1] py-[20px]">
      <div className="container">
        <div className="bg-white p-[50px]">
          {block?.main?.description && (
            <div
              className="mb-[30px] text-[14px]"
              dangerouslySetInnerHTML={{ __html: block?.main?.description }}
            />
          )}
          <GuestFeedbackForm form={block?.main?.form} />
        </div>
      </div>
    </div>
  );
}
