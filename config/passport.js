//實行關注點分離，把需要passport判斷function都在這邊
//載入passport-local module使用Strategy功能
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
//需要從User model中判斷是否註冊過
const User = require("../models/user");

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
          if (user.password !== password) {
            return done(null, false, {
              message: "Wrong password!"
            });
          }
          return done(null, user);
        });
    })
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
