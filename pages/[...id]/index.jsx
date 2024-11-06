// import ParentBlock from "@/components/page/ParentBlock";
import Header from "@/layout/partials/Header";
import { paths, props } from "@/lib/props/page";
import dynamic from "next/dynamic";

import persistentStore from "@/lib/store/persistentStore";
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

const ParentBlock = dynamic(() =>
  import("../../components/page/ParentBlock").then((module) => module.default)
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

const TestPage = dynamic(() =>
  import("../../components/page/TestPage").then((module) => module.default)
);

const ProtectedRoute = dynamic(() =>
  import("../../components/partials/ProtectedRoute").then(
    (module) => module.default
  )
);

import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";
import { useEffect, useState } from "react";

export default function DynamicPage({ page, blocks }) {
  const pageTitle = page?.metaData?.title || page?.name || "";
  const statePassword = persistentStore((state) => state.password);
  const [loaded, setLoaded] = useState(false);

  const tenantPassword = tenantDetailsMain?.protect_password;

  const titleElement = (
    <h1 hidden className="hidden opacity-0 invisible">
      {page?.metaData?.title || page?.name || ""}
    </h1>
  );
  const descriptionElement = (
    <>
      {page?.metaData?.description && (
        <p hidden className="hidden opacity-0 invisible">
          {page?.metaData?.description || ""}
        </p>
      )}
    </>
  );
  useEffect(() => {
    setLoaded(true);
  });

  let ComponentToRender;

  switch (page?.content?.id) {
    case "test-content-type":
      ComponentToRender = TestPage;
      break;
    case "destinations":
      ComponentToRender = DestinationPage;
      break;
    case "our-collection":
      ComponentToRender = OurCollectionPage;
      break;
    case "meetings-events-article":
      ComponentToRender = MeetingsEventsPage;
      break;
    case "meetings-events-suites":
      ComponentToRender = MeetingsEventsSuitesPage;
      break;
    case "dining":
      ComponentToRender = DiningPage;
      break;
    case "blog":
      ComponentToRender = BlogPage;
      break;
    case "offers":
      ComponentToRender = OfferDetails;
      break;
    case "roomssuites":
      ComponentToRender = RoomSuitePage;
      break;
    case "frequently-asked-questions":
      ComponentToRender = FaqsPage;
      break;
    case "experiences":
      ComponentToRender = ExperiencePage;
      break;
    default:
      ComponentToRender = ParentBlock;
      break;
  }

  if (
    loaded &&
    page?.visibility == "authenticated" &&
    statePassword != tenantPassword
  ) {
    return <ProtectedRoute tenantPassword={tenantPassword} />;
  }

  return (
    <>
      {titleElement}
      {descriptionElement}
      <ComponentToRender page={page} blocks={blocks} />
    </>
  );
}
