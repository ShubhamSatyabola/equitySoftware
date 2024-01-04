const express = require("express");

const classController = require("../controllers/class");
const userAuthenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  userAuthenticate.authenticate,classController.createClass
);
router.get(
  "/:schoolId",
  userAuthenticate.authenticate,
  classController.getClass
);
module.exports = router;
