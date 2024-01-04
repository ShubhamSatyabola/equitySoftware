const Student = require('../models/student')
const Class = require("../models/class");
const ClassGroup = require("../models/classGroup");
const {Op} = require('sequelize')
const sequelize = require('../db')
exports.createStudent = async (req, res) => {
  try {
    const { studentName } = req.body;
    const { className } = req.body;
    
    const newStudent = await Student.create({studentName});
    // console.log(school);
    // const clas =  await Class.findOne({where:{className:className}})
    // await newStudent.setClasses(clas);
    res.status(201).json({ newStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.assignStudents = async (req, res) => {
  try {
    const {studentId,classId} = req.body
   const student = await Student.findByPk(studentId);
   const classObj = await Class.findByPk(classId);

   // Associate the student with the class
   await student.addClass(classObj);

   res
     .status(200)
     .json({
       success: true,
       message: "Student assigned to class successfully",
     });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getStudents = async (req, res) => {
  try {

    const students = await Student.findAll();
    res.status(201).json({ students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getStudentsInAllClasses=async (req,res)=>{
  try {
    const studentsInAllClasses = await Student.findAll({
      include: [
        {
          model: Class,
          through: {
            attributes: [], // Avoid fetching unnecessary data
          },
        },
      ],
      where: {
        // Ensure student is associated with all classes
        [Op.and]: sequelize.literal(`
          (SELECT COUNT(*) FROM classGroups WHERE studentId = Student.id) = (SELECT COUNT(*) FROM classes)
        `),
      },
    });

    res.status(200).json(studentsInAllClasses);
    
  } catch (error) {
    console.error("Error getting students in all classes:", error);
    throw error;
  }
}

exports.getClassmates = async (req, res) => {
  try {
    // Find the classes of the specified student
     const { studentId } = req.params; // Assuming student ID is a route parameter

     const classmates = await Student.findAll({
       where: {
         id: {
           [Op.ne]: studentId, // Exclude the student themselves
         },
         [Op.and]: sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM classGroups AS cg1
            WHERE cg1.studentId = Student.id
          )
          AND NOT EXISTS (
            SELECT 1
            FROM classes AS cl
            WHERE NOT EXISTS (
              SELECT 1
              FROM classGroups AS cg2
              WHERE cg2.studentId = Student.id
                AND cg2.classId = cl.id
            )
          )
        `),
       },
       include: [
         {
           model: Class,
           through: {
             attributes: [], // Avoid fetching unnecessary data
           },
         },
       ],
     });

     res.status(200).json(classmates);
  } catch (error) {
    console.error("Error getting students in all classes:", error);
    throw error;
  }
};