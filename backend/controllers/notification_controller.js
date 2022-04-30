const express = require('express');
const { Notification } = require("../models/notifications");
const app = express();


//View all notification
const getnotifications = async(req, res) => {
    try {
        const getnot = await Notification.find({})
        console.log(getnot)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Notifications";
            let status = true;
            let Data = getnot;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//create notification
const addnotification = async(req, res) => {
    try {
        const addnot = new Notification(req.body)
        console.log(addnot);
        let insertnot = await addnot.save();
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Notification has been created";
            let status = true;
            let Data = insertnot;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


//delete notification
const deletenotification = async(req, res) => {
    try {
        const delnot = await Notification.findByIdAndDelete(req.params.id)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Notification has been Deleted";
            let status = true;
            return res.status(201).send({ response: response, message: message, status: status })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//UPDATE NOTIFICATION

const updatenotification = async(req, res) => {
    try {
        const _id = req.params.id;
        const updnot = await Notification.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Notification has been Updated";
            let status = true;
            let Data = updnot;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//Particular Notification

const specificnotification = async(req, res) => {
    try {
        const _id = req.params.id;
        const getnot1 = await Notification.findById({ _id: _id })
        let helperfunction = () => {
            let response = res.statusCode;
            let status = true;
            let Data = getnot1;
            return res.status(201).send({ response: response, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


module.exports = { updatenotification, deletenotification, specificnotification, getnotifications, addnotification }