const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

const { authenticated } = require("../config/auth"); //解構賦值 直接載入authenticated方法

//設定route
router.get("/", authenticated, (req, res) => {
  //增加 authenticate 後，需要登入才可以使用首頁

  Todo.find({}) //找到所有資料
    .sort({ name: "asc", test: 1 }) //按照asc方法排序 sort為mongoose提供的method
    .exec((err, todos) => {
      if (err) return console.log(err);
      return res.render("index", {
        todos
      });
    });
});

module.exports = router;
