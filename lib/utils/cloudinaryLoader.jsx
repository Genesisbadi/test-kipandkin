const normalizeSrc = (src) => {
  if (!src) return "";
  return src[0] === "/" ? src.slice(1) : src;
};
export default function cloudinaryLoader({
  src,
  width,
  height,
  quality = "auto",
  crop = "fill",
}) {
  const params = [
    "f_auto",
    width ? `w_${width}` : "", // Include width if provided
    height ? `h_${height}` : "", // Include height if provided
    `q_${quality}`,
    crop ? `c_${crop}` : "", // Include crop if provided
  ].filter(Boolean); // Remove empty strings

  const normalizedSrc = normalizeSrc(src);
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/fetch/${params.join(",")}/${encodeURIComponent(normalizedSrc)}`;
}

function customGetCldImageUrl({
  src,
  width,
  height,
  quality = "auto",
  crop = "fill",
}) {
  const params = [
    "f_auto",
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    `q_${quality}`,
    crop ? `c_${crop}` : "",
  ].filter(Boolean); // Filter out empty parameters

  const normalizedSrc = normalizeSrc(src);
  const cloudinaryUrl = `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/fetch/${params.join(",")}/${encodeURIComponent(normalizedSrc)}`;

  return cloudinaryUrl;
}
