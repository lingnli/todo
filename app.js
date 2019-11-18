const express = require("express");
const app = express();
const mongoose = require("mongoose"); //載入mongoose
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const middleOverride = require("method-override");

//method-override設定
app.use(middleOverride("_method"));
//body-parser設定
app.use(bodyParser.urlencoded({ extended: true }));

//handlebars設定
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//設定連線到model中的todo資料庫
mongoose.connect("mongodb://127.0.0.1/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//成功連線後mongoose會回傳一個connection
const db = mongoose.connection;

//連線異常時 使用on來監聽，只要有觸發error就會執行
db.on("error", () => {
  console.log("mongodb error!");
});

//連線成功 使用once來監聽，只會觸發一次
db.once("open", () => {
  console.log("mongodb connected!");
});

//載入todo model
const Todo = require("./models/todo");

//載入 / 結尾的router
app.use("/", require("./routes/home"));
//載入 /todos/ 結尾開始的router
app.use("/todos", require("./routes/todo"));
//載入 /users 結尾開始的router
app.use("/users", require("./routes/user"));

app.listen(3000, () => {
  console.log("app is running!");
});
