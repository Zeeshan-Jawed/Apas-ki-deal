const express = require("express");
const adv_router = new express.Router();
const app = express();
const verifyToken =require('../middleware/auth')

const { getadvertise, getavailible, isdeleted, specificadvertise, deleteadvertise, updateadvertise, addadvertise , recentAds  , insertImage} = require("../controllers/advertise_controller")

//GET ALL ADVERTISE
adv_router.get("/api/alladvertise", getadvertise)

//GET SPECIFIC ADVERTISE
adv_router.get("/api/specificadvertise/:id", specificadvertise)

//INSERT ADVERTISE
adv_router.post("/api/addadvertise",[verifyToken], addadvertise)

//DELETE ADVERTISE
adv_router.delete("/api/deleteadvertise/:id", deleteadvertise)

//UPDATE ADVERTISE
adv_router.put("/api/updateadvertise/:id", updateadvertise)

//IS DELETE
adv_router.put("/api/isdeleted/:id", isdeleted)

//AVAILIBLE
adv_router.get("/api/allavailible", getavailible)

// Recent Ads
adv_router.get("/api/recentAds",  recentAds )


//Get image 
adv_router.post("/api/insertImages" ,[verifyToken],  insertImage )

module.exports = adv_router