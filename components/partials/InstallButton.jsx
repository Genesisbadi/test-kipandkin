import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import nookies from "nookies";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const hidePrompt = cookies.hide_pwa_prompt;

    if (hidePrompt || isClosed) {
      return; // Don't show the prompt if the cookie is set or if it's closed
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setIsVisible(true);
    };

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
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log("choiceResult.outcome", choiceResult.outcome);
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Clear the deferred prompt
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleCancelClick = () => {
    // Set a cookie to hide the prompt for 1 day
    nookies.set(null, "hide_pwa_prompt", "1", { maxAge: 86400, path: "/" });
    // Hide the prompt
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="fixed text-[14px] rounded-sm overflow-hidden pt-[40px] pb-[30px] pl-[30px] pr-[48px] right-[15px] z-[2000] max-w-[550px] bottom-[30px] bg-[#fff] bg-opacity-95 shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[30px] h-[30px] text-white bg-primary rounded-full p-1 absolute top-3 right-2 cursor-pointer"
            onClick={() => setIsClosed(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <p>
            Would you like to install Discovery Hospitality to your home screen?
          </p>
          <div className="flex gap-[15px] items-center justify-end font-bold">
            <button
              className="min-w-[100px] hover:opacity-70 py-[8px] px-[13px] min-h-[50px] flex items-center justify-center text-gray border border-[2px] border-gray rounded-md uppercase"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="min-w-[100px] hover:opacity-70 py-[8px] px-[13px] min-h-[50px] flex items-center justify-center bg-primary text-white rounded-md uppercase"
              onClick={handleInstallClick}
            >
              Install App
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;
