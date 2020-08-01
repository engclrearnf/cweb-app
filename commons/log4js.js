const log4js = require("log4js");

log4js.configure({
  appenders: {
    main: {
      type: "file",
      filename: "../logs/log4js.log",
      maxLogSize: 1024000,
    },
  },
  categories: {
    default: {
      appenders: ["main"],
      level: "error",
    },
  },
});

const logger = log4js.getLogger("main");

module.exports = logger;
