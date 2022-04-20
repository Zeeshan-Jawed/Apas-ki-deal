const express =require("express");
const { postUser, getUsers, getById, updateUser, deleteUser } = require("../controllers/user.controller");
const user_router=express.Router();

user_router.get("/api/users",getUsers);
user_router.get("/api/user/:id",getById);
user_router.post("/api/user",postUser);
user_router.put("/api/user/:id",updateUser);
user_router.delete("/api/user /:id",deleteUser);

module.exports =user_router;