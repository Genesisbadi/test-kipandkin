import Header from "@/layout/partials/Header";
import React from "react";
import MeetingsEvensDetails from "../partials/ArticleCards/MeetingsEvensDetails";

export default function MeetingsEventsPage({ block, page }) {
  return (
    <>
      <MeetingsEvensDetails block={page} page={page} />
    </>
  );
}
