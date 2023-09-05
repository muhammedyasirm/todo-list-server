const { validationResult } = require( "express-validator" );
const { jsonGenerate } = require("../utils/helpers");
const Todo = require("../models/Todo");
const User = require("../models/User");
const { statusCode } = require("../utils/constants");

const RemoveTodo = async ( req, res ) => {
    const error = validationResult(req);
    if ( !error.isEmpty() ) {
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",error.mapped()));
    }

    try {
       const result = await Todo.findOneAndDelete({
        userId: req.userId,
        _id:req.body.todo_id
       }); 
    if ( result ) {
        const user = await User.findOneAndUpdate({
            _id: req.userId,
        },
        {
            $pull: { todos: req.body.todo_id }
        });
        return res.json(jsonGenerate(statusCode.SUCCESS,"Todo deleted",null));
    }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Could not delete",null));
    }

}

module.exports = RemoveTodo;