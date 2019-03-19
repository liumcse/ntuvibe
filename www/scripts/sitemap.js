const axios = require("axios");
const fs = require("fs");

const path = require("path");

const INCLUDED = `<url><loc>https://ntuvibe.com</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/about</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/scheduler</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/browser</loc><priority>0.5</priority></url>`;

const PATH_OUTPUT = path.resolve(__dirname, "../src/brand/seo");

axios
  .get("https://api.ntuvibe.com/courses/get_course_list")
  .then(response => {
    const courseList = response.data.data; // weird huh
    let urls = [];
    courseList.forEach(element => {
      const url = `<url><loc>https://ntuvibe.com/courses/${element.code.toLowerCase()}</loc><priority>0.5</priority></url>`;
      urls.push(url);
    });
    const output = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INCLUDED}
${urls.join("\n")}
</urlset>`;
    fs.writeFile(`${PATH_OUTPUT}/sitemap.xml`, output, error => {
      if (error) {
        console.log("❗️  Error occurred during saving XML", error);
      } else {
        console.log("👏  Sitemap successfully generated!");
      }
    });
  })
  .catch(error => {
    console.log("❗️  Error occurred!", error);
  });
