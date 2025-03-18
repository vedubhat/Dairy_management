const jwt = require('jsonwebtoken');
const admin_model = require('../models/Admin_Model');
const is_admin = async (req , res , next) => {
    try {
        const decode = jwt.verify(req.headers.token , "hahahaha");
        const admin = await admin_model.findOne({email : decode.email}).select("-password")
        if(!admin){
            return res.status(401).send("You are not authorized");
        }
        next();
    } catch (error) {
        res.redirect('/admin/login');
    }
}


module.exports.is_admin = is_admin