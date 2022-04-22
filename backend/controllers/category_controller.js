const express = require('express');
const { Category } = require("../models/categories");
const app = express();

//View all categories
const getcategories = async(req, res) => {
    try {
        const getcat = await Category.find({})
        res.status(201).send(getcat) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//create category
const addcategory = async(req, res) => {
    try {
        const addcat = new Category(req.body)
        console.log(addcat);
        let insertcat = await addcat.save();
        res.status(201).send(insertcat) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//delete category
const deletecategory = async(req, res) => {
    try {
        const del = await Category.findByIdAndDelete(req.params.id)

        res.send("Delete Successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}




//Update Category

const updatecategory = async(req, res) => {
    try {
        const _id = req.params.id;
        const updcat = await Category.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })

        res.status(201).send(updcat)
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}


//SUBCATEGORY ACCORDING TO CATEGORY

const cat_subcat = async(req, res) => {
    try {
        const _id = req.params.id;
        const get_cat_sub = await Category.find({ parent_Id: _id })
        const cat_name = await Category.find({ _id: _id }).select('name')
        res.status(201).send(({ cat_name, get_cat_sub })) //ek sath agar ek say ziada cheezain send krni hay tw
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//Particular Category

const specific_category = async(req, res) => {
    try {
        const _id = req.params.id;
        const getcat1 = await Category.findById({ _id: _id })
            //({_id:_id})phela wala id database say uth karaye gay
            //aur dosra wala ham khud dege
            //params.id aur class/id means k dono ka name same id hona chahye
        res.status(201).send(getcat1) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = { getcategories, specific_category, cat_subcat, updatecategory, deletecategory, addcategory }