const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello world.");
});

router.use("/ofc", require("./ofc"));

module.exports = router;
