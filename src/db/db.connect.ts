import { sequelize } from "./sequalize";

export const ConnectDb = async () => {
  try {
    (async () => {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      await sequelize.sync({ alter: false });
    })();
  } catch (err) {
    console.error("Database Error: ", err);
  }
};
