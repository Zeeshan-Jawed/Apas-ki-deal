const express = require("express");
const { getusers, specificuser, updateuser, deleteuser, adduser } = require("../controllers/user.controller");
const user_router = express.Router();

user_router.get("/api/users", getusers);
user_router.get("/api/specificuser/:id", specificuser);
user_router.post("/api/adduser", adduser);
user_router.put("/api/updateuser/:id", updateuser);
user_router.put("/api/deluser/:id", deleteuser);

module.exports = user_router;