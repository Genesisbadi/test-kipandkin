import formStore from "@/lib/store/formStore";
export default function FormGenericNotification() {
  const formSuccessInfo = formStore((state) => state.formSuccessInfo);

  if (formSuccessInfo) {
    return (
      <div className="fixed inset-0 p-[15px] flex items-center justify-center z-[9999] bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg animate-wobble">
          <h2 className="text-2xl font-bold mb-4">{formSuccessInfo?.title}</h2>
          <p>{formSuccessInfo?.message}</p>
          <button
            onClick={(e) => {
              formStore.setState({ formSuccessInfo: null });
            }}
            className="min-w-[150px] mt-[30px] inline-block py-[8px] px-[20px] bg-primary text-[#fff] rounded-[30px] text-[14px] font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}
