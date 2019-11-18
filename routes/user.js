const express = require("express");
const router = express.Router();

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
  res.send("register finish to log in page");
});
//log out page
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
