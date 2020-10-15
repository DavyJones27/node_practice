const path = require("path");
const { check, body } = require("express-validator");
const express = require("express");
const adminController = require("../controller/admin");
const rootDir = require("../util/path");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", isAuth, adminController.getProducts);
router.post(
  "/add-product",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("title must be atleast of 3 characters"),
    // body("imageUrl")
    //   .isURL()
    //   .withMessage("invalid imageUrl"),
    body("price")
      .isFloat()
      .withMessage("must have price"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("description must be atleast of 5 characters")
  ],
  isAuth,
  adminController.postAddProduct
);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-product",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("title must be atleast of 3 characters"),
    // body("imageUrl")
    //   .isURL()
    //   .withMessage("invalid imageUrl"),
    body("price")
      .isFloat()
      .withMessage("must have price"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("description must be atleast of 5 characters")
  ],
  isAuth,
  adminController.postEditProduct
);
// router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.delete("/product/:productId", isAuth, adminController.deleteProduct);
module.exports = router;
