import { create } from "zustand";
export default create(() => ({
  showLazy: process.env.NODE_ENV === "development" ? true : false,
  formSuccessInfo: null,
  submitLoading: false,
  uploading: false,
  captcha: {},
  ready: false,
}));
