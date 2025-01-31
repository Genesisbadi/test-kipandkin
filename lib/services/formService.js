import FORMAPI from "@/lib/api/forms/request";
import formStore from "@/lib/store/formStore";
import CloudFlareRecaptcha from "@/components/partials/CloudFlareRecaptcha";
import GoogleRecaptcha from "@/components/partials/GoogleRecaptcha";
import formSetting from "@/lib/preBuildScripts/static/formSetting.json";
export async function formSubmit({
  e,
  formId,
  setToken,
  token,
  captcha,
  sections,
  setErrors,
  formData = {},
  successCallback = () => {},
  errorCallback = () => {},
}) {
  e.preventDefault();
  formStore.setState({
    formSuccessInfo: false,
    submitLoading: true,
  });
  setErrors([]);
  const payload = {};
  const findValue = (field) => {
    switch (field.type) {
      case "file":
      case "checkbox":
        return formData?.[field.state_name] || "";
      case "select":
        if (field.multiple) return formData?.[field.state_name] || [];
      default:
        return e.target[field.state_name]?.value;
    }
  };

  sections.forEach((section) => {
    let sectionPayload = {};
    let fields = section?.fields || [];
    fields.forEach((field) => {
      sectionPayload[field.state_name] = findValue(field);
    });
    payload[section?.state_name] = sectionPayload;
  });

  payload["captcha_token"] = token;

  await FORMAPI.submitForm(formId, payload, e)
    .then(() => {
      const states = formStore.getState();

      e.target.reset();

      for (let key in states) {
        if (states.hasOwnProperty(key)) {
          switch (key) {
            case "formSuccessInfo":
              formStore.setState({
                formSuccessInfo: {
                  id: formId,
                  success: true,
                  message:
                    "We have received your submission. We will get back to you soon.",
                  title: "Thank you!",
                },
              });
              break;
            case "submitLoading":
              formStore.setState({ [key]: false });
              break;
            default:
              formStore.setState({ [key]: "" });
              break;
          }
        }
      }

      formStore.reset();
      successCallback();
    })
    .catch((err) => {
      setErrors(err?.data?.errors || {});
      errorCallback();
      formStore.setState({
        submitLoading: false,
      });
    });
  captcha?.current?.reset();
  setToken("");
}

export function isError(errors, stateName, field) {
  const index = stateName + "." + field;
  const data = errors?.[index];
  return data?.[0]?.replace(stateName + ".", "") || "";
}

export function RenderCaptcha({ setToken }) {
  if (formSetting?.provider) {
    return formSetting.provider === "google_recaptcha" ? (
      <GoogleRecaptcha setToken={setToken} sitekey={formSetting?.site_key} />
    ) : (
      <CloudFlareRecaptcha
        setToken={setToken}
        sitekey={formSetting?.site_key}
      />
    );
  }
  return;
}
