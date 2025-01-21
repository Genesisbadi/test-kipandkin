import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import StickyShareButtons to avoid server-side rendering issues
const StickyShareButtons = dynamic(
  () => import("sharethis-reactjs").then((mod) => mod.StickyShareButtons),
  { ssr: false }
);

export default function ShareThis({ page }) {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Function to update the current URL when the route changes
    const updateUrl = (url) => {
      setCurrentUrl(`${window.location.origin}${url}`);
    };

    // Set the initial URL
    setCurrentUrl(window.location.href);

    // Listen for route changes
    router.events.on("routeChangeComplete", updateUrl);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", updateUrl);
    };
  }, [router.events]);

  return (
    <>
      {currentUrl && (
        <StickyShareButtons
          key={currentUrl} // Force remount by changing the key on URL change
          className="!z-[100]"
          config={{
            alignment: "left",
            color: "social",
            enabled: true,
            font_size: 16,
            hide_desktop: false,
            labels: "counts",
            language: "en",
            min_count: 0,
            networks: ["linkedin", "facebook", "twitter", "email"],
            padding: 12,
            radius: 4,
            show_total: true,
            show_mobile: true,
            show_toggle: true,
            size: 48,
            top: 160,
            url: currentUrl, // Use the updated current URL
            title: page?.title,
            subject: `${page?.description}`,
          }}
        />
      )}
    </>
  );
}
