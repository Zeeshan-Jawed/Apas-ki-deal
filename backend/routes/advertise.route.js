const express = require("express");
const adv_router = new express.Router();
const app = express();

const { getadvertise, addadvertise } = require("../controllers/advertise_controller")

//GET ALL ADVERTISE
adv_router.get("/api/alladvertise", getadvertise)

//INSERT ADVERTISE
adv_router.post("/api/addadvertise", addadvertise)

module.exports = adv_router