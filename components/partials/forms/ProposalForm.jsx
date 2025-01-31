import FormField from "@/components/forms/FormField";
import { Fragment, useState } from "react";
import { formSubmit, isError, RenderCaptcha } from "@/lib/services/formService";
import formStore from "@/lib/store/formStore";
import globalState from "@/lib/store/globalState";
import { shallow } from "zustand/shallow";
import dynamic from "next/dynamic";
export default function ProposalForm({ form }) {
  const formData = formStore((state) => state);
  const captcha = globalState((state) => state.captcha);
  const [uploading, submitLoading] = formStore(
    (state) => [state.uploading, state.submitLoading],
    shallow
  );
  const sections = form?.fields?.blueprint?.schema?.sections || [];
  const [errors, setErrors] = useState([]);
  const FormGenericNotification = dynamic(() =>
    import("../notifications/FormGenericNotification").then(
      (module) => module.default
    )
  );
  const findClass = (field) => {
    switch (field) {
      case "name":
        return "border-[1px] border-[#ddd] w-full px-[10px] py-[5px] min-h-[45px] w-[100%]";
      case "message":
        return "w-full rounded-[5px] border-[1px] border-[#C9AAE1] py-[8.5px] px-3 min-h-[100px] col-span-2";
      case "file":
        return "";
      case "multi_select":
      case "single_select":
        return "react-select cursor-pointer border-[1px] rounded-[5px] h-[35px] pt-[1px] text-sm";
      case "radio_list":
        return "cursor-pointer";
      case "event_type":
        return "";
      case "country":
        return "";
      default:
        return "border-[1px] border-[#ddd] w-full px-[10px] py-[5px] min-h-[45px] w-[100%]";
    }
  };
  const findWrapperClass = (field) => {
    switch (field) {
      case "message":
      case "name":
        return "col-span-2";
      case "radio_list":
        return "flex flex-col";
      default:
        return "col-span-2 sm:col-span-1";
    }
  };
  const [token, setToken] = useState();
  return (
    <>
      {sections.map((section) => {
        const fields = section?.fields || [];
        return (
          <Fragment key={section?.state_name}>
            <form
              onSubmit={(e) =>
                formSubmit({
                  e,
                  formId: form.id,
                  setToken,
                  token,
                  captcha,
                  sections,
                  setErrors,
                  formData,
                })
              }
            >
              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <Fragment key={field?.state_name}>
                    <FormField
                      {...field}
                      className={findClass(field?.state_name)}
                      wrapperclassname={findWrapperClass(field?.state_name)}
                      error={isError(
                        errors,
                        section?.state_name,
                        field?.state_name
                      )}
                    />
                  </Fragment>
                ))}
              </div>

              {form?.attributes?.uses_captcha && (
                <div className="mt-[16px]">
                  <RenderCaptcha setToken={setToken} />
                  {errors?.captcha_token && (
                    <div className="text-[12px] mt-[2px] text-red-600">
                      {errors?.captcha_token}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-[18px]">
                {uploading || submitLoading ? (
                  <button
                    type="button"
                    className="bg-primary py-[10px] text-[#FFFFFF] text-[15px] flex justify-center items-center min-w-[95px] px-[15px] uppercase opacity-[.5]"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary py-[10px] text-[#FFFFFF] text-[15px] flex justify-center items-center min-w-[95px] px-[15px] uppercase"
                  >
                    Submit
                  </button>
                )}
              </div>
              {/* <div className="flex flex-col mt-[18px]">
                  <button
                    disabled={uploading || submitLoading}
                    className={`${
                      !uploading && !submitLoading
                        ? "cursor-pointer bg-[#994cd7]"
                        : "cursor-not-allowed bg-[#c696ed]"
                    }  rounded-[10px] text-[#FFFFFF] text-[15px] flex justify-center items-center w-[95px] h-[40px] font-[600]`}
                  >
                    Submit
                  </button>
              </div> */}
            </form>

            {/* {formStore.getState().formSuccessInfo && (
              <div className="fixed inset-0 p-[15px] flex items-center justify-center z-[9999] bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg animate-wobble">
                  <h2 className="text-2xl font-bold mb-4">Success!</h2>
                  <p>{`Your inquiry has been received. We'll get back to you shortly.`}</p>
                  <button
                    onClick={(e) => {
                      // setFormSuccessInfo(false);
                      formStore.setState({ formSuccessInfo: false });
                    }}
                    className="min-w-[150px] mt-[30px] inline-block py-[8px] px-[20px] bg-primary text-[#fff] rounded-[30px] text-[14px] font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}  */}
          </Fragment>
        );
      })}
    </>
  );
}
