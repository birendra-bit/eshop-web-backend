module.exports = {
    user_id : {
        type:String,
        required:true
    },
    items:[
        {
            quantity:{
                type:Number,
                min:1
            },
            product_id:{
                type:String,
                required :true
            }
        }
    ]
}