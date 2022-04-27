const express = require('express');
const { users } = require("../models/users");
const app = express();
const fs = require("fs");

//View all users
const getusers = async(req, res) => {
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

//create user
const adduser = async(req, res) => {
    try {
        if (!req.body.image) {
            const adduser = new users(req.body)

            console.log(adduser);
            let insertuser = await adduser.save();
            let helperfunction = () => {
                let response = res.statusCode;
                let message = "User has been created";
                let status = true;
                let Data = insertuser;
                return res.status(201).send({ response: response, message: message, status: status, Data: Data })
            }
            helperfunction()
        } else {
            const path = 'backend/userimage/' + Date.now() + '.jpeg'
            const imgdata = req.body.image;
            const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            fs.writeFileSync(path, base64Data, { encoding: 'base64' });
            console.log(path);
            req.body.image = path;
            const adduser = new users(req.body)
            console.log(adduser);
            let insertuser = await adduser.save();
            let helperfunction = () => {
                let response = res.statusCode;
                let message = "User has been created";
                let status = true;
                let Data = insertuser;
                return res.status(201).send({ response: response, message: message, status: status, Data: Data })
            }
            helperfunction()
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//Update User

const updateuser = async(req, res) => {
    try {
        const _id = req.params.id;
        const upduser = await users.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
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
const deleteuser = async(req, res) => {
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

const specificuser = async(req, res) => {
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

module.exports = { getusers, specificuser, deleteuser, adduser, updateuser }