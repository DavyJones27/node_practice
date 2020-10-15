const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users = [];
app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add-user" });
});
app.get("/user", (req, res, next) => {
  res.render("user", { pageTitle: "Users", users: users });
});
app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/user");
});
app.listen(5000);
