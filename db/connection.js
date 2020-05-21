const {MONGO_HOSTNAME,MONGO_PORT, MONGO_DB} = require('./keys')
const mongoose = require('mongoose')
require('dotenv').config()

// const url = `mongodb://${process.env.MONGO_HOSTNAME || MONGO_HOSTNAME}:${process.env.MONGO_PORT || MONGO_PORT}/${process.env.MONGO_DB || MONGO_DB}`;
const url = 'mongodb+srv://birendra:mongouser@cluster0-qurbt.mongodb.net/test?retryWrites=true&w=majority'
// console.log(process.env.MONGO_PORT);
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})

mongoose.connection.once('open',()=>{
    console.log('Mongoose Connection is Successful')
}).on('error',(error)=>{
    console.log('Connection erorr : ',error)
})
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load();
//   }
module.exports = {
    mongoose
}