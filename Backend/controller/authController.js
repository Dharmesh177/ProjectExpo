const bcrypt = require("bcryptjs");
const User = require("../model/User"); // User model
const College = require("../model/College");
const Student = require("../model/Student");
const Professor = require("../model/Professor");
const Joi = require('@hapi/joi');
const { registerSchema, loginSchema } = require('../utils/userValidation');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisIs@$ecretKey"

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (e) {
    return res.status(400).json({
      success: false,
      response: {
        message: e,
      },
    });
  }
  if (!users) {
    return res.status(404).json({
      success: false,
      response: {
        message: "users not found",
      },
    });
  }
  return res.status(200).json({ success: true, users });
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const userId = id;
  console.log(userId);
  let user = "";
  try {
    user = await User.find({ _id: userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      response: {
        message: error.message,
      },
    });
  }

  return res.status(200).json({ success: true, user });
};

const loginUser = async (req,res,next) =>{
  res.set('Access-Control-Allow-Origin', '*');
  const { Email, Password } = req.body;
  let existingUser;
  try{
    existingUser = await User.findOne({Email})
   }catch(e){
    return res.status(404).json({message : "User is not found",e})
   }
   const isPasswordCorrect = bcrypt.compareSync(Password,existingUser.Password);

   if(!isPasswordCorrect){
       return res.status(400).json({message: "Incorrect Password!"});
   }
  const authToken = jwt.sign(existingUser.toJSON(),JWT_SECRET);

  const uId = existingUser._id;
 
  let UserTypedId
  if(existingUser.UserType == 'College-admin')
  UserTypedId =  await College.find( { UserId : uId.toString() } , {_id:1});
  else if(existingUser.UserType == 'Student')
  UserTypedId = await Student.find( { UserId : uId.toString() } , {_id:1});
  else
  UserTypedId = await Professor.find( { UserId : uId.toString() } , {_id:1});
   
  return res.status(200).json(
    {userType: existingUser.UserType , 
      authToken , 
      userId : existingUser._id , 
      uTypeId : UserTypedId[0]._id} );
    
}
const addNewUser = async (req, res, next) => {
  const { Email, Password, UserType } = req.body;
  console.log("API->Email: " + Email);
  try {
    let existingUser = await User.findOne({ Email: Email });
    console.log("we are inside the try block");
    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    else {
      console.log("We are about to create a new user");
      const user = new User({
        Email,
        Password,
        UserType,
        // UserId,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      response: {
        message: error.message,
      },
    });
  }
};


const addNewFollower = async(req,res,next)=>{

  
  res.set('Access-Control-Allow-Origin', '*');
  const { userId ,email } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if(!existingUser){
      return res.status(400).json({message: "Not found"});
    }

    existingUser.FollowersMail.push(email);
    await existingUser.save();
    
  } catch (error) {
    
  }

  return res.status(400).json({
    msg : "added!"
  })
}

module.exports = { getAllUser, loginUser, addNewUser , addNewFollower , getUserById };
