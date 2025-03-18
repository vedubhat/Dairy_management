const mongoose = require('mongoose');
const Bill_model = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    Month: String,
    year : Number,
    num_of_litres: {
        type: Array,
        default: []
    },
    total_litres: Number,
    status : String
});

module.exports = mongoose.model('admin', Bill_model);