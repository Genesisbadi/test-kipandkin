import tenantScripts from "@/lib/preBuildScripts/static/tenantScripts.json";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function TenantScripts() {
  const [scripts, setScripts] = useState([]);

  const tags = tenantScripts;

  useEffect(() => {
    const extractScripts = (htmlString) => {
      const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gm;
      let match;
      while ((match = scriptRegex.exec(htmlString)) !== null) {
        const scriptTag = match[0];
        const scriptAttrs = match[1];
        const scriptContent = match[2];

        const srcMatch = scriptAttrs.match(/src=["']([^"']+)["']/);
        const scriptSrc = srcMatch ? srcMatch[1] : null;
        setScripts((prevScripts) => {
          return [...prevScripts, { src: scriptSrc, content: scriptContent }];
        });
      }
    };

    tags.map((item) => {
      extractScripts(item?.code);
    });
  }, [tags]);

  const uniqueArray = scripts.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      scripts.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  return (
    <>
      <Head>
        <>
          {uniqueArray.map((script, index) => (
            <script
              async
              className="third-party"
              key={index}
              src={script.src || ""}
              dangerouslySetInnerHTML={{ __html: script.content }}
            ></script>
          ))}
        </>
      </Head>
    </>
  );
}
