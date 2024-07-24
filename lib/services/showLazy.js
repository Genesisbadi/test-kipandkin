import { useEffect, useState } from "react";
import globalState from "../store/globalState";
const ShowLazy = () => {
  // const [showLazy, setShowLazy] = useState(false);
  useEffect(() => {
    const handleInteraction = () => {
      // setShowLazy(true);
      globalState.setState({
        showLazy: true,
      });
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("scroll", handleInteraction, {
        passive: true,
      });
      document.removeEventListener("click", handleInteraction, {
        passive: true,
      });
      document.removeEventListener("mousemove", handleInteraction, {
        passive: true,
      });
      document.removeEventListener("touchstart", handleInteraction, {
        passive: true,
      });

      clearTimeout();
    };

    document.addEventListener("scroll", handleInteraction, { passive: true });
    document.addEventListener("click", handleInteraction, { passive: true });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });

    setTimeout(() => {
      handleInteraction();
    }, 7000);

    return removeInteractionListeners;
  });

  // return showLazy;
};

export default ShowLazy;
