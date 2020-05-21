const {MONGO_HOSTNAME,MONGO_PORT, MONGO_DB, USERNAME, PASSWORD} = require('../config/config')
const mongoose = require('mongoose')

var url = ''
if (process.env.NODE_ENV !== 'production') {
    url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
  }
else{
    url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-qurbt.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
}

mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})

mongoose.connection.once('open',()=>{
    console.log('Mongoose Connection is Successful')
}).on('error',(error)=>{
    console.log('Connection erorr : ',error)
})

module.exports = {
    mongoose
}