const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const { route } = require('./users');
const { Router } = require('express');
const cartData = data.cart;
const userData = data.user;
var Publishable_Key = 'pk_test_51K0juZCsyI93mWA70otfl7zDJgeF6RXUZjSNpUk20pDMRV7Ia6a5mqYOBCEr3aHp5Wh21CJQiDKdTTiIY7BmujbG00WCFZBW95'
var Secret_Key = 'sk_test_51K0juZCsyI93mWA7U5FlUvzECuroJrru73V3MrVSWXfgVCY0xrANdpDqEEmzUTCGNeNwRlMAH0MtOMDJUJ9dfgar00yMxJKw4V'
const stripe = require('stripe')(Secret_Key) 


router.get('/', async (req,res)=>{
    if(req.session.user){
        let cart=await cartData.getCartUser(req.session.user.userId)
        if(cart.length>0){
        console.log(cart)
        let amount=0;
        descriptionofCartItems=' '
        for(let i=0;i<cart.length;i++){
            amount=amount +parseFloat(cart[i].totalcost) 
            descriptionofCartItems=`${descriptionofCartItems} ${cart[i].quantity} ${cart[i].details.title} \n`
        }
        amount=(amount + parseFloat(0.05*amount))*100
        console.log(amount)
        console.log(descriptionofCartItems)
        req.session.user.cartvalue=amount;
        req.session.user.cartdescription=descriptionofCartItems;
        

    res.render('pages/payment',{key:Publishable_Key,amt:amount,descriptionofCartItems,id:req.session.user.userId})
    
}else{
    // res.send({error:'you cannot directly access this page'})
    res.render('pages/loginform');
}} else {
        // res.send({error:'login to access the page'})
        res.render('pages/loginform');
    }
})
// router.get('/', (req,res)=>{
//     res.render('pages/payment',{key:Publishable_Key})
// })




  module.exports=router;