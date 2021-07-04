const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    author:{
        type:String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    img:{
        type: String
    },
    

})

module.exports = mongoose.model('Post',postSchema)