require('dotenv').config()
const express = require('express')


const sequelize = require('./db')

const User = require('./models/user')
const School = require("./models/school");
const Class = require('./models/class')
const Student =require('./models/student')
const ClassGroup = require('./models/classGroup')

//routes
const userRoutes = require('./routes/user')
const schoolRoutes = require('./routes/school')
const classRoutes = require('./routes/class');

const studentRoutes = require('./routes/student')

const app = express()
app.use(express.json());
app.use('/user',userRoutes)
app.use("/school", schoolRoutes);
app.use('/class',classRoutes)
app.use("/student", studentRoutes);

User.hasMany(School)
School.belongsTo(User)

School.hasMany(Class)
Class.belongsTo(School)

Student.belongsToMany(Class, { through: ClassGroup });
Class.belongsToMany(Student, { through: ClassGroup });

User.belongsToMany(School, { through: "UserRole" });
School.belongsToMany(User, { through: "UserRole" });

sequelize
  .sync({force:false})
  .then((result) => {
    app.listen(process.env.PORT || 8000);

     console.log('db connected','server listening to port 8000')
  })
  .catch((err) => console.log(err));


