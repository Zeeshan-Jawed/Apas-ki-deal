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
        res.status(201).send(getadv) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
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
        res.status(201).send(insertadv) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//DELETE ADVERTISE
const deleteadvertise = async(req, res) => {
    try {
        const del = await advertise.findByIdAndDelete(req.params.id)

        res.send("Deleted Successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
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

        res.status(201).send(updadv)
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//VIEW SPECIFIC ADVERTISE

const specificadvertise = async(req, res) => {
    try {
        const _id = req.params.id;
        const getspead = await advertise.findById({ _id: _id })
            //({_id:_id})phela wala id database say uth karaye gay
            //aur dosra wala ham khud dege
            //params.id aur class/id means k dono ka name same id hona chahye
        res.status(201).send(getspead) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = { getadvertise, specificadvertise, updateadvertise, deleteadvertise, addadvertise }