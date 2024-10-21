import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EmbedCode({ block }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== "/tripadvisor-reviews") {
        localStorage.removeItem("hasReloaded");
      }
    };
    if (router.asPath === "/tripadvisor-reviews") {
      if (!localStorage.getItem("hasReloaded")) {
        localStorage.setItem("hasReloaded", "true");
        window.location.reload();
      }
    }

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.asPath, router.events]);

  if (block?.main?.embed_code) {
    return (
      <div className="py-[50px] px-[30px] bg-[#F1F1F1]">
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: block.main.embed_code }}
        />
      </div>
    );
  }
  return;
}
