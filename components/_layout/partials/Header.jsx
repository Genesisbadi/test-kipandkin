import Head from "next/head";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";
import tenantMetatags from "@/lib/preBuildScripts/static/tenantMetatags.json";
import { useEffect, useState } from "react";
import excludedDomains from "@/lib/excludeDomains/excludeDomains";

import getCloudfrontUrl from "@/lib/utils/cloudfrontLoader";
import AppMeta from "./AppMeta";

export default function Header({ meta, page }) {
  const [currentUrl, setCurrentUrl] = useState();
  const findMeta = (type) => {
    switch (type) {
      case "title":
        return meta?.title || page?.title || tenantMetatags?.title;
      case "favicon":
        return tenantDetailsMain?.favicon || "/favicon.ico";
      case "description":
        return meta?.description || tenantMetatags?.description;
      case "image":
        return meta?.image || tenantMetatags?.image;
      case "author":
        return tenantDetailsMain?.site_name;
      case "keywords":
        return meta?.keywords || tenantMetatags?.keywords;
      case "url":
        return currentUrl;
      case "page_type":
        return page?.type;
    }
  };

  const metaImg = getCloudfrontUrl({
    src: findMeta("image"),
    width: 1200,
    height: 630,
    quality: 75,
  });

  const favicon = getCloudfrontUrl({
    src: findMeta("favicon"),
    width: 1200,
    height: 630,
    quality: 75,
  });

  const imageType = () => {
    const image = meta?.image || tenantMetatags?.image;
    const arr = image ? image?.split(".") : null;
    return arr ? arr[arr.length - 1] : "webp";
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <Head>
        {currentUrl &&
          excludedDomains.some((domain) => currentUrl.includes(domain)) && (
            <meta name="robots" content="noindex" />
          )}

        {currentUrl && (
          <>
            <link rel="canonical" href={window.location.href} />
            <link
              rel="alternate"
              hreflang="en-ph"
              href={window.location.href}
            />
          </>
        )}

        <link rel="icon" href={favicon} />

        {/* META TITLE */}
        <title>{findMeta("title")}</title>
        <meta name="og:title" content={findMeta("title")} />
        <meta name="twitter:title" content={findMeta("title")} />

        {/* META KEYWORDS */}
        <meta name="keywords" content={findMeta("keywords")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {currentUrl && (
          <meta property="og:url" content={window.location.href} />
        )}

        {/* META AUTHOR */}
        <meta name="author" content={findMeta("author")} />
        <meta
          name="site_name"
          property="og:site_name"
          content={findMeta("author")}
        />
        <meta name="twitter:site" content={findMeta("author")} />
        <meta name="twitter:creator" content={findMeta("author")} />

        {/* META DESCRIPTION */}
        <meta
          name="description"
          property="og:description"
          content={findMeta("description")}
        />
        <meta name="description" content={findMeta("description")} />
        <meta name="twitter:description" content={findMeta("description")} />

        {/* META IMAGE */}
        <meta
          name="secure_url"
          property="og:image:secure_url"
          content={metaImg}
        />
        <meta name="twitter:image" content={metaImg} />
        <meta name="image" property="og:image" content={metaImg} />
        <meta name="og:image" property="og:image" content={metaImg} />

        {/* META TYPES */}
        <meta name="type" property="og:image:type" content={imageType()} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:type" content={findMeta("page_type")} />

        {/* META DOMAIN */}
        <meta name="twitter:domain" content={findMeta("url")} />

        {/* APP META */}
      </Head>
      <AppMeta tenantDetails={tenantDetailsMain} />
    </>
  );
}
