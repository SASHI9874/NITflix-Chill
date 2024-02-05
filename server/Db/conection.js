const mongoose = require("mongoose");

const DB = process.env.dburl;
mongoose
  .connect(DB, {
    dbName: "NITflis&Chill",
  })
  .then(() => console.log("database is connected"))
  .catch((err) => console.log("errr", err));
