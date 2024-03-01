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
export default function DynamicPage({ page, blocks }) {
  switch (page?.content?.id) {
    case "destinations":
      return <DestinationPage page={page} />;
    default:
      return <ParentBlock page={page} blocks={blocks} />;
  }
}

// export default function DynamicPage({ page, blocks }) {
//   return "Test";
// }
