export default function Slider({ block, mediaHandler }) {
  const { slider_items } = block.main;
  console.log(mediaHandler);
  return (
    <div className="slider">
      {slider_items.map((item, index) => (
        <div key={index}>
          {/* {console.log(
            mediaHandler?.["main.slider_items.0.image"]?.[0]?.conversions
          )} */}
          {/* main.slider_items.0.image.0.original */}
          {console.log(item.image[0])}
          {/* <img src={mediaHandler(item?.media?.id, "slider")} /> */}
        </div>
      ))}
    </div>
  );
}
