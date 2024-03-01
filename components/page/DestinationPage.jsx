import Header from "@/layout/partials/Header";
import React from "react";
import DestinationDetails from "../partials/ArticleCards/DestinationDetails";

export default function DestinationPage({ block, page }) {
  return (
    <>
      <Header meta={page?.metaData || {}} />
      <DestinationDetails block={page} page={page} />
    </>
  );
}
