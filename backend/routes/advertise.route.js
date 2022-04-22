const express = require("express");
const adv_router = new express.Router();
const app = express();

const { getadvertise, specificadvertise, deleteadvertise, updateadvertise, addadvertise } = require("../controllers/advertise_controller")

//GET ALL ADVERTISE
adv_router.get("/api/alladvertise", getadvertise)

//GET SPECIFIC ADVERTISE
adv_router.get("/api/specificadvertise/:id", specificadvertise)

//INSERT ADVERTISE
adv_router.post("/api/addadvertise", addadvertise)

//DELETE ADVERTISE
adv_router.delete("/api/deleteadvertise/:id", deleteadvertise)

//UPDATE ADVERTISE
adv_router.put("/api/updateadvertise/:id", updateadvertise)

module.exports = adv_router