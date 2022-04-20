exports.getUsers = (req, res, next) => {
    res.json({message: "get"}); 
};
exports.getById = (req, res, next) => {
    res.json({message: "id"});
};
exports.postUser = (req, res, next) => {
    res.json({message: "POST "}); // dummy function for now
};
exports.updateUser = (req, res, next) => {
    res.json({message: "update"}); // dummy function for now
};
exports.deleteUser = (req, res, next) => {
    res.json({message: "delete"}); // dummy function for now
};

