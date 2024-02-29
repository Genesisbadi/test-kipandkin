import TestComponent1 from "@/components/blocks/TestComponent1";
import TestComponent2 from "@/components/blocks/TestComponent2";
import Contact from "@/components/blocks/Contact";
import TaxonomyCollection from "@/components/blocks/TaxonomyCollection";
import Slider from "@/components/blocks/Slider";
import Destination from "@/components/blocks/Destination";
import Introduction from "@/components/blocks/Introduction";
import OurCollection from "@/components/blocks/OurCollection";
import dynamic from "next/dynamic";
export const components = {
  PageBanner: dynamic(() =>
    import("../../components/blocks/PageBanner").then(
      (module) => module.default
    )
  ),
  Slider,
  Destination,
  Introduction: dynamic(() =>
    import("../../components/blocks/Introduction").then(
      (module) => module.default
    )
  ),
  OurCollection: dynamic(() =>
    import("../../components/blocks/OurCollection").then(
      (module) => module.default
    )
  ),
  // TestComponent1,
  // TestComponent2,
  // Contact,
  // TaxonomyCollection,
};
