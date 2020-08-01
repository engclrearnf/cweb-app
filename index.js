//const debug = require("debug")("app:startup");

// config
//const config = require("config");
//debug(config);

// secure
const helmet = require("helmet");
// validate
const Joi = require("joi");
const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const logstream = fs.createWriteStream(
  path.join(__dirname, "logs/logs.excludes"),
  { flags: "a" }
);

const app = express();

app.use(helmet());
app.use(morgan("short", { stream: logstream }));
app.use(express.static("public"));

app.use("/", require("./routes"));

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
