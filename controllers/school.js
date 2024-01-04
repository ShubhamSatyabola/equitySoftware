const School = require('../models/school')
const User = require("../models/user");
const { Op } = require("sequelize");
exports.createSchool = async (req, res) => {
  try {
    const newSchool = await req.user.createSchool(req.body);
    res.status(201).json({ newSchool });
    
    } catch (err) {
    //console.log(err)
    res.status(500).json({ error: err });
  }
};


exports.getMySchools = async (req, res) => {
  try {
    const userId = req.user.id
   const user = await User.findOne({
     where: { id: userId },
     include: [
       {
         model: School,
         attributes: ["id", "schoolName"], // Specify the attributes you want to select from the School model
       },
     ],
   });

   if (!user) {
     throw new Error("User not found");
   }
  console.log(user);
   // Extract relevant information from the user object
   const userSchools = user.Schools.map((school) => ({
     id: school.id,
     name: school.name,
     role: user.role, // Access the role directly from the User model
   }));
    res.status(200).json(userSchools)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};
