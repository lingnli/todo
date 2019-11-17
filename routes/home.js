const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//設定route
router.get("/", (req, res) => {
  Todo.find({}) //找到所有資料
    .sort({ name: "asc", test: 1 }) //按照asc方法排序 sort為mongoose提供的method
    .exec((err, todos) => {
      if (err) return console.log(err);
      return res.render("index", { todos });
    });
});

module.exports = router;
