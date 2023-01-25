const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    
    const { email, password } = req.body
    if (!email ) {
        return res.status(400).json('Bad request params - email');
    }
    if (!password ) {
        return res.status(400).json('Bad request params - password');
    }

    res.status(200).send({
        status: 200,
        response: "received body"
    })
}

const newUser = async (req, res, next) => {
    
}

module.exports = {
    login
}