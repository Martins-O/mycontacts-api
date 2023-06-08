const asyncHandler = require('express-async-handler');
const jwtToken = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(' ')[1];
        jwtToken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('Invalid token');
            }
            req.user = decoded.user;
            next();
            console.log(decoded);
        })

        if (!token){
            res.status(401);
            throw new Error('Invalid token');
        }
    }
})

module.exports = validateToken;