const express = require('express');
const { Category } = require("../models/categories");
const app = express();

//View all categories
const getcategories = async(req, res) => {
    try {
        const getcat = await Category.find({})
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "This are all Categories";
            let status = true;
            let Data = getcat;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//create category
const addcategory = async(req, res) => {
    try {
        const addcat = new Category(req.body)
        console.log(addcat);
        let insertcat = await addcat.save();
        const resmessage = "Category is inserted"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: insertcat }) //koi bhi data insert krne k liye

    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//delete category
const deletecategory = async(req, res) => {
    try {
        const _id = req.params.id;
        let updel = {
            isActive: false
        }
        const del = await Category.findByIdAndUpdate(_id, updel, {
            new: true
        })
        const resmessage = "Category is Deleted"
        res.send({ response: res.statusCode, message: resmessage, status: true, Data: del })
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false })
    }
}

//Update Category

const updatecategory = async(req, res) => {
    try {
        const _id = req.params.id;
        const updcat = await Category.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        const resmessage = "Category has been updated"
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: updcat })
    } catch (e) {
        console.log(e)
        res.status(500).send({ response: res.statusCode, status: false }) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}


//SUBCATEGORY ACCORDING TO CATEGORY

const cat_subcat = async(req, res) => {
    try {
        const _id = req.params.id;
        const get_cat_sub = await Category.find({ parent_Id: _id })
        const cat_name = await Category.find({ _id: _id }).select('name')
        res.status(201).send({ response: res.statusCode, status: true, categoryname: cat_name, subcategoryname: get_cat_sub }) //ek sath agar ek say ziada cheezain send krni hay tw
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

//Particular Category

const specific_category = async(req, res) => {
    try {
        const _id = req.params.id;
        const getcat1 = await Category.findById({ _id: _id })
        const resmessage = "This is your Category"
        res.status(201).send({ response: res.statusCode, status: true, message: resmessage, Data: getcat1 })
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }

}

//View all availible categories
const getavailiblecat = async(req, res) => {
    try {
        const resmessage = "These are availible categories"
        const getcatav = await Category.find({ isActive: true })
        res.status(201).send({ response: res.statusCode, message: resmessage, status: true, Data: getcatav })
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

module.exports = { getcategories, getavailiblecat, specific_category, cat_subcat, updatecategory, deletecategory, addcategory }