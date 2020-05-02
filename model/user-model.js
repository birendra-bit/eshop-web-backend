module.exports = {
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        select:false
    },
    isAdmin: {
        type: Boolean,
        default:false
    }
}