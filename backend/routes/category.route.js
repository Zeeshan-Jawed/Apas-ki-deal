const express = require("express");
const router = new express.Router();
const { getcategories, specific_category, cat_subcat, updatecategory, addcategory, deletecategory } = require("../controllers/category_controller")

//GET ALL CATEGORY
router.get("/api/allcategories", getcategories)

//GET SPECIFIC CATEGORY
router.get("/api/category/:id", specific_category)

//INSERT CATEGORY
router.post("/api/addcategory", addcategory)

//DELETE CATEGORY
router.delete("/api/deletecategory/:id", deletecategory)

//UPDATE CATEGORY
router.put("/api/updatecategory/:id", updatecategory)

//GET SUBCATEGORY IN TERMS OF CATEGORY
router.get("/api/cat_subcat/:id", cat_subcat)

module.exports = router