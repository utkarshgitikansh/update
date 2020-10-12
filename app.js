const express = require("express");
var https = require("https");
var cheerio = require("cheerio");
var http = require("http");
var querystring = require("querystring");

const htmlToFormattedText = require("html-to-formatted-text");

const requ = require("request");

const app = express();

var map = new Array();
var m;
i = 0;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  res.header("Access-Control-Allow-Header", "Content-Type");
  next();
});

global.data = "data";
global.value = "value";
global.locate = "";
global.blog1 = "";
global.blog2 = "";
global.blog11 = "";
global.blog22 = "";

// const PORT = process.env.PORT || 8085;

app.listen(process.env.PORT || 8085, () => {
  https
    .get("https://www.trackcorona.live/api/countries", (res) => {
      const { statusCode } = res;
      const contentType = res.headers["content-type"];

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message);

        res.resume();
        return;
      }

      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          value = parsedData;

          console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
});

app
  .get("/googlenews", (req, resu) => {
    https.get(
      `https://newsapi.org/v2/everything?q=coronavirus%20success%20stories&apiKey=429c0fb561ef41bca3b06bcb3e11fc88`,
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);

          res.resume();
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            locate = parsedData;
            resu.send(locate);

            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    );
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app
  .get("/yoga", (req, resu) => {
    https.get(
      `https://newsapi.org/v2/everything?q=yoga&apiKey=429c0fb561ef41bca3b06bcb3e11fc88`,
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);

          res.resume();
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            locate = parsedData;
            resu.send(locate);

            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    );
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app
  .get("/news", (req, res) => {
    requ(`http://utkarshgitikansh.blogspot.com/`, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        console.log("So far so good ...");
        ///// Using cheerio to fetch the site details//////
        const $ = cheerio.load(html);

        blog11 = $.text().replace(/\[.*?\]/g, " ");

        // var city = {};

        // var key1 = "headLines";
        // var key2 = "content";
        // var key3 = "image";

        // city[key1] = [];
        // city[key2] = [];
        // city[key3] = [];

        // ///// '$' will be used as a reference to getting all website details ///////
        // //console.log($.text());
        // // city_info = $(".clickable")
        // //   .text()
        // //   .replace(/\[.*?\]/g, " ");  headline

        // $("[itemprop = 'headline']").each((i, el) => {
        //   const headLine = $(el).text().replace(/\[.*?\]/g, " ");;

        //   city[key1].push(headLine);
        //   //notices_url[key2].push(notice_url); //
        // });

        // $("[itemprop = 'articleBody']").each((i, el) => {
        //   const content = $(el).text().replace(/\[.*?\]/g, " ");;

        //   city[key2].push(content);
        //   //notices_url[key2].push(notice_url);
        // });

        // $("[class = 'news-card-image']").each((i, el) => {
        //   const content = $(el).attr("style").match(/(https?:\/\/[^ ]*)/);

        //   console.log(content);
        //   city[key3].push(content);
        //   //notices_url[key2].push(notice_url);
        // });

        // //city.push(city_info);

        // city_data = city;

        // console.log(city_data);

        blog11 = htmlToFormattedText(
          `<div dir="ltr" style="text-align: left;" trbidi="on"> <br /> <blockquote class="tr_bq" style="text-align: center;"> "About 28,00,00,00,000 results (0.58 seconds)"</blockquote> <div style="text-align: center;"> <br /></div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> The data blagged after anything we search for, these huge numbers of search results in the blink of an eye have always astonished us. Either we google it or we bing it, the internet opens up itself&nbsp; to us with related information. Something is crawling in the background.</div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> Spiders are crawling across every page on the Internet that ever exists. Just like any physical spider, they have a web of pages interconnected by hyperlinks. These spiders never settle and constantly update the database with information based on indexing.</div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> It just doesn't end here. These searching algorithm are backed by machine learning that enriches our search results based on location, user preferences and requirements so that it always feels at home while we search for a burger near north pole.</div> <div style="text-align: left;"> <br /></div> <div style="text-align: left;"> <br /></div> <div style="text-align: center;"> "Hyperlinks and bridges have always given more than expected without anything in return"</div> <div style="text-align: center;"> - Utkarsh Gitikansh</div> <div style="text-align: left;"> <br /></div> </div>`
        );

        res.send(htmlToFormattedText(`<p>Some text.</p>`));
      }
    });

    // console.log(city_value);
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app
  .get("/blog1", (req, resu) => {
    https.get(
      `https://www.googleapis.com/blogger/v3/blogs/8337522737151010272/posts?key=AIzaSyCeHQxTnHn6e8PE5XU2g0rB6zp5qi1a1K0`,
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);

          res.resume();
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            blog1 = parsedData;
            resu.send(blog1);

            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    );
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app
  .get("/blog2", (req, resu) => {
    https.get(
      `https://www.googleapis.com/blogger/v3/blogs/8550103547944167867/posts?key=AIzaSyCeHQxTnHn6e8PE5XU2g0rB6zp5qi1a1K0`,
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);

          res.resume();
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            blog2 = parsedData;
            resu.send(blog2);

            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    );
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

// app.listen(process.env.PORT || 8080, () => {
//   // at=28.6200469&lng=77.4357733

//     .on("error", (e) => {
//       console.error(`Got error: ${e.message}`);
//     });
// });

app
  .get("/locate", (req, resu) => {
    lat = req.query.lat;
    lon = req.query.lon;
    https.get(
      `https://apis.mapmyindia.com/advancedmaps/v1/idq6cwg9ktajon8itfayvl3t22lyaap4/rev_geocode?lat=${lat}&lng=${lon}`,
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);

          res.resume();
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            locate = parsedData;
            resu.send(locate);

            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }
    );
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app
  .get("/data", (req, res) => {
    res.send(value);
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

// app
//   .get("/locate", (req, res) => {
//     res.send(locate);
//   })
//   .on("error", (e) => {
//     console.error(`Got error: ${e.message}`);
//   });

app.get("/timestamp-cached", (req, res) => {
  res.send("Future of something cool!!");
});
