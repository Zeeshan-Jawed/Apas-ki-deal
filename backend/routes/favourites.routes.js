const express = require("express");
const getfav = require("../controllers/favorites_controller");
//const getabc = require("../controllers/fav.controller");


const user_router = express.Router();

user_router.get("/api/fav", getfav.getfav);
user_router.post("/api/fav/insert", getfav.insert);



module.exports = user_router;