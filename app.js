const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("this will be a todo app");
});

app.listen(3000, () => {
  console.log("app is running!");
});
