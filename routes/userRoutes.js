const express = require('express');
const {login, registerUser, currentUser} = require("../controller/userController");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/current', currentUser);

module.exports = router;