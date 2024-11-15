import newsletterFormData from "@/lib/preBuildScripts/static/newsletter-footer-form.json";
import NewsletterPopupForm from "../forms/NewsletterPopupForm";

import NewsLetterFormStore from "@/lib/store/NewsLetterFormStore";
export default function NewsletterPopup() {
  const { isModalShow } = NewsLetterFormStore((state) => ({
    isModalShow: state.isModalShow,
  }));
  if (isModalShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return (
    <>
      {isModalShow && (
        <div className="fixed p-[15px] md:p-[30px] top-0 left-0 w-full h-screen flex items-center justify-center z-[101]">
          <span
            className="fixed top-0 left-0 h-screen w-full bg-black opacity-[.3] z-[101]"
            onClick={() => {
              NewsLetterFormStore.setState({
                isModalShow: false,
              });

              document.body.style.overflow = "unset";
            }}
          ></span>
          <NewsletterPopupForm form={newsletterFormData} className="z-[110]" />
        </div>
      )}
    </>
  );
}
