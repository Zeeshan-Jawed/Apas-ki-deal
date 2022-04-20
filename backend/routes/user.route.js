const express =require("express");
const { newTea } = require("../controllers/user.controller");
const router=express.Router();
const users=require('../models/User')

router.post('/api/user',newTea)