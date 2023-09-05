const { validationResult } = require("express-validator");
const User = require("../models/User");
const { jsonGenerate } = require("../utils/helpers");
const { statusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken"); 

const Login = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});

        if(!user) {
           return res.json(jsonGenerate(
            statusCode.UNPROCESSABLE_ENTITY,
            "Username or password is incorrect"));
        }

        const verified = bcrypt.compareSync(password,user.password);

        if(!verified) {
            return res.json(jsonGenerate(
                statusCode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"));
        }
        const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET);
        return res.json(jsonGenerate(statusCode.SUCCESS,"Login Successfull",{userId:user._id,token:token}))
    }

    res.json(jsonGenerate(
        statusCode.VALIDATION_ERROR,
        "Validation Error",
        errors.mapped()));
}


module.exports = Login;
