const express = require("express");
const { getusers, specificuser, updateuser, deleteuser, verifySignup , signUp ,resendOtp, signIn} = require("../controllers/user.controller");
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
module.exports = user_router;


