const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    user_id : {
        type:String,
        required:true
    },
    items:[
        {
            quantity:{
                type:Number,
                min:1,
                default:1
            },
            product_id:{
                type:String,
                required :true
            }
        }
    ]
}
