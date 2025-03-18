const mongoose = require('mongoose');
const deliverySchema = mongoose.Schema({
    subscriberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    quantity: Number, // Amount delivered in liters
    status: { type: String, enum: ['delivered', 'pending'], default: 'delivered'}
});

module.exports = mongoose.model('delivery' , deliverySchema);