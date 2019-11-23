//實行關注點分離，把需要passport判斷function都在這邊
//載入passport-local module使用Strategy功能
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
//需要從User model中判斷是否註冊過
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

//載入facebook strategy
const FacebookStrategy = require("passport-facebook").Strategy;

//module export的另一種方法
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function(
      //passport.use(default為function(username,password,done),若要更改function內參數，使用{usernameField:欲更改參數名稱})
      email,
      password,
      done
    ) {
      User.findOne({ email: email }) //在User model找到對應email後，把對應的user document抓出來
        .then(user => {
          if (!user) {
            if (err) {
              return done(err);
            }
            return done(null, false, {
              message: "The email is not registered!"
            });
          }
          //經bcrypt後的密碼比對
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return (
                done(null, false), { message: "email or password incorrect" }
              );
            }
          });
        });
    })
  );

  //facebook登入設定
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"]
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile._json.email }).then(user => {
          console.log(profile._json);
          //無法獲得facebook使用者密碼，則自行產生一組隨機密碼經bcrypt後存入User Model
          var randomPassword = Math.random()
            .toString(36)
            .slice(-8);
          //toString(36):轉為36進位，包含0-8,a-z字母
          //slice(-8):從最後一位數回來到第八位
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              //比對email若user不存在則建立user
              if (!user) {
                var newUser = User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                //若已存在，則直接登入
                return done(null, user);
              }
            });
          });
        });
      }
    )
  );
  //Passport 提供的 serialize 與 deserialize才可以進行session存入即取出
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
