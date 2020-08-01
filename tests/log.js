const log4js = require("log4js");
log4js.configure({
  appenders: {
    main: {
      type: "file",
      filename: "log4js.log",
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
logger.trace("Entering main testing");
logger.debug("Got main.");
logger.info("main is Comté.");
logger.warn("main is quite smelly.");
logger.error("main is too ripe!");
logger.fatal("main was breeding ground for listeria.");
