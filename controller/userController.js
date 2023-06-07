const asyncHandler = require("express-async-handler");


const registerUser = asyncHandler(async(reg, res) => {
    res.json({
        message: 'User registered'
    })
});
const loginUser = asyncHandler(async (res, req) => {
    res.json({
        message: 'User logged in'
    })
});
const currentUser = asyncHandler(async (res, req) => {
    res.json({
        message: 'Current User'
    })
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};