const express = require('express');
const { users } = require("../models/users");
const { otp } = require('../models/otp')
//const success = require('../utils/helper');
const app = express();

var smtpTransport = require('nodemailer-smtp-transport');
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
const sendEmail = async (req, token) => {
    var email = req.body.email
    console.log(req.body);
    try {


        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'fizza.mangotech@gmail.com',
                pass: 'Ubit123456789@'
            }
        }));

        var mailOptions = {
            from: 'fizza.mangotech@gmail.com',
            to: email,
            subject: 'Password Reset',
            // text: 'That was easy!',
           // const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
            html: '<p>' + 'please copy the link  <a href=localhost:3003/api/resetpassword?token=' + token + " > and reset your password"
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

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
                //     const randomString = randomstring.generate();
                //     const updateString = await users.updateOne(
                //         {
                //             email: email
                //         },
                //         { $set: { token: randomString } }

                //     );

                const tokenss = jwt.sign(
                    { user_id: userEmail._id },

                    // "hardcodedTOKEN_KEY",
                    process.env.TOKEN_KEY,

                    {
                        expiresIn: "2h",
                    }
                );

                var token = tokenss;
                console.log(token);
                sendEmail(req, token)
                res.send("Check you mail")
            }
        } else {
            res.send("user email is incorrect")
        }
        // let helperfunction = () => {
        //     let response = res.statusCode;
        //     let status = true;
        //     let Data = userEmail;
        //     return res.status(201).send({ response: response, status: status, Data: Data })
        // }
        // helperfunction()

    } catch (error) {
        console.log(error);
        res.send("error");

    }
}


// const resetPassword = async (req, res) => {



const config = process.env;

const resetPassword = async (req, res) => {
    try {

        const decoded = jwt.verify(req.body.token, config.TOKEN_KEY);
        var user_id = decoded.user_id;
        var mail = req.body.email
        var password = req.body.password

        var encryptedPassword = await bcrypt.hash(password, 10);
        await users.updateOne({
            user_id: user_id
        },

            {
                password: encryptedPassword
            }
        );

        console.log("reset password");
        res.send("updated");


    }
    catch (error) {
        console.log(error);
    }

}


module.exports = { resetPassword, getusers, specificuser, deleteuser, verifySignup, updateuser, signUp, resendOtp, signIn, forgetPassword, sendEmail }