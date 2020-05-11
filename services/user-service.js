const mongoose = require('mongoose')
const {userModel} = require('../model')
const {authenticate} = require('../auth')

const userSchema = mongoose.Schema(userModel);

class User {

    constructor() {
        this.model = mongoose.model('User', userSchema);
    }

    findByCredentials = async (req, res) => {
            //get user with email
            let user = await this.model.findOne({"email": data.email }).select('+password');
            if (!user)
                return { success: false, message: 'Invalid login credentials'};

            //compare password
            const isPasswordMatch = authenticate.compareHash(data.password, user.password);
            if (!isPasswordMatch)
                return { success: false, message: 'Invalid login credentials' };

            user = {
                "isAdmin": user.isAdmin,
                "_id": user._id,
                "name": user.name,
                "email": user.email
            }
            
            let token = authenticate.generateToken(user);

            return {token};
    }

    signUp = async (data) => {

            if (await this.model.findOne({ "email":data.email })){
                return { success: false, message: 'user already exist' };
            }
            else
            {
            data.password = authenticate.generateHash(data.password)

            await this.model.create(user);
            return { sucess: true, message: 'you are signed up to eshopping' };
        }
    }

    login = async (data) => {
        await this.findByCredentials(data);
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