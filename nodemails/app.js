const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res, next) => {
  res.render("contact",{msg:"il;;;"});
});
app.post("/send", (req, res, next) => {
  const output = `<p> You have a new contact request</p>
   <h3>Contact details</h3>
   <ul>
   <li>Name: ${req.body.name}</li>
   <li>Company: ${req.body.Company}</li>
   <li>E-mail: ${req.body.email}</li>
   <li>Phone: ${req.body.phone}</li>
   </ul>
   <p>${req.body.message}</p>`;
});
app.listen(3000);
