const express = require("express");
const router = new express.Router();
const { updatenotification, deletenotification, specificnotification, getnotifications, addnotification } = require("../controllers/notification_controller")

//GET ALL NOTIFICATION
router.get("/api/getnotifications", getnotifications)

//INSERT NOTIFICATION 
router.post("/api/addnotification", addnotification)

//DELETE NOTIFICATION
router.delete("/api/deletenotification/:id", deletenotification)

//UPDATE NOTIFICATION
router.put("/api/updatenotification/:id", updatenotification)

//GET SUBCATEGORY IN TERMS OF CATEGORY
router.get("/api/specificnotification/:id", specificnotification)

module.exports = router