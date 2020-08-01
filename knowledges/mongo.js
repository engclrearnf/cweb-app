const mongoose = require("mongoose");
const py = s => require("node-pinyin")(s, { style: "firstLetter" }).join("");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

mongoose
  .connect("mongodb://localhost:27017/cweblearn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log(`mongodb connected.`),
    err => console.error(`mongodb connect error: ${JSON.stringify(err)}`)
  );

/**
 * 机构
 */
const orgSchema = new Schema(
  {
    // 若 _id 手动生成，需要声明
    //  _id: ObjectId,
    name: String,
    namepy: String,
    parentid: ObjectId,
    dept: [],
  }
  // 若 collectionName 自定义，需要申明，否则根据 model name 自动复数
  // , { collection: 'collectionName' }
);

const deptSchema = new Schema({
  name: String,
  namepy: String,
  parentid: String,
  // 部门负责人
  header: String,
  // 主管领导
  supervisor: String,
  remark: String,
  person: [
    {
      name: String,
      namepy: String,
      sex: String,
      tel: String,
      idno: String,
      remark: String,
    },
  ],
});

// model name 用于产生 collectionName, 自动复数形式
// 优先使用 Schema 定义的 collectionName
const Org = model("orgs", orgSchema);

const org = new Org({
  // 若 Schema 申明了 _id，
  // 需要手动指定 _id 值，包括子对象的 _id
  // _id: new ObjectId(),
  name: "什邡市卫生健康局x",
  namepy: py("什邡市卫生健康局x"),
  dept: [
    {
      name: "信息中心",
      namepy: "",
      // 部门负责人
      header: "feng",
      // 主管领导
      supervisor: "chengl",
      person: [
        {
          name: "feng",
          namepy: "",
          sex: "m",
        },
      ],
    },
  ],
});
// 此时已经可以获取自动生成的 _id
// console.log(org._id);

org.save().then(data => {
  console.log(JSON.stringify(data));
});

/* 
const car1 = new Car({
  name: "丰田",
  number: "969",
  type: "B",
  sortOrder: "1",
});

car1
  .save()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });
 */
/* // query
async function qryTest11() {
  const rt = await Test11.find();
  console.log(rt);
}
qryTest11();
 */

/* 
 * add

const test11 = new Test11({
  name: "fengxw",
  id: 2,
});

test11
  .save()
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log("save error: " + err);
  });
 */
