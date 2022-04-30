
const { users } = require("../models/users")

checkDuplicateEmail = async (req, res, next) => {

    let data = await users.findOne(
        {
            email: req.body.email
        })
    if (data) {
        return res.status(400).send({ response: 400, message: "This email is already exits", status: true })

    }
    next();

}



checkMissingField = (req, res, next) => {
    if (!req.body.email && req.body.user_number) {
        return res.status(404).send({ response: 404, message: "Invalid request, email or phone number is required", status: true })

    }
    if (!req.body.password) {
        return res.status(404).send({ response: 404, message: "invalid Request , password is required", status: true })


    }
    next();
}

const checking = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkMissingField: checkMissingField
};
module.exports = checking;









