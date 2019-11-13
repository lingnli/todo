const express = require("express");
const app = express();
const mongoose = require("mongoose"); //載入mongoose
const exphbs = require("express-handlebars");

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

//設定route
app.get("/", (req, res) => {
  res.render("index");
});
//首頁：顯示所有todo
app.get("/todos", (req, res) => {
  res.send("顯示所有todo");
});

//新增一筆todo
app.get("/todos/new", (req, res) => {
  res.send("新增一筆todo");
});
//新增一筆todo的動作，新增後回到/todos頁面
app.post("/todos", (req, res) => {
  res.send("新增一筆todo");
});

//顯示特定todo詳細資料
app.get("/todos/:id", (req, res) => {
  res.send("顯示特定todo");
});

//修改特定todo
app.get("/todos/:id/edit", (req, res) => {
  res.send("修改特定todo");
});
//修改特定todo的動作，修改後回到修改頁面
app.post("/todos/:id/edit", (req, res) => {
  res.send("修改特定todo送出的動作");
});
//刪除特定todo 非頁面，一個動作
app.post("/todos/:id/delete", (req, res) => {
  res.send("刪除特定todo");
});

app.listen(3000, () => {
  console.log("app is running!");
});
