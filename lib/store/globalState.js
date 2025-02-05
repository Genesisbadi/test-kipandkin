import { create } from "zustand";
export default create(() => ({
  showLazy:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? true : false,
  formSuccessInfo: null,
  submitLoading: false,
  uploading: false,
  captcha: {},
  ready: false,
}));
