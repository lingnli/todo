//todoSeeder.js 新增種子資料
//專案初始化時需要的種子資料，來給使用者看畫面呈現

const mongoose = require("mongoose");
const Todo = require("../todo.js");
//"./"同一層資料夾去找
//"../"往上層資料夾去找

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: "name-" + i });
  }

  console.log("done");
});
