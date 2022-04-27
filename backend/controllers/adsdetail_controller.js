const express = require('express');
const { advertise_detail } = require("../models/ads_detail");
const app = express();

//View all adsdetail
const getadsdetail = async(req, res) => {
    try {
        const getdetail = await advertise_detail.find({})
        console.log(getdetail)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Advertise details";
            let status = true;
            let Data = getdetail;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//mobile detail api

const getmobilead = async(req, res) => {
    try {

        const getmobdetail = await advertise_detail.find({ "add_detail.model": req.body.model })
        console.log(req.body.model)
        console.log(getmobdetail)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Mobile details";
            let status = true;
            let Data = getmobdetail;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//mobile detail api

const getmobilechangead = async(req, res) => {
    try {
        const getmobdetail = await advertise_detail.find({ "add_detail.model": Object.values(req.body)[0] })
        console.log(Object.values(req.body)[0])
        console.log(getmobdetail)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Mobile details";
            let status = true;
            let Data = getmobdetail;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//mobile detail api

const getmobilechangedad = async(req, res) => {
    try {
        // const key = Object.keys(req.body)[0];
        // console.log(key)
        // const value = req.body[key];
        // console.log(value);
        // //var test = 'add_detail.'+key;
        // var obj = {};
        // obj["add_detail." + key] = value
        // console.log(obj);
        // //var query = { "add_detail.model": value }
        // const key = Object.values("namekey");
        // const value = Object.values('valuead');
        // console.log(key);
        // console.log(value)
        const getmobdetail = await advertise_detail.find(req.body)
            // console.log(req.body)
        var type_key = [];
        var type_value = [];
        var result = []
        for (var i in getmobdetail) {
            // console.log(getmobdetail[i]);
            // console.log(getmobdetail[i].namekey);
            var aa = getmobdetail[i];
            var bb = aa["namekey"]
            type_key.push(bb)
                // console.log(type_key)
            var cc = getmobdetail[i];
            var dd = cc["valuead"]
            type_value.push(dd)
            var ee = {
                [bb]: dd
            }
            result.push(ee)
                // console.log(type_value)
                // type_key.push(getmobdetail[i].namekey);
                // console.log(type_key);
                // var bb = getmobdetail[i].valuead;
                // console.log(bb)
                // console.log(getmobdetail[i].valuead);
                // type_value.push(getmobdetail[i].valuead);
                // console.log(valuead);
        }
        // console.log(type_key)
        // console.log(type_value)
        // console.log(ee)
        console.log(result)
            // console.log(getmobdetail)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Mobile details";
            let status = true;
            let Data = result;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//mobile detail api

const getmobilepricead = async(req, res) => {
    try {
        price = req.body.price;
        const getmobpricedetail = await advertise_detail.find({ "add_detail.price": { $lt: price } })
        console.log(price)
        console.log(getmobpricedetail)
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "These are all Mobile details";
            let status = true;
            let Data = getmobpricedetail;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//create adsdetail
const addadsdetail = async(req, res) => {
    try {
        const adddetail = new advertise_detail(req.body)
        console.log(adddetail);
        let insertdetail = await adddetail.save();
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Advertise detail has been created";
            let status = true;
            let Data = insertdetail;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = { getadsdetail, getmobilechangedad, getmobilechangead, getmobilepricead, addadsdetail, getmobilead }