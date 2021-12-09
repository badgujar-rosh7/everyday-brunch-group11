const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const orderData=data.cart;
const sharp = require('sharp');
const fs = require('fs');
const fileUpload = require('express-fileupload');

router.get('/',async(req,res)=>{
    console.log("hi")
    let data=await orderData.getBestSeller();
    
    res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website'})
})


module.exports=router