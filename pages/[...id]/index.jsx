import ParentBlock from "@/components/page/ParentBlock";
import { paths, props } from "@/lib/props/page";
import dynamic from "next/dynamic";
export const getStaticPaths = paths;
export const getStaticProps = props;

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
const BlogPage = dynamic(() =>
  import("../../components/page/BlogPage").then((module) => module.default)
);

const OfferDetails = dynamic(() =>
  import("../../components/page/OfferDetails").then((module) => module.default)
);

export default function DynamicPage({ page, blocks }) {
  switch (page?.content?.id) {
    case "destinations":
      return <DestinationPage page={page} />;
    case "our-collection":
      return <OurCollectionPage page={page} />;
    case "meetings-events-article":
      return <MeetingsEventsPage page={page} />;
    case "blog":
      return <BlogPage page={page} />;
    case "offers":
      return <OfferDetails page={page} />;
    default:
      return <ParentBlock page={page} blocks={blocks} />;
  }
}
