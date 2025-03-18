const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin_model = require('../models/Admin_Model');
const {generateToken} = require('../utils/generate_token')
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Hello admin');
});

//create a new admin
router.post('/create_admin', async (req, res) => {
    const { fullname, email, password } = req.body;
    const admin = await admin_model.find({email})
    if(admin)return res.send("This admin exists!")
    
    try {
        if (process.env.NODE_ENV == 'development') {
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
                    return res.send({ 'token': `${token}` })
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

//get all bills
router.get('/get_bill', (req, res) => {

});

//get today's deliveries
router.get('/delivery', (req, res) => {

});





module.exports = router;