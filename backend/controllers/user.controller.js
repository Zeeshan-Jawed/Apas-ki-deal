const express = require('express');
const { users } = require("../models/users");
const { otp } = require('../models/otp')
//const success = require('../utils/helper');
const app = express();
const axios = require('axios')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generate } = require('shortid');
require("dotenv").config();
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
//const helper = require('../utils/helper')
//View all users
const getusers = async (req, res) => {
    try {
        const getuser = await users.find({})
        console.log(getuser)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Users";
            let status = true;
            let Data = getuser;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

// otp create

const signUp = async (req, res) => {

    let otpcode = Math.floor((Math.random() * 10000) + 1);
    let datetime = new Date().getTime() / 1000 + 300
    console.log(datetime);
    const data = await otp.create({
        phoneno: req.body.phoneno,
        otp_code: otpcode,
        expireIn: datetime,
        is_verified: false
    })

    var mobile_no = req.body.phoneno
    console.log(mobile_no);
    var url = `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=${process.env.otp_api}&msg=Your verification code is ${otpcode} from apas ki deal . &mobileno=${mobile_no}`
    var send = await axios({
        method: 'post',
        url
    })
    console.log(url);
    console.log(send);
    //res.send("OTP has been sent to customer phone number");
    let helperfunction = () => {
        let response = res.statusCode;
        let message = "OTP has been sent to customer phone number";
        let status = true;
        return res.status(201).send({ response: response, message: message, status: status })
    }
    helperfunction()

}




//Sign In
const signIn = async (req, res) => {


    try {
        const { email, phoneno, password } = req.body;

        if (!(email || phoneno && password)) {
            return res.status(400).send("All input is required");
        }
        // console.log("SIGN");
        const user = await users.findOne({ email });
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("sign in");
            const token = jwt.sign(
                { user_id: user._id, phoneno: phoneno },

                // "hardcodedTOKEN_KEY",
                process.env.TOKEN_KEY,

                {
                    expiresIn: "24h",
                }
            );

            var tokens = token;

            // user
            let helperfunction = () => {
                let response = res.statusCode;
                let messages = "Login Successful ";
                let status = true;
                let Data = { name: user.name, tokens };
                return res.status(200).send({ response: response, message: messages, status: status, Data: Data })
            }

            helperfunction()
            // return res.status(200).json(tokens);

        }

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}









//create user
const verifySignup = async (req, res) => {

    try {

        const adduser = new users(req.body)
        var encryptedPassword = await bcrypt.hash(adduser.password, 10);
        adduser.password = encryptedPassword;
        let insertuser = await adduser.save();
        console.log(insertuser);

        const token = jwt.sign(
            { email: adduser.email, phoneno: adduser.phoneno },
            // "hardcodedTOKEN_KEY",
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        var tokens = token;

        // return res.status(201).json(tokens);

        let helperfunction = () => {
            let response = res.statusCode;
            let messages = "Sign-up Successful";
            let status = true;
            let Data = { name: req.body.name, tokens };
            return res.status(201).send({ response: response, message: messages, status: status, Data: Data })
        }

        helperfunction()
        // return success (res , "User has been created" , insertuser)

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}









//resend otp
var resendOtp = async (req, res) => {
    var opt_resend = Math.floor((Math.random() * 10000) + 1);
    var date = new Date().getTime() / 1000
    let resend = await otp.findOne({

        phoneno: req.body.phoneno,
        is_verified: false
    })

    if (resend) {
        console.log(resend);
        var resendUpdate = await otp.updateOne({
            _id: resend._id
        }
            , {
                otp_code: opt_resend,
                expireIn: date
            }
        )

    }
    else {

        const insert = await otp.create({
            phoneno: req.body.phoneno,
            otp_code: opt_resend,
            expireIn: date,
            is_verified: false
        })

    }


    var mobile_no = req.body.phoneno
    var url = `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=${process.env.otp_api}&msg=Your verification code is ${opt_resend} from apas ki deal . &mobileno=${mobile_no}`
    var send = await axios({
        method: 'post',
        url
    })
    console.log(send);
    return res.send(" new otp sent to user provided phone number");

}














//Update User

const updateuser = async (req, res) => {
    try {
        const _id = req.params.id;
        const upduser = await users.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        retu
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "User Has Been Updated";
            let status = true;
            let Data = upduser;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false })

    }
}






//delete user
const deleteuser = async (req, res) => {
    try {
        const _id = req.params.id;
        let updel = {
            isDelete: true
        }
        const del = await users.findByIdAndUpdate(_id, updel, {
            new: true
        })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "User Has been Deleted";
            let status = true;
            let Data = del;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false })
    }
}






//Particular user

const specificuser = async (req, res) => {
    try {
        const _id = req.params.id;
        const getuser1 = await users.findById({ _id: _id })
        let helperfunction = () => {
            let response = res.statusCode;
            let status = true;
            let Data = getuser1;
            return res.status(201).send({ response: response, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


//send mail 
const sendEmail = async (email , token) => {
    try {
        const transporter = nodemailer.createTransport({
            //host: process.env.HOST,
            //service: process.env.SERVICE,
            //port: 3002,
            secure: true,
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
        });
        const mail = {
            from: process.env.email,
            to: email,
            subject: " for verification mail ",
            html: '<p>' + email + 'please copy the link  <a href= localhost:3002/api/resetpassword?token=' + token + " > and reset your password"

        }
        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                return res.send("email has been sent", info.response);
            }

        })


    } catch (error) {
         //return res.send(error)
         console.log(error);
    }

}



const forgetPassword = async (req, res) => {

    try {
        const email = req.body.email;
        const userEmail = await users.find({ email: email })
        if (userEmail) {

            if (!userEmail) {
                res.send("please verify your email")
            } else {
                const randomString = randomstring.generate();
                const updateString = await users.updateOne(
                    {
                        email: email
                    },
                    { $set: { token: randomString } }

                );
                sendEmail(userEmail.email, userEmail.randomString)
                res.send("Check you mail")
            }
        } else {
            res.send("user email is incorrect")
        }

    } catch (error) {
        console.log(error);
        res.send("error");

    }
}


module.exports = { getusers, specificuser, deleteuser, verifySignup, updateuser, signUp, resendOtp, signIn, forgetPassword ,sendEmail }