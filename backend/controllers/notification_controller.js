const express = require('express');
const { Notification } = require("../models/notifications");
const app = express();


//View all notification
const getnotifications = async(req, res) => {
    try {
        const getnot = await Notification.find({})
        console.log(getnot)
        res.status(201).send(getnot) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
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
        res.status(201).send(insertnot) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


//delete notification
const deletenotification = async(req, res) => {
    try {
        const delnot = await Notification.findByIdAndDelete(req.params.id)

        res.send("Delete Successfully")
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

        res.status(201).send(updnot)
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
            //({_id:_id})phela wala id database say uth karaye gay
            //aur dosra wala ham khud dege
            //params.id aur class/id means k dono ka name same id hona chahye
        res.status(201).send(getnot1) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


module.exports = { updatenotification, deletenotification, specificnotification, getnotifications, addnotification }