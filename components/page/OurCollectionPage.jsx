import Header from "@/layout/partials/Header";
import React from "react";
import OurCollectionDetails from "../partials/ArticleCards/OurCollectionDetails";

export default function OurCollectionPage({ block, page }) {
  return (
    <>
      <OurCollectionDetails block={page} page={page} />
    </>
  );
}
