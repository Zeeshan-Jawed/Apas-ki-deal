const express = require('express');
const { advertise } = require("../models/advertises");
const multer = require("multer");
const upload = multer({ dest: '/uploads/' }).array('files', 2)
const fs = require("fs");
const app = express();

//View all advertise
const getadvertise = async(req, res) => {
    try {
        const getadv = await advertise.find({})
        const resmessage = "These are all Advertise"
            // res.status(400).send({ response: res.statusCode, status: false })
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: getadv })
        console.log(res.statusCode)
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//View all availible advertise
const getavailible = async(req, res) => {
    try {
        const resmessage = "These are availible Advertise"
        const getadv = await advertise.find({ is_Deleted: false })
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: getadv })
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//create advertise
const addadvertise = async(req, res) => {
    try {
        const path = 'backend/advertiseimages/' + Date.now() + '.jpeg'
        const imgdata = req.body.images;
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        console.log(path);
        req.body.images = path;
        const addadv = new advertise(req.body)
        console.log(addadv);
        let insertadv = await addadv.save();
        const resmessage = "The advertise has been Added"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: insertadv })
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//DELETE ADVERTISE
const deleteadvertise = async(req, res) => {
    try {
        const del = await advertise.findByIdAndDelete(req.params.id)
        const resmessage = "The Advertise has been deleted"
        res.send({ response: res.statusCode, message: resmessage, status: true })
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//UPDATE ADVERTISE

const updateadvertise = async(req, res) => {
    try {
        const _id = req.params.id;
        const updadv = await advertise.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        const resmessage = "The advertise has been updated"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: updadv })
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//UPDATE ADVERTISE IS DELETED
const isdeleted = async(req, res) => {
    try {
        const _id = req.params.id;
        let updel = {
            is_Deleted: true,
            deleted_On: Date.now()
        }
        const isdel = await advertise.findByIdAndUpdate(_id, updel, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        const resmessage = "This advertise is deleted"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: isdel })
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//VIEW SPECIFIC ADVERTISE

const specificadvertise = async(req, res) => {
    try {
        const _id = req.params.id;
        const getspead = await advertise.findById({ _id: _id })
        const resmessage = "This is your Advertise"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: getspead }) //koi bhi data insert krne k liye

    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

module.exports = { getadvertise, getavailible, isdeleted, specificadvertise, updateadvertise, deleteadvertise, addadvertise }