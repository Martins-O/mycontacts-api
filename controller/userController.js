const asyncHandler = require("express-async-handler");
const  User = require("../model/userModel")
const jwtToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async(req, res) => {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide username, email and password');
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log('hash: ',hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created ${user}`);
    if (user){
        res.status(201).json({_id: user.id, email: user.email, username: user.username});
    }else {
        res.status(400);
        throw new Error('User Data not valid');
    }
    res.json({
        message: 'User registered'
    });
});
const loginUser = asyncHandler(async (res, req) => {
    const { email, password } = req.body;
    if (!email ||!password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwtToken.sign({
            _id: user.id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(200).send({accessToken: accessToken})
    }else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
    res.json({
        message: 'User logged in'
    });
});
const currentUser = asyncHandler(async (res, req) => {

    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};