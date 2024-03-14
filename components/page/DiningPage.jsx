import Header from "@/layout/partials/Header";
import React from "react";
import DiningDetails from "../partials/ArticleCards/DiningDetails";

export default function DestinationPage({ block, page }) {
  return (
    <>
      <DiningDetails block={page} page={page} />
    </>
  );
}
