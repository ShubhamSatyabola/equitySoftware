const Class = require('../models/class')
const School =  require('../models/school')
exports.createClass = async (req, res) => {
  try {
    const {className} = req.body
    const { schoolName } = req.body;

    const school = await School.findOne({where:{schoolName:schoolName}})
    // console.log(school);
    const newClass = await Class.create({className:className,schoolId:school.id})
    res.status(201).json({ newClass });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

exports.getClass = async (req, res) => {
  try {
    
    const { schoolId } = req.params;

   
    const classes = await Class.findAll({
      where:{
            schoolId: schoolId,
      }
      
    });
    res.status(201).json( {classes} );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
