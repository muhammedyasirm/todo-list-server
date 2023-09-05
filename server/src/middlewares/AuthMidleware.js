const { statusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const { jsonGenerate } = require("../utils/helpers");
const Jwt = require("jsonwebtoken"); 

const AuthMiddleware = (req,res,next) => {
  if(req.headers['auth'] === undefined){
    return res.json(jsonGenerate(statusCode.AUTH_ERROR,"Access Denied"));
  }

  const token = req.headers['auth'];
  try {
    const decoded = Jwt.verify(token,JWT_TOKEN_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Inavalid Token"))
  }
}

module.exports = AuthMiddleware;
