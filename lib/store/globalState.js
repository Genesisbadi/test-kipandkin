import { create } from "zustand";
export default create(() => ({
  showLazy: false,
  formSuccessInfo: null,
  submitLoading: false,
  uploading: false,
  captcha: {},
  ready: false,
}));
