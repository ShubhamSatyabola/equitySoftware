const express = require("express");

const studentController = require("../controllers/student");
const userAuthenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  userAuthenticate.authenticate,
  studentController.createStudent
);
router.post(
  "/assignClass",
  userAuthenticate.authenticate,
  studentController.assignStudents
);
router.get(
  "/get",
  userAuthenticate.authenticate,
  studentController.getStudents
);
router.get(
  "/getStudentAll",
  userAuthenticate.authenticate,
  studentController.getStudentsInAllClasses
);
router.get(
  "/classmates/:studentId",
  userAuthenticate.authenticate,
  studentController.getClassmates
);
module.exports = router;

