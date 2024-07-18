const normalizeSrc = (src) => (src[0] === "/" ? src.slice(1) : src);

export default function cloudinaryLoader({ src, width, quality }) {
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  const normalizedSrc = normalizeSrc(src);
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/fetch/${params.join(",")}/${encodeURIComponent(normalizedSrc)}`;
}
