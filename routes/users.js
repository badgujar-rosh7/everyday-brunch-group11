const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;
const signupData = data.signup;
const orderData = data.cart;
const xss = require('xss');
const moment = require('moment');
const errorcheck = data.error;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

router.get('/', async (req, res) => {
    try {
        const getAllUsers = await userData.getAllUsers();
        res.json(getAllUsers);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    }
    try {
        let userId = xss(req.session.user.userId);
        const validateduserId = errorcheck.validateUserId(userId);
        let getUserById = await userData.getUserById(userId);
        let getOrder= await orderData.getOrderByUserId(userId)
        res.render('pages/userprofile', { data: getUserById,getOrder });
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
router.get('/myprofile', async (req, res) => {});
router.post('/myprofile', async (req, res) => {});
router.get('/signup', async (req, res) => {
    res.render('pages/signupform');
});
router.post('/orderDetails', async(req,res)=>{

    let orderid=req.body['orderid']
    console.log(orderid)
    let getcart=await orderData.getCartByOrderId(orderid);
 
    let itemdetails=[]
    for(let i=0;i<getcart.length;i++){
        let json={
            quantity:getcart[i].quantity,
        name:getcart[i].details.title
       }
       itemdetails.push(json)
    }
    res.render('pages/orderdetails',{itemdetails})
})



// router.get('/logout', async (req, res) => {
//     if (!req.session.user) {
//         res.redirect('/');
//     } else {
//         req.session.destroy();
//         res.render('pages/logout');
//     }
// });
module.exports = router;
