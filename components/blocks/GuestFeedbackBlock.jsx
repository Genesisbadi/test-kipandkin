import dynamic from "next/dynamic";
export default function GuestFeedbackBlock({ block }) {
  const GuestFeedBackForm = dynamic(() =>
    import("@/components/partials/forms/GuestFeedbackForm").then(
      (module) => module.default
    )
  );

  return (
    <div className="bg-[#F1F1F1] py-[50px]">
      <div className="container">
        <div className="bg-white p-[30px]">
          {block?.main?.description && (
            <div
              className="mb-[15px] text-[14px]"
              dangerouslySetInnerHTML={{ __html: block?.main?.description }}
            />
          )}
          <GuestFeedBackForm form={block?.main?.form} />
        </div>
      </div>
    </div>
  );
}
