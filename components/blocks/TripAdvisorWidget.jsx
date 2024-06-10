import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function TripAdvisorWidget({ block }) {
  const scriptUrl =
    "https://www.jscache.com/wejs?wtype=selfserveprop&uniq=546&locationId=" +
    block?.main.location_id +
    "&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2";

  return (
    <section className="bg-[#F1F1F1] py-[30px]">
      <div className="container">
        {scriptUrl && (
          <div id="TA_selfserveprop546" className="TA_selfserveprop">
            <ul id="VvhCFP8xz" className="TA_links JZ5CKDSmc"></ul>
          </div>
        )}
      </div>

      <Script src={scriptUrl} />
    </section>
  );
}
