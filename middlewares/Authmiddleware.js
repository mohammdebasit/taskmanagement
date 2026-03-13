var jwt = require('jsonwebtoken');

async function jwtcheck(req, res, next) {
    const headerContainsAuthorization = req.headers.authorization
    if (!headerContainsAuthorization) res.json({ message: "No authorization header found" })
    const authorizationContainsBearerToken = headerContainsAuthorization.includes('Bearer')
    if (!authorizationContainsBearerToken) res.json({ message: "No bearer token found" })
    const beareTokenExists = headerContainsAuthorization.split(' ')[1]
    if (!beareTokenExists) res.json({ message: "No Token found" })
    //valdiate token
try {
    const isTokenValid = jwt.verify(beareTokenExists, process.env.JWT_SECRET)
    next()
    
} catch (error) {
    if (error) res.json({ message: "Invalid Token" })
    
}
}

async function isAdmin(req,res,next) {
    const payload=jwt.decode(req.headers.authorization.split(' ')[1])
    console.log(payload);
    
const role= payload.role
role=='Admin' ? next():  res.json({message:"Un-Authorized, login as an admin to proceed"})

}

module.exports = { jwtcheck,isAdmin }