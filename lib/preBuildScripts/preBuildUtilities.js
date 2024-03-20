const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const { Jsona } = require("jsona");
const dataFormatter = new Jsona();
module.exports.preBuildDevelopment = async () => {
  dotenv.config();
  // Convert the environment variables to a JSON object
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  // Form Setting
  const formSettingHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/settings/form"
  );
  const formSetting = dataFormatter.deserialize(formSettingHandler.data);

  // Locales
  const localesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/locales"
  );
  const locales = localesHandler.data;

  // Form
  // const formHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/forms/get-in-touch?include=blueprint"
  // );
  // const form = dataFormatter.deserialize(formHandler.data);

  // Global Data

  // TENANT DETAILS PER DOMAIN

  const tenantDetailsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/globals/discovery-hospitality"
  );
  const tenantDetails = dataFormatter.deserialize(tenantDetailsHandler.data);

  // Menu Data
  const menusHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/discovery-hospitality-header-menu?include=nodes.children,parentNodes"
  );
  const menus = dataFormatter.deserialize(menusHandler.data);

  const footerMenuHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/discovery-hospitality-footer-menu?include=nodes.children,parentNodes"
  );
  const footerMenuData = dataFormatter.deserialize(footerMenuHandler.data);

  const reviewsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/reviews/entries" +
      `?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const reviewsData = dataFormatter.deserialize(reviewsHandler.data);

  const destinationEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/contents/destinations/entries"
  );

  const destinationEntriesData = dataFormatter.deserialize(
    destinationEntriesHandler.data
  );

  const excitingDestinationsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/exciting-destinations/entries"
  );

  const excitingDestinationsEntriesData = dataFormatter.deserialize(
    excitingDestinationsHandler.data
  );

  const ourCollectionEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/contents/our-collection/entries"
  );

  const ourCollectionEntriesData = dataFormatter.deserialize(
    ourCollectionEntriesHandler.data
  );

  const discoverBlogHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/blog/entries?page[size]=4&includes=blueprintData,mediaHandler"
  );

  const discoverBlogEntriesData = dataFormatter.deserialize(
    discoverBlogHandler.data
  );


  const diningHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/dining/entries?page[size]=4&includes=blueprintData,mediaHandler"
  ); 

  const diningEntriesData = dataFormatter.deserialize(
    diningHandler.data
  );

  const meetingEventsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/meetings-events-article/entries"
  );

  const meetingsEventsEntriesData = dataFormatter.deserialize(
    meetingEventsHandler.data
  );

  const meetingEventsSuitesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/meetings-events-suites/entries"
  );

  const meetingsEventsSuitesEntriesData = dataFormatter.deserialize(
    meetingEventsHandler.data
  );

  const blogsEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/contents/blog/entries"
  );

  const blogsEntriesData = dataFormatter.deserialize(blogsEntriesHandler.data);

  const roomsSuitesEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/contents/roomssuites/entries"
  );

  const roomsSuitesEntriesData = dataFormatter.deserialize(
    roomsSuitesEntriesHandler.data
  );

  const experiencesEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/contents/experiences/entries"
  );

  const experiencesEntriesData = dataFormatter.deserialize(
    experiencesEntriesHandler.data
  );

  const blogCategoriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/taxonomies/blog-category?include=taxonomyTerms"
  );

  const blogCategoryTaxonomies = dataFormatter.deserialize(
    blogCategoriesHandler.data
  );

  const offersCategoriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/taxonomies/offers-category?include=taxonomyTerms"
  );

  const offersCategoryTaxonomies = dataFormatter.deserialize(
    offersCategoriesHandler.data
  );

  // Generate default Image
  const generateImage = (imageUrl, path) => {
    const file = fs.createWriteStream(path);
    https.get(imageUrl, function (response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Default Image Downloaded");
      });
    });
  };
  [].forEach((e, i) => {
    generateImage(e, `./public/image${i}.webp`);
  });

  fs.writeFileSync(
    "./lib/preBuildScripts/static/footerMenu.json",

    JSON.stringify({ footerMenuData })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/reviews.json",
    JSON.stringify(reviewsData)
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/globalData.json",
    JSON.stringify({
      // formSetting,
      tenantDetails,
      menus,
      locales,
      formSetting,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/destinations.json",
    JSON.stringify({
      destinationEntriesData,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/our-collection.json",
    JSON.stringify({
      ourCollectionEntriesData,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/discover-blog-entries.json",
    JSON.stringify({
      discoverBlogEntriesData,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/blog.json",
    JSON.stringify({ blogsEntriesData })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/blog-categories.json",
    JSON.stringify({ blogCategoryTaxonomies })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/meetings-events-article.json",
    JSON.stringify({
      meetingsEventsEntriesData,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/meetings-events-suites.json",
    JSON.stringify({
      meetingsEventsSuitesEntriesData,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/offers-category.json",
    JSON.stringify({ offersCategoryTaxonomies })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/rooms-suites.json",
    JSON.stringify(roomsSuitesEntriesData)
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/experiences.json",
    JSON.stringify(experiencesEntriesData)
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/exciting-destinations.json",
    JSON.stringify(excitingDestinationsEntriesData)
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/dining.json",
    JSON.stringify(diningEntriesData)
  );

  console.log("New Global Data Generated!");
};
