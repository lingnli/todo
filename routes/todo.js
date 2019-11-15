const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//首頁：顯示所有todo
router.get("/", (req, res) => {
  res.redirect("/");
});

//新增一筆todo
router.get("/new", (req, res) => {
  res.render("new");
});
//新增一筆todo的動作，新增後回到/todos頁面
router.post("/", (req, res) => {
  console.log(req.body.name);
  //建立Todo model實例
  const todo = new Todo({
    name: req.body.name
  });
  //將剛建立的todo存入資料庫
  todo.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

//顯示特定todo詳細資料
router.get("/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err);
    return res.render("details", { todo });
  });
});

//修改特定todo
router.get("/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err);
    return res.render("edit", { todo });
  });
});
//修改特定todo的動作，修改後回到修改頁面
router.put("/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    console.log(req.body);
    //在Todo model中找到要更新的todo document
    if (err) return console.log(err);
    todo.name = req.body.name; //更新todo的name為表單傳來的name
    //處理checkbox
    if (req.body.done === "on") {
      todo.done = true;
    } else {
      todo.done = false;
    }
    todo.save(err => {
      //將更新name的todo存入Todo model
      if (err) return console.log(err);
      return res.redirect(`/todos/${req.params.id}`); //送出後導向顯示特定資料頁面
    });
  });
});

//刪除特定todo 非頁面，一個動作
router.delete("/:id/delete", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err);
    todo.remove(err => {
      if (err) return console.log(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
