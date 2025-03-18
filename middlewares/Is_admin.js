const jwt = require('jsonwebtoken');
const admin_model = require('../models/Admin_Model');
const is_admin = async (req , res , next) => {
    
    const token = req.cookies.token;
    if(!token){return res.send("You are not authorized!")}
    try {
        const decode = jwt.verify(token , "hahahaha");
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