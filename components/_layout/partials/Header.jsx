import Head from "next/head";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";

export default function Header({ meta, page }) {
  const defaultMeta = "Discover the best of the Philippines.";
  const defaultAuthor = "Discovery Hospitality Corporation";
  const findMeta = (type) => {
    switch (type) {
      case "title":
        return (
          meta?.title ||
          page?.title ||
          defaultMeta?.title ||
          process.env.NEXT_PUBLIC_APP_NAME
        );
      case "favicon":
        return tenantDetailsMain?.favicon || "/favicon.ico";
      case "description":
        return meta?.description || defaultMeta;
      case "image":
        return meta?.image;
      case "author":
        return meta?.author || defaultAuthor;
      case "keywords":
        return (
          meta?.keywords || "" + "discover, philippines, hotel, resort, travel"
        );
      case "url":
        return process.env.NEXT_PUBLIC_SITE_URL;
    }
  };

  const imageType = () => {
    const image = meta?.image || defaultMeta?.image || "/website.png";
    const arr = image.split(".");
    return arr[arr.length - 1];
  };

  return (
    <Head>
      <link rel="icon" href={findMeta("favicon")} />
      <title>{findMeta("title")}</title>
      <meta name="description" content={findMeta("description")} />
      <meta name="author" content={findMeta("author")} />
      <meta name="keywords" content={findMeta("keywords")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="url" property="og:url" content={findMeta("url")} />
      <meta
        name="site_name"
        property="og:site_name"
        content={findMeta("title")}
      />
      <meta
        name="description"
        property="og:description"
        content={findMeta("description")}
      />
      <meta
        name="secure_url"
        property="og:image:secure_url"
        content={findMeta("image")}
      />
      <meta name="image" property="og:image" content={findMeta("image")} />
      <meta name="type" property="og:image:type" content={imageType()} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={findMeta("title")} />
      <meta name="twitter:creator" content={findMeta("author")} />
      <meta name="twitter:title" content={findMeta("title")} />
      <meta name="twitter:description" content={findMeta("description")} />
      <meta name="twitter:image" content={findMeta("image")} />
      <meta name="twitter:domain" content={findMeta("url")} />
    </Head>
  );
}
