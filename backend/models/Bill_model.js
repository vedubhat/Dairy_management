const mongoose = require('mongoose');
const Bill_model = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    month: Number,
    year : Number,
    total_litres: Number,
    status : String,
    bill : Number
});

module.exports = mongoose.model('bill', Bill_model);