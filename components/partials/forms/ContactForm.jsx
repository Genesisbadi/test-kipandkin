import FormField from "@/components/forms/FormField";
import { Fragment, useState } from "react";
import { formSubmit, isError, RenderCaptcha } from "@/lib/services/formService";
import formStore from "@/lib/store/formStore";
import globalState from "@/lib/store/globalState";
export default function ContactForm({ form }) {
  const formData = formStore((state) => state);
  const captcha = globalState((state) => state.captcha);
  const sections = form?.fields?.blueprint?.schema?.sections || [];
  const [errors, setErrors] = useState([]);
  const findClass = (field) => {
    switch (field) {
      case "message":
        return "!min-h-[150px]";
      default:
        return "";
    }
  };
  const findWrapperClass = (field) => {
    switch (field) {
      case "message":
      // case "name":
      //   return "col-span-2";
      // case "radio_list":
      //   return "flex flex-col";
      default:
        return "";
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
              <div className="flex flex-col">
                {fields.map((field) => (
                  <Fragment key={field?.state_name}>
                    <FormField
                      {...field}
                      className={`border-[1px] border-[#ddd] w-full px-[10px] py-[5px] min-h-[45px] ${findClass(
                        field?.state_name
                      )}`}
                      wrapperclassname={`${findWrapperClass(
                        field?.state_name
                      )} mb-[15px]`}
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
                <>
                  <RenderCaptcha setToken={setToken} />
                  {errors?.captcha_token && (
                    <div className="text-[12px] mt-[2px] text-red-600">
                      {errors?.captcha_token}
                    </div>
                  )}
                </>
              )}
              <div className="mt-[18px]">
                {formData.uploading || formData.submitLoading ? (
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
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary py-[10px] text-[#FFFFFF] text-[15px] flex justify-center items-center min-w-[95px] px-[15px] uppercase"
                  >
                    Send
                  </button>
                )}
              </div>
            </form>
          </Fragment>
        );
      })}
    </>
  );
}
