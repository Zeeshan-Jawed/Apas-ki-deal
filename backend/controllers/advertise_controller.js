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

module.exports = { getadvertise, addadvertise }