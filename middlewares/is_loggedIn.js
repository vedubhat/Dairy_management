const jwt = require('jsonwebtoken')
const user_model = require('../models/User_Model');
const is_loggedIn = async (req ,res ,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.send("User not authorized");
    }
    try {
        const decoded = jwt.verify(token , "hahahaha");
        const user = await user_model.findOne({email : decoded.email}).select("-password")
        if(!user){
            return res.send("please login first!");
        }
        next();
    } catch (error) {
        return res.send(error.message)
    }
}
module.exports.is_loggedIn = is_loggedIn;