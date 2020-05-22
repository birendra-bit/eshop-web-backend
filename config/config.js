// if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
// }
module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    MONGO_HOSTNAME: process.env.MONGO_HOSTNAME || '127.0.0.1',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_DB: process.env.MONGO_DB || 'e_shopping',
    SECRET: process.env.SECRET || 'opps@her',
    USERNAME: process.env.USERNAME,
    PASSWORD : process.env.PASSWORD
}