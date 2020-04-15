const express = require("express");
var https = require("https");
var http = require("http");
var bodyParser = require("body-parser");
var querystring = require("querystring");
const writeJsonFile = require("write-json-file");

const requ = require("request");
var cheerio = require("cheerio");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
          (async () => {
            await writeJsonFile("foo.json", { value });
          })();

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
  .get("/data", (req, res) => {
    res.send(value);
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

app.get("/timestamp-cached", (req, res) => {
  res.send("Future of something cool!!");
});
