const mongoose = require("mongoose");
const py = s => require("node-pinyin")(s, { style: "firstLetter" }).join("");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://localhost:27017/ofc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log(`mongodb connected.`),
    err => console.error(`mongodb connect error: ${JSON.stringify(err)}`)
  );

module.exports = {
  py,
  Schema,
  model,
  ObjectId,
};
