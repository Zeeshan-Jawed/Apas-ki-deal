const express = require("express");
const adv_det_router = new express.Router();
const app = express();

const { getadsdetail, getmobilechangedad, getmobilechangead, getmobilepricead, getmobilead, addadsdetail } = require("../controllers/adsdetail_controller")

//GET ALL ADVERTISE DETAIL
adv_det_router.get("/api/alladvertisedetail", getadsdetail)

//GET ALL ADVERTISE OF MODELS
adv_det_router.get("/api/getmobilechangead", getmobilechangead)

//GET ALL ADVERTISE OF MODELS BY NAME GIVEN BY USER
adv_det_router.get("/api/getmobilechangedad", getmobilechangedad)

// GET MOBILE ADVERTISE DETAIL
adv_det_router.get("/api/getmobilead", getmobilead)

// GET MOBILE ADVERTISE DETAIL less than 35000
adv_det_router.get("/api/getmobilepricead", getmobilepricead)

//INSERT ADVERTISE DETAIL
adv_det_router.post("/api/addadvertisedetail", addadsdetail)

module.exports = adv_det_router