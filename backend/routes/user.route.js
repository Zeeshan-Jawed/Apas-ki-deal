const express = require("express");
const { getParencount } = require("../controllers/category_controller");
const { getusers, specificuser, updateuser, deleteuser, verifySignup , signUp ,resendOtp, signIn , forgetPassword ,resetPassword } = require("../controllers/user.controller");
const user_router = express.Router();
const validate = require("../middleware/otp.verify");
const { checkMissingField } = require("../middleware/sign.validate");
const chechking =require("../middleware/sign.validate")
user_router.get("/api/users", getusers);
user_router.get("/api/specificuser/:id", specificuser);
user_router.post("/api/verifySignup" ,   [chechking.checkDuplicateEmail , checkMissingField ,validate.verification] ,  verifySignup);
user_router.put("/api/updateuser/:id", updateuser);
user_router.put("/api/deluser/:id" ,  deleteuser);
user_router.post('/api/signUp' , signUp );
user_router.post('/api/resendOtp' , resendOtp)
user_router.post('/api/signIn'  , signIn)
user_router.post('/api/forgetpassword' , forgetPassword)
user_router.post('/api/resetPassword'  , resetPassword)
module.exports = user_router;


