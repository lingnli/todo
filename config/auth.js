module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      //isAuthenticated()是passport提供的方法
      //檢驗是否已經在登入狀態
      return next();
    }
    res.redirect("/users/login"); //若不是在登入狀態跳轉回login頁面
  }
};
