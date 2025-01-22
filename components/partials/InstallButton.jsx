import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import nookies from "nookies";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const hidePrompt = cookies.hide_pwa_prompt;

    if (hidePrompt || isClosed) {
      return; // Don't show the prompt if the cookie is set or if it's closed
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleServiceWorkerUpdate = (registration) => {
      if (registration.waiting) {
        setIsUpdateAvailable(true);
      }
    };

    // Register service worker and listen for updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          handleServiceWorkerUpdate(registration);
        });
      });
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [isClosed]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleCancelClick = () => {
    nookies.set(null, "hide_pwa_prompt", "1", { maxAge: 86400, path: "/" });
    setIsVisible(false);
  };

  const handleUpdateClick = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
          registration.waiting.addEventListener("statechange", (event) => {
            if (event.target.state === "activated") {
              window.location.reload();
            }
          });
        }
      });
    }
  };

  if (!isVisible && !isUpdateAvailable) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="fixed z-[3000] flex justify-center left-0 sm:left-auto bottom-0 right-0 p-[15px]">
          <div className="relative text-[14px] w-full rounded-sm overflow-hidden p-[45px_15px_15px] sm:pt-[40px] sm:pb-[30px] sm:pl-[30px] sm:pr-[48px] z-[2000] max-w-[550px] bg-[#fff] bg-opacity-95 shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[30px] h-[30px] text-white bg-primary rounded-full p-1 absolute top-3 right-2 cursor-pointer"
              onClick={() => setIsVisible(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <p className="text-[12px] sm:text-[16px]">
              Would you like to install {tenantDetailsMain?.app_name} to your
              home screen?
            </p>
            <div className="flex flex-col-reverse sm:flex-row flex-wrap text-[10px] sm:text-[14px] gap-[5px] sm:gap-[15px] items-center justify-end font-bold">
              <button
                className="sm:min-w-[100px] hover:opacity-70 py-[8px] w-full sm:w-auto px-[13px] min-h-[20px] sm:min-h-[50px] flex items-center justify-center text-gray border border-[2px] border-gray rounded-md uppercase"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="sm:min-w-[100px] hover:opacity-70 py-[8px] w-full sm:w-auto px-[13px] min-h-[20px] sm:min-h-[50px] flex items-center justify-center bg-primary text-white rounded-md uppercase"
                onClick={handleInstallClick}
              >
                Install App
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateAvailable && (
        <div className="fixed z-[3000] flex justify-center left-0 sm:left-auto bottom-0 right-0 p-[15px]">
          <div className="relative text-[14px] w-full rounded-sm overflow-hidden p-[45px_15px_15px] sm:pt-[40px] sm:pb-[30px] sm:pl-[30px] sm:pr-[48px] z-[2000] max-w-[550px] bg-[#fff] bg-opacity-95 shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]">
            <p className="text-[12px] sm:text-[16px]">
              A new version of {tenantDetailsMain?.app_name} is available. Would
              you like to update?
            </p>
            <div className="flex flex-col-reverse sm:flex-row flex-wrap text-[10px] sm:text-[14px] gap-[5px] sm:gap-[15px] items-center justify-end font-bold">
              <button
                className="sm:min-w-[100px] hover:opacity-70 py-[8px] w-full sm:w-auto px-[13px] min-h-[20px] sm:min-h-[50px] flex items-center justify-center bg-primary text-white rounded-md uppercase"
                onClick={handleUpdateClick}
              >
                Update App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;
