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
  // const formSettingHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/settings/form"
  // );
  // const formSetting = dataFormatter.deserialize(formSettingHandler.data);

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

    JSON.stringify({ reviewsData })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/globalData.json",
    JSON.stringify({
      // formSetting,
      tenantDetails,
      menus,
      locales,
    })
  );

  console.log("New Global Data Generated!");
};
