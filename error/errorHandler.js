const errorHandler = (req, res )=>{
    res.status(404).send("Bad Request")
}

module.exports = { errorHandler }