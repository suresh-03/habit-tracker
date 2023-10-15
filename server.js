const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
require("dotenv").config();
app.use(express.json());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expressLayouts);

// connect to database
const mongoose = require("mongoose");
async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => console.log(err.message));
}

connectDB();

const indexRouter = require("./routes/index");
const tasksRouter = require("./routes/tasks");

app.use("/", indexRouter);
app.use("/tasks", tasksRouter);

app.listen(process.env.PORT, () => {
  console.log(`running in PORT ${process.env.PORT}`);
});
