const { otp } = require("../models/otp");


verification =async (req, res, next) => {
    var date  =new Date().getTime() / 1000;
    console.log(date);
    let data = await otp.findOne({
        phoneno: req.body.phoneno,
        is_verified: false,
        otp_code: req.body.otp_code,
        expireIn: { $gte: date }
    }
    )

    if (data) {
       // console.log(data);
        var up = await otp.updateOne({
            _id: data._id

        }, {
            is_verified: true
        }
        )
        
    }
    else{
       return res.send("OTP not verified.")
    }
    next()



}


const validates = {
    verification:verification,
  
  

  };
  
  module.exports = validates;