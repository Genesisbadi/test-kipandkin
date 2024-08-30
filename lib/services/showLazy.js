import { useEffect, useState } from "react";
import globalState from "../store/globalState";
const ShowLazy = () => {
  useEffect(() => {
    const handleInteraction = () => {
      globalState.setState({
        showLazy: true,
      });
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("scroll", handleInteraction, {
        passive: true,
        once: true,
      });
      document.removeEventListener("click", handleInteraction, {
        passive: true,
        once: true,
      });
      document.removeEventListener("mousemove", handleInteraction, {
        passive: true,
        once: true,
      });
      document.removeEventListener("touchstart", handleInteraction, {
        passive: true,
        once: true,
      });

      clearTimeout();
    };

    document.addEventListener("scroll", handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener("click", handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
      once: true,
    });

    setTimeout(() => {
      handleInteraction();
    }, 7000);

    return removeInteractionListeners;
  });

  // return showLazy;
};

export default ShowLazy;
