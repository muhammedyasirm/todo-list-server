const statusCode = {
    SUCCESS:200,
    VALIDATION_ERROR:201,
    UNPROCESSABLE_ENTITY:202,
    AUTH_ERROR:203
}

const JWT_TOKEN_SECRET = "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4ODQ3NDk5NCwiaWF0IjoxNjg4NDc0OTk0fQ.EXNWQaS0PFaNxvIO77_vuQ8uhzOfEuQMpHAcAYz64U4EUbVuTEivXlLIpESFfCBfIQ_L9XzOFkcZLd9aYPX_2w";

module.exports = {statusCode, JWT_TOKEN_SECRET};