const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expressLayouts);

// connect to database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`running in PORT ${process.env.PORT}`);
});
