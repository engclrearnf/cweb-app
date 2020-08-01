const router = require("express").Router();

router.use("/org", require("./ofc/org"));

module.exports = router;
