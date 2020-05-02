const {userService} = require('../services')

class UserController {

    signUp = async (req, res)=>  await userService.signUp(req, res)

    login =async (req, res )=> await userService.login(req, res)

    getUser = async (req, res)=> await userService.getUser(req, res )
}
module.exports = new UserController();