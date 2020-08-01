const router = require("express").Router();

router.use("/", (req, res, next) => {
  //res.send("Hello world.");
  next();
});

router.use("/ofc", require("./ofc"));

module.exports = router;
