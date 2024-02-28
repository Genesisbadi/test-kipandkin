import TestComponent1 from "@/components/blocks/TestComponent1";
import TestComponent2 from "@/components/blocks/TestComponent2";
import Contact from "@/components/blocks/Contact";
import TaxonomyCollection from "@/components/blocks/TaxonomyCollection";
import Slider from "@/components/blocks/Slider";
import dynamic from "next/dynamic";
export const components = {
  PageBanner: dynamic(() =>
    import("../../components/blocks/PageBanner").then(
      (module) => module.default
    )
  ),
  Slider,
  // TestComponent1,
  // TestComponent2,
  // Contact,
  // TaxonomyCollection,
};
