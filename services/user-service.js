const mongoose = require('mongoose')
const {userModel} = require('../model')
const {authenticate} = require('../auth')

const userSchema = mongoose.Schema(userModel);

class User {

    constructor() {
        this.model = mongoose.model('User', userSchema);
    }

    findByCredentials = async (req, res) => {
        try {
            //get user with email
            let email = req.body.email;
            let password = req.body.password;
            let user = await this.model.findOne({ email }).select('+password');
            if (!user)
                res.status(401).send({ success: false, message: 'Invalid login credentials' });

            //compare password
            const isPasswordMatch = authenticate.compareHash(password, user.password);
            if (!isPasswordMatch)
                res.status(401).send({ success: false, message: 'Invalid login credentials' });

            user = {
                "isAdmin": user.isAdmin,
                "_id": user._id,
                "name": user.name,
                "email": user.email
            }
            
            let token = authenticate.generateToken(user);

            return res.status(200).send({token});
        } catch (err) {
            res.status(404).send({ success: false, message: 'Bad Request' })
        }
    }

    signUp = async (req, res) => {
        try {
            let user = req.body;
            let email = user.email

            if (await this.model.findOne({ email })){
                res.status(400).send({ success: false, message: 'user already exist' })
            }
            else
            {
            user.password = authenticate.generateHash(user.password)

            await this.model.create(user, (err)=>{

                if(err) res.status(400).send({ sucess: false, message: 'something went wrong' });

            res.status(200).send({ sucess: true, message: 'you are signed up to eshopping' })
            });
        }
        } catch (err) {
            // console.log('error ', err)
        }
    }

    login = async (req, res) => {
        await this.findByCredentials(req, res);
    }

    getUser = async (req, res) => {
        try {
            let _id = req.user._id

            await this.model.findById({ _id }, (err, user) => {

                if (err) res.status(404).send({ success: false, message: 'Bad Request' });

                res.status(200).send({ success: true, user });
            })

        } catch (err) { }
    }
}
module.exports = new User();