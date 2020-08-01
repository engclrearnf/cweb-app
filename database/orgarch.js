const { py, Schema, model, ObjectId } = require("./db");

// 组织架构 Schema
const orgSchema = new Schema(
  {
    // 若 _id 手动生成，需要声明
    //  _id: ObjectId,
    name: { type: String, unique: true, dropDups: true, required: true },
    namepy: String,
    parentid: ObjectId,
    remark: String,
    // 机构包含的部门
    depts: [
      {
        name: { type: String, required: true },
        namepy: String,
        // 部门负责人
        header: String,
        // 主管领导
        supervisor: String,
        remark: String,
        // 部门包含的人员
        persons: [
          {
            name: { type: String, required: true },
            namepy: String,
            sex: String,
            tel: String,
            idno: String,
            remark: String,
          },
        ],
      },
    ],
  },
  {
    // 若 collectionName 自定义，需要申明，否则根据 model name 自动复数
    // collection: "collectionName",
    versionKey: false,
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  }
);

// model name 用于产生 collectionName, 自动复数形式
// 优先使用 Schema 定义的 collectionName
const Org = model("orgs", orgSchema);

/**
 * 添加机构
 * @param {Object} org - 添加的机构
 * @param {string} org.name - 机构名称
 * @param {string} org.remark - 机构说明
 * @param {ObjectId} org.parentid - 上级机构ID
 */
async function addOrg({ name, remark, parentid }) {
  const org = new Org({
    // 若 Schema 申明了 _id，
    // 需要手动指定 _id 值，包括子对象的 _id
    // _id: new ObjectId(),
    name,
    namepy: py(name),
    remark,
    parentid,
  });
  // 此时已经可以获取自动生成的 _id
  // console.log(org._id);

  return await org.save();
}

/**
 * 删除机构
 * @param {ObjectId} orgid - 将删除的目标机构ID
 */
async function delOrg(orgid) {
  return await Org.deleteOne({ _id: orgid });
}

/**
 * 修改机构指定 _id 的机构
 * @param {Object} org - 修改的机构信息
 * @param {ObjectId} org._id - 目标机构ID
 * @param {string} org.name - 机构名称
 * @param {string} org.remark - 机构说明
 */
async function updateOrg({ _id, name, remark }) {
  const org = await Org.findById(_id);
  org.name = name;
  org.namepy = py(name);
  org.remark = remark;
  return await org.save();
}

/**
 * 添加部门到指定机构
 * @param {ObjectId} orgid - 目标机构
 * @param {Object} dept - 添加的部门
 * @param {string} dept.name -
 * @param {string} dept.header -
 * @param {string} dept.supervisor -
 * @param {string} dept.remark -
 * @param {[Person]} dept.persons -
 */
async function addDept(orgid, dept) {
  const org = await Org.findById(orgid);
  org.depts.push(new Dept(dept));
  return await org.save();
}

module.exports = {
  addOrg,
  delOrg,
  updateOrg,
  addDept,
};
