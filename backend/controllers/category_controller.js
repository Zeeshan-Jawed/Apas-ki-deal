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

const fs = require('fs');
//create category

const addcategory = async(req, res) => {
    try {
        const path = 'backend/categoryimage/' + Date.now() + '.jpeg'
        const imgdata = req.body.image;
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        console.log(path);
        req.body.image = path;
        const addcat = new Category(req.body)
        let insertcat = await addcat.save();
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Category Is Created";
            let status = true;
            let Data = insertcat;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
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
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Category Is Deleted";
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

//Update Category

const updatecategory = async(req, res) => {
    try {
        const _id = req.params.id;
        const updcat = await Category.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "Category Is Updated";
            let status = true;
            let Data = updcat;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
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
        let helperfunction = () => {
            let response = res.statusCode;
            let status = true;
            let Category_Data = cat_name;
            let Sub_Category = get_cat_sub;
            return res.status(201).send({ response: response, status: status, Category_Data: Category_Data, Sub_Category: Sub_Category })
        }
        helperfunction()
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
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "This is Your Category"
            let status = true;
            let Data = getcat1
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }

}

//View all availible categories
const getavailiblecat = async(req, res) => {
    try {
        const getcatav = await Category.find({ isActive: true })
        let helperfunction = () => {
            let response = res.statusCode;
            let message = "This is Availible Categories"
            let status = true;
            let Data = getcatav;
            return res.status(201).send({ response: response, message: message, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

module.exports = { getcategories, getavailiblecat, specific_category, cat_subcat, updatecategory, deletecategory, addcategory }