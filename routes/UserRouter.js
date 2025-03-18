const express = require('express');
const router = express.Router();

router.get('/' , (req ,res) => {
    return res.send('welcome user');
});



//create a user.
router.post('/create_user' , (req , res) => {
    
});

//delete a user.
router.delete('/delete_user/:id' , (req  , res) => {

});

//update a user.
router.put('/update_user/:id' , (req ,res) => {
    
});

router.get('/get_bill/:id' , (req ,res) => {

})
module.exports = router;