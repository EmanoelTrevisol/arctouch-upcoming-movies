const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const env = process.env.NODE_ENV || "development";

let whitelist = [];
if (env === "development") {
  whitelist = ["http://localhost:3000"];
} else if (env === "homolog") {
  whitelist = [];
} else if (env === "production") {
  whitelist = [];
}

console.log("CORS whitelist:", whitelist);

app.use(
  cors({
    origin: whitelist
  })
);

module.exports = app;
