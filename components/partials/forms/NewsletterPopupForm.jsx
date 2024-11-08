import FormField from "@/components/forms/FormField";
import { Fragment, useState } from "react";
import { formSubmit, isError, RenderCaptcha } from "@/lib/services/formService";
import formStore from "@/lib/store/formStore";
import globalState from "@/lib/store/globalState";
import { shallow } from "zustand/shallow";
import NewsLetterFormStore from "@/lib/store/NewsLetterFormStore";
export default function NewsletterPopupForm({ form }) {
  const formData = formStore((state) => state);
  const captcha = globalState((state) => state.captcha);
  const [uploading, submitLoading] = formStore(
    (state) => [state.uploading, state.submitLoading],
    shallow
  );

  const { email } = NewsLetterFormStore((state) => ({
    email: state.email,
  }));

  const sections = form?.blueprint?.schema?.sections || [];
  const [errors, setErrors] = useState([]);
  const findClass = (field) => {
    switch (field) {
      case "name":
        return "border outline-0 border-[#C9AAE1] rounded-[5px] h-[35px] text-[#424242] p-[10px] w-[100%]";
      case "message":
        return "w-full rounded-[5px] border-[1px] border-[#C9AAE1] py-[8.5px] px-3 min-h-[100px] col-span-2";
      case "file":
        return "";
      case "multi_select":
      case "single_select":
        return "react-select cursor-pointer border-[1px] rounded-[5px] h-[35px] pt-[1px] text-sm";
      case "radio_list":
        return "cursor-pointer";
      default:
        return "border outline-0 border-[#C9AAE1] rounded-[5px] h-[35px] text-[#424242] p-[10px] w-[100%]";
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

  const onChangeEmail = (e) => {
    NewsLetterFormStore.setState({ email: e.target.value });
  };

  return (
    <div className="border p-6 bg-white z-[105] rounded-lg w-[900px]   max-h-[90vh] overflow-y-auto">
      <div className="text-[24px] pb-[10px] mb-[30px] border-b text-primary font-bold ">
        Newsletter
      </div>
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
              <div className="text-sm">
                {fields.map((field) => (
                  <Fragment key={field?.state_name}>
                    {field?.state_name === "email" ? (
                      <div className="py-2">
                        <FormField
                          {...field}
                          className="border w-full p-3 "
                          wrapperclassname={findWrapperClass(field?.state_name)}
                          error={isError(
                            errors,
                            section?.state_name,
                            field?.state_name
                          )}
                          value={email}
                          onChange={onChangeEmail}
                        />
                      </div>
                    ) : (
                      <div className="py-2">
                        <FormField
                          {...field}
                          // className={findClass(field?.state_name)}
                          className="border w-full p-3 "
                          wrapperclassname={findWrapperClass(field?.state_name)}
                          error={isError(
                            errors,
                            section?.state_name,
                            field?.state_name
                          )}
                        />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>

              {form?.uses_captcha && <RenderCaptcha setToken={setToken} />}
              <div className="flex flex-col mt-[18px]">
                <div className="mt-[18px] flex gap-3">
                  {uploading || submitLoading ? (
                    <button
                      type="button"
                      className="text-[#FFFFFF] px-[30px] text-[15px] flex justify-center items-center min-w-[95px] min-h-[40px] font-[600] bg-[#691A31] opacity-[.5]"
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
                      className="text-[#FFFFFF] px-[30px] text-[15px] flex justify-center items-center min-w-[95px] min-h-[40px] font-[600] bg-[#691A31]"
                    >
                      Submit
                    </button>
                  )}

                  <button
                    onClick={() => {
                      NewsLetterFormStore.setState({
                        isModalShow: false,
                      });
                      document.body.style.overflow = "unset";
                    }}
                    className={` text-gray-600 text-[15px] flex justify-center items-center w-[95px] h-[40px] font-[600] border border-[#691A31]`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </Fragment>
        );
      })}
    </div>
  );
}
