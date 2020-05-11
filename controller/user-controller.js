const {userService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class UserController {

    constructor(){
        this.err = null; this.data = null;
    }

    signUp = async (req, res)=>{

        [this.err,this.data] = await promiseHandler( userService.signUp(req.body));

        if(this.err) res.status(404).send('Bad Request');

        res.status(200).send(this.data);
    }

    login = async (req, res )=>{
        
        [this.err,this.data] = await promiseHandler( userService.login(req.body));

        if(this.err) res.status(404).send("Bad Request");

        res.status(200).send(this.data);
    }
    getUser = async ( req, res )=> userService.getUser(req, res);
}
module.exports = new UserController();