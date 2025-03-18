const mongoose = require('mongoose');
const Subscription_model = mongoose.Schema({
    subscriber_id : {type : mongoose.Schema.Types.ObjectId , ref : 'user'},
    daily_quota : Number,
    status : String
});
module.exports = mongoose.model('subscription_model' , Subscription_model);