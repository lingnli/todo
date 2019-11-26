//判斷todolist中各路由是否都在登入狀態下
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      //isAuthenticated()是passport提供的方法
      //檢驗是否已經在登入狀態
      return next();
    }
    //若不是在登入狀態跳轉回login頁面，並顯示出提示訊息
    req.flash("warning_msg", "請先登入才能使用");
    res.redirect("/users/login");
  }
};
