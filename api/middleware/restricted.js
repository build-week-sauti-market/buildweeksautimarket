const jwt = require("jsonwebtoken")

module.exports =async (req, res, next) => {
try{
//if you receive the token form client store it in headers
const token = req.headers.authorization
console.log(token)
if(!token) {
  console.log("line 9")
    return res.status(401).json({
        message: "token is required"
    })
}
//else verify the token is correct and that it has the write secret
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if(err) {
      console.log("line 18")
        return res.status(401).json({
            message: "your token is invalid"
        })
    }

    //attach the decoded payload to the request so we can use the data later
     req.token = decoded
  //token has been verified
    next()
  })
}catch(err){
  next(err)
}
}