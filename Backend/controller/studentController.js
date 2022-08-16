 const Student = require("../model/Student");
const Department = require("../model/Department");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const getAllStudent = async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  let students;
  try {
    students = await Student.find();
  } catch (e) {
    return res.status(400).json({
      success: false,
      response: {
        message: e,
      },
    });
  }

  if (!students) {
    return res.status(404).json({
      success: false,
      response: {
        message: "students not found",
      },
    });
  }

  return res.status(200).json({ success: true, students });
};

const addNewStudent = async (req, res, next) => {
  const { 
    Email,
    Pass,
    Fname,
    LName,
    AboutMe,
    DoB,
    Gender,
    DepartmentId,
    ProfileImg
    } = req.body;

  const UserType = "Student";
  let user;
  try {
    let existUser = await User.findOne({ Email: Email }).exec();
    //if already exist then not create
    if (existUser) {
      return res.status(400).json({
        message: "User Already exists",
      });
    }

    //encrypt password
    Password = bcrypt.hashSync(Pass);
    const newUser = new User({
      Email,
      Password,
      UserType,
    });

    //Check if college is exist

    let DepartExist = await Department.findById(DepartmentId);

    if (!DepartExist) {
      return res.status(400).json({
        message: "Department Does not exist!",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    user = await newUser.save();
    const UserId = user._id;
    const newStudent = new Student({
        Fname,
        LName,
        AboutMe,
        DoB,
        Gender,
        DepartmentId,
        UserId,
        ProfileImg
    });
    await newStudent.save();
    session.commitTransaction();
  } catch (error) {
    return res.status(400).json({
      success: false,
      response: {
        message: "fail",
        error,
      },
    });
  }
  return res.status(200).json({
    success: true,
    response: {
      code: "student_added_success",
    },
  });
};

const getAllStudentByDepartId = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
    const {departId} = req.params;
    let students;
    try {
      students = await Student.find({ DepartmentId : departId });
    } catch (e) {
      return res.status(400).json({
        success: false,
        response: {
          message: e,
        },
      });
    }
  
    if (!students) {
      return res.status(404).json({
        success: false,
        response: {
          message: "students not found",
        },
      });
    }
  
    return res.status(200).json({ success: true, students });
};

module.exports = { getAllStudent , addNewStudent , getAllStudentByDepartId};