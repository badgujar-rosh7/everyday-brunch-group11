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
    let getCategory = await userData.getAllCategory();
    let data=await orderData.getBestSeller();
    if(req.session.user){
    //let data=await orderData.getBestSeller();
    console.log(data)
    if(data.length==0){
        res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website',getCategory,id:req.session.user.userId,error:'No Result Found'})
    }else{
    
    res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website',getCategory,id:req.session.user.userId})
   } } else {
        res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website',getCategory})
    }
})


module.exports=router