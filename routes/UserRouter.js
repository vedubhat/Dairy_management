const express = require('express');
const router = express.Router();
const user_model = require('../models/User_Model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generate_token')
const { is_loggedIn } = require('../middlewares/is_loggedIn');

router.get('/', (req, res) => {
    return res.send('welcome user');
});



//login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model.findOne({ email });
        if (!user) {
            return res.send("Please subscribe first !");
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = generateToken(user);
                res.cookie("token", `${token}`, { maxAge: 3600000, httpOnly: true });
                return res.send({ 'success': `${token}` });
            }
            else {
                return res.send({ 'err': "Please check your password" });
            }
        });


    } catch (error) {
        return res.send(error.message)
    }
});

//logout user
router.post('/logout', (req, res) => {
    res.clearCookie("token");
    return res.send('User logged out !')
})

//update a user password.
router.put('/update_password/:id', is_loggedIn, async (req, res) => {
    const { password, new_password } = req.body;
    const user = await user_model.findOne({ _id: req.params.id });
    try {

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {

                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return err.message
                    }
                    bcrypt.hash(new_password, salt, async function (err, hash) {
                        user.password = hash;
                        await user.save();
                        return res.send("success");
                    });
                })
            }
            else {
                return res.send({ 'err': "Please check your password" });
            }
        });

    } catch (error) {

    }
});

router.get('/get_bill', is_loggedIn, (req, res) => {
    return res.send("Here you will find your bill");
});


module.exports = router;