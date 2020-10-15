const express = require("express");
const User = require("../models/user");
const { check, body } = require("express-validator");
const router = express.Router();
const authController = require("../controller/auth");
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/login", authController.postLogin);
router.post(
  "/logout",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "Password has to be valid")
      .isLength({ min: 5 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .trim()
  ],
  authController.postLogout
);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Pls enter a valid email")
      .custom((value, { req }) => {
        // if (value.includes("hotmail")) {
        //   throw new Error("this email is forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exist already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password at least 5 character and contain At least one uppercase.At least one lower case.At least one special character."
    )
      .isLength({ min: 5 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm Password have to match!");
        }
        return true;
      })
  ],
  authController.postSignup
);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);
module.exports = router;
