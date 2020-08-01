const express = require("express");
const db = require("../../database/orgarch");

const router = express.Router();

router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.post("/addorg", async (req, res) => {
  const json = req.body;

  const org = await db.addOrg(json);
  res.send(org);
});

router.post("/delorg", async (req, res) => {
  const json = req.body;

  const org = await db.delOrg(json);
  res.send(org);
});

module.exports = router;
