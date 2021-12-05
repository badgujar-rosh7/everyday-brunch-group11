const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const cartData = data.cart;

router.post('/', async (req, res) => {
    let itemId=req.body.itemId
    let quantity=req.body.quantity
    let price=req.body.price
  //  req.session.userid='78787878'
  if(req.session.user){
    let userID=req.session.user.userId  //this id will come form session after users loggedin
    
    let createCart= await cartData.createCartItem(itemId,quantity,price,userID)
if(createCart.cartInserted){
    let counterValue = await cartData.getCounter(req.session.user.userId)
    res.json({ success: true,count:counterValue });
} else{
    res.json({ success: true,count:0 }); ///not added to cart due to some error
}
  } else{
      //got to login page and ask user to login
      res.json({ success: false,count:0 })
  }
});

module.exports = router;
