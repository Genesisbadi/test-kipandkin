import offersCategoryTaxonomies from "@/lib/preBuildScripts/static/offers-category.json";
export default function filteredOffersCategory() {
  const filteredOffersCategory =
    offersCategoryTaxonomies?.taxonomyTerms?.filter((term) => {
      const t = term?.data?.main?.site?.some(
        (site) =>
          parseInt(site?.attributes?.data?.main?.value) ===
          parseInt(process.env.NEXT_PUBLIC_MICROSITE_ID)
      );

      if (t) {
        return term;
      }
    });

  return filteredOffersCategory;
}
