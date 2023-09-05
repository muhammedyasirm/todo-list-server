const { validationResult } = require( "express-validator" );
const { jsonGenerate } = require("../utils/helpers");
const { statusCode } = require("../utils/constants");
const Todo = require("../models/Todo");

const MarkTodo = async( req, res ) => {
    const error = validationResult( req );

    if( !error.isEmpty() ) {
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",error.mapped()));
    }
    try {
        const todo = await Todo.findOneAndUpdate({
            _id: req.body.todo_id,
            userId: req.userId
        },[
            {
                $set: {
                    isCompleted: {
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ])
        if( todo ) {
            return res.json(jsonGenerate(statusCode.SUCCESS,"updated", todo));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"could not updated", null));
    }
}

module.exports = MarkTodo;