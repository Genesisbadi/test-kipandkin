import Script from "next/script";

export default function CookieBot() {
  const removeElem = document.querySelector(".CookieDeclaration");
  setTimeout(() => {
    if (removeElem) {
      removeElem.remove();
    }
  }, 1000);
  return (
    <>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="7054889a-af36-421c-a37f-2093f8f0e978"
        data-blockingmode="auto"
        type="text/javascript"
      />
      <Script
        id="CookieDeclaration"
        src="https://consent.cookiebot.com/7054889a-af36-421c-a37f-2093f8f0e978/cd.js"
        type="text/javascript"
      />
    </>
  );
}
