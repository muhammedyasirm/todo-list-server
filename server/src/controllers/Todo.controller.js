const { validationResult } = require("express-validator");
const { jsonGenerate } = require("../utils/helpers");
const { statusCode } = require("../utils/constants");
const Todo = require("../models/Todo");
const User = require("../models/User");

const createTodo = async(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.json(
            jsonGenerate(
                statusCode.VALIDATION_ERROR,
                "Todo is required",
                error.mapped()
                )
            );
    }

    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc
        })
        if (result) {
            const user = await User.findOneAndUpdate({ _id: req.userId},
                {
                    $push: {todos:result}
                });
                return res.json(jsonGenerate(statusCode.SUCCESS,"Todo created Successfully",result));
        }
    } catch (error) {
        return res.json(statusCode.UNPROCESSABLE_ENTITY,"something went wrong",error);
    }
}

module.exports = createTodo;