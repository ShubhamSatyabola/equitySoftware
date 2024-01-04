const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    //console.log(token)
    const id = jwt.verify(token, process.env.Token);
    //console.log(id.userId)
    const user = await User.findByPk(id.userId);
    req.user = user;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
  }
};
