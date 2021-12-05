const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const cartData = data.cart;


router.get('/',async(req,res)=>{
    if(req.session.user){
        //console.log(req.session.userid)
        //cart collection
        let cartdetails=await cartData.getCartUser(req.session.user.userId)

        if(cartdetails.length!=0){
            res.render('pages/cart',{cartdetails}) 
        }else{
            res.render('pages/cart',{NoCart:'DANG!! Your Cart is Empty. Hurry Up!!'}) 
        }
    } else {
    res.render('pages/cart',{NoCart:'You must be logged-in to able to use the cart'}) 
    }
})

module.exports=router;