import express, { Express, Router } from "express";
import { ConnectDb } from "./db/db.connect";
const app: Express = express();
const port = process.env.PORT || 3000;
import userRoutes from "./app/routes/user.routes";
import bodyParser from "body-parser";
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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use(userRoutes);
