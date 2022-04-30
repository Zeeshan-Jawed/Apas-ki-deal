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
const getfav = async (req, res) => {
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
            return res.send("created")
        }
        else {

            var dlt = await Favourite.deleteOne({
                where: {
                    fav_id: fave._id
                }
            })
            return res.send(" Deleted");

        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ response: res.statusCode, status: false })
    }
}

module.exports = { getfav  , insert }