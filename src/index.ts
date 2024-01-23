import express, { Express, Router } from "express";
import { ConnectDb } from "./db/db.connect";
const app: Express = express();
const port = process.env.PORT || 3000;
import userRoutes from "./app/routes/user.routes";
import bullService from "./app/common/bull.service";

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
app.use(express.urlencoded({ extended: true }));

//routes
app.use(userRoutes);

//start bull service
bullService.start();
