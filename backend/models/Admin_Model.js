const mongoose = require('mongoose');
const Admin_Model  = mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true
    },
    email : String,
    password : String,
    Revenue : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model('admin' , Admin_Model);