// import tenantScripts from "@/lib/preBuildScripts/static/tenantScripts.json";
import globalState from "@/lib/store/globalState";
import { useCallback, useEffect, useState } from "react";

export default function TenantScripts() {
  const [scripts, setScripts] = useState([]);
  const showLazy = globalState((state) => state.showLazy);
  const [tags, setTags] = useState([]);

  const loadScriptData = useCallback(async () => {
    if (showLazy) {
      const scripts = (
        await import("@/lib/preBuildScripts/static/tenantScripts.json")
      ).default;
      setTags(scripts);
    }
  });

  useEffect(() => {
    const extractScripts = (htmlString) => {
      const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gm;
      let match;
      while ((match = scriptRegex.exec(htmlString)) !== null) {
        const scriptAttrs = match[1];
        const scriptContent = match[2];

        const srcMatch = scriptAttrs.match(/src=["']([^"']+)["']/);
        const scriptSrc = srcMatch ? srcMatch[1] : null;

        setScripts((prevScripts) => [
          ...prevScripts,
          { src: scriptSrc, content: scriptContent },
        ]);
      }
    };

    tags?.forEach((item) => {
      extractScripts(item?.code);
    });
  }, [tags]);

  useEffect(() => {
    const containsDev =
      window.location.origin.includes("pages.dev") ||
      window.location.origin.includes("localhost");

    loadScriptData();
    if (showLazy && !containsDev) {
      const existingScripts = Array.from(document.scripts).map((script) => ({
        src: script.src,
        content: script.innerText,
      }));

      const uniqueArray = scripts.filter((script) => {
        if (script.src) {
          return !existingScripts.some(
            (existingScript) => existingScript.src === script.src
          );
        } else {
          return !existingScripts.some(
            (existingScript) => existingScript.content === script.content
          );
        }
      });

      uniqueArray.forEach((script) => {
        const inlineScript = document.createElement("script");
        inlineScript.classList.add("third-party");

        if (script.content) {
          inlineScript.text = script.content;
          document.head.appendChild(inlineScript);
        } else if (script.src) {
          inlineScript.src = script.src;
          document.head.appendChild(inlineScript);
        }
      });
    }
  }, [scripts, loadScriptData]);

  return null;
}
