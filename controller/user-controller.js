const {userService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class UserController {

    constructor(){
        this.err = null; this.data = null;
    }

    signUp = async (req, res)=>{

        [this.err,this.data] = await promiseHandler( userService.signUp(req.body));

        if(this.err) res.status(404).send({success:false,message:'Bad Request'});

        res.status(200).send({success:true,message:'signup sucessfull'});
    }

    login = async (req, res )=>{

        [this.err,this.data] = await promiseHandler( userService.findByCredentials(req.body));

        if(this.err) res.status(404).send({success:false,message:'Bad Request'});

        res.status(200).send({success:true,message:'login successfull',data:this.data});
    }

    getUser = async ( req, res )=> {

        [this.err,this.data] = await promiseHandler(userService.getUser())
        
        if(this.err) res.status(404).send({success:false,message:'Bad Request'});
        res.status(200).send({success:true, message:'Request successfull',data:this.data});
    }
}
module.exports = new UserController();