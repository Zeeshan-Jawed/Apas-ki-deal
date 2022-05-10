const express = require("express");
const router = new express.Router();
const { getcategories, getavailiblecat, specific_category, get_subCats, updatecategory, addcategory, deletecategory ,getParent ,getchildcat , getParentcount} = require("../controllers/category_controller")

//GET ALL CATEGORY
router.get("/api/allcategories", getcategories)

//GET SPECIFIC CATEGORY
router.get("/api/category/:id", specific_category)

//GET AVAILIBLE CATEGORY
router.get("/api/availiblecategory", getavailiblecat)

//INSERT CATEGORY
router.post("/api/addcategory", addcategory)

//DELETE CATEGORY
router.delete("/api/deletecategory/:id", deletecategory)

//UPDATE CATEGORY
router.put("/api/updatecategory/:id", updatecategory)

//GET SUBCATEGORY IN TERMS OF CATEGORY
router.get("/api/get_subCats", get_subCats)

//GET Parent IN TERMS OF CATEGORY
router.get("/api/getParent",getParent )

//GET child IN TERMS OF CATEGORY
router.get("/api/getChild", getchildcat )


router.get('/api/getParentcount'  , getParentcount )

module.exports = router