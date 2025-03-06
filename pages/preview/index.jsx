import Jsona from "jsona";
const dataFormatter = new Jsona();
import PAGEAPI from "@/lib/api/pages/request";
import CONTENTAPI from "@/lib/api/content/request";
import { sortBlocks } from "@/lib/services/globalService";
import { iterateBlock, iteratePage } from "@/lib/services/propService";
import { useRouter } from "next/router";
import { useState } from "react";
import ParentBlock from "@/components/page/ParentBlock";
import NotFound from "@/components/page/NotFound";
import dynamic from "next/dynamic";

const DestinationPage = dynamic(() =>
  import("../../components/page/DestinationPage").then(
    (module) => module.default
  )
);

const OurCollectionPage = dynamic(() =>
  import("../../components/page/OurCollectionPage").then(
    (module) => module.default
  )
);

const MeetingsEventsPage = dynamic(() =>
  import("../../components/page/MeetingsEventsPage").then(
    (module) => module.default
  )
);

const MeetingsEventsSuitesPage = dynamic(() =>
  import("../../components/page/MeetingsEventsSuitesPage").then(
    (module) => module.default
  )
);

const BlogPage = dynamic(() =>
  import("../../components/page/BlogPage").then((module) => module.default)
);

const OfferDetails = dynamic(() =>
  import("../../components/page/OfferDetails").then((module) => module.default)
);
const DiningPage = dynamic(() =>
  import("../../components/page/DiningPage").then((module) => module.default)
);
const FaqsPage = dynamic(() =>
  import("../../components/page/FaqsPage").then((module) => module.default)
);

const RoomSuitePage = dynamic(() =>
  import("../../components/page/RoomSuitePage").then((module) => module.default)
);

const ExperiencePage = dynamic(() =>
  import("../../components/page/ExperiencePage").then(
    (module) => module.default
  )
);

export default function DynamicPage() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [error, setError] = useState(false);

  const url = router.asPath.split("?")[1] || "";
  let params = [];
  url.split("&").forEach((e) => {
    const z = e.split("=");
    params[z[0]] = z[1];
  });
  const {
    slug = null,
    expires = null,
    signature = null,
    contents = null,
  } = params;

  PAGEAPI.getFindPagesSwr(
    slug,
    `?include=blockContents.block,metaData&expires=${expires}&signature=${signature}`,
    {
      render: slug && expires && signature && !contents,
      expires,
      signature,
      onSuccess: async (res) => {
        const page = dataFormatter.deserialize(res.data);

        const blocksHandler =
          page?.blockContents?.map((e) => {
            return {
              key: e?.block?.component || null,
              order: e?.order || null,
              data: e?.data || null,
              blueprintData: e?.blueprintData || null,
            };
          }) || [];

        const blocks = sortBlocks(blocksHandler);

        setBlocks(await iterateBlock(blocks));
        setPage(await iteratePage(page));
      },
      onError: () => {
        setError(true);
      },
    }
  );

  CONTENTAPI.getContentsSwr(
    `/${contents}/entries/${slug}?include=metaData,content`,
    {
      render: slug && expires && signature && contents,
      expires,
      signature,
      onSuccess: async (res) => {
        const page = dataFormatter.deserialize(res.data);

        setPage(await iteratePage(page));
      },
      onError: () => {
        setError(true);
      },
    }
  );

  const Renderer = ({ page, blocks }) => {
    switch (page?.content?.id) {
      case "destinations":
        return (
          <DestinationPage page={page} mediaHandler={page?.mediaHandler} />
        );
        break;
      case "our-collection":
        return (
          <OurCollectionPage page={page} mediaHandler={page?.mediaHandler} />
        );
        break;
      case "meetings-events-article":
        return (
          <MeetingsEventsPage page={page} mediaHandler={page?.mediaHandler} />
        );
        break;
      case "meetings-events-suites":
        return (
          <MeetingsEventsSuitesPage
            page={page}
            mediaHandler={page?.mediaHandler}
          />
        );
        break;
      case "dining":
        return <DiningPage page={page} mediaHandler={page?.mediaHandler} />;
        break;
      case "blog":
        return <BlogPage page={page} mediaHandler={page?.mediaHandler} />;
        break;
      case "offers":
        return <OfferDetails page={page} mediaHandler={page?.mediaHandler} />;
        break;
      case "roomssuites":
        return <RoomSuitePage page={page} mediaHandler={page?.mediaHandler} />;
        break;
      case "frequently-asked-questions":
        return <FaqsPage page={page} mediaHandler={page?.mediaHandler} />;
        break;
      case "experiences":
        return <ExperiencePage page={page} mediaHandler={page?.mediaHandler} />;
        break;
      default:
        return <ParentBlock page={page} blocks={blocks} />;
        break;
    }
  };

  return (
    <>
      {page || blocks ? (
        <Renderer
          page={page}
          blocks={blocks}
          mediaHandler={page?.mediaHandler}
        />
      ) : (
        <>
          {error ? (
            <NotFound />
          ) : (
            <div className="w-full text-center py-[150px] md:py-[200px]">
              Loading...
            </div>
          )}
        </>
      )}
    </>
  );
}
