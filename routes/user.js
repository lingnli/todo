const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");

//login page
router.get("/login", (req, res) => {
  res.render("login");
});
//login check
router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", {
    //Strategy:local
    //使用passport功能authenticate去驗證
    successRedirect: "/", //成功轉到/頁面
    failureRedirect: "/users/login" //失敗留在login頁面
  })(req, res, next); //把(req,res,next)傳到passport.authenticate()中去做驗證
});
/*可改寫成
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login'}))
傳給router.post的直接傳middleware
*/

//register page and action
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  //解構賦值，一次宣告多個變數

  //針對user輸入註冊資訊是否正確做訊息提示
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ message: "所有欄位都是必填！" });
  }
  if (password !== password2) {
    errors.push({ message: "二次密碼輸入不相等！" });
  }
  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    //errors=0 無錯誤訊息提示時
    //檢查是否已註冊
    User.findOne({ email: email }).then(user => {
      //findOne去User model中找是否有對應的email
      if (user) {
        //當對應的email找到user時
        errors.push({ message: "這個email已經註冊過！" });
        res.render("register", {
          errors,
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
        //將密碼做bcrypt處理
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash; //將bcrypt的密碼存入newUser
            //新增new user後存到User model中
            newUser
              .save() //成功儲存後執行then的callback
              .then(user => {
                res.redirect("/"); //倒回首頁 
              })
              .catch(err => console.log(err)); //若有err則使用catch()接住錯誤
          })
        );
      }
    });
  }
});
//log out page
router.get("/logout", (req, res) => {
  req.logout(); //使用passport的logout()方法登出
  req.flash("success_msg", "已成功登出");
  res.redirect("/users/login");
});

module.exports = router;
