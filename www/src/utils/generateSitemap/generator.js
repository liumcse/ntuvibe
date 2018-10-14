const axios = require("axios");
const fs = require("fs");
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
<url><loc>https://ntuvibe.com</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/about</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/scheduler</loc><priority>0.5</priority></url>
<url><loc>https://ntuvibe.com/sitemap</loc><priority>0.5</priority></url>
${urls.join("\n")}
</urlset>`;
    fs.writeFile("../../brand/seo/sitemap.xml", output, error => {
      if (error) {
        console.log("Error occured when saving XML");
      } else {
        console.log(
          "Sitemap successfully generated! Next step: build and deploy. No copy & paste needed."
        );
      }
    });
  })
  .catch(error => {
    console.log("Erorr occured!", error);
  });
