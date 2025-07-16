const mongoose = require('mongoose');
const deliverySchema = mongoose.Schema({
    //TODO change ref to subscription model
    subscriberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    quantity: Number, // Amount delivered in liters
    status: { type: String, enum: ['delivered', 'pending' , 'cancelled'], default: 'delivered'}
});

module.exports = mongoose.model('delivery' , deliverySchema);