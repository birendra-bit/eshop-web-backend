'use strict'
const mongoose = require('mongoose')
const {userModel} = require('../model')
const {authenticate} = require('../auth')

const userSchema = mongoose.Schema(userModel);

class User {

    constructor() {
        this.model = mongoose.model('User', userSchema);
    }

    findByCredentials = async (data) => {
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

            await this.model.create(data);
            return { sucess: true, message: 'you are signed up to eshopping' };
        }
    }

    // login = async (data) => {

    // await this.findByCredentials(data);
    // }

    getUser = async () => {

        return await this.model.find();
    }
}
module.exports = new User();