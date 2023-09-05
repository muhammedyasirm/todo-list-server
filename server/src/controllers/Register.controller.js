const { validationResult } = require("express-validator");
const { jsonGenerate } = require("../utils/helpers");
const {statusCode,JWT_TOKEN_SECRET} = require("../utils/constants");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Jwt = require("jsonwebtoken");  

const Register = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const { name, username, password, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        
        const userExist = await User.findOne({ $or: [{
            email: email
        }, {
            username: username
        }  
    ]});
    if(userExist) {
        return res.json(statusCode.UNPROCESSABLE_ENTITY,"User or Email already exist");
    }
        //save to db
        try {
            const result = await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username
            })

            const token =  Jwt.sign({ userId: result._id },JWT_TOKEN_SECRET);

            res.json(jsonGenerate(statusCode.SUCCESS,"Registration sccesfull",{userId:result._id,token:token}));
            return;
        } catch (error) {
            console.log(error);
        }
    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Validation error", errors.mapped()));
}

module.exports = Register;
