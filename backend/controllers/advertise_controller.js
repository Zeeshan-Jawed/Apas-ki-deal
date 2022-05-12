const express = require('express');
const { advertise } = require("../models/advertises");
//const multer = require("multer");
//const upload = multer({ dest: '/uploads/' }).array('files', 2)
const fs = require("fs");
const { users } = require('../models/users');
const { on } = require('events');
const app = express();
var moment = require("moment")

//View all advertise
const getadvertise = async (req, res) => {
    try {
        const getadv = await advertise.find({})
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "This is All Advertise"
            let status = true;
            let Data = getadv;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
        console.log(res.statusCode)
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//View all availible advertise
const getavailible = async (req, res) => {
    try {
        const getadv = await advertise.find({ is_Deleted: false })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "This is All Availible Advertise"
            let status = true;
            let Data = getadv;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//create advertise
const addadvertise = async (req, res) => {
    try {
        // const path = 'backend/advertiseimages/' req.user._id + Date.now() + '.jpeg'
        // const imgdata = req.body.image;
        // to convert base64 format into random filename
        //const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        // fs.writeFileSync(path, base64Data, { encoding: 'base64' });
   
       
        const addadv = new advertise(req.body)
        addadv.user_Id = req.user._id
        console.log(addadv);
        addadv.posted_On =  moment().format("YYYY-MM-DD HH:mm:ss");
       
        let insertadv = await addadv.save();
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Advertise is inserted"
            let status = true;
            let Data = insertadv;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//DELETE ADVERTISE
const deleteadvertise = async (req, res) => {
    try {
        const del = await advertise.findByIdAndDelete(req.params.id)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Advertise Is Deleted"
            let status = true;
            return res.status(201).send({ response: response, message: message, status: status })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
        //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//UPDATE ADVERTISE

const updateadvertise = async (req, res) => {
    try {
        const _id = req.params.id;
        const updadv = await advertise.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Advertise Is Updated"
            let status = true;
            let Data = updadv;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
        //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//UPDATE ADVERTISE IS DELETED
const isdeleted = async (req, res) => {
    try {
        const _id = req.params.id;
        let updel = {
            is_Deleted: true,
            deleted_On: Date.now()
        }
        const isdel = await advertise.findByIdAndUpdate(_id, updel, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Advertise Is Deleted"
            let status = true;
            let Data = isdel;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
        //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//VIEW SPECIFIC ADVERTISE

const specificadvertise = async (req, res) => {
    try {
        const _id = req.params.id;
        const getspead = await advertise.findById({ _id: _id })
        let helperfunction = () => {
            let response = res.statusCode;
            let status = true;
            let Data = getspead;
            return res.status(201).send({ response: response, status: status, Data: Data })
        }
        helperfunction()

    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}
const recentAds = async (req, res) => {
    try {
        const ad = await advertise.find({})
            .sort({ posted_On: -1 })
            .limit(10)
            // .then(() => {
            //     res.send(ad)

            // })
            let helperfunction = () => {
                let response = res.statusCode;
                let status = true;
                let Data = ad ;
                return res.status(201).send({ response: response, status: status, Data: Data })
            }
            helperfunction()

    }


    catch (error) {
        console.log(error);
        return res.send(error)
    }
}

const  insertImage = async (req, res)=>{
    try{
       const path = 'backend/advertiseimages/' + req.user._id+"_"+ Date.now() + '.jpeg'
        const imgdata = req.body.image;
      //  to convert base64 format into random filename
        var base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });

        let helperfunction = () => {
            let response = res.statusCode;
            let message = "image uploaded";
            let status = true;
            let Data = path ;
            return res.status(201).send({message:message , response: response, status: status, Data: Data })
        }
        helperfunction()
   
}
catch(error){
console.log(error);
}
}

module.exports = { insertImage, getadvertise, getavailible, isdeleted, specificadvertise, updateadvertise, deleteadvertise, addadvertise, recentAds }