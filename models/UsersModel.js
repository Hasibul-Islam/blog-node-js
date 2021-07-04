const mongoose = require('mongoose')


// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min:6,
        // type: String,
        // trim: true,
        // lowercase: true,
        // unique: true,
        // required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    date:{
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min:6
    },

})

module.exports = mongoose.model('Users',usersSchema)