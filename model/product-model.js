const mongoose = require('mongoose')

module.exports = {
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}