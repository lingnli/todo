const express = require("express");
const router = express.Router();
const User = require("../models/user");

//log in page and action
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send("login finish to home page");
});

//register page and action
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body; //解構賦值，一次宣告多個變數
  //檢查是否已註冊
  User.findOne({ email: email }).then(user => {
    //findOne去User model中找是否有對應的email
    if (user) {
      //當對應的email找到user時
      console.log("user alreay register!");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      //若email沒找到，新增user到User model
      const newUser = new User({
        name,
        email,
        password
      });
      //新增new user後存到User model中
      newUser
        .save() //成功儲存後執行then的callback
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err)); //若有err則使用catch()接住錯誤
    }
  });
});
//log out page
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
