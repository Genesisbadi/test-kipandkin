import Head from "next/head";

export default function AppMeta({ tenantDetails }) {
  const getDomainUrl = () =>
    typeof window !== "undefined" ? window.location.origin : "";

  const iconPath = (prefix, size) =>
    `${getDomainUrl()}/icons/${prefix}-${size}.png`;

  const micrositeId = process.env.NEXT_PUBLIC_MICROSITE_ID;

  const micrositeConfig = {
    1: {
      applicationName: "Discovery Hospitality",
      iconPrefix: "dh",
      themeColor: "#68192F",
    },
    2: {
      applicationName: "discovery_suites",
      iconPrefix: "ds",
      themeColor: "#8FA6AD",
    },
  };
  const { iconPrefix, themeColor } = micrositeConfig[micrositeId] || {};

  const AppleTouchIcon = iconPrefix ? iconPath(iconPrefix, 512) : "";
  const Icon192 = iconPrefix ? iconPath(iconPrefix, 192) : "";
  const Icon256 = iconPrefix ? iconPath(iconPrefix, 256) : "";
  const Icon384 = iconPrefix ? iconPath(iconPrefix, 384) : "";

  return (
    <Head>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content={themeColor} />
      <meta
        name="apple-mobile-web-app-title"
        content={
          micrositeConfig?.[process.env.NEXT_PUBLIC_MICROSITE_ID]
            ?.applicationName
        }
      />
      <link rel="apple-touch-icon" href={AppleTouchIcon} />
      <link rel="apple-touch-icon" sizes="512x512" href={AppleTouchIcon} />
      <link rel="apple-touch-icon" sizes="384x384" href={Icon384} />
      <link rel="apple-touch-icon" sizes="256x256" href={Icon256} />

      <link rel="apple-touch-icon" sizes="192x192" href={Icon192} />
      <link rel="icon" type="image/png" href={AppleTouchIcon} />
      <link rel="icon" type="image/png" sizes="512x512" href={AppleTouchIcon} />
      <link rel="icon" type="image/png" sizes="384x384" href={Icon384} />
      <link rel="icon" type="image/png" sizes="256x256" href={Icon256} />
      <link rel="icon" type="image/png" sizes="192x192" href={Icon192} />
      <link rel="shortcut icon" href={AppleTouchIcon} />
      <link rel="mask-icon" href={AppleTouchIcon} color={themeColor} />
      <meta name="msapplication-TileImage" content={AppleTouchIcon} />
    </Head>
  );
}
