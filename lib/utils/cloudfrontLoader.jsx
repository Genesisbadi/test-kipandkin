export default function cloudfrontLoader({ src, width, quality }) {
  // Ensure src is a relative path by stripping any base URL if present
  const relativeSrc = src?.replace(/^https?:\/\/[^\/]+\/?/, "");

  const url = new URL(
    `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${relativeSrc}`
  );
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}

function getCloudfrontUrl(src, width, quality) {
  // Ensure src is a relative path by stripping any base URL if present
  const relativeSrc = src.replace(/^https?:\/\/[^\/]+\/?/, "");

  const url = new URL(
    `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${relativeSrc}`
  );
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}
