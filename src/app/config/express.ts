import express, { Express } from "express";
import { ConnectDb } from "../../db/db.connect";
const app: Express = express();
const port = process.env.PORT || 3000;
let glob = require("glob");
let path = require("path");

module.exports = function () {
  glob
    .sync("./src/app/routes/**/*.routes.js")
    .forEach(function (routePath: any) {
      console.log("routePath", routePath);
      require(path.resolve(routePath))(app);
    });
  ConnectDb()
    .then(() => {
      app.listen(port, () => {
        console.log(
          `⚡️[server]: Server is running at https://localhost:${port}`
        );
      });
    })
    .catch((err) => {
      console.error("Database Error: ", err);
    });

  return app;
};
