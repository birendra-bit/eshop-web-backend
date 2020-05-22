const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')
const bcrypt = require('bcryptjs')
require('dotenv').config()


class Authenticate {

    constructor() { }

    // generate hash
    generateHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    // compare password
    compareHash = (newPassword, oldPassword) =>  bcrypt.compareSync(newPassword, oldPassword);

    // generate web token
    generateToken =  (user) => jwt.sign(user, SECRET, { expiresIn: 86400 });

    // validate token
    authenticateToken = (req, res, next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).send({ auth: false, message: 'No token provide.' })
        }

        jwt.verify(token, SECRET, (err, user) => {
            if (err)
                res.status(500).send({ auth: false, messgae: 'Failed to authenticate token.' });
            else {
                req.user = user;
                next();
            }
        })
    }
}
module.exports = new Authenticate