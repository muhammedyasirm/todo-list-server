const User = require("../models/User");
const { statusCode } = require("../utils/constants");
const { jsonGenerate } = require("../utils/helpers");

const GetTodos = async(req,res) => {
    try {
        const list = await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();

        return res.json(jsonGenerate(statusCode.SUCCESS,"All toso list",list));
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Error",error));
    }
}

module.exports = GetTodos;