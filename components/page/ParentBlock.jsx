import Header from "@/components/_layout/partials/Header";
import globalState from "@/lib/store/globalState";
import { components } from "@/lib/services/componentService";
import { useEffect } from "react";
import { useMobileDetector } from "@/lib/services/isMobileDetector";
export default function ParentBlock({ page, blocks = [], initialBlocks = 2 }) {
  const showLazy = globalState((state) => state.showLazy);
  const activeBlocks = blocks?.slice(0, initialBlocks);
  const lazyBlocks = blocks?.slice(initialBlocks);
  const isMobile = useMobileDetector();

  const hasTitleBlock = blocks?.find((object) => object.key === "Title");

  const hasPromoBlock = blocks?.find((object) => object.key === "PromoBlock");

  const hasSlider = blocks?.find((object) => object.key === "Slider");

  const hasTripAdvisorWidget = blocks?.find(
    (object) => object.key === "TripAdvisorWidget"
  );

  if (!isMobile && hasSlider) {
    initialBlocks = 2;
  } else if (isMobile && hasSlider) {
    initialBlocks = 1;
  }
  if (hasPromoBlock) {
    initialBlocks = 4;
  }

  if (hasTitleBlock) {
    initialBlocks = 3;
  }

  if (hasTripAdvisorWidget) {
    initialBlocks = 4;
  }
  // useEffect(() => {
  //   if (blocks?.length <= initialBlocks) {
  //     globalState.setState({ showLazy: true });
  //   }
  // }, [blocks, initialBlocks]);
  return (
    <>
      {activeBlocks?.map((block) => {
        const Component = components[block?.key];
        return (
          <Component
            key={block?.key + block?.order?.toString()}
            blockId={block?.key + block?.order?.toString()}
            block={block?.data}
            page={page}
            index={block?.order}
            mediaHandler={block?.mediaHandler}
          />
        );
      })}

      {showLazy && (
        <>
          {lazyBlocks?.map((block) => {
            const Component = components[block?.key];
            return (
              <Component
                key={block?.key + block?.order?.toString()}
                blockId={block?.key + block?.order?.toString()}
                block={block?.data}
                page={page}
                index={block?.order}
                mediaHandler={block?.mediaHandler}
              />
            );
          })}
        </>
      )}
    </>
  );
}
