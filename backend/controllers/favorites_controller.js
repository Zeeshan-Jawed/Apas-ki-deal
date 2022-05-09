const express = require('express');
const { Favourite } = require("../models/favourites");
const app = express();
//const res = require("express/lib/response");

 const insert = async(req, res) => {
    try {
        console.log("abc");
        const info = await Favourite.create({
            
            user_id: req.body.user_id,
            ad_id: req.body.ad_id,
            fav_id: req.body.fav_id
        })
        return res.send("added")
    }

    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}





//View all fav
const newfav = async (req, res) => {
    try {
        var user_id = req.body.user_id;
        var ad_id = req.body.ad_id;
        //var fav_id =req.body.fav_id
        const fave = await Favourite.findOne({ user_id: user_id, ad_id: ad_id })

        if (!(fave)) {
            const users = await Favourite.create({

                fav_id: req.body.fav_id,
                user_id: user_id,
                ad_id: ad_id
            });
            let helperfunction = () => {
                let response = res.statusCode;
                let messages = "fav created";
                let status = true;
                let Data = {}
                return res.status(200).send({ response: response, message: messages, status: status })
            }
    
            helperfunction()
        }
        else {

            var dlt = await Favourite.deleteOne({
                where: {
                    fav_id: fave._id
                }
            })
            let helperfunction = () => {
                let response = res.statusCode;
                let messages = "fav delete";
                let status = true;
                let Data = {}
                return res.status(200).send({ response: response, message: messages, status: status })
            }
    
            helperfunction()

        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

module.exports = { newfav  , insert }