const express = require("express");

const userController = require("../controllers/user");

// const multer = require("multer");
// const upload = multer();

const router = express.Router();

//router.get('/sign-up', userController.getSignUp);

router.post(
  "/signup",
  userController.postSignUp
);

router.post("/login", userController.postLogIn);

module.exports = router;
