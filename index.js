// config
//const config = require("config");

const logger = require("./commons/log4js");

// secure
const helmet = require("helmet");
// validate
const Joi = require("joi");
const express = require("express");
const fs = require("fs");
const path = require("path");
// log
const morgan = require("morgan");

const logstream = fs.createWriteStream(
  path.join(__dirname, "logs/morgan.log"),
  { flags: "a" }
);

const app = express();

app.use(helmet());
app.use(morgan("short", { stream: logstream }));
app.use(express.static("public"));

app.use("/", require("./routes"), (err, req, res, next) => {
  logger.info("catch logged..");
  if (err) {
    const msg = err.toString();
    logger.error(msg);
    res.status(500).send(msg);
  }

  next(err);
});

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
