const express = require("express");
var https = require("https");
var http = require("http");
var querystring = require("querystring");

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
