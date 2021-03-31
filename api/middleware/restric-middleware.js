const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
	try{
		const token = req.cookies.token
		if (!token){
			return res.status(401).json({
				message: "token required"
			})
		}

		jwt.verify(token, "Rahmati secret", (err, decoded) => {
			if (err){
				return res.status(401).json({
					message: "token invalid"
				})
			}
			req.token = decoded
			next()
		})
	} catch(err) {
		next(err)
	}
}





// const jwt = require("jsonwebtoken")

// module.exports =async (req, res, next) => {
// try{
// //if you recieve the token form client store it in headers
// const token = req.headers.authorization
// if(!token) {
//     return res.status(401).json({
//         message: "token required"
//     })
// }
// //else verify the token is correct and that it has the write secret
// jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if(err) {
//         return res.status(401).json({
//             message: "token invalid"
//         })
//     }

//     //attach the decoded payload to the request so we can use the data later
//      req.token = decoded
//   //token has been verified
//     next()
//   })
// }catch(err){
//   next(err)
// }
// }