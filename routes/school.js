const express = require("express");

const schoolController = require("../controllers/school");
const userAuthenticate = require("../middleware/authMiddleware");

const router = express.Router();


router.post(
  "/create",userAuthenticate.authenticate,schoolController.createSchool);
router.get(
  "/get",
  userAuthenticate.authenticate,
  schoolController.getMySchools
);


module.exports = router;
