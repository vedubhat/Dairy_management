const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin_model = require('../models/Admin_Model');
const user_model = require('../models/User_Model');
const subscription_model = require('../models/Subscription_model')
const {generateToken} = require('../utils/generate_token')
const {is_admin} = require('../middlewares/Is_admin');
const router = express.Router();

router.get('/',is_admin,(req, res) => {
    return res.send('Hello admin');
});

//create a new admin
router.post('/create_admin', async (req, res) => {
    try {
        if (process.env.WORK_ENV == 'development') {

            const { fullname, email, password } = req.body;
            const admin = await admin_model.findOne({email})

            if(admin){return res.send("This admin exists!")}
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return err.message
                }
                bcrypt.hash(password, salt, async function (err, hash) {
                    const created_owner = await admin_model.create({
                        fullname,
                        email,
                        password: hash
                    });
                    const token = generateToken(created_owner)
                    res.cookie("token" , `${token}` , { maxAge: 3600000, httpOnly: true });
                    return res.send({ 'token': `${token}`});
                });
            })
        }
        else {
            throw new Error("No such route exists!");
        }
    } catch (error) {
        return res.send(error.message);
    }

});

//Login admin
router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await admin_model.findOne({ email });
        if(!admin)throw new Error("No admin found !");
        else{
            bcrypt.compare(password, admin.password, function (err, result) {
                if (result) {
                    const token = generateToken(admin);
                    res.cookie("token" , `${token}` , { maxAge: 3600000, httpOnly: true });
                    return res.send({'success': `${token}`});
                }
                else {
                    return res.send({ 'err': "Please check your password" });
                }
            });
        }
    } catch (error) {
        return res.send(error.message);
    }
});


//Logout route
router.post('/logout' , (req ,res) => {
    res.clearCookie("token");
    return res.send('Logged out !')
});

//Delete admin.
router.delete('/delete_admin/:id' ,async (req , res) => {
    try {
        const admin = await admin_model.findByIdAndDelete(req.params.id);
        return res.send("Deleted successfully");
    } catch (error) {
        return res.send(error.message)
    }
})

//get all admin
router.get('/get_admin' , async (req , res) => {
    const admin = await admin_model.find();
    return res.send(admin)
});


// add a new user and create a new subsription.
router.post('/add_sub',is_admin ,async (req , res) => {
    const {fullname , email , password ,Address ,daily_quota} = req.body;

    try {
        const doesExist = await user_model.findOne({email});
        if(doesExist){throw new Error('User already exists!');}
        else{
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return err.message
                }
                bcrypt.hash(password, salt, async function (err, hash) {
                    const created_user = await user_model.create({
                        fullname,
                        email,
                        password: hash,
                        Address
                    });


                    const subscription = await subscription_model.create({
                        subscriber_id : created_user._id,
                        daily_quota,
                        status : 'active'
                    });
                    return res.send({ 'user': created_user , 'sub' : subscription});
                });
            })  
        }
    } catch (error) {
        return res.send(error.message);
    }
});


//get all subscription.
router.get('/get_sub', is_admin,async (req , res) => {
    try {
        const subscriptions = await subscription_model.find(); 
        return res.send(subscriptions)
    } catch (error) {
        return res.send(error.message)
    }
});

//generating bill
router.post('/generate_bill', (req ,res) => {
    try {
        
    } catch (error) {
        
    }
})


//get all bills
router.get('/get_bill', (req, res) => {

});

//get today's deliveries
router.get('/delivery', (req, res) => {

});





module.exports = router;