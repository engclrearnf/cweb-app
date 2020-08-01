//const debug = require("debug")("app:startup");

// config
//const config = require("config");
//debug(config);

// secure
const helmet = require("helmet");
// validate
const Joi = require("joi");
// logging
const morgan = require("morgan");
const express = require("express");

const app = express();

// static pages
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("short"));

const router = express.Router();

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

const validateUsers = user => {
  return Joi.object({
    name: Joi.string().min(3).required(),
  }).validate(user);
};

router.post("/hello", (req, res) => {
  const { error } = validateUsers(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const u = {
    id: users.length++,
    name: req.body.name,
  };

  console.log(u);
  users.push(u);
  res.send(u);
});

const port = process.env.PORT || 3011;

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
