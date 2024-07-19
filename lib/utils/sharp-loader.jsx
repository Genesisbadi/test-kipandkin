import sharp from "sharp/lib/sharp";

const sharpLoader = async ({ src, width, quality }) => {
  const format = "webp"; // You can change this to other formats like 'jpeg', 'png', etc.

  // Fetch the image from the source
  const imageBuffer = await fetch(src).then((res) => res.buffer());

  // Process the image with Sharp
  const processedImage = await sharp(imageBuffer)
    .resize(width)
    .toFormat(format, { quality })
    .toBuffer();

  return {
    src: `data:image/${format};base64,${processedImage.toString("base64")}`,
    width,
    height: await sharp(processedImage)
      .metadata()
      .then((meta) => meta.height),
  };
};

export default sharpLoader;
